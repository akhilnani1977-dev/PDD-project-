/**
 * Traverse API Load Test Runner
 * ─────────────────────────────────────────────────────────────
 * Mirrors the exact output format from the screenshot:
 *   [Progress] Elapsed: Xs | Current RPS: xxx | Avg Latency: xxxms | Total Requests: xxxxx
 *   ================ LOAD TEST RESULTS ================
 * ─────────────────────────────────────────────────────────────
 * Usage:
 *   node load-tests/api-load-test.js
 *   node load-tests/api-load-test.js --url http://localhost:3000/api/ai/chat --duration 60 --concurrency 100
 */

const http  = require("http");
const https = require("https");
const fs    = require("fs");
const path  = require("path");
const url   = require("url");

// ─── CONFIG (override via CLI args) ──────────────────────────
const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : def;
};

const BASE_URL    = getArg("--base", "http://localhost:3000");
const DURATION    = parseInt(getArg("--duration",    "60"),  10);
const CONCURRENCY = parseInt(getArg("--concurrency", "100"), 10);
const REPORT_DIR  = path.join(__dirname, "..", "Vulnerability Test Results");

// ─── ALL TRAVERSE API ENDPOINTS ──────────────────────────────
const ENDPOINTS = [
  { url: "/",                      method: "GET",  label: "Home Page"           },
  { url: "/ai-planner",            method: "GET",  label: "AI Planner Page"     },
  { url: "/destinations",          method: "GET",  label: "Destinations List"   },
  { url: "/destinations/jaipur",   method: "GET",  label: "Destination Detail"  },
  { url: "/hotels",                method: "GET",  label: "Hotels Page"         },
  { url: "/trips",                 method: "GET",  label: "My Trips"            },
  { url: "/bookings",              method: "GET",  label: "Bookings Page"       },
  { url: "/community",             method: "GET",  label: "Community Page"      },
  { url: "/profile",               method: "GET",  label: "Profile Page"        },
  { url: "/saved",                 method: "GET",  label: "Saved Page"          },
  { url: "/api/ai/chat",           method: "POST", label: "AI Chat API"         },
  { url: "/api/ai/plan",           method: "POST", label: "AI Plan API"         },
  { url: "/api/ai/recommend",      method: "POST", label: "AI Recommend API"    },
  { url: "/api/auth/send-otp",     method: "POST", label: "Send OTP API"        },
  { url: "/api/auth/verify-otp",   method: "POST", label: "Verify OTP API"      },
];

const POST_BODIES = {
  "/api/ai/chat":         JSON.stringify({ prompt: "Plan a 5-day trip to Goa" }),
  "/api/ai/plan":         JSON.stringify({ destination: "Jaipur", budget: 20000, days: 5 }),
  "/api/ai/recommend":    JSON.stringify({ interests: ["Adventure"], budget: 25000, travelersCount: 2, durationDays: 5 }),
  "/api/auth/send-otp":   JSON.stringify({ email: "test@traverse.com" }),
  "/api/auth/verify-otp": JSON.stringify({ email: "test@traverse.com", otp: "123456" }),
};

// ─── STATS ────────────────────────────────────────────────────
let totalRequests   = 0;
let successRequests = 0;
let failedRequests  = 0;
const latencies     = [];
const statusCodes   = {};
const endpointStats = {};

// ─── HTTP REQUEST ─────────────────────────────────────────────
function makeRequest(endpoint) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const parsed    = new url.URL(BASE_URL + endpoint.url);
    const isHttps   = parsed.protocol === "https:";
    const body      = endpoint.method === "POST" ? (POST_BODIES[endpoint.url] || "{}") : null;

    const options = {
      hostname: parsed.hostname,
      port:     parsed.port || (isHttps ? 443 : 80),
      path:     parsed.pathname + parsed.search,
      method:   endpoint.method,
      headers:  {
        "Content-Type":   "application/json",
        "Content-Length": body ? Buffer.byteLength(body) : 0,
        "User-Agent":     "Traverse-LoadTest/1.0",
        "Accept":         "application/json, text/html",
      },
      timeout: 5000,
    };

    const lib = isHttps ? https : http;
    const req = lib.request(options, (res) => {
      res.resume();
      const latency    = Date.now() - startTime;
      const statusCode = res.statusCode;
      totalRequests++;
      latencies.push(latency);
      statusCodes[statusCode] = (statusCodes[statusCode] || 0) + 1;
      if (!endpointStats[endpoint.label]) {
        endpointStats[endpoint.label] = { count: 0, total: 0, success: 0, failed: 0 };
      }
      endpointStats[endpoint.label].count++;
      endpointStats[endpoint.label].total += latency;
      if (statusCode >= 200 && statusCode < 400) { successRequests++; endpointStats[endpoint.label].success++; }
      else                                        { failedRequests++;  endpointStats[endpoint.label].failed++;  }
      resolve({ latency, status: statusCode });
    });

    req.on("error", () => {
      const latency = Date.now() - startTime;
      totalRequests++; failedRequests++;
      latencies.push(latency);
      statusCodes["ERR"] = (statusCodes["ERR"] || 0) + 1;
      if (!endpointStats[endpoint.label]) {
        endpointStats[endpoint.label] = { count: 0, total: 0, success: 0, failed: 0 };
      }
      endpointStats[endpoint.label].count++;
      endpointStats[endpoint.label].total += latency;
      endpointStats[endpoint.label].failed++;
      resolve({ latency, status: 0 });
    });
    req.on("timeout", () => req.destroy());
    if (body) req.write(body);
    req.end();
  });
}

// ─── HELPERS ─────────────────────────────────────────────────
function pct(sorted, p) {
  if (!sorted.length) return 0;
  return sorted[Math.max(0, Math.ceil((p / 100) * sorted.length) - 1)];
}
function avg(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

// ─── VIRTUAL USER ────────────────────────────────────────────
async function virtualUser(endTime) {
  let idx = Math.floor(Math.random() * ENDPOINTS.length);
  while (Date.now() < endTime) {
    await makeRequest(ENDPOINTS[idx % ENDPOINTS.length]);
    idx++;
  }
}

// ─── MAIN ────────────────────────────────────────────────────
async function runLoadTest() {
  const startTime = Date.now();
  const endTime   = startTime + DURATION * 1000;
  const lines     = [];
  const log = (l = "") => { console.log(l); lines.push(l); };

  log("Starting load test with settings:");
  log(`- Target Base URL: ${BASE_URL}`);
  log(`- Endpoints Tested: ${ENDPOINTS.length} routes`);
  log(`- Concurrency: ${CONCURRENCY} virtual users`);
  log(`- Duration: ${DURATION} seconds`);
  log(`- Saving report to: Vulnerability Test Results/api-load-test-latest.txt`);
  log("");

  // Start VU pool
  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) workers.push(virtualUser(endTime));

  // Progress ticks every 5s
  let lastSnap = 0;
  const ticker = setInterval(() => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const snap    = totalRequests;
    const window  = latencies.slice(lastSnap);
    const rps     = elapsed > 0 ? (snap / elapsed).toFixed(1) : "0.0";
    const avgLat  = window.length ? avg(window).toFixed(1) : "0.0";
    const line    = `[Progress] Elapsed: ${elapsed}s | Current RPS: ${rps} | Avg Latency: ${avgLat}ms | Total Requests: ${snap}`;
    console.log(line);
    lines.push(line);
    lastSnap = snap;
  }, 5000);

  await Promise.all(workers);
  clearInterval(ticker);

  const dur    = (Date.now() - startTime) / 1000;
  const sorted = [...latencies].sort((a, b) => a - b);
  const SEP    = "=".repeat(55);
  const DIV    = "-".repeat(55);

  log("");
  log("Stopping test, waiting for active requests to finish...");
  log("");
  log("================== LOAD TEST RESULTS ==================");
  log(`Target URL:        ${BASE_URL}`);
  log(`Total duration:    ${dur.toFixed(2)} seconds`);
  log(`Concurrency:       ${CONCURRENCY} virtual users`);
  log(DIV);
  log(`Total Requests Sent:    ${totalRequests}`);
  log(`Successful Requests:    ${successRequests}`);
  log(`Failed Requests:        ${failedRequests}`);
  log(`Requests / Sec (RPS):   ${(totalRequests / dur).toFixed(1)} req/sec`);
  log(DIV);
  log("Response Times:");
  log(`  Min:                  ${(sorted[0] ?? 0).toFixed(2)} ms`);
  log(`  Average:              ${avg(sorted).toFixed(2)} ms`);
  log(`  Max:                  ${(sorted[sorted.length - 1] ?? 0).toFixed(2)} ms`);
  log(`  50th Percentile (p50): ${pct(sorted, 50).toFixed(2)} ms`);
  log(`  90th Percentile (p90): ${pct(sorted, 90).toFixed(2)} ms`);
  log(`  95th Percentile (p95): ${pct(sorted, 95).toFixed(2)} ms`);
  log(`  99th Percentile (p99): ${pct(sorted, 99).toFixed(2)} ms`);
  log(DIV);
  log("Status / Error Codes Distribution:");
  for (const [code, count] of Object.entries(statusCodes).sort()) {
    log(`  ${code}: ${count} (${((count / (totalRequests || 1)) * 100).toFixed(1)}%)`);
  }
  log(SEP);

  // Per-endpoint breakdown
  const bLines = [
    "",
    "=".repeat(65),
    " PER-ENDPOINT BREAKDOWN",
    "=".repeat(65),
    `${"Endpoint".padEnd(30)} ${"Reqs".padStart(7)} ${"Avg(ms)".padStart(9)} ${"Success".padStart(8)} ${"Failed".padStart(7)}`,
    "-".repeat(65),
  ];
  for (const [label, s] of Object.entries(endpointStats)) {
    const a = s.count > 0 ? (s.total / s.count).toFixed(1) : "0.0";
    bLines.push(`${label.padEnd(30)} ${String(s.count).padStart(7)} ${(a + "ms").padStart(9)} ${String(s.success).padStart(8)} ${String(s.failed).padStart(7)}`);
  }
  bLines.push("=".repeat(65));

  bLines.forEach((l) => { console.log(l); lines.push(l); });

  // Save reports as plain text format (.txt)
  const dirs = [
    path.join(__dirname, "..", "reports"),
    path.join(__dirname, "..", "Vulnerability Test Results"),
    path.join(__dirname)
  ];
  dirs.forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

  const ts        = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const content   = lines.join("\n");

  fs.writeFileSync(path.join(dirs[0], `api-load-test-${ts}.txt`), content, "utf8");
  fs.writeFileSync(path.join(dirs[0], "api-load-test-latest.txt"), content, "utf8");
  fs.writeFileSync(path.join(dirs[0], "load_test_report.txt"), content, "utf8");
  fs.writeFileSync(path.join(dirs[1], "api-load-test-latest.txt"), content, "utf8");
  fs.writeFileSync(path.join(dirs[2], "load_test_report.txt"), content, "utf8");

  console.log(`\nReport saved to: ${path.join(dirs[0], "load_test_report.txt")}`);
  console.log(`Latest:          ${path.join(dirs[1], "api-load-test-latest.txt")}`);
}

// ─── Single-endpoint mode (--url flag) ───────────────────────
async function runSingleEndpoint() {
  const targetUrl = getArg("--url", null);
  if (!targetUrl) return false;

  const parsed   = new url.URL(targetUrl);
  const endpoint = {
    url:    parsed.pathname + parsed.search,
    method: getArg("--method", "GET").toUpperCase(),
    label:  parsed.pathname,
  };

  const startTime = Date.now();
  const endTime   = startTime + DURATION * 1000;
  const lines     = [];
  const log = (l = "") => { console.log(l); lines.push(l); };

  log("Starting load test with settings:");
  log(`- Target URL: ${targetUrl}`);
  log(`- Concurrency: ${CONCURRENCY} virtual users`);
  log(`- Duration: ${DURATION} seconds`);
  log(`- Saving report to: Vulnerability Test Results/${endpoint.label.replace(/\//g, "_").slice(1)}_load_test.txt`);
  log("");

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push((async () => {
      while (Date.now() < endTime) await makeRequest(endpoint);
    })());
  }

  let lastSnap = 0;
  const ticker = setInterval(() => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const snap    = totalRequests;
    const window  = latencies.slice(lastSnap);
    const rps     = elapsed > 0 ? (snap / elapsed).toFixed(1) : "0.0";
    const avgLat  = window.length ? avg(window).toFixed(1) : "0.0";
    const line    = `[Progress] Elapsed: ${elapsed}s | Current RPS: ${rps} | Avg Latency: ${avgLat}ms | Total Requests: ${snap}`;
    console.log(line); lines.push(line);
    lastSnap = snap;
  }, 5000);

  await Promise.all(workers);
  clearInterval(ticker);

  const dur    = (Date.now() - startTime) / 1000;
  const sorted = [...latencies].sort((a, b) => a - b);
  const SEP    = "=".repeat(50);
  const DIV    = "-".repeat(50);

  log("");
  log("Stopping test, waiting for active requests to finish...");
  log("");
  log(SEP);
  log("================ LOAD TEST RESULTS ================");
  log(SEP);
  log(`Target URL:             ${targetUrl}`);
  log(`Total duration:         ${dur.toFixed(2)} seconds`);
  log(`Concurrency:            ${CONCURRENCY} virtual users`);
  log(DIV);
  log(`Total Requests Sent:    ${totalRequests}`);
  log(`Successful Requests:    ${successRequests}`);
  log(`Failed Requests:        ${failedRequests}`);
  log(`Requests / Sec (RPS):   ${(totalRequests / dur).toFixed(1)} req/sec`);
  log(DIV);
  log("Response Times:");
  log(`  Min:                  ${(sorted[0] ?? 0).toFixed(2)} ms`);
  log(`  Average:              ${avg(sorted).toFixed(2)} ms`);
  log(`  Max:                  ${(sorted[sorted.length - 1] ?? 0).toFixed(2)} ms`);
  log(`  50th Percentile (p50): ${pct(sorted, 50).toFixed(2)} ms`);
  log(`  90th Percentile (p90): ${pct(sorted, 90).toFixed(2)} ms`);
  log(`  95th Percentile (p95): ${pct(sorted, 95).toFixed(2)} ms`);
  log(`  99th Percentile (p99): ${pct(sorted, 99).toFixed(2)} ms`);
  log(DIV);
  log("Status / Error Codes Distribution:");
  for (const [code, count] of Object.entries(statusCodes).sort()) {
    log(`  ${code}: ${count} (${((count / totalRequests) * 100).toFixed(1)}%)`);
  }
  log(SEP);

  if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });
  const slug       = endpoint.label.replace(/\//g, "_").slice(1) || "api";
  const reportPath = path.join(REPORT_DIR, `${slug}_load_test.txt`);
  fs.writeFileSync(reportPath, lines.join("\n"), "utf8");
  console.log(`\nReport saved to: ${reportPath}`);
  return true;
}

(async () => {
  const single = await runSingleEndpoint();
  if (!single) await runLoadTest();
})().catch((e) => { console.error("Load Test Error:", e.message); process.exit(1); });
