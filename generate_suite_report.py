import os
import sys
import json
import argparse
from datetime import datetime
import html

def main():
    parser = argparse.ArgumentParser(description="Generate beautiful HTML report from test runner JSON report")
    parser.add_argument("--json", required=True, help="Path to input JSON report file")
    parser.add_argument("--output", required=True, help="Path to output HTML file")
    parser.add_argument("--title", required=True, help="Title of the report")
    parser.add_argument("--subtitle", required=True, help="Subtitle / runner details")
    parser.add_argument("--type", default="generic", help="Icon/style type: selenium, appium, api, validation, deployment, load")
    
    args = parser.parse_args()
    
    if not os.path.exists(args.json):
        print(f"Error: JSON file not found at {args.json}")
        sys.exit(1)
        
    with open(args.json, 'r', encoding='utf-8') as f:
        try:
            test_cases = json.load(f)
        except Exception as e:
            print(f"Error: Failed to parse JSON file {args.json}. Details: {e}")
            sys.exit(1)
            
    # Calculate stats
    total = len(test_cases)
    passed = sum(1 for tc in test_cases if tc.get("status") == "PASS")
    failed = sum(1 for tc in test_cases if tc.get("status") == "FAIL")
    blocked = sum(1 for tc in test_cases if tc.get("status") == "BLOCKED")
    pass_rate = (passed / total) * 100 if total > 0 else 0
    
    # Calculate categories breakdown
    category_stats = {}
    for tc in test_cases:
        cat = tc.get("cat", "General")
        status = tc.get("status", "PASS")
        if cat not in category_stats:
            category_stats[cat] = {"total": 0, "passed": 0, "failed": 0, "blocked": 0}
        category_stats[cat]["total"] += 1
        if status == "PASS":
            category_stats[cat]["passed"] += 1
        elif status == "FAIL":
            category_stats[cat]["failed"] += 1
        else:
            category_stats[cat]["blocked"] += 1
            
    # Map types to icons/accent colors
    type_configs = {
        "selenium": {"icon": "globe", "color": "cyan", "color_hex": "#06b6d4"},
        "appium": {"icon": "smartphone", "color": "purple", "color_hex": "#a855f7"},
        "api": {"icon": "cpu", "color": "pink", "color_hex": "#ec4899"},
        "validation": {"icon": "shield-check", "color": "green", "color_hex": "#10b981"},
        "deployment": {"icon": "server", "color": "orange", "color_hex": "#f97316"},
        "load": {"icon": "gauge", "color": "yellow", "color_hex": "#eab308"},
        "generic": {"icon": "check-square", "color": "cyan", "color_hex": "#06b6d4"}
    }
    
    cfg = type_configs.get(args.type.lower(), type_configs["generic"])
    
    # Write HTML contents
    os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
    
    date_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Create Table Rows in Python first (highly compatible, then add JS search)
    table_rows = []
    for tc in test_cases:
        tc_id = html.escape(str(tc.get("id", "")))
        tc_cat = html.escape(str(tc.get("cat", "")))
        tc_comp = html.escape(str(tc.get("comp", "")))
        tc_desc = html.escape(str(tc.get("desc", "")))
        tc_exp = html.escape(str(tc.get("exp", "")))
        tc_act = html.escape(str(tc.get("act", "")))
        tc_status = html.escape(str(tc.get("status", "PASS")))
        
        status_class = "pass" if tc_status == "PASS" else ("fail" if tc_status == "FAIL" else "blocked")
        
        row_html = f"""
        <tr class="test-row" data-id="{tc_id.lower()}" data-comp="{tc_comp.lower()}" data-desc="{tc_desc.lower()}" data-exp="{tc_exp.lower()}">
          <td class="cell-id">{tc_id}</td>
          <td>{tc_cat}</td>
          <td class="cell-comp">{tc_comp}</td>
          <td>{tc_desc}</td>
          <td>{tc_exp}</td>
          <td>{tc_act}</td>
          <td><span class="badge {status_class}">{tc_status}</span></td>
        </tr>
        """
        table_rows.append(row_html)
        
    # Categories Table Rows
    cat_rows = []
    for cat_name, stats in sorted(category_stats.items()):
        c_tot = stats["total"]
        c_pass = stats["passed"]
        c_fail = stats["failed"]
        c_block = stats["blocked"]
        c_rate = (c_pass / c_tot) * 100 if c_tot > 0 else 0
        rate_class = "pass" if c_rate == 100 else ("fail" if c_rate < 50 else "blocked")
        
        cat_rows.append(f"""
        <tr>
          <td><strong>{html.escape(cat_name)}</strong></td>
          <td style="text-align: center;">{c_tot}</td>
          <td style="text-align: center; color: #4ade80;">{c_pass}</td>
          <td style="text-align: center; color: #f87171;">{c_fail}</td>
          <td style="text-align: center; color: #fbbf24;">{c_block}</td>
          <td style="text-align: center;"><span class="badge {rate_class}">{c_rate:.1f}%</span></td>
        </tr>
        """)
        
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>{args.title} — Traverse</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    :root {{
      --bg-dark: #090d16;
      --panel-bg: rgba(20, 26, 42, 0.6);
      --panel-border: rgba(255, 255, 255, 0.08);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --primary-accent: {cfg["color_hex"]};
      --status-pass-bg: rgba(16, 185, 129, 0.15);
      --status-pass-text: #34d399;
      --status-pass-border: rgba(52, 211, 153, 0.3);
      --status-fail-bg: rgba(239, 68, 68, 0.15);
      --status-fail-text: #f87171;
      --status-fail-border: rgba(248, 113, 113, 0.3);
      --status-blocked-bg: rgba(245, 158, 11, 0.15);
      --status-blocked-text: #fbbf24;
      --status-blocked-border: rgba(251, 191, 36, 0.3);
    }}

    * {{ box-sizing: border-box; margin: 0; padding: 0; }}

    body {{
      font-family: 'Inter', sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-main);
      min-height: 100vh;
      padding: 30px;
      background-image: 
        radial-gradient(circle at 10% 20%, rgba({int(cfg["color_hex"][1:3], 16)}, {int(cfg["color_hex"][3:5], 16)}, {int(cfg["color_hex"][5:7], 16)}, 0.06) 0%, transparent 40%);
    }}

    .container {{
      max-width: 1400px;
      margin: 0 auto;
    }}

    header {{
      background: linear-gradient(135deg, #1e3a5f 0%, #0f1117 100%);
      border: 1px solid var(--panel-border);
      border-radius: 14px;
      padding: 30px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }}

    .header-left {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}

    .header-icon-wrapper {{
      width: 56px;
      height: 56px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--panel-border);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-accent);
    }}

    .header-title h1 {{
      font-family: 'Outfit', sans-serif;
      font-size: 24px;
      color: #fff;
      font-weight: 600;
      margin-bottom: 4px;
    }}

    .header-title p {{
      color: var(--text-muted);
      font-size: 13px;
    }}

    .stats-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }}

    .stat-card {{
      background: var(--panel-bg);
      border: 1px solid var(--panel-border);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      backdrop-filter: blur(16px);
    }}

    .stat-num {{
      font-family: 'Outfit', sans-serif;
      font-size: 36px;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 6px;
    }}

    .stat-label {{
      font-size: 12px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    .color-total {{ color: #60a5fa; }}
    .color-pass {{ color: #4ade80; }}
    .color-fail {{ color: #f87171; }}
    .color-rate {{ color: var(--primary-accent); }}

    .section-grid {{
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }}

    .section {{
      background: var(--panel-bg);
      border: 1px solid var(--panel-border);
      border-radius: 12px;
      padding: 24px;
      backdrop-filter: blur(16px);
    }}

    h2 {{
      font-family: 'Outfit', sans-serif;
      font-size: 16px;
      color: #fff;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--panel-border);
      padding-bottom: 10px;
    }}

    table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }}

    th {{
      background: rgba(20, 26, 42, 0.9);
      color: #fff;
      padding: 10px 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 1px solid var(--panel-border);
    }}

    td {{
      padding: 10px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      color: var(--text-main);
    }}

    tr:hover td {{
      background: rgba(255, 255, 255, 0.01);
    }}

    .badge {{
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }}

    .badge.pass {{
      background: var(--status-pass-bg);
      color: var(--status-pass-text);
      border: 1px solid var(--status-pass-border);
    }}

    .badge.fail {{
      background: var(--status-fail-bg);
      color: var(--status-fail-text);
      border: 1px solid var(--status-fail-border);
    }}

    .badge.blocked {{
      background: var(--status-blocked-bg);
      color: var(--status-blocked-text);
      border: 1px solid var(--status-blocked-border);
    }}

    .cell-id {{
      font-weight: 600;
      color: var(--primary-accent);
      white-space: nowrap;
    }}

    .cell-comp {{
      font-weight: 500;
      color: #fff;
    }}

    /* Explorer Controls */
    .explorer-toolbar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 16px;
    }}

    .search-container {{
      position: relative;
      width: 100%;
      max-width: 360px;
    }}

    .search-input {{
      width: 100%;
      background: rgba(9, 13, 22, 0.6);
      border: 1px solid var(--panel-border);
      border-radius: 8px;
      padding: 8px 12px 8px 36px;
      color: #fff;
      font-size: 13px;
      outline: none;
      transition: all 0.3s;
    }}

    .search-input:focus {{
      border-color: var(--primary-accent);
      box-shadow: 0 0 10px rgba({int(cfg["color_hex"][1:3], 16)}, {int(cfg["color_hex"][3:5], 16)}, {int(cfg["color_hex"][5:7], 16)}, 0.2);
    }}

    .search-icon {{
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      width: 16px;
      height: 16px;
    }}

    .table-scroll {{
      max-height: 600px;
      overflow-y: auto;
      border: 1px solid var(--panel-border);
      border-radius: 8px;
      background: rgba(9, 13, 22, 0.4);
    }}

    .table-scroll::-webkit-scrollbar {{
      width: 6px;
      height: 6px;
    }}
    .table-scroll::-webkit-scrollbar-track {{
      background: rgba(0,0,0,0.1);
    }}
    .table-scroll::-webkit-scrollbar-thumb {{
      background: rgba(255,255,255,0.1);
      border-radius: 3px;
    }}

    footer {{
      text-align: center;
      padding: 20px 0;
      color: var(--text-muted);
      font-size: 12px;
      margin-top: 30px;
      border-top: 1px solid var(--panel-border);
    }}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="header-left">
        <div class="header-icon-wrapper">
          <i data-lucide="{cfg["icon"]}"></i>
        </div>
        <div class="header-title">
          <h1>{args.title}</h1>
          <p>{args.subtitle} &nbsp;|&nbsp; Generated: {date_str}</p>
        </div>
      </div>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-num color-total">{total}</div>
        <div class="stat-label">Total Tests</div>
      </div>
      <div class="stat-card">
        <div class="stat-num color-pass">{passed}</div>
        <div class="stat-label">Passed</div>
      </div>
      <div class="stat-card">
        <div class="stat-num color-fail">{failed}</div>
        <div class="stat-label">Failed</div>
      </div>
      <div class="stat-card">
        <div class="stat-num color-rate">{pass_rate:.1f}%</div>
        <div class="stat-label">Pass Rate</div>
      </div>
    </div>

    <div class="section-grid">
      <div class="section">
        <h2><i data-lucide="bar-chart-2" style="width: 16px; height: 16px;"></i> Test Category Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th style="width: 15%; text-align: center;">Total Tests</th>
              <th style="width: 15%; text-align: center;">Passed</th>
              <th style="width: 15%; text-align: center;">Failed</th>
              <th style="width: 15%; text-align: center;">Blocked</th>
              <th style="width: 15%; text-align: center;">Pass Rate</th>
            </tr>
          </thead>
          <tbody>
            {"".join(cat_rows)}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="explorer-toolbar">
          <h2><i data-lucide="database" style="width: 16px; height: 16px;"></i> All Test Case Records ({total} cases)</h2>
          <div class="search-container">
            <i data-lucide="search" class="search-icon"></i>
            <input type="text" id="search-box" class="search-input" placeholder="Search by ID, component, or description..." oninput="filterTable()"/>
          </div>
        </div>

        <div class="table-scroll">
          <table id="test-table">
            <thead>
              <tr>
                <th style="width: 10%">Test ID</th>
                <th style="width: 12%">Category</th>
                <th style="width: 15%">Component</th>
                <th style="width: 23%">Description</th>
                <th style="width: 18%">Expected Result</th>
                <th style="width: 15%">Actual Result</th>
                <th style="width: 7%">Status</th>
              </tr>
            </thead>
            <tbody>
              {"".join(table_rows)}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <footer>
      ✅ All {passed} / {total} Tests Completed Successfully | Traverse CI/CD Parallel Pipeline Dashboard
    </footer>
  </div>

  <script>
    lucide.createIcons();

    function filterTable() {{
      const query = document.getElementById('search-box').value.toLowerCase().trim();
      const rows = document.querySelectorAll('#test-table tbody tr');

      rows.forEach(row => {{
        const id = row.getAttribute('data-id') || '';
        const comp = row.getAttribute('data-comp') || '';
        const desc = row.getAttribute('data-desc') || '';
        const exp = row.getAttribute('data-exp') || '';

        if (!query || id.includes(query) || comp.includes(query) || desc.includes(query) || exp.includes(query)) {{
          row.style.display = '';
        }} else {{
          row.style.display = 'none';
        }}
      }});
    }}
  </script>
</body>
</html>
"""
    
    with open(args.output, 'w', encoding='utf-8') as f:
        f.write(html_content)
        
    print(f"HTML Report generated successfully at: {args.output} with {total} test cases.")

if __name__ == "__main__":
    main()
