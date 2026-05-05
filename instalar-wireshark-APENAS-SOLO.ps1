# PowerShell Script to Install Wireshark 4.6.4 Without Npcap

# Set the version and download URL
$wiresharkVersion = '4.6.4'
$downloadUrl = "https://wireshark.org/download/wswin64/$wiresharkVersion/Wireshark-win64-$wiresharkVersion.exe"

# Define the output log file
$logFile = "install_wireshark_log_$(Get-Date -Format 'yyyy-MM-dd_HH-mm-ss').txt"

# Start logging
Start-Transcript -Path $logFile

try {
    # Download Wireshark installer
    Write-Host "Downloading Wireshark $wiresharkVersion..."
    Invoke-WebRequest -Uri $downloadUrl -OutFile "Wireshark-win64-$wiresharkVersion.exe"
    Write-Host "Download completed."

    # Start the installation
    Write-Host "Installing Wireshark..."
    Start-Process -FilePath "Wireshark-win64-$wiresharkVersion.exe" -ArgumentList '/S' -Wait
    Write-Host "Installation completed."
} catch {
    Write-Host "An error occurred: $_"
} finally {
    # Stop logging
    Stop-Transcript
}