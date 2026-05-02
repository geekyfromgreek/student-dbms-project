@echo off
title Student DBMS - Local Deployment
color 0B

echo ============================================
echo    Student DBMS - One-Click Deploy
echo ============================================
echo.

:: -----------------------------------------------
:: 1. Check if Node.js is installed
:: -----------------------------------------------
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    color 0C
    echo [ERROR] Node.js is not installed or not in PATH.
    echo         Download it from https://nodejs.org
    echo.
    pause
    exit /b 1
)
echo [OK] Node.js found: 
node -v

:: -----------------------------------------------
:: 2. Check if MySQL service is running
:: -----------------------------------------------
echo.
echo [INFO] Checking MySQL service...
sc query MySQL84 >nul 2>nul
if %ERRORLEVEL% neq 0 (
    sc query MySQL >nul 2>nul
    if %ERRORLEVEL% neq 0 (
        sc query MySQL80 >nul 2>nul
        if %ERRORLEVEL% neq 0 (
            color 0E
            echo [WARNING] Could not detect a MySQL service.
            echo           Make sure MySQL is running on localhost:3306
            echo           with user 'root' and no password.
            echo.
        ) else (
            echo [OK] MySQL80 service detected.
        )
    ) else (
        echo [OK] MySQL service detected.
    )
) else (
    echo [OK] MySQL84 service detected.
)

:: -----------------------------------------------
:: 3. Install backend dependencies
:: -----------------------------------------------
echo.
echo [STEP 1/4] Installing backend dependencies...
echo -----------------------------------------------
cd /d "%~dp0backend"
if not exist node_modules (
    call npm install
    if %ERRORLEVEL% neq 0 (
        color 0C
        echo [ERROR] Backend npm install failed.
        pause
        exit /b 1
    )
) else (
    echo [OK] Backend node_modules already exist. Skipping install.
)

:: -----------------------------------------------
:: 4. Install frontend dependencies
:: -----------------------------------------------
echo.
echo [STEP 2/4] Installing frontend dependencies...
echo -----------------------------------------------
cd /d "%~dp0frontend"
if not exist node_modules (
    call npm install
    if %ERRORLEVEL% neq 0 (
        color 0C
        echo [ERROR] Frontend npm install failed.
        pause
        exit /b 1
    )
) else (
    echo [OK] Frontend node_modules already exist. Skipping install.
)

:: -----------------------------------------------
:: 5. Start the Backend server (in a new window)
:: -----------------------------------------------
echo.
echo [STEP 3/4] Starting Backend server (port 5000)...
echo -----------------------------------------------
cd /d "%~dp0backend"
start "Student DBMS - Backend (port 5000)" cmd /k "color 0A && echo ===== BACKEND SERVER ===== && echo. && npm run dev"

:: Give the backend a moment to initialize the DB
timeout /t 3 /nobreak >nul

:: -----------------------------------------------
:: 6. Start the Frontend dev server (in a new window)
:: -----------------------------------------------
echo.
echo [STEP 4/4] Starting Frontend server (port 5173)...
echo -----------------------------------------------
cd /d "%~dp0frontend"
start "Student DBMS - Frontend (port 5173)" cmd /k "color 0D && echo ===== FRONTEND SERVER ===== && echo. && npm run dev"

:: -----------------------------------------------
:: 7. Wait and open browser
:: -----------------------------------------------
timeout /t 5 /nobreak >nul

echo.
echo ============================================
echo    Deployment Complete!
echo ============================================
echo.
echo    Frontend : http://localhost:5173
echo    Backend  : http://localhost:5000
echo.
echo    Two new terminal windows have opened:
echo      - Green  = Backend server
echo      - Purple = Frontend server
echo.
echo    Close those windows to stop the servers.
echo ============================================
echo.

:: Open the app in the default browser
start "" http://localhost:5173

echo Press any key to close this launcher window...
pause >nul
