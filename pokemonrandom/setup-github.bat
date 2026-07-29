@echo off
REM ====================================================================
REM  Pokemon Random - GitHub Setup Script (Windows Batch)
REM ====================================================================
REM  Run this by double-clicking setup-github.bat
REM  Or from CMD: setup-github.bat
REM ====================================================================

setlocal enabledelayedexpansion

echo.
echo ===================================================
echo   Pokemon Random - GitHub Setup Script (Windows)
echo ===================================================
echo.

REM ===== Step 1: Check prerequisites =====
echo [1/4] Checking prerequisites...

if not exist "package.json" (
    echo [ERROR] package.json not found.
    echo        Run this script from the project root directory.
    pause
    exit /b 1
)
if not exist "src" (
    echo [ERROR] src folder not found.
    echo        Run this script from the project root directory.
    pause
    exit /b 1
)
echo [OK] Project files detected

REM Check git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed.
    echo        Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo [OK] Git is installed
for /f "delims=" %%i in ('git --version') do set GIT_VER=%%i
echo      !GIT_VER!
echo.

REM ===== Step 2: Setup git config if not set =====
echo [2/4] Checking git config...

git config user.name >nul 2>nul
if %errorlevel% neq 0 (
    git config user.name "Pokemon Random"
    echo [SET] user.name = Pokemon Random
)

git config user.email >nul 2>nul
if %errorlevel% neq 0 (
    git config user.email "noreply@pokemonrandom.com"
    echo [SET] user.email = noreply@pokemonrandom.com
)

echo [OK] Git config ready
echo.

REM ===== Step 3: Remove existing .git and init fresh =====
echo [3/4] Setting up Git repository...

if exist ".git" (
    echo      Removing existing git history (clean start)...
    rmdir /s /q .git
)

git init -b main >nul 2>nul
if %errorlevel% neq 0 (
    REM Older git versions don't support -b flag
    git init >nul
    git checkout -b main >nul 2>nul
)
echo [OK] Git repository initialized

REM ===== Step 4: Stage and commit =====
echo [4/4] Staging and committing files...

git add .

for /f %%A in ('git diff --cached --numstat ^| find /c /v ""') do set FILE_COUNT=%%A
echo      Staged %FILE_COUNT% files

git commit -m "Initial release - Pokemon Random" --quiet
echo [OK] Initial commit created
echo.

echo ===================================================
echo   LOCAL SETUP COMPLETE!
echo ===================================================
echo.
echo Repository Summary:
echo   Files committed: %FILE_COUNT%
echo   Branch: main
echo.
echo NEXT STEPS (do these manually):
echo.
echo 1. Create an empty GitHub repository:
echo    https://github.com/new
echo    Name: pokemonrandom
echo    DO NOT check 'Add README' or '.gitignore'
echo.
echo 2. Connect to GitHub (replace YOUR_USERNAME):
echo    git remote add origin https://github.com/YOUR_USERNAME/pokemonrandom.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. When prompted for credentials:
echo    Username: YOUR GitHub username
echo    Password: YOUR GitHub Personal Access Token (PAT)
echo             (NOT your account password!)
echo    Create a PAT at: https://github.com/settings/tokens
echo.
echo ===================================================
echo.
pause
