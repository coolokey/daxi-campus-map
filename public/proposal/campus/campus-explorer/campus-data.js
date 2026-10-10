const FH = 3.6; // Floor Height in meters

    const BUILDINGS_CONFIG = [
  // 1. 學生活動中心 / 體育館 (西南角)
  {
    id: "gym-bld",
    name: "學生活動中心 / 體育館",
    category: "sports",
    color: 0xd98a80,
    roofColor: 0x9e473e,
    x: -80, z: 58, width: 34, depth: 36, floors: 3,
    isGymSpecial: true,
    stairs: [
      { x: -65, z: 46, name: "活動中心南側雙圓柱梯", floors: 3 },
      { x: -65, z: 70, name: "活動中心北側雙圓柱梯", floors: 3 }
    ],
    rooms: [
      { id: "gym", code: "GYM-1", name: "活動中心大禮堂", floor: 1, node: "gym-1f-hall", cat: "sports" },
      { id: "fire-room", code: "GYM-F", name: "消防機房 (1F)", floor: 1, node: "gym-fire-1f", cat: "admin" },
      { id: "weight-room", code: "GYM-2", name: "體育重訓室 (2F)", floor: 2, node: "gym-stair-s-2f", cat: "sports" },
      { id: "gym-balcony", code: "GYM-3", name: "活動中心看台區 (3F)", floor: 3, node: "gym-stair-s-3f", cat: "sports" }
    ]
  },

  // 2. 資源回收室 (活動中心西側)
  {
    id: "recycle-bld",
    name: "資源回收室",
    category: "admin",
    color: 0xc8d6e5,
    roofColor: 0x576574,
    x: -106, z: 58, width: 14, depth: 16, floors: 1,
    stairs: [],
    rooms: [
      { id: "recycling", code: "REC-1", name: "資源回收室 (1F)", floor: 1, node: "recycle-1f", cat: "admin" }
    ]
  },

  // 3. 行政大樓 (前棟, 南橫棟)
  {
    id: "admin-front",
    name: "行政大樓 (前棟)",
    category: "admin",
    color: 0xecf0f1,
    roofColor: 0xd63031,
    hasPitchedRoof: true,
    x: -12, z: 44, width: 26, depth: 10, floors: 3,
    stairs: [
      { x: -22, z: 44, name: "行政前棟西側樓梯", floors: 3 },
      { x: -2, z: 44, name: "行政前棟東側樓梯", floors: 3 }
    ],
    rooms: [
      { id: "admin-g89-staff", code: "A1-01", name: "八、九年級導師室 (1F)", floor: 1, node: "admin-f-1f-w", cat: "admin" },
      { id: "spec-staff-1", code: "A1-02", name: "專任辦公室一 (1F)", floor: 1, node: "admin-f-1f-e", cat: "admin" },
      { id: "principal", code: "A2-01", name: "校長室 (2F)", floor: 2, node: "admin-f-2f-w", cat: "admin" },
      { id: "reception", code: "A2-02", name: "會客室 (2F)", floor: 2, node: "admin-f-2f-c", cat: "admin" },
      { id: "academic", code: "A2-03", name: "教務處 (2F)", floor: 2, node: "admin-f-2f-e", cat: "admin" },
      { id: "lang-lab", code: "A3-01", name: "語言教室 (3F)", floor: 3, node: "admin-f-3f-w", cat: "special" },
      { id: "spec-staff-3", code: "A3-02", name: "專任辦公室三 (3F)", floor: 3, node: "admin-f-3f-e", cat: "admin" }
    ]
  },

  // 4. 行政大樓 (後棟, 北橫棟)
  {
    id: "admin-back",
    name: "行政大樓 (後棟)",
    category: "admin",
    color: 0xecf0f1,
    roofColor: 0xd63031,
    hasPitchedRoof: true,
    x: -12, z: 20, width: 26, depth: 10, floors: 3,
    stairs: [
      { x: -22, z: 20, name: "行政後棟西側樓梯", floors: 3 },
      { x: -2, z: 20, name: "行政後棟東側樓梯", floors: 3 }
    ],
    rooms: [
      { id: "student-affairs", code: "B1-01", name: "學務處 (1F)", floor: 1, node: "admin-b-1f-w", cat: "admin" },
      { id: "coach-room", code: "B1-02", name: "教練室 (1F)", floor: 1, node: "admin-b-1f-c", cat: "sports" },
      { id: "weimei-room", code: "B1-03", name: "唯美教室 (1F)", floor: 1, node: "admin-b-1f-e", cat: "special" },
      { id: "general", code: "B2-01", name: "總務處 / 人事室 / 會計室 (2F)", floor: 2, node: "admin-b-2f-w", cat: "admin" },
      { id: "scout-judo", code: "B2-02", name: "童軍團部 / 柔道教室 (2F)", floor: 2, node: "admin-b-2f-e", cat: "sports" },
      { id: "spec-staff-back", code: "B3-01", name: "專任辦公室 (3F)", floor: 3, node: "admin-b-3f-w", cat: "admin" },
      { id: "teacher-study", code: "B3-02", name: "教師研習中心 (3F)", floor: 3, node: "admin-b-3f-e", cat: "admin" }
    ]
  },

  // 5. 健康中心 / 合作社棟 (中央教學區北橫棟)
  {
    id: "health-bld",
    name: "健康中心 / 合作社棟",
    category: "admin",
    color: 0xe8f4f8,
    roofColor: 0x0284c7,
    hasPitchedRoof: true,
    x: 12, z: -4, width: 28, depth: 9, floors: 2,
    stairs: [
      { x: 0, z: -4, name: "健康中心樓梯", floors: 2 }
    ],
    rooms: [
      { id: "health", code: "H1-01", name: "健康中心 (1F)", floor: 1, node: "health-1f-w", cat: "admin" },
      { id: "coop", code: "H1-02", name: "員生合作社 (1F)", floor: 1, node: "health-1f-e", cat: "admin" },
      { id: "pe-office", code: "H2-01", name: "體育組辦公室 (2F)", floor: 2, node: "health-2f-w", cat: "sports" },
      { id: "pe-storage", code: "H2-02", name: "體育器材儲藏室 (2F)", floor: 2, node: "health-2f-e", cat: "sports" }
    ]
  },

  // 6. 八年級教學棟 (南橫棟 / 幼兒園)
  {
    id: "grade8-front",
    name: "八年級教學棟 (南棟)",
    category: "grade8",
    color: 0xf3ede2,
    roofColor: 0xd63031,
    hasPitchedRoof: true,
    x: 16, z: 60, width: 44, depth: 10, floors: 3,
    stairs: [
      { x: -6, z: 60, name: "八年級西側半圓樓梯塔", floors: 3 },
      { x: 36, z: 60, name: "八年級東側樓梯", floors: 3 }
    ],
    rooms: [
      { id: "kindergarten", code: "8F1-K", name: "非營利幼兒園 (1F)", floor: 1, node: "g8f-1f-k", cat: "admin" },
      { id: "807", code: "8F2-807", name: "807 教室 (2F)", floor: 2, node: "g8f-2f-807", cat: "grade8" },
      { id: "801", code: "8F2-801", name: "801 教室 (2F)", floor: 2, node: "g8f-2f-801", cat: "grade8" },
      { id: "802", code: "8F2-802", name: "802 教室 (2F)", floor: 2, node: "g8f-2f-802", cat: "grade8" },
      { id: "803", code: "8F2-803", name: "803 教室 (2F)", floor: 2, node: "g8f-2f-803", cat: "grade8" },
      { id: "woodwork-front", code: "8F3-W", name: "木工專任教室 (3F)", floor: 3, node: "g8f-3f-wood", cat: "special" },
      { id: "806", code: "8F3-806", name: "806 教室 (3F)", floor: 3, node: "g8f-3f-806", cat: "grade8" },
      { id: "808", code: "8F3-808", name: "808 教室 (3F)", floor: 3, node: "g8f-3f-808", cat: "grade8" },
      { id: "boardgame", code: "8F3-BG", name: "桌遊益智教室 (3F)", floor: 3, node: "g8f-3f-bg", cat: "special" }
    ]
  },

  // 7. 九年級教學棟 (中央偏西縱向棟，直立南北向！)
  {
    id: "grade9-back",
    name: "九年級教學棟",
    category: "grade9",
    color: 0xebf5ee,
    roofColor: 0xd63031,
    hasPitchedRoof: true,
    x: 2, z: 28, width: 12, depth: 38, floors: 3,
    stairs: [
      { x: 2, z: 10, name: "九年級北側樓梯", floors: 3 },
      { x: 2, z: 46, name: "九年級南側樓梯", floors: 3 }
    ],
    rooms: [
      { id: "906", code: "9B1-906", name: "906 教室 (1F)", floor: 1, node: "g9-1f-906", cat: "grade9" },
      { id: "907", code: "9B1-907", name: "907 教室 (1F)", floor: 1, node: "g9-1f-907", cat: "grade9" },
      { id: "908", code: "9B1-908", name: "908 教室 (1F)", floor: 1, node: "g9-1f-908", cat: "grade9" },
      { id: "g9-clubs", code: "9B2-CLB", name: "綜合社團教室 (2F)", floor: 2, node: "g9-2f-clubs", cat: "special" },
      { id: "904", code: "9B2-904", name: "904 教室 (2F)", floor: 2, node: "g9-2f-904", cat: "grade9" },
      { id: "905", code: "9B2-905", name: "905 教室 (2F)", floor: 2, node: "g9-2f-905", cat: "grade9" },
      { id: "901", code: "9B3-901", name: "901 教室 (3F)", floor: 3, node: "g9-3f-901", cat: "grade9" },
      { id: "902", code: "9B3-902", name: "902 教室 (3F)", floor: 3, node: "g9-3f-902", cat: "grade9" },
      { id: "903", code: "9B3-903", name: "903 教室 (3F)", floor: 3, node: "g9-3f-903", cat: "grade9" }
    ]
  },

  // 8. 八年級中棟與專科教室 (中央偏東縱向棟，直立南北向！)
  {
    id: "grade8-mid",
    name: "八年級中棟 / 專科棟",
    category: "grade8",
    color: 0xf3ede2,
    roofColor: 0xd63031,
    hasPitchedRoof: true,
    x: 28, z: 28, width: 13, depth: 38, floors: 3,
    stairs: [
      { x: 28, z: 10, name: "八年級中棟北側樓梯", floors: 3 },
      { x: 28, z: 46, name: "八年級中棟南側樓梯", floors: 3 }
    ],
    rooms: [
      { id: "counseling-act", code: "8M1-C", name: "輔導活動空間 (1F)", floor: 1, node: "g8m-1f-counsel", cat: "special" },
      { id: "wood-craft-206", code: "8M1-W2", name: "木工傳承206 (1F)", floor: 1, node: "g8m-1f-wood206", cat: "special" },
      { id: "809", code: "8M1-809", name: "809 體育班 (1F)", floor: 1, node: "g8m-1f-809", cat: "grade8" },
      { id: "woodwork-1", code: "8M1-W", name: "大溪木藝教室 (1F)", floor: 1, node: "g8m-1f-wood", cat: "special" },
      { id: "math-research", code: "8M2-M", name: "數學領域研究室 (2F)", floor: 2, node: "g8m-2f-math-res", cat: "special" },
      { id: "805", code: "8M2-805", name: "805 教室 (2F)", floor: 2, node: "g8m-2f-805", cat: "grade8" },
      { id: "804", code: "8M2-804", name: "804 教室 (2F)", floor: 2, node: "g8m-2f-804", cat: "grade8" },
      { id: "native-lang", code: "8M3-NL", name: "本土語教室 (3F)", floor: 3, node: "g8m-3f-nl", cat: "special" },
      { id: "drama-room", code: "8M3-D", name: "表演藝術教室 (3F)", floor: 3, node: "g8m-3f-drama", cat: "special" },
      { id: "inter-disc", code: "8M3-ID", name: "跨領域教室 (3F)", floor: 3, node: "g8m-3f-inter", cat: "special" }
    ]
  },

  // 9. 七年級新大樓＋特教學習園地 (東北角橫向大樓，3層樓)
  {
    id: "new-grade7",
    name: "七年級新大樓與特教園地",
    category: "grade7",
    color: 0xe6f0f7,
    roofColor: 0x2b5b7a,
    x: 80, z: -58, width: 46, depth: 14, floors: 3,
    stairs: [
      { x: 60, z: -58, name: "七年級西側樓梯", floors: 3 },
      { x: 100, z: -58, name: "特教學習園地樓梯", floors: 3 }
    ],
    rooms: [
      { id: "fitness-room", code: "7N1-FIT", name: "體適能教室 (1F)", floor: 1, node: "new7-1f-fit", cat: "sports" },
      { id: "709", code: "7N1-709", name: "709 體育班 (1F)", floor: 1, node: "new7-1f-709", cat: "grade7" },
      { id: "701", code: "7N1-701", name: "701 教室 (1F)", floor: 1, node: "new7-1f-701", cat: "grade7" },
      { id: "resource-room", code: "7N1-RES", name: "資源班3/4教室 (1F)", floor: 1, node: "new7-1f-res", cat: "special" },
      { id: "704", code: "7N1-704", name: "704 教室 (1F)", floor: 1, node: "new7-1f-704", cat: "grade7" },
      { id: "708", code: "7N1-708", name: "708 教室 (1F)", floor: 1, node: "new7-1f-708", cat: "grade7" },
      { id: "702", code: "7N2-702", name: "702 教室 (2F)", floor: 2, node: "new7-2f-702", cat: "grade7" },
      { id: "703", code: "7N2-703", name: "703 教室 (2F)", floor: 2, node: "new7-2f-703", cat: "grade7" },
      { id: "sped-leader", code: "7N2-SPED", name: "特教教室二 (2F)", floor: 2, node: "new7-2f-sped-off", cat: "admin" },
      { id: "705", code: "7N2-705", name: "705 教室 (2F)", floor: 2, node: "new7-2f-705", cat: "grade7" },
      { id: "counseling", code: "7N2-COU", name: "輔導室 (2F)", floor: 2, node: "new7-2f-counseling", cat: "admin" },
      { id: "math-lab", code: "7N3-MATH", name: "數學名師研究室 (3F)", floor: 3, node: "new7-3f-math", cat: "special" },
      { id: "706", code: "7N3-706", name: "706 質數研究室 (3F)", floor: 3, node: "new7-3f-706", cat: "grade7" },
      { id: "707", code: "7N3-707", name: "707 教室 (3F)", floor: 3, node: "new7-3f-707", cat: "grade7" },
      { id: "sped-classroom", code: "7N3-CLS", name: "特教班教室 (3F)", floor: 3, node: "new7-3f-sped-cls", cat: "special" }
    ]
  },

  // 10. 綜合大樓 (含平面停車場與校史室)
  {
    id: "multi-building",
    name: "綜合大樓 / 圖書館",
    category: "special",
    color: 0xeeeaf2,
    roofColor: 0x5e3a73,
    x: 74, z: -23, width: 32, depth: 34, floors: 2,
    stairs: [
      { x: 62, z: -23, name: "綜合大樓樓梯", floors: 2 }
    ],
    rooms: [
      { id: "food-classroom", code: "MB1-F", name: "餐飲烹飪教室 (1F)", floor: 1, node: "multi-1f-food", cat: "special" },
      { id: "library", code: "MB1-LIB", name: "中央圖書室 Library (1F)", floor: 1, node: "multi-1f-lib", cat: "special" },
      { id: "history-room", code: "HST-1", name: "校史室 (1F)", floor: 1, node: "history-1f", cat: "admin" },
      { id: "collab-conf", code: "MB2-C", name: "特教協同會議室 (2F)", floor: 2, node: "multi-2f-conf", cat: "admin" },
      { id: "large-computer", code: "MB2-LPC", name: "大電腦多功能教室 (2F)", floor: 2, node: "multi-2f-lpc", cat: "special" },
      { id: "it-server", code: "MB2-SRV", name: "全校資訊機房 (2F)", floor: 2, node: "multi-2f-srv", cat: "admin" }
    ]
  },

  // 11. 科技館 (東側中棟，2層樓)
  {
    id: "tech-building",
    name: "科技館",
    category: "special",
    color: 0xe4f2ef,
    roofColor: 0x1b675e,
    x: 74, z: 12, width: 28, depth: 22, floors: 2,
    stairs: [
      { x: 62, z: 12, name: "科技館樓梯", floors: 2 }
    ],
    rooms: [
      { id: "audiovisual-1f", code: "TC1-AV", name: "視聽多媒體教室 (1F)", floor: 1, node: "tech-1f-av", cat: "special" },
      { id: "life-tech-1", code: "TC1-LT1", name: "生活科技教室一 (1F)", floor: 1, node: "tech-1f-lt1", cat: "special" },
      { id: "tech-smart", code: "TC1-SMT", name: "科技智慧教室 (1F)", floor: 1, node: "tech-1f-smart", cat: "special" },
      { id: "life-tech-2", code: "TC1-LT2", name: "生活科技教室二 (1F)", floor: 1, node: "tech-1f-lt2", cat: "special" },
      { id: "physics-lab", code: "TC2-PHY", name: "理化第一實驗室 (2F)", floor: 2, node: "tech-2f-phy", cat: "special" },
      { id: "computer-lab-1", code: "TC2-PC1", name: "第一電腦教室 (2F)", floor: 2, node: "tech-2f-pc1", cat: "special" },
      { id: "computer-lab-2", code: "TC2-PC2", name: "第二電腦教室 (2F)", floor: 2, node: "tech-2f-pc2", cat: "special" },
      { id: "maker-lab", code: "TC2-MK", name: "科教創作室 (2F)", floor: 2, node: "tech-2f-maker", cat: "special" }
    ]
  },

  // 12. 藝術館 (東側南棟，直立長條，4層樓)
  {
    id: "art-building",
    name: "藝術館",
    category: "special",
    color: 0xf8e9eb,
    roofColor: 0x82414f,
    x: 74, z: 46, width: 14, depth: 32, floors: 4,
    stairs: [
      { x: 68, z: 46, name: "藝術館主樓梯間", floors: 4 }
    ],
    rooms: [
      { id: "broadwood", code: "ART1-BW", name: "樂活體能教室 (1F)", floor: 1, node: "art-1f-bw", cat: "sports" },
      { id: "music-2f", code: "ART2-M1", name: "第一音樂教室 (2F)", floor: 2, node: "art-2f-m1", cat: "special" },
      { id: "music-3f", code: "ART3-M2", name: "第二音樂教室 (3F)", floor: 3, node: "art-3f-m2", cat: "special" },
      { id: "art-4f", code: "ART4-ART", name: "美術創作教室 (4F)", floor: 4, node: "art-4f-art", cat: "special" }
    ]
  }
];


// 樓層及固定空間由 spatial-plan-data.js 校對；保留縱棟與行政棟的通行間距。
BUILDINGS_CONFIG.find(b=>b.id==='grade9-back').x=7.5;
// 每棟屋頂採低彩度的獨立色調，保留同一校園的整體配色。
const BUILDING_ROOF_COLORS={
 'gym-bld':0x60756f,       // 灰綠
 'recycle-bld':0x64716b,   // 石灰綠
 'admin-front':0x873e39,   // 磚紅
 'admin-back':0x80504a,    // 暖陶紅
 'health-bld':0x59727a,    // 藍灰
 'grade8-front':0x90795a,  // 暖砂棕
 'grade9-back':0x7e8062,   // 橄欖棕
 'grade8-mid':0x8b7065,    // 陶土棕
 'new-grade7':0x526f79,    // 石板藍
 'multi-building':0x665c70,// 灰紫
 'tech-building':0x476c63, // 松綠
 'art-building':0x765c64  // 玫瑰灰
};
for(const building of BUILDINGS_CONFIG){
 building.color=building.isGymSpecial?0xb88d84:0xd0c9bd;
 building.roofColor=BUILDING_ROOF_COLORS[building.id]??building.roofColor;
}
