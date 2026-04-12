@echo off
echo ========================================================
echo        NEXUS AI - LOCAL DEVELOPMENT SERVER
echo ========================================================
echo.
echo Building UI Components...
python standardize-ui.py
echo.
echo Applying Global Interactivity Logic...
python apply-corporate-interactivity.py
echo.
echo Starting local Python HTTP server on port 8000...
echo.
echo Press Ctrl+C to stop the server.
echo.
start http://localhost:8000/login.html
python -m http.server 8000
pause
