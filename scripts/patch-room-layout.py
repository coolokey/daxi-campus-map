"""Reapply classroom UI integration after the original scene is regenerated."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=root/'public/campus-explorer/index.html'
s=path.read_text(encoding='utf-8')
if 'room-layout.css' not in s:
 s=s.replace('</head>','<link rel="stylesheet" href="room-layout.css"></head>')
 s=s.replace('</body>','<script src="room-layout-model.js"></script>\n<script src="room-layout.js"></script>\n</body>')
 s=s.replace('開啟校園平面圖</span>','切換步行／鳥瞰</span>')
 path.write_text(s,encoding='utf-8')
path=root/'public/campus-explorer/explorer.js'
s=path.read_text(encoding='utf-8')
if 'function escapeRoomText' not in s:
 s=s.replace('    const searchInput =', '''    function escapeRoomText(value) {
      return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }
    const searchInput =''',1)
 s=s.replace('<b>${r.name}</b>','<b>${escapeRoomText(r.name)}</b>')
 s=s.replace('if (e.target.tagName === "INPUT") return;', 'if (e.target.closest("input,textarea,select,[contenteditable]")) return;')
 path.write_text(s,encoding='utf-8')
