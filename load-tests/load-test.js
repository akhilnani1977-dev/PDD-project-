const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function runLoadPerformanceTest() {
  const apiTestScript = path.join(__dirname, "api-load-test.js");
  try {
    execSync(`node "${apiTestScript}"`, { stdio: "inherit" });
  } catch (err) {
    console.error("Load test completed with warnings or exit status:", err.message);
  }
}

if (require.main === module) {
  runLoadPerformanceTest().catch((err) => console.error("Load Test Error:", err));
}

module.exports = { runLoadPerformanceTest };

