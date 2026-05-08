# ============================================================
# Script Simples - Wireshark 4.6.4 x64 para InvGate
# ============================================================

# Configurações básicas
$VersaoWireshark = "4.6.4"
$UrlWireshark = "https://www.wireshark.org/download/win64/Wireshark-4.6.4-x64.exe"
$UrlFallback = "https://github.com/wireshark/wireshark/releases/download/v4.6.4/Wireshark-win64-4.6.4.exe"

$TempDir = "$env:TEMP\WS_Install"
$LogFile = "C:\Logs\Wireshark_Install.log"

# Criar função de log
function Escrever-Log($msg) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logmsg = "[$timestamp] $msg"
    Write-Host $logmsg
    
    if (-not (Test-Path "C:\Logs")) {
        New-Item -ItemType Directory -Path "C:\Logs" -Force | Out-Null
    }
    Add-Content -Path $LogFile -Value $logmsg
}

# Iniciar
Escrever-Log "===== INICIANDO INSTALACAO WIRESHARK ====="
Escrever-Log "Computador: $env:COMPUTERNAME"
Escrever-Log "Usuario: $env:USERNAME"

# Validar admin
$IsAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $IsAdmin) {
    Escrever-Log "ERRO: Requer privilegios de Administrador"
    exit 1
}
Escrever-Log "Admin: OK"

# Validar x64
if (-not [Environment]::Is64BitOperatingSystem) {
    Escrever-Log "ERRO: Requer Windows x64"
    exit 1
}
Escrever-Log "Sistema: x64 OK"

# Criar temp
if (Test-Path $TempDir) {
    Remove-Item $TempDir -Recurse -Force -ErrorAction SilentlyContinue
}
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null
Escrever-Log "Diretorio temp: $TempDir"

# Verificar versão instalada
function Obter-VersaoInstalada {
    $paths = @(
        "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall",
        "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall"
    )
    
    foreach ($path in $paths) {
        if (Test-Path $path) {
            $items = Get-ChildItem $path -ErrorAction SilentlyContinue
            foreach ($item in $items) {
                $name = $item.GetValue("DisplayName")
                if ($name -like "*Wireshark*") {
                    $version = $item.GetValue("DisplayVersion")
                    return $version
                }
            }
        }
    }
    return $null
}

$VersaoAtual = Obter-VersaoInstalada
if ($VersaoAtual) {
    Escrever-Log "Wireshark encontrado: v$VersaoAtual"
    
    try {
        $v1 = [Version]$VersaoAtual
        $v2 = [Version]$VersaoWireshark
        if ($v1 -ge $v2) {
            Escrever-Log "Ja esta atualizado"
            Escrever-Log "===== CONCLUIDO ====="
            exit 0
        }
    } catch {
        Escrever-Log "Versao atual: $VersaoAtual - Atualizando..."
    }
}

# Encerrar processos
Get-Process -Name "Wireshark" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process -Name "dumpcap" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Baixar Wireshark
$CaminhoExe = "$TempDir\Wireshark-$VersaoWireshark-x64.exe"
$Urls = @($UrlWireshark, $UrlFallback)
$Downloaded = $false

foreach ($Url in $Urls) {
    Escrever-Log "Tentando baixar de: $Url"
    
    for ($tentativa = 1; $tentativa -le 3; $tentativa++) {
        try {
            Escrever-Log "Tentativa $tentativa/3"
            [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
            
            $ProgressPreference = 'SilentlyContinue'
            Invoke-WebRequest -Uri $Url -OutFile $CaminhoExe -TimeoutSec 300 -ErrorAction Stop
            $ProgressPreference = 'Continue'
            
            if (Test-Path $CaminhoExe) {
                $size = (Get-Item $CaminhoExe).Length / 1MB
                if ($size -gt 10) {
                    Escrever-Log "Download OK: $([Math]::Round($size, 2)) MB"
                    $Downloaded = $true
                    break
                }
            }
        } catch {
            Escrever-Log "Falha tentativa $tentativa`: $_"
            Start-Sleep -Seconds (5 * $tentativa)
        }
    }
    
    if ($Downloaded) { break }
}

if (-not $Downloaded) {
    Escrever-Log "ERRO: Nao foi possivel baixar Wireshark"
    exit 1
}

# Instalar
Escrever-Log "Instalando Wireshark..."
try {
    $process = Start-Process -FilePath $CaminhoExe -ArgumentList "/S /desktopicon=no /quicklaunchicon=no" -Wait -PassThru -NoNewWindow
    $exitCode = $process.ExitCode
    Escrever-Log "Codigo de saida: $exitCode"
    
    if ($exitCode -ne 0 -and $exitCode -ne 3010 -and $exitCode -ne 1602) {
        Escrever-Log "ERRO: Instalacao falhou com codigo $exitCode"
        exit 1
    }
} catch {
    Escrever-Log "ERRO ao executar instalador: $_"
    exit 1
}

# Validar instalação
Start-Sleep -Seconds 5
$VersaoFinal = Obter-VersaoInstalada

if ($VersaoFinal) {
    Escrever-Log "SUCESSO: Wireshark v$VersaoFinal instalado"
} else {
    Escrever-Log "AVISO: Wireshark nao encontrado no registro"
}

# Limpar
Remove-Item $TempDir -Recurse -Force -ErrorAction SilentlyContinue

Escrever-Log "===== CONCLUIDO ====="
exit 0
