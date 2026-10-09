"""Remove the superseded transposed floor correction; canonical profiles own floors."""
from pathlib import Path
root = Path(__file__).resolve().parents[1]
path = root / 'public/campus-explorer/campus-data.js'
s = path.read_text(encoding='utf-8')
marker = '// 115 學年度平面圖校對'
if marker in s:
    start = s.index(marker)
    end = s.index('for(const building of BUILDINGS_CONFIG)', start)
    s = s[:start] + "// 樓層及固定空間由 spatial-plan-data.js 校對；保留縱棟與行政棟的通行間距。\nBUILDINGS_CONFIG.find(b=>b.id==='grade9-back').x=7.5;\n" + s[end:]
    path.write_text(s, encoding='utf-8')
