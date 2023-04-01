# Check python version
$pyV = python -V
if (!($pyV -match '3\.11\.*')) {
    Write-Host "Please install Python 3.11.2 from https://www.python.org/ before running this script. Be sure to restart the terminal (or VS Code) before rerunning."
    Exit
}

# Ensure script is running from root directory
$CWD = Get-Location
if ($PSScriptRoot -ne $CWD) {
    Set-Location $PSScriptRoot
}

# Set up front-end environment
Write-Host "Setting up Python environment..."
Set-Location .\backend\
if (!(Test-Path -Path ".\.venv")) {
    python -m venv .venv
}
.\.venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r .\requirements.txt

# Set up back-end environment
Write-Host "Installing node modules..."
Set-Location ..\frontend\
npm install

# Create token env file and open
Set-Location ..
$tokenEnv = ".\.env"
if (!(Test-Path $tokenEnv)) {
    New-Item $tokenEnv | Out-Null
    Set-Content $tokenEnv "TOKEN='enter token between single quotes'"
}
Write-Host "Done.
Retrieve authorization token from https://ballchasing.com/upload and enter into the provided space in .env.
If using VS Code, relaod window by pressing CRTL-Shift-P and typing 'reload window' to complete setup."