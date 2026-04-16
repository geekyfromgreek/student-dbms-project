$mysqld = "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe"
$dataDir = "C:\ProgramData\MySQL\MySQL Server 8.4\Data"

# Create data directory
if (-not (Test-Path $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
}

# Initialize MySQL with no root password
Write-Host "Initializing MySQL..."
& $mysqld --initialize-insecure --datadir="$dataDir" --console 2>&1 | ForEach-Object { Write-Host $_ }

# Install as Windows service
Write-Host "Installing MySQL service..."
& $mysqld --install MySQL84 --datadir="$dataDir" 2>&1 | ForEach-Object { Write-Host $_ }

# Start the service
Write-Host "Starting MySQL service..."
Start-Service MySQL84

Write-Host "MySQL setup complete!"
