# 🚀 Quick Start Guide (Windows)

## Prerequisites Check

Before starting, ensure you have:
- ✅ Docker Desktop installed and running
- ✅ Java 17 or higher installed
- ✅ Node.js and npm installed

### Check Prerequisites

```powershell
# Check Docker
docker --version

# Check Java (should be 17 or higher)
java -version

# Check Node.js
node --version

# Check npm
npm --version
```

---

## 🎯 Step-by-Step Setup

### Step 1: Start MySQL Database

```powershell
# Navigate to project directory
cd "c:\Users\maxwe\Documents\VS Code\CapeStart\online-shopping-fullstack"

# Start MySQL container
docker-compose up -d

# Verify MySQL is running (should see shopping-mysql)
docker ps

# Check MySQL logs (optional)
docker logs shopping-mysql
```

**What this does**: Starts MySQL 8.0 in a Docker container with our database and sample data.

---

### Step 2: Start Spring Boot Backend

```powershell
# Open a new PowerShell terminal
cd "c:\Users\maxwe\Documents\VS Code\CapeStart\online-shopping-fullstack\backend"

# Option 1: Using Maven Wrapper (recommended)
.\mvn-run.cmd spring-boot:run

# Option 2: If you have Maven installed
mvn spring-boot:run
```

**First time**: Maven will download all dependencies (takes a few minutes).

**Expected output**: 
```
Online Shopping Application Started!
Backend running on: http://localhost:8080
```

**Troubleshooting**:
- If port 8080 is in use: `netstat -ano | findstr :8080`
- If Maven wrapper doesn't exist: [Download Maven](https://maven.apache.org/download.cgi)

---

### Step 3: Start React Frontend

```powershell
# Open another new PowerShell terminal
cd "c:\Users\maxwe\Documents\VS Code\CapeStart\online-shopping-fullstack\frontend"

# Install dependencies (first time only)
npm install

# Start React development server
npm start
```

**What happens**: 
- Browser opens automatically at http://localhost:3000
- Shows login page

**First time**: npm installs all dependencies (may take a few minutes).

---

## 🎮 Using the Application

### Login Credentials
- **Username**: `admin`
- **Password**: `admin123`

### Navigation Flow
1. **Login Page** (http://localhost:3000/login)
   - Enter credentials
   - Click "Login"

2. **Dashboard** (http://localhost:3000/dashboard)
   - View statistics
   - See categories
   - Click "Admin" to view products

3. **Admin Page** (http://localhost:3000/admin)
   - View all products in table
   - Click "Dashboard" to go back

---

## 🧪 Testing the API

### Test with PowerShell (Invoke-WebRequest)

```powershell
# Test backend is running
Invoke-WebRequest -Uri "http://localhost:8080/api/products" -Method GET

# Test login (verbose)
$body = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### Test with Browser
- http://localhost:8080/api/products
- http://localhost:8080/api/categories
- http://localhost:8080/api/dashboard/stats

---

## 🛑 Stopping the Application

### Stop Frontend
- Press `Ctrl + C` in the terminal running React

### Stop Backend
- Press `Ctrl + C` in the terminal running Spring Boot

### Stop MySQL
```powershell
# Stop MySQL container
docker-compose stop

# Or stop and remove container
docker-compose down

# Stop and remove with data (WARNING: deletes all data)
docker-compose down -v
```

---

## 🔄 Restarting

### Start Everything Again

```powershell
# Terminal 1: MySQL
docker-compose up -d

# Terminal 2: Backend
cd backend
.\mvnw.cmd spring-boot:run

# Terminal 3: Frontend
cd frontend
npm start
```

---

## 🐛 Common Issues

### Issue: Port 3000 already in use
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace <PID> with actual Process ID)
taskkill /PID <PID> /F
```

### Issue: Port 8080 already in use
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill process
taskkill /PID <PID> /F
```

### Issue: Docker not running
- Open Docker Desktop
- Wait for it to start (green icon in taskbar)
- Try `docker ps` to verify

### Issue: Maven wrapper not found
```powershell
# Install Maven wrapper
cd backend
mvn -N io.takari:maven:wrapper
```

Or use Maven directly:
```powershell
mvn spring-boot:run
```

### Issue: "Cannot connect to MySQL"
```powershell
# Check if MySQL container is running
docker ps

# If not, start it
docker-compose up -d

# Check MySQL logs for errors
docker logs shopping-mysql

# Restart MySQL
docker-compose restart mysql
```

### Issue: React "Module not found"
```powershell
# Delete node_modules and reinstall
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Issue: CORS error in browser console
- Check backend is running on port 8080
- Check CorsConfig.java allows localhost:3000
- Check @CrossOrigin on controllers

---

## 📊 Verify Everything is Working

### 1. Check All Ports
```powershell
# Should see MySQL on 3306, Spring Boot on 8080, React on 3000
netstat -ano | findstr "3000 8080 3306"
```

### 2. Check Docker Containers
```powershell
docker ps
# Should see: shopping-mysql
```

### 3. Test Backend API
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/products" -Method GET
# Should return JSON with products
```

### 4. Open Frontend
- Open browser: http://localhost:3000
- Should see login page
- No errors in browser console (F12)

---

## 🗂️ Project Structure Quick Reference

```
online-shopping-fullstack/
├── backend/                 # Spring Boot (Port 8080)
│   ├── src/main/java/       # Java source code
│   ├── src/main/resources/  # application.properties
│   └── pom.xml              # Maven dependencies
├── frontend/                # React (Port 3000)
│   ├── public/              # Static files
│   ├── src/                 # React source code
│   └── package.json         # npm dependencies
├── database/                # Database scripts
│   └── init.sql             # Initial data
├── docker-compose.yml       # Docker configuration
└── README.md                # Documentation
```

---

## 📝 Development Workflow

### Making Changes

**Backend Changes**:
1. Edit Java files
2. Stop backend (Ctrl+C)
3. Restart: `.\mvnw.cmd spring-boot:run`
4. Or use Spring Boot DevTools (auto-restart)

**Frontend Changes**:
1. Edit React files
2. React automatically reloads (Hot Module Replacement)
3. See changes immediately in browser

**Database Changes**:
1. Edit `database/init.sql`
2. Restart MySQL: `docker-compose restart mysql`
3. Or use `docker-compose down -v` and `docker-compose up -d` (WARNING: deletes data)

---

## 🎓 Next Steps

1. **Understand the Code**
   - Read LEARNING_GUIDE.md for detailed explanations
   - Follow comments in each file

2. **Test the Application**
   - Login with admin/admin123
   - Navigate between pages
   - Open browser DevTools (F12) and watch Network tab

3. **Experiment**
   - Add console.log() in React components
   - Add System.out.println() in Spring Boot
   - Watch the flow of data

4. **Extend the Application**
   - Add new fields to Product
   - Create new API endpoints
   - Add new React components

---

## 💻 Useful Commands

```powershell
# View all running processes
Get-Process

# View specific ports
netstat -ano | findstr "3000 8080 3306"

# Docker commands
docker ps                    # List running containers
docker ps -a                 # List all containers
docker logs <container>      # View container logs
docker exec -it <container> bash  # Enter container

# MySQL commands (from inside container)
docker exec -it shopping-mysql mysql -u shopuser -pshoppass
USE shopping_db;
SHOW TABLES;
SELECT * FROM product;
SELECT * FROM category;
```

---

## 🆘 Getting Help

### Resources
- README.md - Project overview
- LEARNING_GUIDE.md - Detailed explanations
- Code comments - Inline documentation

### Debug Mode
```powershell
# Backend: Enable debug logging
# Edit application.properties:
logging.level.com.shopping=DEBUG

# Frontend: Check browser console (F12)
# Look for errors in Console tab
# Check Network tab for API calls
```

---

Happy Coding! 🎉
