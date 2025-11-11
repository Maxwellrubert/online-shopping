# Online Shopping Full Stack - Mobile App Quick Start

## 🎯 You Now Have 2 Frontend Versions!

### 📁 Project Structure
```
online-shopping-fullstack/
├── backend/          # Spring Boot API (shared by both frontends)
├── frontend/         # React Web App (existing)
└── mobile/           # React Native Mobile App (NEW!)
```

## 🚀 Quick Start - Mobile App

### Step 1: Start Backend (if not running)
```bash
cd backend
.\mvn-run.cmd spring-boot:run
```
Backend runs on: **http://localhost:8080**

### Step 2: Start Mobile App
```bash
cd mobile
npm start
```

### Step 3: Run on Your Phone
1. **Install Expo Go** app (from App Store or Play Store)
2. **Scan QR code** shown in terminal
3. **Login** with: `admin` / `admin123`

### 📱 Important for Physical Devices
If testing on your phone (not emulator), you MUST update the API URL:

**Find your computer's IP**:
```bash
ipconfig    # Windows - look for IPv4 Address
ifconfig    # Mac/Linux - look for inet
```

**Update these files**:
- `mobile/src/screens/LoginScreen.tsx` (line 44)
- `mobile/src/screens/DashboardScreen.tsx` (line 39)

Change `http://localhost:8080` to `http://YOUR_IP:8080`  
Example: `http://192.168.1.100:8080`

## 🎨 Mobile App Features

✅ **Login Screen** - Full authentication  
✅ **Dashboard** - Stats, categories, products  
✅ **Product Cards** - Beautiful grid with images  
✅ **Stock Badges** - In Stock / Low Stock / Out of Stock  
✅ **Pull to Refresh** - Swipe down to reload data  
✅ **Responsive Design** - Works on all screen sizes  

## 📚 Educational Comments

All mobile code includes detailed `#` comments explaining:
- React Native concepts
- Navigation patterns
- API integration
- Styling differences from web

## 🔄 Both Apps Use Same Backend

The mobile app connects to the **same Spring Boot backend** as the web app. No changes needed to the backend!

## 📝 Next Steps

1. **Try the mobile app** - See products on your phone!
2. **Compare with web** - Same data, different UI
3. **Learn React Native** - Code is heavily commented

Enjoy! 🎉
