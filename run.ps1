# Ensure script is running from root directory
$CWD = Get-Location
if ($PSScriptRoot -ne $CWD) {
    Set-Location $PSScriptRoot
}

# Run back-end API
Set-Location .\backend
.\.venv\Scripts\activate
Start-Process python .\main.py -WindowStyle Minimized

# Run front-end react app
Set-Location ..\frontend
Start-Process npm start -WindowStyle Minimized

Set-Location ..