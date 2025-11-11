# Android Emulator Setup Guide for Expo

## 🎯 Quick Steps to Run Android Emulator

### Step 1: Open Android Studio
1. Open **Android Studio** (installed at: `C:\Program Files\Android\Android Studio`)
2. Click on **"More Actions"** or the **three dots** menu
3. Select **"Virtual Device Manager"** (or **"AVD Manager"**)

### Step 2: Create Android Virtual Device (AVD)

#### If you don't have any emulators:
1. Click **"Create Device"** or **"Create Virtual Device"**
2. **Select Hardware**:
   - Choose **"Phone"** category
   - Select **"Pixel 5"** or **"Pixel 6"** (recommended)
   - Click **Next**

3. **Select System Image**:
   - Choose **"Tiramisu"** (Android 13, API 33) or **"UpsideDownCake"** (Android 14, API 34)
   - If not downloaded, click **"Download"** next to the image
   - Wait for download to complete
   - Click **Next**

4. **AVD Configuration**:
   - Give it a name (e.g., "Pixel_5_API_33")
   - Click **Finish**

#### If you already have emulators:
- You should see a list of virtual devices
- Look for the **Play button (▶)** next to one

### Step 3: Start the Emulator
1. In the Virtual Device Manager, click the **Play button (▶)** next to your device
2. Wait for the emulator to boot up (takes 1-2 minutes first time)
3. You should see an Android phone screen appear

### Step 4: Run Expo App
Once the emulator is running:

```bash
cd mobile
npm start
```

Then press **`a`** in the terminal to run on Android emulator.

---

## 🚀 Alternative: Quick Command Line Setup

### Set Android SDK Environment Variable

1. **Find your Android SDK path**:
   - Common locations:
     - `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
     - `C:\Android\Sdk`
   
2. **Set environment variable** (run as Administrator):

```powershell
# Set ANDROID_HOME environment variable
[System.Environment]::SetEnvironmentVariable('ANDROID_HOME', 'C:\Users\maxwe\AppData\Local\Android\Sdk', 'User')

# Add platform-tools and tools to PATH
$path = [System.Environment]::GetEnvironmentVariable('Path', 'User')
$newPath = "$path;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\emulator"
[System.Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
```

3. **Restart your terminal** (close and reopen VS Code)

4. **Verify setup**:
```bash
adb --version
emulator -list-avds
```

### Create Emulator via Command Line

```bash
# List available system images
sdkmanager --list | findstr "system-images"

# Download Android 13 image (if not already)
sdkmanager "system-images;android-33;google_apis;x86_64"

# Create AVD
avdmanager create avd -n Pixel_5_API_33 -k "system-images;android-33;google_apis;x86_64" -d pixel_5

# Start emulator
emulator -avd Pixel_5_API_33
```

---

## 🔧 Troubleshooting

### "No emulators could be started"
**Fix**: Open Android Studio → Virtual Device Manager → Create a device (see Step 2 above)

### "ANDROID_HOME is not set"
**Fix**: 
1. Find Android SDK location in Android Studio:
   - Go to **File → Settings → Appearance & Behavior → System Settings → Android SDK**
   - Copy the **Android SDK Location** path
2. Set environment variable (see Alternative method above)

### "adb not found"
**Fix**: Add Android SDK platform-tools to PATH:
```powershell
# Add to user PATH
$path = [System.Environment]::GetEnvironmentVariable('Path', 'User')
$newPath = "$path;C:\Users\maxwe\AppData\Local\Android\Sdk\platform-tools"
[System.Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
```
Restart terminal after this.

### Emulator is slow
**Fixes**:
- Enable **Hardware Acceleration** (HAXM on Intel, Hyper-V on Windows)
- Allocate more RAM to emulator (edit AVD settings)
- Use x86_64 system image (faster than ARM)

### "Connection refused" or app won't load
**Fix**: 
1. Make sure backend is running: `http://localhost:8080`
2. Android emulator uses `10.0.2.2` to access host machine's localhost
3. Update API URLs in mobile app:
   ```typescript
   // Change FROM:
   http://localhost:8080
   
   // TO (for Android emulator):
   http://10.0.2.2:8080
   ```

---

## 📱 Testing on Physical Android Device (Alternative)

If emulator is too slow, use your physical phone:

1. **Enable Developer Mode** on phone:
   - Go to **Settings → About Phone**
   - Tap **Build Number** 7 times
   - Go back to Settings → **Developer Options**

2. **Enable USB Debugging**:
   - In Developer Options, turn on **USB Debugging**

3. **Connect via USB**:
   - Connect phone to computer with USB cable
   - Allow USB debugging when prompted

4. **Update API URL** in app to your computer's IP:
   ```typescript
   // Find IP: ipconfig → IPv4 Address
   http://192.168.1.100:8080
   ```

5. **Run app**:
   ```bash
   npm start
   # Press 'a' for Android
   ```

---

## ✅ Recommended Quick Start

**Easiest method - Use Android Studio GUI:**

1. ✅ Open **Android Studio**
2. ✅ Click **"More Actions"** → **"Virtual Device Manager"**
3. ✅ Click **"Create Device"**
4. ✅ Select **Pixel 5** → Next
5. ✅ Select **Tiramisu (API 33)** → Download if needed → Next
6. ✅ Click **Finish**
7. ✅ Click **Play button (▶)** to start emulator
8. ✅ Wait for Android to boot
9. ✅ In terminal: `npm start` then press `a`

**That's it!** The app will install on the emulator automatically.

---

## 📝 Important Notes

### For Android Emulator:
- Backend URL: `http://10.0.2.2:8080` (not localhost)
- First boot takes 1-2 minutes
- Keep emulator running for faster subsequent launches

### For Physical Device:
- Backend URL: `http://YOUR_COMPUTER_IP:8080`
- Must be on same WiFi network
- Expo Go app required

---

Need help? Let me know which step you're stuck on! 🚀
