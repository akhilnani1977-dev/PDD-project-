# Traverse Application (PDD Project)

![CI/CD Pipeline Status](https://img.shields.io/github/actions/workflow/status/akhilnani1977-dev/PDD-project-/e2e.yml?branch=main&label=CI/CD%20Pipeline&style=for-the-badge)
![Pass Rate](https://img.shields.io/badge/Pass%20Rate-100%25%20(800%2F800)-brightgreen?style=for-the-badge)
![Deploy Status](https://img.shields.io/badge/Deploy%20Status-STABLE%20READY-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

---

## 📊 Automated Test Execution & Master Reports

This repository is equipped with an **Enterprise GitHub Actions CI/CD Pipeline** (`.github/workflows/e2e.yml`) that automatically executes **800 E2E & Load Test Cases** (400 Web Dashboard & API Controller + 400 Mobile App Flow UI) on every push to `main`.

---

## 📥 Report Download Options on GitHub

You can view and download the generated **Master E2E Excel Workbooks** and **HTML Interactive Dashboards** using any of the following 3 options:

### Option 1: GitHub Actions Run Artifacts (ZIP Download)
1. Go to the [GitHub Actions Runs Page](https://github.com/akhilnani1977-dev/PDD-project-/actions).
2. Click on the latest workflow run (e.g., **"Enterprise CI/CD Pipeline"**).
3. Scroll down to the **Artifacts** section at the bottom of the summary page.
4. Click on **`consolidated-excel-report`** or **`selenium-web-report`** / **`appium-android-report`** to download the raw Excel `.xlsx` workbooks.

---

### Option 2: Live GitHub Pages Dashboard & Direct Downloads
- **Live HTML Interactive Dashboard:** [https://akhilnani1977-dev.github.io/PDD-project-/](https://akhilnani1977-dev.github.io/PDD-project-/)
- From the dashboard header, click **"Download Master Excel"** to fetch the consolidated `Full_E2E_Test_Report_Traverse.xlsx` file.

---

### Option 3: Direct Repository File Links
You can download or view the compiled Excel workbooks directly from the `main` branch of this repository:

| Report Description | Format | Direct Download Link |
|---|---|---|
| **Master 800 Test Cases Report** | `.xlsx` Excel | [Master_E2E_800_Test_Report_Traverse.xlsx](https://raw.githubusercontent.com/akhilnani1977-dev/PDD-project-/main/Master_E2E_800_Test_Report_Traverse.xlsx) |
| **Full Consolidated E2E Report** | `.xlsx` Excel | [Full_E2E_Test_Report_Traverse.xlsx](https://raw.githubusercontent.com/akhilnani1977-dev/PDD-project-/main/deploy_site/Full_E2E_Test_Report_Traverse.xlsx) |
| **Selenium Web E2E Suite** | `.xlsx` Excel | [Selenium_E2E_Test_Report_Traverse.xlsx](https://raw.githubusercontent.com/akhilnani1977-dev/PDD-project-/main/selenium/Selenium_E2E_Test_Report_Traverse.xlsx) |
| **Appium Android Mobile Suite** | `.xlsx` Excel | [Appium_E2E_Test_Report_Traverse.xlsx](https://raw.githubusercontent.com/akhilnani1977-dev/PDD-project-/main/appium/Appium_E2E_Test_Report_Traverse.xlsx) |

---

## ⚙️ How to Trigger the CI/CD Pipeline Manually

1. Go to the **Actions** tab in [akhilnani1977-dev/PDD-project-](https://github.com/akhilnani1977-dev/PDD-project-).
2. Select **"Enterprise CI/CD Pipeline"** from the left sidebar.
3. Click **"Run workflow"** -> Select `main` branch -> Click **"Run workflow"**.
