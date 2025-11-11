# Shopping App - React Native Mobile

This is the **React Native mobile version** of the Online Shopping application. It connects to the same Spring Boot backend as the web version.

## 📱 Features

- **Login Screen**: Authentication with username/password
- **Dashboard Screen**: 
  - Statistics cards (products, categories, inventory, stock)
  - Categories list
  - Product grid with images
  - Pull-to-refresh functionality
  - Stock status badges (In Stock, Low Stock, Out of Stock)

## 🚀 Setup Instructions

### Prerequisites

1. **Node.js** (v18 or higher)
2. **Expo Go app** on your mobile device (download from App Store/Play Store)
   - OR **Android Studio** for Android emulator
   - OR **Xcode** for iOS simulator (Mac only)

### Installation

1. **Navigate to mobile folder**:
   ```bash
   cd mobile
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Configure Backend URL**:
   
   **IMPORTANT**: If testing on a physical device, update the backend URL:
   
   - Open `src/screens/LoginScreen.tsx`
   - Open `src/screens/DashboardScreen.tsx`
   - Replace `http://localhost:8080` with your computer's IP address
   
   **Find your IP address**:
   - Windows: Run `ipconfig` → Look for IPv4 Address
   - Mac/Linux: Run `ifconfig` → Look for inet address
   - Example: `http://192.168.1.100:8080`

### Running the App

1. **Start the backend** (if not already running):
   ```bash
   cd ../backend
   .\mvn-run.cmd spring-boot:run
   ```

2. **Start Expo development server**:
   ```bash
   cd ../mobile
   npm start
   ```

3. **Run on device/emulator**:
   
   **Option 1: Physical Device (Easiest)**
   - Install **Expo Go** app on your phone
   - Scan the QR code shown in terminal
   - Make sure phone and computer are on **same WiFi network**
   
   **Option 2: Android Emulator**
   - Press `a` in the terminal
   - Requires Android Studio installed
   
   **Option 3: iOS Simulator** (Mac only)
   - Press `i` in the terminal
   - Requires Xcode installed
   
   **Option 4: Web Browser**
   - Press `w` in the terminal
   - Runs in browser (limited native features)

## 📂 Project Structure

```
mobile/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.tsx      # Login/authentication screen
│   │   └── DashboardScreen.tsx  # Main dashboard with products
│   └── components/              # Reusable components (future)
├── App.js                       # Root component with navigation
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🎯 How It Works

### Navigation Flow
1. **Login Screen** → User enters credentials → API call to backend
2. **Dashboard Screen** → Fetches stats, products, categories → Displays in cards

### API Endpoints Used
- `POST /api/login` - Authentication
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/products` - All products
- `GET /api/categories` - All categories

### Key React Native Concepts

**Components**:
- `View` = `<div>` in web (container)
- `Text` = text element (must wrap all text)
- `TextInput` = input field
- `TouchableOpacity` = clickable button
- `ScrollView` = scrollable container
- `Image` = displays images

**Styling**:
- Uses `StyleSheet.create()` instead of CSS
- Properties are camelCase (`backgroundColor` not `background-color`)
- Flexbox by default (`flex: 1` = fill space)

**Navigation**:
- `@react-navigation/stack` = stack navigation (screens stack)
- `navigation.replace()` = replace screen (can't go back)
- `navigation.navigate()` = go to screen (can go back)

## 🔧 Troubleshooting

### "Network request failed"
- Make sure backend is running on port 8080
- If on physical device, update URLs to use your computer's IP
- Check firewall settings (allow port 8080)
- Ensure phone and computer on same WiFi

### "Unable to resolve module"
- Run `npm install` again
- Clear cache: `npm start -- --reset-cache`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Images not loading
- Check internet connection (images from Unsplash)
- Images load from external URLs, need internet access

## 📝 Default Credentials

**Username**: `admin`  
**Password**: `admin123`

(Same as web version)

## 🎨 Features Comparison: Web vs Mobile

| Feature | Web | Mobile |
|---------|-----|--------|
| Login | ✅ | ✅ |
| Dashboard Stats | ✅ | ✅ |
| Product Cards | ✅ | ✅ |
| Categories | ✅ | ✅ |
| Product Images | ✅ | ✅ |
| Admin CRUD | ✅ | ❌ (Future) |
| Pull to Refresh | ❌ | ✅ |
| Touch Gestures | ❌ | ✅ |

## 🚀 Next Steps (Future Enhancements)

1. **Admin Screen** - CRUD operations for products
2. **Product Details** - Tap card to see full details
3. **Search & Filter** - Search products, filter by category
4. **Shopping Cart** - Add to cart functionality
5. **Offline Support** - Cache data locally
6. **Push Notifications** - Product updates

## 📚 Educational Comments

All code files include detailed `#` comments explaining:
- **WHY**: Purpose and reasoning
- **WHAT**: What the code does
- **HOW**: Implementation details
- React Native concepts and patterns

Perfect for learning React Native development!

---

**Happy Coding!** 🎉
