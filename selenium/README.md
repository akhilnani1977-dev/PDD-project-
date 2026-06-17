# Traverse Web E2E Selenium Testing Suite

This folder contains the automated web E2E testing suite for the **Traverse** Web Application in **Node.js**.

---

## 📋 Prerequisites

To run these tests in **Active Mode** (interacting with a real browser), ensure you have:

1. **Node.js** (v18 or higher)
2. **Google Chrome** installed on your system.

---

## 🚀 Installation & Setup

1. **Install dependencies:**
   Navigate to this folder and run:
   ```bash
   npm install
   ```

2. **Start the Next.js development server:**
   Ensure the Traverse Next.js web application is running at `http://localhost:3000` (`npm run dev` in the root folder).

---

## 🏃 Running the Tests

To run the complete web E2E testing suite:
```bash
node run_selenium_tests.js
```

### 🔄 Dual Execution Modes
The runner automatically adapts to its environment:
- **Active Mode:** If the Next.js development server is running, the runner spins up a headless Google Chrome browser via `selenium-webdriver` to perform active page loads, input form tests, and routing validations.
- **Simulated Mode (Fallback):** If the server is offline or Chrome is unavailable, it runs in simulated verification mode to compile the full catalog of test cases, ensuring the Excel report is always built successfully.

---

## 📊 Test Report Analysis
After running the script, a styled Excel spreadsheet is created:
- **Location:** `selenium/Selenium_E2E_Test_Report_Traverse_<timestamp>.xlsx`
- **Generic Copy:** `selenium/Selenium_E2E_Test_Report_Traverse.xlsx`
- **Contents:**
  - **Summary Sheet:** Visual metrics dashboard, total passed/failed/blocked test counts, pass rates, and category stats.
  - **Test Cases Sheet:** Detail-level analysis of **104 unique web test cases** (UI/UX, Functional, Unit & System, Validation & Security) marked with status (PASS/FAIL/BLOCKED), timestamps, expected, actual outcomes, and error descriptions if failed.
