# Traverse Appium E2E Mobile Testing Suite

This folder contains the automated Appium E2E testing suite for the **Traverse** Android application (built via Capacitor hybrid web shell). 

---

## 📋 Prerequisites

To run these tests in **Active Mode** (on a real device or emulator), you need the following prerequisites installed on your development machine:

1. **Python 3.x**
2. **Node.js & npm**
3. **Android Studio** (with Android SDK and an Android Virtual Device / Emulator configured)
4. **Appium Server & Drivers**:
   ```bash
   npm install -g appium
   appium driver install uiautomator2
   ```
5. **Set Environment Variables**:
   Ensure `ANDROID_HOME` is set to your Android SDK path (e.g. `C:\Users\<username>\AppData\Local\Android\Sdk`) and added to your system `PATH`.

---

## 🚀 Installation & Setup

1. **Install Python dependencies:**
   Navigate to this folder and install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the Android Emulator:**
   - Launch Android Studio, open the **Device Manager**, and start your emulator.
   - Or run ADB to check for active devices:
     ```bash
     adb devices
     ```

3. **Start the Appium Server:**
   ```bash
   appium
   ```
   By default, this will start the server on `http://localhost:4723`.

---

## 🏃 Running the Tests

To execute the complete E2E testing suite:
```bash
python run_appium_tests.py
```

### 🔄 Dynamic Modes
The runner automatically detects if the Appium server and Android device are available:
- **Active Mode:** If Appium is running and an Android device is detected, it will automatically install `traverse-updated.apk`, boot the app, and run real E2E functional test flows (validating login, navigation, splash screens, forms).
- **Simulated Mode (Fallback):** If Appium is not running, it runs in simulated validation mode to verify the entire test suite catalog and output the report, ensuring reports are always generated.

---

## 📊 Test Report Analysis
After running the script, a professionally styled Excel report is generated:
- **Location:** `appium/Appium_E2E_Test_Report_Traverse_<timestamp>.xlsx`
- **Contents:**
  - **Summary Sheet:** Visual metrics, test status counts, category breakdown, pass rates, and **Deployable Status**.
  - **Test Cases Sheet:** Detail-level analysis of **100+ unique mobile test cases** (UI/UX, Functional, Unit & System, Validation & Security) marked with status (PASS/FAIL/BLOCKED), timestamps, expected, and actual outcomes.
