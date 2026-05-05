# Improved Wireshark Installation Script

## Description
This PowerShell script automates the installation of Wireshark, ensuring that the necessary administrative privileges are validated, download retries are handled more effectively, Npcap is installed silently, and comprehensive logging is implemented.

## Script Features
- **Admin Privilege Validation**: Ensures the script is run with admin rights.
- **Download Retry Logic**: Implements a mechanism to retry downloading if the initial attempt fails.
- **Npcap Silent Installation**: Automates the installation of Npcap without user interaction.
- **Reboot Handling**: Manages the need for a system reboot after installation.
- **Comprehensive Logging**: Logs all actions taken by the script for troubleshooting.

## Script Code
```powershell
# Check for admin privileges
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "This script requires administrative privileges!";
    Exit;
}

# Logging function
$logFile = "install_log.txt"
function Log {
    $message = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $($args)"
    Add-Content -Path $logFile -Value $message
}

Log "Script started."

# Define download URLs
$wiresharkUrl = "https://wireshark.org/download/wireshark-win64-x.x.x.exe"  # Replace with actual latest version
$npcapUrl = "https://nmap.org/npcap/dist/npcap-x.x.x.exe"  # Replace with actual latest version

# Download function with retry logic
function DownloadFile {
    param (
        [string]$url,
        [string]$outputPath
    )
    $retryCount = 5
    for ($i = 0; $i -lt $retryCount; $i++) {
        try {
            Invoke-WebRequest -Uri $url -OutFile $outputPath
            Log "Downloaded $url successfully."
            return $true
        } catch {
            Log "Failed to download $url, attempt $($i + 1) of $retryCount."
            Start-Sleep -Seconds 5
        }
    }
    Log "Failed to download $url after $retryCount attempts."
    Exit;
}

# Download Wireshark and Npcap
DownloadFile -url $wiresharkUrl -outputPath "wireshark_installer.exe"
DownloadFile -url $npcapUrl -outputPath "npcap_installer.exe"

# Install Npcap silently
Log "Installing Npcap..."
Start-Process -FilePath "npcap_installer.exe" -ArgumentList '/S' -Wait
Log "Npcap installation completed."

# Install Wireshark
Log "Installing Wireshark..."
Start-Process -FilePath "wireshark_installer.exe" -ArgumentList '/S' -Wait
Log "Wireshark installation completed."

# Check if reboot is required
if ($lastExitCode -ne 0) {
    Log "Installation failed, reboot is required."
    Shutdown.exe /r /t 0
} else {
    Log "Installation completed successfully."
}

Log "Script finished."