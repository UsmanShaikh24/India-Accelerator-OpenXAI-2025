@echo off
echo Starting Poetry Companion Application...
echo.

echo Starting Ollama service...
start "Ollama" cmd /k "ollama serve"
echo Ollama service started in background.
echo.

echo Waiting for Ollama to initialize...
timeout /t 3 /nobreak >nul
echo.

echo Starting Next.js development server...
start "Next.js Dev Server" cmd /k "npm run dev"
echo Next.js development server started in background.
echo.

echo Waiting for server to start...
timeout /t 5 /nobreak >nul
echo.

echo Opening browser tab...
start http://localhost:3000
echo Browser tab opened!
echo.

echo Application is now running!
echo - Ollama service: Running in background
echo - Next.js app: http://localhost:3000
echo - Browser: Should have opened automatically
echo.
echo Press any key to exit this script (services will continue running)...
pause >nul
