# ============================================================
#  Script de Instalação - Wireshark 4.6.4 x64
#  Versão 4.0 - INVGATE AGENT COMPATÍVEL
#  Corrigido para funcionar com deployment do InvGate
# ============================================================

# Defina o modo de erro para parar em erros
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# ---------- CONFIGURAÇÕES ----------
$VersaoWireshark = "4.6.4"
$UrlWireshark1 = "https://www.wireshark.org/download/win64/Wireshark-4.6.4-x64.exe"
$UrlWireshark2 = "https://github.com/wireshark/wireshark/releases/download/v4.6.4/Wireshark-win64-4.6.4.exe"

$TempDir = "$env:TEMP\WS_Install_$(Get-Random)"
$LogDir = "C:\ProgramData\InvGate\Logs"
$LogFile = "$LogDir\Wireshark-Install-$(Get-Date -Format 'yyyy-MM-dd_HH-mm-ss').log"

# ---------- FUNÇÕES DE LOG ----------
function Log-Message {
    param(
        [string]$Message,
        [ValidateSet("INFO", "SUCCESS", "WARNING", "ERROR")]
        [string]$Level = "INFO"
    )
    
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    
    # Garantir que o diretório de logs existe
    if (-not (Test-Path $LogDir)) {
        New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
    }
    
    # Escrever no log
    Add-Content -Path $LogFile -Value $LogEntry -ErrorAction SilentlyContinue
    
    # Escrever no console
    switch ($Level) {
        "SUCCESS" { Write-Host "[✓] $Message" -ForegroundColor Green }
        "ERROR" { Write-Host "[✗] $Message" -ForegroundColor Red }
        "WARNING" { Write-Host "[!] $Message" -ForegroundColor Yellow }
        default { Write-Host "[*] $Message" -ForegroundColor Cyan }
    }
}

# ---------- VALIDAÇÕES INICIAIS ----------
Log-Message "========== INICIANDO INSTALAÇÃO WIRESHARK ==========" "INFO"

try {
    # Validar Admin
    $IsAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
    if (-not $IsAdmin) {
        Log-Message "ERRO: Sem privilégios de Administrador!" "ERROR"
        exit 1
    }
    Log-Message "Privilégios de Admin: OK" "SUCCESS"
    
    # Validar x64
    if (-not [Environment]::Is64BitOperatingSystem) {
        Log-Message "ERRO: Sistema não é x64!" "ERROR"
        exit 1
    }
    Log-Message "SO: Windows x64 - OK" "SUCCESS"
    
    # Informações do sistema
    Log-Message "Computador: $env:COMPUTERNAME" "INFO"
    Log-Message "Usuário: $env:USERNAME" "INFO"
    Log-Message "PowerShell: $($PSVersionTable.PSVersion.Major).$($PSVersionTable.PSVersion.Minor)" "INFO"
    
} catch {
    Log-Message "Erro na validação inicial: $($_.Exception.Message)" "ERROR"
    exit 1
}

# ---------- CRIAR DIRETÓRIO TEMPORÁRIO ----------
try {
    if (Test-Path $TempDir) {
        Remove-Item $TempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
    New-Item -ItemType Directory -Path $TempDir -Force | Out-Null
    Log-Message "Diretório temporário criado: $TempDir" "SUCCESS"
} catch {
    Log-Message "Erro ao criar diretório temporário: $($_.Exception.Message)" "ERROR"
    exit 1
}

# ---------- VERIFICAR VERSÃO INSTALADA ----------
function Get-InstalledVersion {
    try {
        $RegistryPaths = @(
            "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall",
            "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall"
        )
        
        foreach ($Path in $RegistryPaths) {
            if (Test-Path $Path) {
                $Items = Get-ChildItem $Path -ErrorAction SilentlyContinue
                foreach ($Item in $Items) {
                    $DisplayName = $Item.GetValue("DisplayName")
                    if ($DisplayName -like "*Wireshark*") {
                        $Version = $Item.GetValue("DisplayVersion")
                        return $Version
                    }
                }
            }
        }
    } catch {
        return $null
    }
    return $null
}

# ---------- COMPARAR VERSÕES ----------
function Compare-Versions {
    param([string]$Current, [string]$Target)
    
    try {
        $v1 = [Version]$Current
        $v2 = [Version]$Target
        return ($v1 -ge $v2)
    } catch {
        return $false
    }
}

# ---------- BAIXAR ARQUIVO ----------
function Download-File {
    param(
        [string]$Url1,
        [string]$Url2,
        [string]$OutFile,
        [string]$AppName
    )
    
    $Urls = @($Url1, $Url2)
    
    foreach ($Url in $Urls) {
        Log-Message "Tentando baixar de: $Url" "INFO"
        
        for ($Tentativa = 1; $Tentativa -le 3; $Tentativa++) {
            try {
                Log-Message "Tentativa $Tentativa de 3..." "INFO"
                
                [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls11
                
                $ProgressPreference = 'SilentlyContinue'
                Invoke-WebRequest -Uri $Url -OutFile $OutFile -TimeoutSec 600 -ErrorAction Stop
                $ProgressPreference = 'SilentlyContinue'
                
                # Validar arquivo
                if (Test-Path $OutFile) {
                    $Size = (Get-Item $OutFile).Length / 1MB
                    if ($Size -gt 10) {
                        Log-Message "Download concluído: $([Math]::Round($Size, 2)) MB" "SUCCESS"
                        return $true
                    }
                }
            } catch {
                Log-Message "Falha na tentativa $Tentativa`: $($_.Exception.Message)" "WARNING"
                Start-Sleep -Seconds (5 * $Tentativa)
            }
        }
    }
    
    Log-Message "Falha ao baixar $AppName após todas as tentativas" "ERROR"
    return $false
}

# ---------- INSTALAR APLICAÇÃO ----------
function Install-App {
    param(
        [string]$InstallerPath,
        [string]$Arguments,
        [string]$AppName
    )
    
    Log-Message "Iniciando instalação de $AppName..." "INFO"
    Log-Message "Arquivo: $InstallerPath" "INFO"
    Log-Message "Argumentos: $Arguments" "INFO"
    
    try {
        $Process = Start-Process -FilePath $InstallerPath `
                                 -ArgumentList $Arguments `
                                 -Wait `
                                 -PassThru `
                                 -NoNewWindow `
                                 -ErrorAction Stop
        
        $ExitCode = $Process.ExitCode
        Log-Message "Instalador retornou código: $ExitCode" "INFO"
        
        return $ExitCode
    } catch {
        Log-Message "Erro ao executar instalador: $($_.Exception.Message)" "ERROR"
        return -1
    }
}

# ---------- ENCERRAR PROCESSOS ----------
function Stop-RelatedProcesses {
    Log-Message "Encerrando processos relacionados..." "INFO"
    
    $Processos = @("Wireshark", "dumpcap")
    
    foreach ($Proc in $Processos) {
        $Running = Get-Process -Name $Proc -ErrorAction SilentlyContinue
        if ($Running) {
            try {
                Stop-Process -Name $Proc -Force -ErrorAction SilentlyContinue
                Log-Message "Processo $Proc encerrado" "SUCCESS"
            } catch {
                Log-Message "Não foi possível encerrar $Proc" "WARNING"
            }
        }
    }
}

# ---------- LIMPAR TEMPORÁRIOS ----------
function Cleanup-Temp {
    Log-Message "Limpando arquivos temporários..." "INFO"
    
    try {
        if (Test-Path $TempDir) {
            Remove-Item $TempDir -Recurse -Force -ErrorAction SilentlyContinue
            Log-Message "Limpeza concluída" "SUCCESS"
        }
    } catch {
        Log-Message "Erro ao limpar temporários (não crítico)" "WARNING"
    }
}

# ============================================================
# EXECUÇÃO PRINCIPAL
# ============================================================

try {
    Stop-RelatedProcesses
    Start-Sleep -Seconds 2
    
    # Verificar versão instalada
    $VersionInstalada = Get-InstalledVersion
    
    if ($VersionInstalada) {
        Log-Message "Wireshark já está instalado: v$VersionInstalada" "INFO"
        
        $Atualizado = Compare-Versions -Current $VersionInstalada -Target $VersaoWireshark
        
        if ($Atualizado) {
            Log-Message "Versão já está atualizada (>= $VersaoWireshark)" "SUCCESS"
            Log-Message "Nenhuma ação necessária" "INFO"
            Cleanup-Temp
            exit 0
        }
    }
    
    # Baixar Wireshark
    $CaminhoWireshark = "$TempDir\Wireshark-$VersaoWireshark-x64.exe"
    Log-Message "Baixando Wireshark $VersaoWireshark..." "INFO"
    
    if (-not (Download-File -Url1 $UrlWireshark1 -Url2 $UrlWireshark2 -OutFile $CaminhoWireshark -AppName "Wireshark")) {
        Log-Message "FALHA: Não foi possível baixar Wireshark" "ERROR"
        Cleanup-Temp
        exit 1
    }
    
    # Instalar Wireshark
    $Args = "/S /desktopicon=no /quicklaunchicon=no"
    $CodigoInstalacao = Install-App -InstallerPath $CaminhoWireshark -Arguments $Args -AppName "Wireshark"
    
    if ($CodigoInstalacao -eq 0 -or $CodigoInstalacao -eq 3010) {
        Log-Message "Wireshark instalado com sucesso!" "SUCCESS"
        Start-Sleep -Seconds 3
    } else {
        Log-Message "ERRO na instalação (Código: $CodigoInstalacao)" "ERROR"
        Cleanup-Temp
        exit 1
    }
    
    # Validação final
    Start-Sleep -Seconds 5
    $VersionFinal = Get-InstalledVersion
    
    if ($VersionFinal) {
        Log-Message "SUCESSO: Wireshark v$VersionFinal instalado!" "SUCCESS"
    } else {
        Log-Message "AVISO: Wireshark não encontrado no Registro" "WARNING"
    }
    
    Cleanup-Temp
    Log-Message "========== INSTALAÇÃO CONCLUÍDA ==========" "SUCCESS"
    Log-Message "Log salvo em: $LogFile" "INFO"
    
    exit 0
    
} catch {
    Log-Message "Erro durante a instalação: $($_.Exception.Message)" "ERROR"
    Log-Message "Stack: $($_.ScriptStackTrace)" "ERROR"
    Cleanup-Temp
    exit 1
}
