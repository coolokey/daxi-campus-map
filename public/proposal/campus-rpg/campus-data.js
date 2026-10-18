// 桃園市立大溪國中 115 學年度 · 真實版 RPG 校園導覽資料庫
// 依據 115 學年度平面圖、空拍實景與 3D 智慧導覽編纂而成

window.CampusRpgData = {
  schoolYear: 115,
  schoolName: "桃園市立大溪國民中學",
  worldBounds: { width: 1920, height: 1080 },
  spawnPoint: { x: 1530, y: 920 },
  buildings: [
  {
    "id": "gym-bld",
    "title": "學生活動中心 / 體育館",
    "subtitle": "體育館・1F 大禮堂 / 2F 看台",
    "category": "sports",
    "stories": "1F–2F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 720,
      "y": 610,
      "w": 220,
      "h": 160
    },
    "entrance": {
      "x": 900,
      "y": 670
    },
    "roofStyle": "gym-dome",
    "color": "#b58c82",
    "roofColor": "#60756f",
    "photoKey": "stage",
    "note": "活動中心開放 1F 大禮堂、消防機房與桌球區；2F 為挑空階梯看台。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "gym-bld:GYM-1",
            "name": "活動中心大禮堂 (1F)",
            "spaceCode": "GYM-1",
            "x": 40.0,
            "y": 40,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 240.0,
              "y": 200
            }
          },
          {
            "id": "gym-bld:GYM-F",
            "name": "消防機房 (1F)",
            "spaceCode": "GYM-F",
            "x": 450.0,
            "y": 40,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 650.0,
              "y": 200
            }
          },
          {
            "id": "gym-bld:GYM-2",
            "name": "活動中心看台區 (2F)",
            "spaceCode": "GYM-2",
            "x": 40.0,
            "y": 320,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 240.0,
              "y": 320
            }
          },
          {
            "id": "gym-bld:GYM-3",
            "name": "活動中心看台區 (3F)",
            "spaceCode": "GYM-3",
            "x": 450.0,
            "y": 320,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 650.0,
              "y": 320
            }
          }
        ]
      }
    }
  },
  {
    "id": "recycle-bld",
    "title": "資源回收室",
    "subtitle": "環保分類站 (1F)",
    "category": "admin",
    "stories": "1F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 650,
      "y": 720,
      "w": 80,
      "h": 60
    },
    "entrance": {
      "x": 700,
      "y": 720
    },
    "roofStyle": "modern-brick",
    "color": "#b8c1c0",
    "roofColor": "#64716b",
    "photoKey": null,
    "note": "校園環保分類與資源永續再利用中心。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "recycle-bld:REC-1",
            "name": "資源回收室 (1F)",
            "spaceCode": "REC-1",
            "x": 40.0,
            "y": 40,
            "w": 810.0,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 200
            }
          }
        ]
      }
    }
  },
  {
    "id": "admin-front",
    "title": "行政大樓 (前棟 / 崇德樓)",
    "subtitle": "1F 導師室 · 2F 校長室/教務處 · 3F 語言教室",
    "category": "admin",
    "stories": "1F–3F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 970,
      "y": 480,
      "w": 100,
      "h": 80
    },
    "entrance": {
      "x": 980,
      "y": 550
    },
    "roofStyle": "red-tile",
    "color": "#c7c4b9",
    "roofColor": "#873e39",
    "photoKey": "adminFront",
    "note": "正面迎向中央穿堂與蔣公銅像庭園，1F 為中央穿堂與導師室，2F 為校長室與教務處，3F 為語言教室。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "admin-front:ADM-F-1",
            "name": "八、九年級導師室 (1F)",
            "spaceCode": "ADM-F-1",
            "x": 40.0,
            "y": 40,
            "w": 263.3333333333333,
            "h": 160,
            "door": {
              "x": 171.66666666666666,
              "y": 200
            }
          },
          {
            "id": "admin-front:ADM-F-2W",
            "name": "校長室 (2F)",
            "spaceCode": "ADM-F-2W",
            "x": 313.3333333333333,
            "y": 40,
            "w": 263.3333333333333,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 200
            }
          },
          {
            "id": "admin-front:ADM-F-2C",
            "name": "油印室 (2F)",
            "spaceCode": "ADM-F-2C",
            "x": 586.6666666666666,
            "y": 40,
            "w": 263.3333333333333,
            "h": 160,
            "door": {
              "x": 718.3333333333333,
              "y": 200
            }
          },
          {
            "id": "admin-front:ADM-F-2E",
            "name": "教務處 (2F)",
            "spaceCode": "ADM-F-2E",
            "x": 40.0,
            "y": 320,
            "w": 263.3333333333333,
            "h": 160,
            "door": {
              "x": 171.66666666666666,
              "y": 320
            }
          },
          {
            "id": "admin-front:ADM-F-3W",
            "name": "語言教室 (3F)",
            "spaceCode": "ADM-F-3W",
            "x": 313.3333333333333,
            "y": 320,
            "w": 263.3333333333333,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 320
            }
          },
          {
            "id": "admin-front:ADM-F-3E",
            "name": "專任辦公室三 (3F)",
            "spaceCode": "ADM-F-3E",
            "x": 586.6666666666666,
            "y": 320,
            "w": 263.3333333333333,
            "h": 160,
            "door": {
              "x": 718.3333333333333,
              "y": 320
            }
          }
        ]
      }
    }
  },
  {
    "id": "admin-back",
    "title": "行政大樓 (後棟)",
    "subtitle": "1F 學務處 · 2F 總務/會計 · 3F 專任辦公室",
    "category": "admin",
    "stories": "1F–3F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 960,
      "y": 440,
      "w": 90,
      "h": 50
    },
    "entrance": {
      "x": 1020,
      "y": 480
    },
    "roofStyle": "red-tile",
    "color": "#c7c4b9",
    "roofColor": "#80504a",
    "photoKey": "adminGallery",
    "note": "緊鄰前棟，兩棟以雙層連通廊相接。1F 為學務處與教練室，2F 為總務處與人事會計，3F 為教師研習中心。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "admin-back:ADM-B-1W",
            "name": "學務處 (1F)",
            "spaceCode": "ADM-B-1W",
            "x": 40.0,
            "y": 40,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 137.5,
              "y": 200
            }
          },
          {
            "id": "admin-back:ADM-B-1C",
            "name": "學務處（西側辦公區） (1F)",
            "spaceCode": "ADM-B-1C",
            "x": 245.0,
            "y": 40,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 342.5,
              "y": 200
            }
          },
          {
            "id": "admin-back:ADM-B-1E1",
            "name": "會客室 (1F)",
            "spaceCode": "ADM-B-1E1",
            "x": 450.0,
            "y": 40,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 547.5,
              "y": 200
            }
          },
          {
            "id": "admin-back:ADM-B-1E2",
            "name": "教練室 (1F)",
            "spaceCode": "ADM-B-1E2",
            "x": 655.0,
            "y": 40,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 752.5,
              "y": 200
            }
          },
          {
            "id": "admin-back:ADM-B-2W",
            "name": "總務處 / 人事室 / 會計室 (2F)",
            "spaceCode": "ADM-B-2W",
            "x": 40.0,
            "y": 320,
            "w": 263.3333333333333,
            "h": 160,
            "door": {
              "x": 171.66666666666666,
              "y": 320
            }
          },
          {
            "id": "admin-back:ADM-B-3W",
            "name": "專任辦公室 (3F)",
            "spaceCode": "ADM-B-3W",
            "x": 313.3333333333333,
            "y": 320,
            "w": 263.3333333333333,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 320
            }
          },
          {
            "id": "admin-back:ADM-B-3E",
            "name": "教師研習中心 (3F)",
            "spaceCode": "ADM-B-3E",
            "x": 586.6666666666666,
            "y": 320,
            "w": 263.3333333333333,
            "h": 160,
            "door": {
              "x": 718.3333333333333,
              "y": 320
            }
          }
        ]
      }
    }
  },
  {
    "id": "health-bld",
    "title": "健康中心 / 合作社棟",
    "subtitle": "1F 健康中心/員生合作社 · 2F 體育組",
    "category": "admin",
    "stories": "1F–2F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 1000,
      "y": 410,
      "w": 70,
      "h": 45
    },
    "entrance": {
      "x": 1020,
      "y": 445
    },
    "roofStyle": "red-tile",
    "color": "#b9c7c3",
    "roofColor": "#59727a",
    "photoKey": null,
    "note": "中央教學區北橫棟，1F 提供保健照護與學生日常生活補給，2F 為體育器材室。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "health-bld:511",
            "name": "511 健康中心 (1F)",
            "spaceCode": "511",
            "x": 40.0,
            "y": 40,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 240.0,
              "y": 200
            }
          },
          {
            "id": "health-bld:512",
            "name": "512 員生合作社 (1F)",
            "spaceCode": "512",
            "x": 450.0,
            "y": 40,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 650.0,
              "y": 200
            }
          },
          {
            "id": "health-bld:521",
            "name": "521 檔案室 (2F)",
            "spaceCode": "521",
            "x": 40.0,
            "y": 320,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 240.0,
              "y": 320
            }
          },
          {
            "id": "health-bld:522",
            "name": "522 檔案室 (2F)",
            "spaceCode": "522",
            "x": 450.0,
            "y": 320,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 650.0,
              "y": 320
            }
          }
        ]
      }
    }
  },
  {
    "id": "grade8-front",
    "title": "八年級教學棟 (南棟 / 敦品樓)",
    "subtitle": "1F 幼兒園 · 2F 801-807 · 3F 木工/桌遊",
    "category": "grade8",
    "stories": "1F–3F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 1100,
      "y": 490,
      "w": 160,
      "h": 70
    },
    "entrance": {
      "x": 1120,
      "y": 550
    },
    "roofStyle": "red-tile",
    "color": "#c8c4b7",
    "roofColor": "#90795a",
    "photoKey": null,
    "note": "八年級一般教室群，南棟西側設有半圓景觀樓梯塔，3F 設有木工與益智桌遊特色教室。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "grade8-front:411–414",
            "name": "非營利幼兒園 (1F)",
            "spaceCode": "411–414",
            "x": 40.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 117.0,
              "y": 200
            }
          },
          {
            "id": "grade8-front:421",
            "name": "807 教室 (2F)",
            "spaceCode": "421",
            "x": 204.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 281.0,
              "y": 200
            }
          },
          {
            "id": "grade8-front:422",
            "name": "801 教室 (2F)",
            "spaceCode": "422",
            "x": 368.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 200
            }
          },
          {
            "id": "grade8-front:423",
            "name": "802 教室 (2F)",
            "spaceCode": "423",
            "x": 532.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 609.0,
              "y": 200
            }
          },
          {
            "id": "grade8-front:424",
            "name": "803 教室 (2F)",
            "spaceCode": "424",
            "x": 696.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 773.0,
              "y": 200
            }
          },
          {
            "id": "grade8-front:431",
            "name": "本土語教室 (3F)",
            "spaceCode": "431",
            "x": 40.0,
            "y": 320,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 137.5,
              "y": 320
            }
          },
          {
            "id": "grade8-front:432",
            "name": "806 教室 (3F)",
            "spaceCode": "432",
            "x": 245.0,
            "y": 320,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 342.5,
              "y": 320
            }
          },
          {
            "id": "grade8-front:433",
            "name": "808 教室 (3F)",
            "spaceCode": "433",
            "x": 450.0,
            "y": 320,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 547.5,
              "y": 320
            }
          },
          {
            "id": "grade8-front:434",
            "name": "桌遊教室 (3F)",
            "spaceCode": "434",
            "x": 655.0,
            "y": 320,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 752.5,
              "y": 320
            }
          }
        ]
      }
    }
  },
  {
    "id": "grade9-back",
    "title": "九年級教學棟 (自強樓)",
    "subtitle": "1F 906-908 · 2F 904-905 · 3F 901-903",
    "category": "grade9",
    "stories": "1F–3F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 1050,
      "y": 440,
      "w": 70,
      "h": 60
    },
    "entrance": {
      "x": 1070,
      "y": 490
    },
    "roofStyle": "red-tile",
    "color": "#c1c8ba",
    "roofColor": "#7e8062",
    "photoKey": null,
    "note": "南北縱向大樓，為九年級會考衝刺重要學習天地，2F 另設有社團活動空間。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "grade9-back:213",
            "name": "906 教室 (1F)",
            "spaceCode": "213",
            "x": 40.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 117.0,
              "y": 200
            }
          },
          {
            "id": "grade9-back:212",
            "name": "907 教室 (1F)",
            "spaceCode": "212",
            "x": 204.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 281.0,
              "y": 200
            }
          },
          {
            "id": "grade9-back:211",
            "name": "908 教室 (1F)",
            "spaceCode": "211",
            "x": 368.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 200
            }
          },
          {
            "id": "grade9-back:223",
            "name": "社團教室一 (2F)",
            "spaceCode": "223",
            "x": 532.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 609.0,
              "y": 200
            }
          },
          {
            "id": "grade9-back:222",
            "name": "904 教室 (2F)",
            "spaceCode": "222",
            "x": 696.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 773.0,
              "y": 200
            }
          },
          {
            "id": "grade9-back:221",
            "name": "905 教室 (2F)",
            "spaceCode": "221",
            "x": 40.0,
            "y": 320,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 137.5,
              "y": 320
            }
          },
          {
            "id": "grade9-back:233",
            "name": "901 教室 (3F)",
            "spaceCode": "233",
            "x": 245.0,
            "y": 320,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 342.5,
              "y": 320
            }
          },
          {
            "id": "grade9-back:232",
            "name": "902 教室 (3F)",
            "spaceCode": "232",
            "x": 450.0,
            "y": 320,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 547.5,
              "y": 320
            }
          },
          {
            "id": "grade9-back:231",
            "name": "903 教室 (3F)",
            "spaceCode": "231",
            "x": 655.0,
            "y": 320,
            "w": 195.0,
            "h": 160,
            "door": {
              "x": 752.5,
              "y": 320
            }
          }
        ]
      }
    }
  },
  {
    "id": "grade8-mid",
    "title": "八年級中棟 / 專科棟",
    "subtitle": "1F 大溪木藝教室 · 2F 數學領域 · 3F 表藝/跨領域",
    "category": "grade8",
    "stories": "1F–3F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 1120,
      "y": 420,
      "w": 80,
      "h": 60
    },
    "entrance": {
      "x": 1140,
      "y": 470
    },
    "roofStyle": "red-tile",
    "color": "#c8c4b7",
    "roofColor": "#8b7065",
    "photoKey": null,
    "note": "大溪國中特色木工傳承中心所在地，1F 設有現代化大溪木藝教室與輕艇隊訓練室。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "grade8-mid:315",
            "name": "體育器材室 (1F)",
            "spaceCode": "315",
            "x": 40.0,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 93.57142857142857,
              "y": 200
            }
          },
          {
            "id": "grade8-mid:314",
            "name": "輕艇隊訓練室 (1F)",
            "spaceCode": "314",
            "x": 157.14285714285714,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 210.71428571428572,
              "y": 200
            }
          },
          {
            "id": "grade8-mid:313",
            "name": "909 教室 (1F)",
            "spaceCode": "313",
            "x": 274.2857142857143,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 327.85714285714283,
              "y": 200
            }
          },
          {
            "id": "grade8-mid:312",
            "name": "木藝教室 (1F)",
            "spaceCode": "312",
            "x": 391.42857142857144,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 200
            }
          },
          {
            "id": "grade8-mid:311",
            "name": "木藝教室 (1F)",
            "spaceCode": "311",
            "x": 508.57142857142856,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 562.1428571428571,
              "y": 200
            }
          },
          {
            "id": "grade8-mid:325",
            "name": "志工／校友辦公室 (2F)",
            "spaceCode": "325",
            "x": 625.7142857142857,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 679.2857142857142,
              "y": 200
            }
          },
          {
            "id": "grade8-mid:324",
            "name": "訓育設備及器材室 (2F)",
            "spaceCode": "324",
            "x": 742.8571428571429,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 796.4285714285714,
              "y": 200
            }
          },
          {
            "id": "grade8-mid:323",
            "name": "教學設備器材室 (2F)",
            "spaceCode": "323",
            "x": 40.0,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 93.57142857142857,
              "y": 320
            }
          },
          {
            "id": "grade8-mid:322",
            "name": "805 教室 (2F)",
            "spaceCode": "322",
            "x": 157.14285714285714,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 210.71428571428572,
              "y": 320
            }
          },
          {
            "id": "grade8-mid:321",
            "name": "804 教室 (2F)",
            "spaceCode": "321",
            "x": 274.2857142857143,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 327.85714285714283,
              "y": 320
            }
          },
          {
            "id": "grade8-mid:335",
            "name": "生涯發展教室 (3F)",
            "spaceCode": "335",
            "x": 391.42857142857144,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 320
            }
          },
          {
            "id": "grade8-mid:333–334",
            "name": "表藝教室 (3F)",
            "spaceCode": "333–334",
            "x": 508.57142857142856,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 562.1428571428571,
              "y": 320
            }
          },
          {
            "id": "grade8-mid:332",
            "name": "教材製作室 (3F)",
            "spaceCode": "332",
            "x": 625.7142857142857,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 679.2857142857142,
              "y": 320
            }
          },
          {
            "id": "grade8-mid:331",
            "name": "809 教室 (3F)",
            "spaceCode": "331",
            "x": 742.8571428571429,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 796.4285714285714,
              "y": 320
            }
          }
        ]
      }
    }
  },
  {
    "id": "new-grade7",
    "title": "七年級新大樓與特教園地 (勤學樓)",
    "subtitle": "1F 701/體適能 · 2F 702-705 · 3F 706-708",
    "category": "grade7",
    "stories": "1F–3F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 1070,
      "y": 280,
      "w": 120,
      "h": 60
    },
    "entrance": {
      "x": 1130,
      "y": 330
    },
    "roofStyle": "modern-flat",
    "color": "#bcc6cb",
    "roofColor": "#91968f",
    "photoKey": null,
    "note": "現代化校舍，採防震新工法與平屋頂設計，包含七年級教室、特教班園地與體適能中心。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "new-grade7:A12",
            "name": "709 體育班 (1F)",
            "spaceCode": "A12",
            "x": 40.0,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 93.57142857142857,
              "y": 200
            }
          },
          {
            "id": "new-grade7:A13",
            "name": "701 教室 (1F)",
            "spaceCode": "A13",
            "x": 157.14285714285714,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 210.71428571428572,
              "y": 200
            }
          },
          {
            "id": "new-grade7:A14",
            "name": "資源班 3／4 教室 (1F)",
            "spaceCode": "A14",
            "x": 274.2857142857143,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 327.85714285714283,
              "y": 200
            }
          },
          {
            "id": "new-grade7:A15",
            "name": "特教教室 2 (1F)",
            "spaceCode": "A15",
            "x": 391.42857142857144,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 200
            }
          },
          {
            "id": "new-grade7:A21",
            "name": "家長會辦公室 (2F)",
            "spaceCode": "A21",
            "x": 508.57142857142856,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 562.1428571428571,
              "y": 200
            }
          },
          {
            "id": "new-grade7:A22",
            "name": "702 教室 (2F)",
            "spaceCode": "A22",
            "x": 625.7142857142857,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 679.2857142857142,
              "y": 200
            }
          },
          {
            "id": "new-grade7:A23",
            "name": "703 教室 (2F)",
            "spaceCode": "A23",
            "x": 742.8571428571429,
            "y": 40,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 796.4285714285714,
              "y": 200
            }
          },
          {
            "id": "new-grade7:A24",
            "name": "704 教室 (2F)",
            "spaceCode": "A24",
            "x": 40.0,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 93.57142857142857,
              "y": 320
            }
          },
          {
            "id": "new-grade7:A25",
            "name": "705 教室 (2F)",
            "spaceCode": "A25",
            "x": 157.14285714285714,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 210.71428571428572,
              "y": 320
            }
          },
          {
            "id": "new-grade7:A31",
            "name": "教師會辦公室 (3F)",
            "spaceCode": "A31",
            "x": 274.2857142857143,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 327.85714285714283,
              "y": 320
            }
          },
          {
            "id": "new-grade7:A32",
            "name": "706 教室 (3F)",
            "spaceCode": "A32",
            "x": 391.42857142857144,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 320
            }
          },
          {
            "id": "new-grade7:A33",
            "name": "707 教室 (3F)",
            "spaceCode": "A33",
            "x": 508.57142857142856,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 562.1428571428571,
              "y": 320
            }
          },
          {
            "id": "new-grade7:A34",
            "name": "708 教室 (3F)",
            "spaceCode": "A34",
            "x": 625.7142857142857,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 679.2857142857142,
              "y": 320
            }
          },
          {
            "id": "new-grade7:A35",
            "name": "七年級導師室 (3F)",
            "spaceCode": "A35",
            "x": 742.8571428571429,
            "y": 320,
            "w": 107.14285714285714,
            "h": 160,
            "door": {
              "x": 796.4285714285714,
              "y": 320
            }
          }
        ]
      }
    }
  },
  {
    "id": "multi-building",
    "title": "綜合大樓 / 圖書館",
    "subtitle": "1F 中央圖書室/校史室 · 2F 大電腦教室/機房",
    "category": "special",
    "stories": "1F–2F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 1140,
      "y": 330,
      "w": 90,
      "h": 60
    },
    "entrance": {
      "x": 1180,
      "y": 380
    },
    "roofStyle": "red-tile",
    "color": "#c6c1cb",
    "roofColor": "#665c70",
    "photoKey": null,
    "note": "全校閱讀與數位學習中樞，1F 圖書室藏書豐富並設有校史文物專區，2F 為資訊機房與大電腦教室。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "multi-building:615",
            "name": "餐飲教室 (1F)",
            "spaceCode": "615",
            "x": 40.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 117.0,
              "y": 200
            }
          },
          {
            "id": "multi-building:611",
            "name": "圖書室 (1F)",
            "spaceCode": "611",
            "x": 204.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 281.0,
              "y": 200
            }
          },
          {
            "id": "multi-building:614",
            "name": "特教班 (1F)",
            "spaceCode": "614",
            "x": 368.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 200
            }
          },
          {
            "id": "multi-building:613",
            "name": "特教辦公室 (1F)",
            "spaceCode": "613",
            "x": 532.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 609.0,
              "y": 200
            }
          },
          {
            "id": "multi-building:612",
            "name": "資源班 1／2 教室 (1F)",
            "spaceCode": "612",
            "x": 696.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 773.0,
              "y": 200
            }
          },
          {
            "id": "multi-building:HST-1",
            "name": "校史室 (1F)",
            "spaceCode": "HST-1",
            "x": 40.0,
            "y": 320,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 117.0,
              "y": 320
            }
          },
          {
            "id": "multi-building:621",
            "name": "大電腦教室 (2F)",
            "spaceCode": "621",
            "x": 204.0,
            "y": 320,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 281.0,
              "y": 320
            }
          },
          {
            "id": "multi-building:622",
            "name": "資訊機房 (2F)",
            "spaceCode": "622",
            "x": 368.0,
            "y": 320,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 320
            }
          },
          {
            "id": "multi-building:623",
            "name": "諮商會議室 (2F)",
            "spaceCode": "623",
            "x": 532.0,
            "y": 320,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 609.0,
              "y": 320
            }
          },
          {
            "id": "multi-building:624",
            "name": "輔導室 (2F)",
            "spaceCode": "624",
            "x": 696.0,
            "y": 320,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 773.0,
              "y": 320
            }
          }
        ]
      }
    }
  },
  {
    "id": "tech-building",
    "title": "科技館",
    "subtitle": "1F 視聽/生科教室 · 2F 理化第一實驗室/電腦教室",
    "category": "special",
    "stories": "1F–2F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 1220,
      "y": 370,
      "w": 90,
      "h": 60
    },
    "entrance": {
      "x": 1260,
      "y": 420
    },
    "roofStyle": "red-tile",
    "color": "#bcc9c2",
    "roofColor": "#476c63",
    "photoKey": null,
    "note": "科學探究與生活科技創客基地，1F 為生活科技一二及多媒體教室，2F 為理化第一實驗室與電腦二。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "tech-building:TC-NW-1",
            "name": "視聽教室 (1F)",
            "spaceCode": "TC-NW-1",
            "x": 40.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 117.0,
              "y": 200
            }
          },
          {
            "id": "tech-building:TC-N-1",
            "name": "生科教室一 (1F)",
            "spaceCode": "TC-N-1",
            "x": 204.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 281.0,
              "y": 200
            }
          },
          {
            "id": "tech-building:TC-SW-1",
            "name": "生物實驗室 (1F)",
            "spaceCode": "TC-SW-1",
            "x": 368.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 200
            }
          },
          {
            "id": "tech-building:TC-NE-1",
            "name": "生科教室二 (1F)",
            "spaceCode": "TC-NE-1",
            "x": 532.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 609.0,
              "y": 200
            }
          },
          {
            "id": "tech-building:TC-SE-1",
            "name": "電腦教室一 (1F)",
            "spaceCode": "TC-SE-1",
            "x": 696.0,
            "y": 40,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 773.0,
              "y": 200
            }
          },
          {
            "id": "tech-building:TC-NW-2",
            "name": "科中辦公室 (2F)",
            "spaceCode": "TC-NW-2",
            "x": 40.0,
            "y": 320,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 117.0,
              "y": 320
            }
          },
          {
            "id": "tech-building:TC-N-2",
            "name": "理化實驗室 (2F)",
            "spaceCode": "TC-N-2",
            "x": 204.0,
            "y": 320,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 281.0,
              "y": 320
            }
          },
          {
            "id": "tech-building:TC-SW-2",
            "name": "科技智慧教室 (2F)",
            "spaceCode": "TC-SW-2",
            "x": 368.0,
            "y": 320,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 445.0,
              "y": 320
            }
          },
          {
            "id": "tech-building:TC-NE-2",
            "name": "科技創作教室 (2F)",
            "spaceCode": "TC-NE-2",
            "x": 532.0,
            "y": 320,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 609.0,
              "y": 320
            }
          },
          {
            "id": "tech-building:TC-SE-2",
            "name": "電腦教室二 (2F)",
            "spaceCode": "TC-SE-2",
            "x": 696.0,
            "y": 320,
            "w": 154.0,
            "h": 160,
            "door": {
              "x": 773.0,
              "y": 320
            }
          }
        ]
      }
    }
  },
  {
    "id": "art-building",
    "title": "藝術館",
    "subtitle": "1F 體能 · 2F/3F 音樂教室 · 4F 美術創作",
    "category": "special",
    "stories": "1F–4F",
    "floors": [
      1
    ],
    "bounds": {
      "x": 1350,
      "y": 400,
      "w": 60,
      "h": 65
    },
    "entrance": {
      "x": 1370,
      "y": 455
    },
    "roofStyle": "tower-pitched",
    "color": "#c9bbb6",
    "roofColor": "#765c64",
    "photoKey": null,
    "note": "獨立四層樓高藝術美育塔樓，逐層分別為樂活體能、第一音樂、第二音樂與頂樓美術創作天地。",
    "floorLayouts": {
      "1": {
        "width": 900,
        "height": 520,
        "corridor": {
          "x": 40,
          "y": 210,
          "w": 820,
          "h": 100
        },
        "entrance": {
          "x": 450.0,
          "y": 260.0
        },
        "stairs": [
          {
            "x": 60,
            "y": 230,
            "name": "樓梯間"
          }
        ],
        "rooms": [
          {
            "id": "art-building:ART-1",
            "name": "樂活教室 (1F)",
            "spaceCode": "ART-1",
            "x": 40.0,
            "y": 40,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 240.0,
              "y": 200
            }
          },
          {
            "id": "art-building:ART-2",
            "name": "音樂教室（第一音樂教室） (2F)",
            "spaceCode": "ART-2",
            "x": 450.0,
            "y": 40,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 650.0,
              "y": 200
            }
          },
          {
            "id": "art-building:ART-3",
            "name": "音樂教室（第二音樂教室） (3F)",
            "spaceCode": "ART-3",
            "x": 40.0,
            "y": 320,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 240.0,
              "y": 320
            }
          },
          {
            "id": "art-building:ART-4",
            "name": "美術教室 (4F)",
            "spaceCode": "ART-4",
            "x": 450.0,
            "y": 320,
            "w": 400.0,
            "h": 160,
            "door": {
              "x": 650.0,
              "y": 320
            }
          }
        ]
      }
    }
  }
],
  rooms: [
  {
    "id": "gym-bld:GYM-1",
    "buildingId": "gym-bld",
    "floor": 1,
    "spaceCode": "GYM-1",
    "name": "活動中心大禮堂 (1F)",
    "category": "special",
    "staff": []
  },
  {
    "id": "gym-bld:GYM-F",
    "buildingId": "gym-bld",
    "floor": 1,
    "spaceCode": "GYM-F",
    "name": "消防機房 (1F)",
    "category": "special",
    "staff": []
  },
  {
    "id": "gym-bld:GYM-2",
    "buildingId": "gym-bld",
    "floor": 1,
    "spaceCode": "GYM-2",
    "name": "活動中心看台區 (2F)",
    "category": "special",
    "staff": []
  },
  {
    "id": "gym-bld:GYM-3",
    "buildingId": "gym-bld",
    "floor": 1,
    "spaceCode": "GYM-3",
    "name": "活動中心看台區 (3F)",
    "category": "special",
    "staff": []
  },
  {
    "id": "recycle-bld:REC-1",
    "buildingId": "recycle-bld",
    "floor": 1,
    "spaceCode": "REC-1",
    "name": "資源回收室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-front:ADM-F-1",
    "buildingId": "admin-front",
    "floor": 1,
    "spaceCode": "ADM-F-1",
    "name": "八、九年級導師室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-front:ADM-F-2W",
    "buildingId": "admin-front",
    "floor": 1,
    "spaceCode": "ADM-F-2W",
    "name": "校長室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-front:ADM-F-2C",
    "buildingId": "admin-front",
    "floor": 1,
    "spaceCode": "ADM-F-2C",
    "name": "油印室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-front:ADM-F-2E",
    "buildingId": "admin-front",
    "floor": 1,
    "spaceCode": "ADM-F-2E",
    "name": "教務處 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-front:ADM-F-3W",
    "buildingId": "admin-front",
    "floor": 1,
    "spaceCode": "ADM-F-3W",
    "name": "語言教室 (3F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-front:ADM-F-3E",
    "buildingId": "admin-front",
    "floor": 1,
    "spaceCode": "ADM-F-3E",
    "name": "專任辦公室三 (3F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-back:ADM-B-1W",
    "buildingId": "admin-back",
    "floor": 1,
    "spaceCode": "ADM-B-1W",
    "name": "學務處 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-back:ADM-B-1C",
    "buildingId": "admin-back",
    "floor": 1,
    "spaceCode": "ADM-B-1C",
    "name": "學務處（西側辦公區） (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-back:ADM-B-1E1",
    "buildingId": "admin-back",
    "floor": 1,
    "spaceCode": "ADM-B-1E1",
    "name": "會客室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-back:ADM-B-1E2",
    "buildingId": "admin-back",
    "floor": 1,
    "spaceCode": "ADM-B-1E2",
    "name": "教練室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-back:ADM-B-2W",
    "buildingId": "admin-back",
    "floor": 1,
    "spaceCode": "ADM-B-2W",
    "name": "總務處 / 人事室 / 會計室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-back:ADM-B-3W",
    "buildingId": "admin-back",
    "floor": 1,
    "spaceCode": "ADM-B-3W",
    "name": "專任辦公室 (3F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "admin-back:ADM-B-3E",
    "buildingId": "admin-back",
    "floor": 1,
    "spaceCode": "ADM-B-3E",
    "name": "教師研習中心 (3F)",
    "category": "special",
    "staff": []
  },
  {
    "id": "health-bld:511",
    "buildingId": "health-bld",
    "floor": 1,
    "spaceCode": "511",
    "name": "511 健康中心 (1F)",
    "category": "special",
    "staff": []
  },
  {
    "id": "health-bld:512",
    "buildingId": "health-bld",
    "floor": 1,
    "spaceCode": "512",
    "name": "512 員生合作社 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "health-bld:521",
    "buildingId": "health-bld",
    "floor": 1,
    "spaceCode": "521",
    "name": "521 檔案室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "health-bld:522",
    "buildingId": "health-bld",
    "floor": 1,
    "spaceCode": "522",
    "name": "522 檔案室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "grade8-front:411–414",
    "buildingId": "grade8-front",
    "floor": 1,
    "spaceCode": "411–414",
    "name": "非營利幼兒園 (1F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-front:421",
    "buildingId": "grade8-front",
    "floor": 1,
    "spaceCode": "421",
    "name": "807 教室 (2F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-front:422",
    "buildingId": "grade8-front",
    "floor": 1,
    "spaceCode": "422",
    "name": "801 教室 (2F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-front:423",
    "buildingId": "grade8-front",
    "floor": 1,
    "spaceCode": "423",
    "name": "802 教室 (2F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-front:424",
    "buildingId": "grade8-front",
    "floor": 1,
    "spaceCode": "424",
    "name": "803 教室 (2F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-front:431",
    "buildingId": "grade8-front",
    "floor": 1,
    "spaceCode": "431",
    "name": "本土語教室 (3F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-front:432",
    "buildingId": "grade8-front",
    "floor": 1,
    "spaceCode": "432",
    "name": "806 教室 (3F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-front:433",
    "buildingId": "grade8-front",
    "floor": 1,
    "spaceCode": "433",
    "name": "808 教室 (3F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-front:434",
    "buildingId": "grade8-front",
    "floor": 1,
    "spaceCode": "434",
    "name": "桌遊教室 (3F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade9-back:213",
    "buildingId": "grade9-back",
    "floor": 1,
    "spaceCode": "213",
    "name": "906 教室 (1F)",
    "category": "grade9",
    "staff": []
  },
  {
    "id": "grade9-back:212",
    "buildingId": "grade9-back",
    "floor": 1,
    "spaceCode": "212",
    "name": "907 教室 (1F)",
    "category": "grade9",
    "staff": []
  },
  {
    "id": "grade9-back:211",
    "buildingId": "grade9-back",
    "floor": 1,
    "spaceCode": "211",
    "name": "908 教室 (1F)",
    "category": "grade9",
    "staff": []
  },
  {
    "id": "grade9-back:223",
    "buildingId": "grade9-back",
    "floor": 1,
    "spaceCode": "223",
    "name": "社團教室一 (2F)",
    "category": "grade9",
    "staff": []
  },
  {
    "id": "grade9-back:222",
    "buildingId": "grade9-back",
    "floor": 1,
    "spaceCode": "222",
    "name": "904 教室 (2F)",
    "category": "grade9",
    "staff": []
  },
  {
    "id": "grade9-back:221",
    "buildingId": "grade9-back",
    "floor": 1,
    "spaceCode": "221",
    "name": "905 教室 (2F)",
    "category": "grade9",
    "staff": []
  },
  {
    "id": "grade9-back:233",
    "buildingId": "grade9-back",
    "floor": 1,
    "spaceCode": "233",
    "name": "901 教室 (3F)",
    "category": "grade9",
    "staff": []
  },
  {
    "id": "grade9-back:232",
    "buildingId": "grade9-back",
    "floor": 1,
    "spaceCode": "232",
    "name": "902 教室 (3F)",
    "category": "grade9",
    "staff": []
  },
  {
    "id": "grade9-back:231",
    "buildingId": "grade9-back",
    "floor": 1,
    "spaceCode": "231",
    "name": "903 教室 (3F)",
    "category": "grade9",
    "staff": []
  },
  {
    "id": "grade8-mid:315",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "315",
    "name": "體育器材室 (1F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:314",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "314",
    "name": "輕艇隊訓練室 (1F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:313",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "313",
    "name": "909 教室 (1F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:312",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "312",
    "name": "木藝教室 (1F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:311",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "311",
    "name": "木藝教室 (1F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:325",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "325",
    "name": "志工／校友辦公室 (2F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:324",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "324",
    "name": "訓育設備及器材室 (2F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:323",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "323",
    "name": "教學設備器材室 (2F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:322",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "322",
    "name": "805 教室 (2F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:321",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "321",
    "name": "804 教室 (2F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:335",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "335",
    "name": "生涯發展教室 (3F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:333–334",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "333–334",
    "name": "表藝教室 (3F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:332",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "332",
    "name": "教材製作室 (3F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "grade8-mid:331",
    "buildingId": "grade8-mid",
    "floor": 1,
    "spaceCode": "331",
    "name": "809 教室 (3F)",
    "category": "grade8",
    "staff": []
  },
  {
    "id": "new-grade7:A12",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A12",
    "name": "709 體育班 (1F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A13",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A13",
    "name": "701 教室 (1F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A14",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A14",
    "name": "資源班 3／4 教室 (1F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A15",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A15",
    "name": "特教教室 2 (1F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A21",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A21",
    "name": "家長會辦公室 (2F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A22",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A22",
    "name": "702 教室 (2F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A23",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A23",
    "name": "703 教室 (2F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A24",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A24",
    "name": "704 教室 (2F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A25",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A25",
    "name": "705 教室 (2F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A31",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A31",
    "name": "教師會辦公室 (3F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A32",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A32",
    "name": "706 教室 (3F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A33",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A33",
    "name": "707 教室 (3F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A34",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A34",
    "name": "708 教室 (3F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "new-grade7:A35",
    "buildingId": "new-grade7",
    "floor": 1,
    "spaceCode": "A35",
    "name": "七年級導師室 (3F)",
    "category": "grade7",
    "staff": []
  },
  {
    "id": "multi-building:615",
    "buildingId": "multi-building",
    "floor": 1,
    "spaceCode": "615",
    "name": "餐飲教室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "multi-building:611",
    "buildingId": "multi-building",
    "floor": 1,
    "spaceCode": "611",
    "name": "圖書室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "multi-building:614",
    "buildingId": "multi-building",
    "floor": 1,
    "spaceCode": "614",
    "name": "特教班 (1F)",
    "category": "special",
    "staff": []
  },
  {
    "id": "multi-building:613",
    "buildingId": "multi-building",
    "floor": 1,
    "spaceCode": "613",
    "name": "特教辦公室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "multi-building:612",
    "buildingId": "multi-building",
    "floor": 1,
    "spaceCode": "612",
    "name": "資源班 1／2 教室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "multi-building:HST-1",
    "buildingId": "multi-building",
    "floor": 1,
    "spaceCode": "HST-1",
    "name": "校史室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "multi-building:621",
    "buildingId": "multi-building",
    "floor": 1,
    "spaceCode": "621",
    "name": "大電腦教室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "multi-building:622",
    "buildingId": "multi-building",
    "floor": 1,
    "spaceCode": "622",
    "name": "資訊機房 (2F)",
    "category": "special",
    "staff": []
  },
  {
    "id": "multi-building:623",
    "buildingId": "multi-building",
    "floor": 1,
    "spaceCode": "623",
    "name": "諮商會議室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "multi-building:624",
    "buildingId": "multi-building",
    "floor": 1,
    "spaceCode": "624",
    "name": "輔導室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "tech-building:TC-NW-1",
    "buildingId": "tech-building",
    "floor": 1,
    "spaceCode": "TC-NW-1",
    "name": "視聽教室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "tech-building:TC-N-1",
    "buildingId": "tech-building",
    "floor": 1,
    "spaceCode": "TC-N-1",
    "name": "生科教室一 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "tech-building:TC-SW-1",
    "buildingId": "tech-building",
    "floor": 1,
    "spaceCode": "TC-SW-1",
    "name": "生物實驗室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "tech-building:TC-NE-1",
    "buildingId": "tech-building",
    "floor": 1,
    "spaceCode": "TC-NE-1",
    "name": "生科教室二 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "tech-building:TC-SE-1",
    "buildingId": "tech-building",
    "floor": 1,
    "spaceCode": "TC-SE-1",
    "name": "電腦教室一 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "tech-building:TC-NW-2",
    "buildingId": "tech-building",
    "floor": 1,
    "spaceCode": "TC-NW-2",
    "name": "科中辦公室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "tech-building:TC-N-2",
    "buildingId": "tech-building",
    "floor": 1,
    "spaceCode": "TC-N-2",
    "name": "理化實驗室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "tech-building:TC-SW-2",
    "buildingId": "tech-building",
    "floor": 1,
    "spaceCode": "TC-SW-2",
    "name": "科技智慧教室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "tech-building:TC-NE-2",
    "buildingId": "tech-building",
    "floor": 1,
    "spaceCode": "TC-NE-2",
    "name": "科技創作教室 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "tech-building:TC-SE-2",
    "buildingId": "tech-building",
    "floor": 1,
    "spaceCode": "TC-SE-2",
    "name": "電腦教室二 (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "art-building:ART-1",
    "buildingId": "art-building",
    "floor": 1,
    "spaceCode": "ART-1",
    "name": "樂活教室 (1F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "art-building:ART-2",
    "buildingId": "art-building",
    "floor": 1,
    "spaceCode": "ART-2",
    "name": "音樂教室（第一音樂教室） (2F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "art-building:ART-3",
    "buildingId": "art-building",
    "floor": 1,
    "spaceCode": "ART-3",
    "name": "音樂教室（第二音樂教室） (3F)",
    "category": "admin",
    "staff": []
  },
  {
    "id": "art-building:ART-4",
    "buildingId": "art-building",
    "floor": 1,
    "spaceCode": "ART-4",
    "name": "美術教室 (4F)",
    "category": "admin",
    "staff": []
  }
],
  outdoorDestinations: [
  {
    "id": "grandstand",
    "name": "操場司令台",
    "code": "OUT-STAGE",
    "category": "sports",
    "anchor": {
      "x": 800,
      "y": 560
    },
    "description": "大溪國中 200 公尺 PU 跑道旁司令台，校園重大典禮、朝會升旗與體育運動競賽之指揮核心。背側有典雅校園壁畫。",
    "photo": "stage-2019.jpg"
  },
  {
    "id": "track",
    "name": "200m PU 跑道與操場草坪",
    "code": "OUT-TRACK",
    "category": "sports",
    "anchor": {
      "x": 620,
      "y": 530
    },
    "description": "全校田徑運動、晨跑與體育課專用紅色 PU 標準跑道，內圈為綠意盎然的大草坪，群山環抱視野開闊。",
    "photo": "track-2019.jpg"
  },
  {
    "id": "court-bb",
    "name": "北側戶外雙籃球場",
    "code": "OUT-BB",
    "category": "sports",
    "anchor": {
      "x": 950,
      "y": 400
    },
    "description": "全場戶外籃球場兩座，配備標準紅藍球場鋪面、三分線與防撞籃架，放學後與體育課同學活力奔馳所在。",
    "photo": null
  },
  {
    "id": "volleyball-out",
    "name": "戶外排球場",
    "code": "OUT-VB",
    "category": "sports",
    "anchor": {
      "x": 870,
      "y": 430
    },
    "description": "標準戶外排球場地，排球隊課後訓練與師生友誼賽的活力聚集地。",
    "photo": null
  },
  {
    "id": "statue",
    "name": "蔣公銅像庭園",
    "code": "OUT-STATUE",
    "category": "special",
    "anchor": {
      "x": 940,
      "y": 560
    },
    "description": "校園中央綠化中庭庭園，環植龍柏與杜鵑花，為行政大樓與教學大樓間寧靜優美的休憩角落。",
    "photo": null
  },
  {
    "id": "palm-avenue",
    "name": "椰林迎賓大道",
    "code": "OUT-PALM",
    "category": "admin",
    "anchor": {
      "x": 1420,
      "y": 800
    },
    "description": "大溪國中校門外兩側高聳挺拔的大王椰子樹大道，迎送每日前來學校學習的師生與貴賓。",
    "photo": "lanes-2019.jpg"
  },
  {
    "id": "gate-guard",
    "name": "正門警衛室",
    "code": "OUT-GUARD",
    "category": "admin",
    "anchor": {
      "x": 1240,
      "y": 645
    },
    "description": "大溪國中門禁管理與來賓登記處，警衛伯伯每日在此親切引導訪客。",
    "photo": null
  }
],
  npcs: [
  {
    "id": "npc-guard",
    "name": "警衛伯伯",
    "title": "正門守護長",
    "role": "guard",
    "x": 1240,
    "y": 645,
    "sprite": "gate-guard",
    "portrait": "../rpg/assets/characters/guide-rpg/style-v4-webp/portraits/gate-guard.webp",
    "dialogue": "歡迎來到大溪國中！我是校門口警衛伯伯。本校創校歷史悠久，木藝、閱讀與體育都非常厲害！沿著椰林大道走進來，正前方就是行政大樓，左側是活動中心與運動場，右側是教學大樓。有任何問題都可以來問我！",
    "questId": "quest-1"
  },
  {
    "id": "npc-principal",
    "name": "林晏瑄",
    "title": "校長",
    "role": "teacher",
    "x": 970,
    "y": 565,
    "sprite": "staff-001",
    "portrait": "../rpg/assets/characters/guide-rpg/style-v4-webp/portraits/staff-001.webp",
    "dialogue": "各位同學、家長與貴賓您好！我是大溪國中校長林晏瑄。大溪國中秉持「自強不息、敦品勵學」的精神，深耕山城木藝特色課程與多元適性教育。每一條走廊，都有大溪的故事，歡迎大家探索這座美麗的校園！",
    "questId": "quest-1"
  },
  {
    "id": "npc-academic",
    "name": "張致信",
    "title": "教務主任",
    "role": "teacher",
    "x": 1000,
    "y": 530,
    "sprite": "staff-004",
    "portrait": "../rpg/assets/characters/guide-rpg/style-v4-webp/portraits/staff-004.webp",
    "dialogue": "您好！我是教務主任張致信。教務處致力於推動多元閱讀、科學自造與跨領域雙語課程。恭喜你來到行政大樓完成了新生巡禮！",
    "questId": "quest-1"
  },
  {
    "id": "npc-woodmaster",
    "name": "大溪木藝大師",
    "title": "木藝創客專任教師",
    "role": "teacher",
    "x": 1140,
    "y": 470,
    "sprite": "staff-016",
    "portrait": "../rpg/assets/characters/guide-rpg/style-v4-webp/portraits/staff-016.webp",
    "dialogue": "歡迎來到八年級中棟的大溪木藝教室！大溪自古以來就是台灣木器之都。在這裡，同學們親手觸摸溫潤的原木，學習傳統榫卯技藝與現代創客木工，把匠人精神代代傳承下去！",
    "questId": "quest-2"
  },
  {
    "id": "npc-science",
    "name": "陳小鈴",
    "title": "理化與自然科教師",
    "role": "teacher",
    "x": 1260,
    "y": 420,
    "sprite": "staff-009",
    "portrait": "../rpg/assets/characters/guide-rpg/style-v4-webp/portraits/staff-009.webp",
    "dialogue": "歡迎來到科技館理化實驗室！我們在這裡做力學、光學、酸鹼滴定與科技創客專題。科學的魅力在於動手實驗、驗證大自然的規律！",
    "questId": "quest-3"
  },
  {
    "id": "npc-librarian",
    "name": "圖書館志工師長",
    "title": "閱讀推廣教師",
    "role": "teacher",
    "x": 1180,
    "y": 380,
    "sprite": "staff-020",
    "portrait": "../rpg/assets/characters/guide-rpg/style-v4-webp/portraits/staff-020.webp",
    "dialogue": "靜謐的綜合大樓 1F，是全校最受歡迎的圖書室。這裡除了各類新書期刊，還有大溪地方誌與百年校史陳列。開卷有益，歡迎常來享受閱讀！",
    "questId": "quest-4"
  },
  {
    "id": "npc-coach",
    "name": "田徑總教練",
    "title": "體育組教練",
    "role": "teacher",
    "x": 800,
    "y": 560,
    "sprite": "staff-030",
    "portrait": "../rpg/assets/characters/guide-rpg/style-v4-webp/portraits/staff-030.webp",
    "dialogue": "加油！堅持到底！這條 200 公尺紅色 PU 跑道凝聚了大溪學子的朝氣與汗水。無論是運動會接力還是晨間體適能，跑動起來，青春無敵！",
    "questId": "quest-5"
  },
  {
    "id": "npc-student-1",
    "name": "大溪國中同學・小溪",
    "title": "學生夥伴 (7年級)",
    "role": "student",
    "x": 1050,
    "y": 600,
    "sprite": "student-0",
    "portrait": "../rpg/assets/characters/guide-rpg/style-v4-webp/portraits/student-0.webp",
    "dialogue": "嗨！我是七年級的新生小溪。新大樓的教室好寬敞明亮，下課大家最喜歡去員生合作社買點心，再去籃球場看學長打球！",
    "wander": true
  },
  {
    "id": "npc-student-2",
    "name": "大溪國中同學・阿哲",
    "title": "學生夥伴 (8年級)",
    "role": "student",
    "x": 920,
    "y": 480,
    "sprite": "student-1",
    "portrait": "../rpg/assets/characters/guide-rpg/style-v4-webp/portraits/student-1.webp",
    "dialogue": "我是八年級的阿哲！我們這學期的木藝課正在做原木筷子和筆筒，刨木花的香氣超棒的！",
    "wander": true
  }
],
  quests: [
  {
    "id": "quest-1",
    "title": "【新生報到】校園初訪與處室巡禮",
    "description": "在校門口遇見警衛伯伯，沿著椰林大道前往行政大樓 2F 向教務處報到。",
    "steps": [
      {
        "desc": "向正門警衛伯伯打招呼並領取手冊",
        "target": "npc-guard"
      },
      {
        "desc": "前往行政大樓 2F 拜訪教務主任完成報到",
        "target": "npc-academic"
      }
    ],
    "reward": "大溪校園新人章 🎖️"
  },
  {
    "id": "quest-2",
    "title": "【匠心傳承】大溪木藝手作探索",
    "description": "大溪是木藝之鄉，前往八年級中棟 1F「大溪木藝教室」尋訪木藝大師。",
    "steps": [
      {
        "desc": "前往八年級中棟 1F 大溪木藝教室與木藝大師交談",
        "target": "npc-woodmaster"
      }
    ],
    "reward": "大溪木藝傳承者徽章 🪵"
  },
  {
    "id": "quest-3",
    "title": "【格物致知】科技館理化實驗巡禮",
    "description": "前往東側「科技館 2F 理化第一實驗室」，向理化老師請教科學實驗器材。",
    "steps": [
      {
        "desc": "前往科技館 2F 理化第一實驗室與陳小鈴老師交談",
        "target": "npc-science"
      }
    ],
    "reward": "科學自造先鋒徽章 🔬"
  },
  {
    "id": "quest-4",
    "title": "【開卷有益】圖書館書香與校史尋寶",
    "description": "前往綜合大樓 1F「中央圖書室」，閱讀大溪在地文史叢書。",
    "steps": [
      {
        "desc": "前往綜合大樓 1F 圖書館尋訪閱讀推廣老師",
        "target": "npc-librarian"
      }
    ],
    "reward": "大溪博學士徽章 📖"
  },
  {
    "id": "quest-5",
    "title": "【強健體魄】運動場跑道晨跑打卡",
    "description": "前往操場司令台前 200m PU 跑道，向田徑教練打卡展現運動活力！",
    "steps": [
      {
        "desc": "前往操場司令台前跑道與教練打卡",
        "target": "npc-coach"
      }
    ],
    "reward": "青春活力運動家徽章 🏃"
  }
],
  photoExhibits: [
  {
    "id": "admin-front",
    "title": "行政大樓（崇德樓）紅瓦斜頂立面",
    "filename": "admin-front.jpg",
    "desc": "大溪國中標誌性紅陶瓦斜屋頂與米白洗石子外牆，藍綠檐口勾勒出山城校舍的沈穩風貌。",
    "date": "現況實景紀錄"
  },
  {
    "id": "admin-entry",
    "title": "行政大樓正門穿堂迎賓走廊",
    "filename": "admin-entry.jpg",
    "desc": "自椰林大道步入行政大樓之挑高中庭穿堂，連通各處室辦公區與後方中庭花園。",
    "date": "現況實景紀錄"
  },
  {
    "id": "admin-gallery",
    "title": "行政大樓二樓通廊與連通橋",
    "filename": "admin-gallery.jpg",
    "desc": "前後棟之間的架空採光連通走廊，俯瞰中庭青翠綠蔭。",
    "date": "現況實景紀錄"
  },
  {
    "id": "admin-roof",
    "title": "行政大樓斜頂與龍柏庭園",
    "filename": "admin-roof.jpg",
    "desc": "仰望經典紅瓦斜屋頂與庭園古木，見證大溪國中春風化雨之歷史。",
    "date": "現況實景紀錄"
  },
  {
    "id": "stage-2019",
    "title": "操場司令台與綠蔭看台",
    "filename": "stage-2019.jpg",
    "desc": "2019 年實景紀錄之操場司令台，為全校重大集會與校運會的核心看台。",
    "date": "2019 年 10 月 22 日"
  },
  {
    "id": "track-2019",
    "title": "200 公尺紅色 PU 跑道與中央草坪",
    "filename": "track-2019.jpg",
    "desc": "平整亮麗的紅色 PU 運動跑道，內圈設有草坪球場，周圍被大溪群山環抱。",
    "date": "2019 年 10 月 22 日"
  },
  {
    "id": "lanes-2019",
    "title": "田徑衝刺百米直線跑道",
    "filename": "lanes-2019.jpg",
    "desc": "標準分道白色標線，大溪健兒在此一次次突破自我速度極限。",
    "date": "2019 年 10 月 22 日"
  },
  {
    "id": "shade-2019",
    "title": "運動場周邊綠蔭林蔭步道",
    "filename": "shade-2019.jpg",
    "desc": "跑道外緣樹蔭濃郁，課餘時間師生散步、談心的放鬆天地。",
    "date": "2019 年 10 月 22 日"
  },
  {
    "id": "reference-aerial",
    "title": "大溪國中校園高空鳥瞰實景",
    "filename": "reference-aerial.webp",
    "desc": "由高空鳥瞰大溪國中全校配置：紅瓦校舍群、200m 運動場、活動中心與大溪溪畔風光盡收眼底。",
    "date": "空拍實景"
  }
]
};
