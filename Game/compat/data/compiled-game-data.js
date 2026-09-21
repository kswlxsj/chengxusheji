window.GAME_DATA = {
  "meta": {
    "formatVersion": 4,
    "title": "常暗之厢",
    "coverImage": "assets/Image/Scene/Background/op-01.ie.jpg",
    "startEvent": "E_001",
    "initialScene": "carriage_06",
    "initialState": {
      "sceneId": "carriage_06",
      "currentEventId": null,
      "flags": {
        "carriage_06_people_reveal": true
      },
      "inventory": [],
      "objectStates": {},
      "checkResults": {}
    }
  },
  "scenes": [
    {
      "id": "carriage_06",
      "name": "6 号车厢",
      "background": "assets/Image/Scene/Background/carriage-06.ie.jpg",
      "backgroundSound": {
        "sound": "train_ambient"
      },
      "backgroundSoundVariants": [
        {
          "sound": "eating_crisps",
          "loopGapMs": 1600,
          "visibleWhen": {
            "flag": "carriage_06_eaten",
            "equals": true
          }
        }
      ],
      "backgroundVariants": [
        {
          "image": "assets/Image/Scene/Background/carriage-06-eaten.ie.jpg",
          "visibleWhen": {
            "flag": "carriage_06_eaten",
            "equals": true
          }
        },
        {
          "image": "assets/Image/Scene/Background/carriage-06-people.ie.jpg",
          "visibleWhen": {
            "flag": "carriage_06_people_reveal",
            "equals": true
          }
        },
        {
          "image": "assets/Image/Scene/Background/carriage-06-note-removed.ie.jpg",
          "visibleWhen": {
            "flag": "note_collected",
            "equals": true
          }
        }
      ],
      "objects": [
        {
          "id": "note_06",
          "name": "门上的便签",
          "image": "assets/Image/Scene/StillLife/carriage-06-note.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 49.9298,
            "y": 40.5,
            "width": 3.7922,
            "height": 6.75
          },
          "zIndex": 12,
          "clickEvent": "E_002",
          "visibleWhen": {
            "all": [
              {
                "not": {
                  "flag": "note_collected",
                  "equals": true
                }
              },
              {
                "not": {
                  "objectState": {
                    "objectId": "note_06",
                    "property": "hidden",
                    "equals": true
                  }
                }
              }
            ]
          }
        },
        {
          "id": "door_06_to_07",
          "name": "通往7号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_005",
          "visibleWhen": {
            "not": {
              "flag": "carriage_06_eaten",
              "equals": true
            }
          }
        },
        {
          "id": "door_06_to_05",
          "name": "通往5号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_06_05"
        },
        {
          "id": "door_06_center",
          "name": "中央车门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 43,
            "y": 28,
            "width": 14,
            "height": 48
          },
          "noHighlight": true,
          "zIndex": 11,
          "clickEvent": "E_006_CENTER_DOOR",
          "visibleWhen": {
            "all": [
              {
                "not": {
                  "flag": "carriage_06_entry_route_a",
                  "equals": true
                }
              },
              {
                "not": {
                  "flag": "carriage_06_entry_route_b",
                  "equals": true
                }
              },
              {
                "not": {
                  "flag": "carriage_07_entry_seen",
                  "equals": true
                }
              }
            ]
          }
        },
        {
          "id": "window_06_left",
          "name": "左侧车窗",
          "invisible": true,
          "position": {
            "x": 19,
            "y": 33,
            "width": 18,
            "height": 15
          },
          "zIndex": 10,
          "clickEvent": "E_006_WINDOW",
          "visibleWhen": {
            "all": [
              {
                "not": {
                  "flag": "carriage_06_entry_route_a",
                  "equals": true
                }
              },
              {
                "not": {
                  "flag": "carriage_06_entry_route_b",
                  "equals": true
                }
              },
              {
                "not": {
                  "flag": "carriage_07_entry_seen",
                  "equals": true
                }
              }
            ]
          }
        },
        {
          "id": "window_06_right",
          "name": "右侧车窗",
          "invisible": true,
          "position": {
            "x": 61,
            "y": 33,
            "width": 18,
            "height": 15
          },
          "zIndex": 10,
          "clickEvent": "E_006_WINDOW",
          "visibleWhen": {
            "all": [
              {
                "not": {
                  "flag": "carriage_06_entry_route_a",
                  "equals": true
                }
              },
              {
                "not": {
                  "flag": "carriage_06_entry_route_b",
                  "equals": true
                }
              },
              {
                "not": {
                  "flag": "carriage_07_entry_seen",
                  "equals": true
                }
              }
            ]
          }
        },
        {
          "id": "note_back_06",
          "name": "便签背面",
          "image": "assets/Image/Scene/StillLife/carriage-06-note.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 49.9298,
            "y": 40.5,
            "width": 3.7922,
            "height": 6.75
          },
          "zIndex": 13,
          "clickEvent": "E_003",
          "visibleWhen": {
            "all": [
              {
                "not": {
                  "flag": "note_collected",
                  "equals": true
                }
              },
              {
                "flag": "note_front_seen",
                "equals": true
              },
              {
                "not": {
                  "objectState": {
                    "objectId": "note_back_06",
                    "property": "hidden",
                    "equals": true
                  }
                }
              }
            ]
          }
        },
        {
          "id": "map_06",
          "name": "电车示意图",
          "image": "assets/Image/Scene/StillLife/carriage-06-map.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 42.5562,
            "y": 51.75,
            "width": 5.2669,
            "height": 7.125
          },
          "zIndex": 12,
          "clickEvent": "E_004",
          "visibleWhen": {
            "not": {
              "flag": "map_seen",
              "equals": true
            }
          }
        },
        {
          "id": "mg3d_demo_spot_06",
          "name": "（开发演示）陀螺仪校准装置",
          "image": "assets/Image/Scene/StillLife/webgl-demo-marker.svg",
          "position": {
            "x": 50,
            "y": 60,
            "width": 13,
            "height": 17
          },
          "zIndex": 13,
          "clickEvent": "E_MG3D_DEMO",
          "visibleWhen": {
            "flag": "mg3d_demo_visible",
            "equals": true
          }
        }
      ]
    },
    {
      "id": "carriage_07",
      "name": "7 号车厢",
      "background": "assets/Image/Scene/Background/carriage-07.ie.jpg",
      "backgroundSound": {
        "sound": "eating_crisps",
        "loopGapMs": 1600
      },
      "objects": [
        {
          "id": "radio_07",
          "name": "损坏的收音机",
          "image": "assets/Image/Scene/StillLife/radio-07.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 62.22,
            "y": 63.5,
            "width": 5.51,
            "height": 9.06
          },
          "zIndex": 12,
          "clickEvent": "E_0008",
          "visibleWhen": {
            "all": [
              {
                "flag": "radio_07_ready",
                "equals": true
              },
              {
                "not": {
                  "flag": "radio_07_done",
                  "equals": true
                }
              }
            ]
          }
        },
        {
          "id": "door_07_to_06",
          "name": "通往6号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_905"
        },
        {
          "id": "corpse_07",
          "name": "尸体",
          "image": "assets/Image/Scene/StillLife/corpse-07.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 75.5,
            "y": 61.5,
            "width": 13.5,
            "height": 13.5
          },
          "clickEvent": "E_007"
        },
        {
          "id": "door_07_to_08",
          "name": "通往8号方向的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_008"
        }
      ]
    },
    {
      "id": "carriage_05",
      "name": "5 号车厢",
      "background": "assets/Image/Scene/Background/carriage-05.ie.jpg",
      "backgroundSound": {
        "sound": "train_ambient"
      },
      "objects": [
        {
          "id": "door_05_to_06",
          "name": "通往6号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_05_06"
        },
        {
          "id": "door_05_to_04",
          "name": "通往4号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_05_04"
        },
        {
          "id": "door_05_center",
          "name": "中央车门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 43,
            "y": 28,
            "width": 14,
            "height": 48
          },
          "noHighlight": true,
          "zIndex": 11,
          "clickEvent": "E_005_CENTER_DOOR"
        },
        {
          "id": "window_05_left",
          "name": "左侧车窗",
          "invisible": true,
          "position": {
            "x": 19,
            "y": 33,
            "width": 18,
            "height": 15
          },
          "zIndex": 10,
          "clickEvent": "E_005_WINDOW"
        },
        {
          "id": "window_05_right",
          "name": "右侧车窗",
          "invisible": true,
          "position": {
            "x": 61,
            "y": 33,
            "width": 18,
            "height": 15
          },
          "zIndex": 10,
          "clickEvent": "E_005_WINDOW"
        },
        {
          "id": "clutter_05_a",
          "name": "散落的行李",
          "image": "assets/Image/Scene/StillLife/bag-05-a.ie.png",
          "fullCanvas": true,
          "hitPosition": {
            "x": 13,
            "y": 53,
            "width": 17,
            "height": 17
          },
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 9,
          "clickEvent": "E_05_JUNK_A"
        },
        {
          "id": "clutter_05_b",
          "name": "遗落的提包",
          "image": "assets/Image/Scene/StillLife/bag-05-b.ie.png",
          "fullCanvas": true,
          "hitPosition": {
            "x": 63,
            "y": 52,
            "width": 14,
            "height": 17
          },
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 9,
          "clickEvent": "E_05_JUNK_B"
        },
        {
          "id": "tool_clutter_05",
          "name": "倒下的背包",
          "image": "assets/Image/Scene/StillLife/carriage-05-03-clutter.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 26.9,
            "y": 49.1,
            "width": 11.7,
            "height": 12.5
          },
          "zIndex": 12,
          "clickEvent": "E_05_SEARCH_TOOLS",
          "visibleWhen": {
            "not": {
              "objectState": {
                "objectId": "tool_clutter_05",
                "property": "hidden",
                "equals": true
              }
            }
          }
        },
        {
          "id": "clue_clutter_05",
          "name": "可疑的纸堆",
          "image": "assets/Image/Scene/StillLife/newspaper-05.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 74,
            "y": 42,
            "width": 18,
            "height": 24
          },
          "zIndex": 13,
          "clickEvent": "E_011",
          "glow": true,
          "visibleWhen": {
            "all": [
              {
                "flag": "carriage_05_newspaper_available",
                "equals": true
              },
              {
                "not": {
                  "flag": "carriage_05_newspaper_collected",
                  "equals": true
                }
              }
            ]
          }
        },
        {
          "id": "clutter_05_c",
          "name": "堆叠的杂物",
          "image": "assets/Image/Scene/StillLife/trash-05-b.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 32,
            "y": 65,
            "width": 6,
            "height": 7
          },
          "zIndex": 12,
          "clickEvent": "E_05_JUNK_LEFT"
        },
        {
          "id": "clutter_05_d",
          "name": "散落的垃圾袋",
          "image": "assets/Image/Scene/StillLife/trash-05-a.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 62,
            "y": 65,
            "width": 6,
            "height": 7
          },
          "zIndex": 12,
          "clickEvent": "E_05_JUNK_RIGHT"
        }
      ]
    },
    {
      "id": "carriage_04",
      "name": "4 号车厢",
      "background": "assets/Image/Scene/Background/carriage-04.ie.jpg",
      "backgroundSound": {
        "sound": "train_ambient"
      },
      "backgroundVariants": [
        {
          "image": "assets/Image/Scene/StillLife/carriage-04-conductor-carried-away.ie.jpg",
          "visibleWhen": {
            "flag": "carried_crew",
            "equals": true
          }
        },
        {
          "image": "assets/Image/Scene/StillLife/carriage-04-conductor-carried-away.ie.jpg",
          "visibleWhen": {
            "flag": "crew_04_left_seated",
            "equals": true
          }
        }
      ],
      "objects": [
        {
          "id": "door_04_to_05",
          "name": "通往5号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_04_05"
        },
        {
          "id": "door_04_to_03",
          "name": "通往3号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_DOOR_04"
        },
        {
          "id": "door_04_center",
          "name": "中央车门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 43,
            "y": 28,
            "width": 14,
            "height": 48
          },
          "noHighlight": true,
          "zIndex": 11,
          "clickEvent": "E_004_CENTER_DOOR"
        },
        {
          "id": "window_04_left",
          "name": "左侧车窗",
          "invisible": true,
          "position": {
            "x": 19,
            "y": 33,
            "width": 18,
            "height": 15
          },
          "zIndex": 10,
          "clickEvent": "E_004_WINDOW"
        },
        {
          "id": "window_04_right",
          "name": "右侧车窗",
          "invisible": true,
          "position": {
            "x": 61,
            "y": 33,
            "width": 18,
            "height": 15
          },
          "zIndex": 10,
          "clickEvent": "E_004_WINDOW"
        },
        {
          "id": "crew_04",
          "name": "重伤的乘务员",
          "image": "assets/Image/Scene/StillLife/carriage-04-conductor.ie.png",
          "fullCanvas": true,
          "visibleWhen": {
            "all": [
              {
                "not": {
                  "flag": "crew_04_interacted",
                  "equals": true
                }
              },
              {
                "not": {
                  "flag": "carried_crew",
                  "equals": true
                }
              }
            ]
          },
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 35,
            "y": 62,
            "width": 22,
            "height": 13
          },
          "zIndex": 12,
          "clickEvent": "E_013"
        },
        {
          "id": "crew_04_seated_left",
          "name": "坐在左侧座椅上的乘务员",
          "image": "assets/Image/Scene/StillLife/carriage-04-conductor-seated.ie.png",
          "fullCanvas": true,
          "visibleWhen": {
            "all": [
              {
                "flag": "crew_04_left_seated",
                "equals": true
              },
              {
                "not": {
                  "flag": "carriage_03_bag_interacted",
                  "equals": true
                }
              },
              {
                "not": {
                  "flag": "carried_crew",
                  "equals": true
                }
              }
            ]
          },
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 28.5,
            "y": 41,
            "width": 8.5,
            "height": 33
          },
          "zIndex": 12,
          "clickEvent": "E_013"
        },
        {
          "id": "crew_04_seated_right",
          "name": "坐在右侧座椅上的乘务员",
          "image": "assets/Image/Scene/StillLife/carriage-04-conductor-seated.ie.png",
          "fullCanvas": true,
          "visibleWhen": {
            "all": [
              {
                "flag": "crew_04_left_seated",
                "equals": true
              },
              {
                "flag": "carriage_03_bag_interacted",
                "equals": true
              },
              {
                "not": {
                  "flag": "carried_crew",
                  "equals": true
                }
              }
            ]
          },
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 63,
            "y": 41,
            "width": 8.5,
            "height": 33
          },
          "zIndex": 12,
          "clickEvent": "E_013"
        },
        {
          "id": "employee_locker_04",
          "name": "员工柜",
          "image": "assets/Image/Scene/StillLife/carriage-04-employeelocker.ie.png",
          "fullCanvas": true,
          "visibleWhen": {
            "not": {
              "flag": "tools_ready",
              "equals": true
            }
          },
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 75.5,
            "y": 37,
            "width": 14,
            "height": 35
          },
          "zIndex": 12,
          "clickEvent": "E_020",
          "glow": true
        }
      ]
    },
    {
      "id": "carriage_03",
      "name": "3 号车厢",
      "background": "assets/Image/Scene/Background/carriage-03-full.ie.jpg",
      "backgroundSound": {
        "sound": "train_ambient"
      },
      "backgroundVariants": [
        {
          "image": "assets/Image/Scene/Background/carriage-03.ie.jpg",
          "visibleWhen": {
            "flag": "carriage_03_bag_resolved",
            "equals": true
          }
        },
        {
          "image": "assets/Image/Scene/Background/carriage-03-onlybag.ie.jpg",
          "visibleWhen": {
            "flag": "carriage_03_bag_exposed",
            "equals": true
          }
        },
        {
          "image": "assets/Image/Scene/Background/carriage-03-halffull.ie.jpg",
          "visibleWhen": {
            "flag": "carriage_03_bag_interacted",
            "equals": true
          }
        }
      ],
      "objects": [
        {
          "id": "door_03_to_04",
          "name": "通往4号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_03_04"
        },
        {
          "id": "door_03_to_02",
          "name": "通往2号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_023"
        },
        {
          "id": "black_bag_03",
          "name": "黑色背包",
          "image": "assets/Image/Scene/StillLife/black-bag-03.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 63,
            "y": 50.8,
            "width": 7.7,
            "height": 10.3
          },
          "zIndex": 12,
          "clickEvent": "E_017",
          "glow": true,
          "visibleWhen": {
            "all": [
              {
                "not": {
                  "flag": "carriage_03_bag_exposed",
                  "equals": true
                }
              },
              {
                "not": {
                  "flag": "carriage_03_phone_collected",
                  "equals": true
                }
              }
            ]
          }
        },
        {
          "id": "phone_03",
          "name": "发光的手机",
          "image": "assets/Image/Scene/StillLife/phone.ie.png",
          "position": {
            "x": 34,
            "y": 57,
            "width": 4,
            "height": 6.4
          },
          "zIndex": 11,
          "showImage": true,
          "glow": true,
          "clickEvent": "E_018_PHONE",
          "visibleWhen": {
            "all": [
              {
                "flag": "carriage_03_bag_interacted",
                "equals": true
              },
              {
                "flag": "carriage_03_phone_available",
                "equals": true
              },
              {
                "not": {
                  "flag": "carriage_03_phone_collected",
                  "equals": true
                }
              }
            ]
          }
        },
        {
          "id": "black_bag_03_foreground",
          "name": "椅面杂物前景",
          "image": "assets/Image/Scene/StillLife/black-bag-03.ie.png",
          "fullCanvas": true,
          "visualOnly": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 13,
          "clickEvent": "E_018_PHONE",
          "visibleWhen": {
            "all": [
              {
                "flag": "carriage_03_bag_interacted",
                "equals": true
              },
              {
                "not": {
                  "flag": "carriage_03_bag_exposed",
                  "equals": true
                }
              },
              {
                "not": {
                  "flag": "carriage_03_bag_resolved",
                  "equals": true
                }
              }
            ]
          }
        },
        {
          "id": "forward_note_03",
          "name": "写着前进提示的便签",
          "image": "assets/Image/Scene/StillLife/carriage-05-03-forward-note.ie.png",
          "fullCanvas": true,
          "visualOnly": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 14,
          "clickEvent": "E_022_ITEM_END",
          "visibleWhen": {
            "flag": "carriage_03_forward_note_visible",
            "equals": true
          }
        }
      ]
    },
    {
      "id": "carriage_02",
      "name": "2 号车厢",
      "background": "assets/Image/Scene/Background/carriage-02.ie.jpg",
      "backgroundSound": {
        "sound": "devil_scared"
      },
      "objects": [
        {
          "id": "dark_hint_02",
          "name": "黑暗中的喘息",
          "image": "assets/Image/Scene/StillLife/carriage-07-depth.svg",
          "position": {
            "x": 36,
            "y": 24,
            "width": 28,
            "height": 48
          },
          "zIndex": 12,
          "clickEvent": "E_02_DARK",
          "visibleWhen": {
            "not": {
              "flag": "light_used",
              "equals": true
            }
          }
        },
        {
          "id": "door_02_to_front",
          "name": "通往先头车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_02_FRONT_DOOR"
        },
        {
          "id": "clicker_02",
          "name": "Clicker",
          "image": "assets/Image/Scene/StillLife/clicker-02.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 30,
            "y": 31,
            "width": 12,
            "height": 44
          },
          "zIndex": 12,
          "clickEvent": "E_026_ACTION",
          "visibleWhen": {
            "all": [
              {
                "flag": "light_used",
                "equals": true
              },
              {
                "not": {
                  "flag": "clicker_cleared",
                  "equals": true
                }
              }
            ]
          }
        },
        {
          "id": "door_02_to_03",
          "name": "通往3号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_02_03"
        }
      ]
    },
    {
      "id": "front_carriage",
      "name": "先头车厢",
      "background": "assets/Image/Scene/Background/front-carriage.ie.jpg",
      "backgroundSound": {
        "sound": "train_ambient"
      },
      "objects": [
        {
          "id": "door_front_to_02",
          "name": "通往2号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_FRONT_02"
        },
        {
          "id": "control_27",
          "name": "前进与停车把手",
          "image": "assets/Image/Scene/StillLife/control-lever.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 42,
            "y": 52,
            "width": 27,
            "height": 30
          },
          "zIndex": 12,
          "clickEvent": "E_032",
          "visibleWhen": {
            "flag": "front_carriage_entry_seen",
            "equals": true
          }
        }
      ]
    },
    {
      "id": "carriage_inner_01",
      "name": "里世界·空车厢",
      "background": "assets/Image/Scene/Background/carriage-inner-01.ie.jpg",
      "objects": [
        {
          "id": "door_inner01_to_inner02",
          "name": "通往花草车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 90,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_503",
          "invisible": true,
          "noHighlight": true
        },
        {
          "id": "door_inner01_back",
          "name": "来路的车门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 1,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_502_RETURN"
        }
      ]
    },
    {
      "id": "carriage_inner_02",
      "name": "里世界·花草车厢",
      "background": "assets/Image/Scene/Background/carriage-inner-02.ie.jpg",
      "objects": [
        {
          "id": "window_inner",
          "name": "窗外",
          "image": "assets/Image/Scene/StillLife/inner-02-window.ie.png",
          "fullCanvas": true,
          "hitPosition": {
            "x": 58,
            "y": 29,
            "width": 22,
            "height": 22
          },
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_504"
        },
        {
          "id": "bottle_inner",
          "name": "彩色玻璃瓶",
          "image": "assets/Image/Scene/StillLife/inner-02-bottle.ie.png",
          "fullCanvas": true,
          "hitPosition": {
            "x": 75,
            "y": 63,
            "width": 14,
            "height": 10
          },
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_503_PICK",
          "visibleWhen": {
            "not": {
              "flag": "ev503_bottle_taken",
              "equals": true
            }
          }
        },
        {
          "id": "door_inner02_to_inner01",
          "name": "来路的车门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 1,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_503_BACK"
        },
        {
          "id": "door_inner02_to_inner03",
          "name": "通往深处的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 90,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_505",
          "invisible": true,
          "noHighlight": true
        }
      ]
    },
    {
      "id": "carriage_fake_01",
      "name": "里世界·假1号车厢",
      "background": "assets/Image/Scene/Background/carriage-fake-01.ie.jpg",
      "backgroundSound": {
        "sound": "maze"
      },
      "backgroundVariants": [
        {
          "image": "assets/Image/Scene/Background/carriage-fake-01-crew.ie.jpg",
          "visibleWhen": {
            "flag": "ev_fake01_crew_seen",
            "equals": true
          }
        }
      ],
      "objects": [
        {
          "id": "door_fake01_left",
          "name": "扭曲的车门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 1,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_FAKE01_EXIT"
        },
        {
          "id": "door_fake01_right",
          "name": "扭曲的车门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 90,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_FAKE01_EXIT"
        }
      ]
    },
    {
      "id": "carriage_fake_02",
      "name": "里世界·假2号车厢",
      "background": "assets/Image/Scene/Background/carriage-fake-02.ie.jpg",
      "objects": [
        {
          "id": "fake02_blood_1",
          "name": "血手印",
          "image": "assets/Image/Scene/StillLife/inner-blood-handprint.ie.png",
          "fullCanvas": true,
          "visualOnly": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_FAKE02_HANDPRINT_NOOP",
          "visibleWhen": {
            "flag": "ev_fake02_blood_1",
            "equals": true
          }
        },
        {
          "id": "fake02_blood_2",
          "name": "血手印",
          "image": "assets/Image/Scene/StillLife/inner-blood-handprint.ie.png",
          "fullCanvas": true,
          "visualOnly": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_FAKE02_HANDPRINT_NOOP",
          "visibleWhen": {
            "flag": "ev_fake02_blood_2",
            "equals": true
          }
        },
        {
          "id": "fake02_blood_3",
          "name": "血手印",
          "image": "assets/Image/Scene/StillLife/inner-blood-handprint.ie.png",
          "fullCanvas": true,
          "visualOnly": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_FAKE02_HANDPRINT_NOOP",
          "visibleWhen": {
            "flag": "ev_fake02_blood_3",
            "equals": true
          }
        },
        {
          "id": "fake02_blood_4",
          "name": "血手印",
          "image": "assets/Image/Scene/StillLife/inner-blood-handprint.ie.png",
          "fullCanvas": true,
          "visualOnly": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_FAKE02_HANDPRINT_NOOP",
          "visibleWhen": {
            "flag": "ev_fake02_blood_4",
            "equals": true
          }
        },
        {
          "id": "door_fake02_left",
          "name": "通往假1号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 1,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_FAKE02_LEFT"
        },
        {
          "id": "door_fake02_right",
          "name": "通往假3号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 90,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_FAKE02_RIGHT"
        }
      ]
    },
    {
      "id": "carriage_fake_03",
      "name": "里世界·假3号车厢",
      "background": "assets/Image/Scene/Background/carriage-fake-03.jpg",
      "objects": [
        {
          "id": "door_fake03_left",
          "name": "通往假2号车厢的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 1,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_FAKE03_LEFT"
        },
        {
          "id": "door_fake03_right",
          "name": "通往花海的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 90,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_510"
        }
      ]
    },
    {
      "id": "carriage_fake_04",
      "name": "里世界·伪4号车厢",
      "background": "assets/Image/Scene/Background/carriage-fake-04-fog.ie.jpg",
      "backgroundSound": {
        "sound": "fake"
      },
      "objects": [
        {
          "id": "door_fake04_back",
          "name": "原路返回的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 1,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_522"
        },
        {
          "id": "door_fake04_to_flower",
          "name": "车厢尽头的门",
          "image": "assets/Image/Scene/StillLife/carriage-door.svg",
          "position": {
            "x": 90,
            "y": 24,
            "width": 9,
            "height": 49
          },
          "zIndex": 13,
          "clickEvent": "E_510",
          "invisible": true,
          "noHighlight": true
        },
        {
          "id": "window_fake04_flower",
          "name": "车窗",
          "image": "assets/Image/Scene/StillLife/inner-03-flower-window.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_516",
          "visibleWhen": {
            "flag": "ev517_flower_revealed",
            "equals": true
          }
        },
        {
          "id": "window_fake04_fog",
          "name": "车窗",
          "image": "assets/Image/Scene/StillLife/inner-03-fog-window.ie.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_516",
          "visibleWhen": {
            "not": {
              "flag": "ev517_flower_revealed",
              "equals": true
            }
          }
        }
      ],
      "backgroundVariants": [
        {
          "image": "assets/Image/Scene/Background/carriage-fake-04.ie.jpg",
          "visibleWhen": {
            "flag": "ev517_flower_revealed",
            "equals": true
          }
        }
      ]
    },
    {
      "id": "flower_sea",
      "name": "花海·车门外",
      "background": "assets/Image/Scene/Background/flower-sea.ie.jpg",
      "backgroundSound": {
        "sound": "fake"
      },
      "objects": []
    },
    {
      "id": "flower_sea_inside",
      "name": "花海·室内",
      "background": "assets/Image/Scene/Background/flower-sea-inside.ie.jpg",
      "backgroundSound": {
        "sound": "fake"
      },
      "objects": []
    }
  ],
  "events": [
    {
      "id": "E_005",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carriage_07_entry_seen",
            "equals": true
          },
          "next": "E_005_REVISIT"
        },
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "all": [
                {
                  "flag": "note_back_seen",
                  "equals": true
                },
                {
                  "flag": "map_seen",
                  "equals": true
                }
              ]
            }
          },
          "next": "E_005_LOCKED"
        },
        {
          "type": "dialogue",
          "text": "你晃了晃把手，刚刚的动静好像把门锁打开了。"
        },
        {
          "type": "check",
          "dice": "ev005_insight_01",
          "outcomes": [
            "E_005_S",
            "E_005_F"
          ]
        }
      ]
    },
    {
      "id": "E_005_LOCKED",
      "actions": [
        {
          "type": "sound",
          "sound": "door_locked"
        },
        {
          "type": "dialogue",
          "text": "你试图打开门，但门锁住了，打不开。"
        }
      ]
    },
    {
      "id": "E_005_GUIDE",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_06_guide_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "诡异的气氛笼罩着这节6号车厢。"
        },
        {
          "type": "sound",
          "sound": "opening_cracker_bag"
        },
        {
          "type": "dialogue",
          "text": "突然，你听到一阵怪异的声音。"
        },
        {
          "type": "dialogue",
          "text": "咔——"
        },
        {
          "type": "dialogue",
          "text": "咔——"
        },
        {
          "type": "dialogue",
          "text": "咔——"
        },
        {
          "type": "dialogue",
          "text": "像有人在远处掰断什么东西。"
        },
        {
          "type": "dialogue",
          "text": "仔细辨别，你发现声音是从你的左边——7号车厢传来的。"
        }
      ]
    },
    {
      "id": "E_006_WINDOW",
      "actions": [
        {
          "type": "custom",
          "name": "randomDialogue",
          "params": {
            "texts": [
              "车站昏暗的灯光与漆黑的隧道在窗外交替掠过。",
              "你望向窗外，只看见站台灯光和黑色隧道不断交替。",
              "玻璃上映出你的影子，影子背后是飞速掠过的隧道墙壁。"
            ]
          }
        }
      ]
    },
    {
      "id": "E_006_CENTER_DOOR",
      "actions": [
        {
          "type": "custom",
          "name": "randomDialogue",
          "params": {
            "texts": [
              "你试着拉动车门，但它纹丝不动，似乎已经锈蚀锁死了。",
              "车门紧闭着，不管你怎么用力它都没有反应。",
              "你抓住门缝试着将它拉开，但车门没有丝毫松动。"
            ]
          }
        }
      ]
    },
    {
      "id": "E_005_WINDOW",
      "actions": [
        {
          "type": "custom",
          "name": "randomDialogue",
          "params": {
            "texts": [
              "车站昏暗的灯光与漆黑的隧道在窗外交替掠过。",
              "你望向窗外，只看见站台灯光和黑色隧道不断交替。",
              "玻璃上映出你的影子，影子背后是飞速掠过的隧道墙壁。"
            ]
          }
        }
      ]
    },
    {
      "id": "E_005_CENTER_DOOR",
      "actions": [
        {
          "type": "custom",
          "name": "randomDialogue",
          "params": {
            "texts": [
              "你试着拉动车门，但它纹丝不动，似乎已经锈蚀锁死了。",
              "车门紧闭着，不管你怎么用力它都没有反应。",
              "你抓住门缝试着将它拉开，但车门没有丝毫松动。"
            ]
          }
        }
      ]
    },
    {
      "id": "E_004_WINDOW",
      "actions": [
        {
          "type": "custom",
          "name": "randomDialogue",
          "params": {
            "texts": [
              "车站昏暗的灯光与漆黑的隧道在窗外交替掠过。",
              "你望向窗外，只看见站台灯光和黑色隧道不断交替。",
              "玻璃上映出你的影子，影子背后是飞速掠过的隧道墙壁。"
            ]
          }
        }
      ]
    },
    {
      "id": "E_004_CENTER_DOOR",
      "actions": [
        {
          "type": "custom",
          "name": "randomDialogue",
          "params": {
            "texts": [
              "你试着拉动车门，但它纹丝不动，似乎已经锈蚀锁死了。",
              "车门紧闭着，不管你怎么用力它都没有反应。",
              "你抓住门缝试着将它拉开，但车门没有丝毫松动。"
            ]
          }
        }
      ]
    },
    {
      "id": "E_005_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "敏锐的直觉告诉你，门后的情况绝对不简单。"
        },
        {
          "type": "dialogue",
          "text": "你凑近门想看窗户，却先闻到一股浓重的血腥味。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "portrait": "assets/Image/Portrait/player-scared.ie.png",
          "text": "……啊？"
        },
        {
          "type": "dialogue",
          "text": "你感到危险的气息从门后传来，恐惧拖住了你好奇的脚步。"
        },
        {
          "type": "dialogue",
          "text": "你选择……"
        },
        {
          "type": "choice",
          "prompt": "",
          "options": [
            {
              "label": "继续前进，探索7号车厢",
              "next": "E_005_DEPARTURE_A"
            },
            {
              "label": "留在6号车厢",
              "next": "E_005_STAY"
            }
          ]
        }
      ]
    },
    {
      "id": "E_005_STAY",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev005_stay_rewarded",
            "equals": true
          },
          "next": "E_005_STAY_REVISIT"
        },
        {
          "type": "setFlag",
          "key": "ev005_stay_rewarded",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你确认那就是血腥味无疑。你从门前退开，决定先留在6号车厢再作打算。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "冷静。深呼吸。"
        },
        {
          "type": "dialogue",
          "text": "你努力让自己冷静下来，试图理清现在的情况。"
        },
        {
          "type": "modifyAttribute",
          "attribute": "san",
          "amount": 1
        }
      ]
    },
    {
      "id": "E_005_STAY_REVISIT",
      "actions": []
    },
    {
      "id": "E_005_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "即使头脑还是昏昏沉沉，你也确信刚刚的奇怪声响就来自这里。"
        },
        {
          "type": "dialogue",
          "text": "你直接推开7号车厢的门。"
        }
      ],
      "next": "E_005_DEPARTURE_B"
    },
    {
      "id": "E_005_REVISIT",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_07"
        },
        {
          "type": "dialogue",
          "text": "你再次进入7号车厢。"
        }
      ]
    },
    {
      "id": "E_005_DEPARTURE_A",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        }
      ],
      "next": "E_006A"
    },
    {
      "id": "E_005_DEPARTURE_B",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        }
      ],
      "next": "E_006B"
    },
    {
      "id": "E_006A",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_07"
        },
        {
          "type": "sound",
          "sound": "distortion_e006",
          "duration": 2000
        },
        {
          "type": "setFlag",
          "key": "carriage_07_entry_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "车厢内部，被撕裂的人类肢体散落一地。"
        },
        {
          "type": "dialogue",
          "text": "即使早有心理准备，眼前的景象还是让你头皮发麻。"
        },
        {
          "type": "check",
          "dice": "ev006a_san_01",
          "outcomes": [
            "E_006A_SAN_S",
            "E_006A_SAN_F"
          ]
        }
      ]
    },
    {
      "id": "E_006A_SAN_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你强迫自己辨认门框与座椅的轮廓，用这些熟悉的东西压住翻涌的恐惧，终于把目光从残肢上移开。"
        }
      ]
    },
    {
      "id": "E_006A_SAN_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "血腥味像是堵进了喉咙。你弯下腰干呕了几声，直到视野不再随着心跳摇晃，才勉强站稳。"
        }
      ]
    },
    {
      "id": "E_006B",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_07"
        },
        {
          "type": "sound",
          "sound": "distortion_e006",
          "duration": 2000
        },
        {
          "type": "setFlag",
          "key": "carriage_07_entry_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "portrait": "assets/Image/Portrait/player-scared.ie.png",
          "text": "啊！！！这是什么！"
        },
        {
          "type": "dialogue",
          "text": "你毫无防备地看到车厢内部满地的碎块。它们曾经是人的一部分。"
        },
        {
          "type": "dialogue",
          "text": "你痛苦地捂住双眼，但是为时已晚。"
        },
        {
          "type": "dialogue",
          "text": "脑海中，你仿佛看到了自己也被撕裂成这些碎块的样子。"
        },
        {
          "type": "check",
          "dice": "ev006b_san_01",
          "outcomes": [
            "E_006B_SAN_S",
            "E_006B_SAN_F"
          ]
        }
      ]
    },
    {
      "id": "E_006B_SAN_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你的胃一阵痉挛，但还是咬紧牙关忍住了呕吐。你死死抓住门框，勉强贴着门边站好，不让自己再看地面。"
        }
      ]
    },
    {
      "id": "E_006B_SAN_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你踉跄着扶住门框，终于还是呕吐了出来。接连的痉挛让你几乎无法呼吸，过了好一会儿才重新抬起头。"
        },
        {
          "type": "modifyAttribute",
          "attribute": "constitution",
          "amount": -1
        }
      ]
    },
    {
      "id": "E_0008",
      "actions": [
        {
          "type": "minigame",
          "game": "radio_tuning"
        },
        {
          "type": "check",
          "dice": "ev0008_radio_tuning",
          "outcomes": [
            "E_0008_S",
            "E_0008_F"
          ]
        }
      ]
    },
    {
      "id": "E_0008_S",
      "actions": [
        {
          "type": "sound",
          "sound": "loud_noise"
        },
        {
          "type": "dialogue",
          "text": "你听到收音机传到了混杂着电流声的人声:"
        },
        {
          "type": "dialogue",
          "text": "11月15日，1号末班车发生的重大事故还在调查中.....嘶嘶"
        },
        {
          "type": "dialogue",
          "text": "嘶嘶...目前，有16名幸存者获救...但精神都遭遇了..."
        },
        {
          "type": "dialogue",
          "text": "你来不及思索，却听见7号车厢深处再次传来了刚才的声音。"
        },
        {
          "type": "dialogue",
          "text": "咔——咔——"
        }
      ],
      "next": "E_008"
    },
    {
      "id": "E_0008_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你听到收音机传到了混杂着电流声的人声:"
        },
        {
          "type": "dialogue",
          "text": "吃炸鸡时，外面那层酥壳是至关重要的...嘶嘶"
        },
        {
          "type": "dialogue",
          "text": "嘶嘶...它牢牢锁住鸡肉里面的汁水...一口咬下去，咔咔的响声让人心情愉悦..."
        },
        {
          "type": "dialogue",
          "text": "你来不及思索，却听见7号车厢深处再次传来了刚才的声音。"
        },
        {
          "type": "dialogue",
          "text": "咔——咔——"
        }
      ],
      "next": "E_008"
    },
    {
      "id": "E_007",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "corpse_07_investigated",
            "equals": true
          },
          "next": "E_007_REVISIT"
        },
        {
          "type": "dialogue",
          "text": "尸体被鲜红的血浆覆盖着，四周散落着大大小小的尸块。"
        },
        {
          "type": "dialogue",
          "text": "你努力克制转身逃跑的冲动，试图先尽你所能获得更多线索。"
        },
        {
          "type": "setFlag",
          "key": "corpse_07_investigated",
          "value": true
        },
        {
          "type": "check",
          "dice": "ev007_education_01",
          "outcomes": [
            "E_007_S",
            "E_007_F"
          ]
        }
      ]
    },
    {
      "id": "E_007_REVISIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "你已经检查过这具尸体了，没有更多发现。"
        }
      ]
    },
    {
      "id": "E_008",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev008_scouting_done",
            "equals": true
          },
          "next": "E_008_REVISIT"
        },
        {
          "type": "sound",
          "sound": "door_locked"
        },
        {
          "type": "dialogue",
          "text": "你颤抖着望向车厢深处。"
        },
        {
          "type": "dialogue",
          "text": "原本的三排座椅，现在只剩两排。"
        },
        {
          "type": "dialogue",
          "text": "通往8号车厢的门早已被黑暗淹没。"
        },
        {
          "type": "dialogue",
          "text": "你扶着座椅靠背向前挪了半步，试着从明暗交界处辨认那片黑暗的轮廓。"
        },
        {
          "type": "check",
          "dice": "ev008_insight_01",
          "outcomes": [
            "E_008_S",
            "E_008_F"
          ]
        }
      ]
    },
    {
      "id": "E_009",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev009_seen",
            "equals": true
          },
          "next": "E_009_REVISIT"
        },
        {
          "type": "custom",
          "name": "flashScreen",
          "params": {
            "duration": 650,
            "mode": "blackWhite"
          }
        },
        {
          "type": "setFlag",
          "key": "carriage_06_people_reveal",
          "value": false
        },
        {
          "type": "custom",
          "name": "refreshScene"
        },
        {
          "type": "setFlag",
          "key": "ev009_seen",
          "value": true
        },
        {
          "type": "sound",
          "sound": "dark_atmosphere_e009",
          "start": 0,
          "loop": true,
          "segmentDuration": 5000,
          "stopOnDialogueAdvance": true,
          "stopAfterDialogueAdvances": 10
        },
        {
          "type": "dialogue",
          "text": "工作了一整天的疲惫让你难以集中注意力。"
        },
        {
          "type": "dialogue",
          "text": "再次回过神来的时候，你猛然发现其他的座椅已经空无一人。"
        },
        {
          "type": "dialogue",
          "text": "你左边一个男人坐过的位置，椅垫还微微凹陷着。"
        },
        {
          "type": "dialogue",
          "text": "右边一本杂志摊在座位上，纸页摸上去还是温的。"
        },
        {
          "type": "dialogue",
          "text": "你瞥见对面的车窗有什么一闪而过。"
        },
        {
          "type": "dialogue",
          "text": "只见车窗上映出你苍白的脸————还有你身后的乘客们。"
        },
        {
          "type": "dialogue",
          "text": "他们仍坐在原来的位置上，安静地沉睡着。"
        },
        {
          "type": "dialogue",
          "text": "你猛地回头。"
        },
        {
          "type": "dialogue",
          "text": "依旧空无一人。"
        },
        {
          "type": "dialogue",
          "text": "你再看车窗。"
        },
        {
          "type": "dialogue",
          "text": "这一次，车窗上只剩下你惊恐的面容，旁边空无一人。"
        },
        {
          "type": "dialogue",
          "portrait": "assets/Image/Portrait/player-scared.ie.png",
          "text": "刚才的人，都去哪了？",
          "audio": {
            "sound": "bullying_e009",
            "start": 0,
            "duration": 3000
          }
        },
        {
          "type": "dialogue",
          "text": "突然，广播响起："
        },
        {
          "type": "dialogue",
          "text": "“下一站——”"
        },
        {
          "type": "dialogue",
          "text": "声音戛然而止，只剩下电流的嘶嘶声。"
        },
        {
          "type": "dialogue",
          "text": "几秒之后再次响起："
        },
        {
          "type": "dialogue",
          "text": "“下一站——”"
        },
        {
          "type": "dialogue",
          "text": "还是中断。"
        },
        {
          "type": "dialogue",
          "text": "你屏息凝神，试图听清广播里断断续续的声音。"
        },
        {
          "type": "dialogue",
          "text": "只听见第三次广播传来："
        },
        {
          "type": "dialogue",
          "text": "“终点站，到了————”"
        },
        {
          "type": "dialogue",
          "text": "你再次朝车窗外看去，电车还在飞速前进。"
        },
        {
          "type": "check",
          "dice": "ev010_san_01",
          "outcomes": [
            "E_009_SAN_S",
            "E_009_SAN_F"
          ]
        }
      ]
    },
    {
      "id": "E_009_SAN_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你把视线从车窗上移开，逐一确认座椅与行李架。那些乘客没有回来，至少眼前的车厢仍然是空的。"
        }
      ]
    },
    {
      "id": "E_009_SAN_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你不敢再看车窗。即使转过身，那排沉睡的倒影仍黏在视野边缘，仿佛一眨眼就会再次出现。"
        }
      ]
    },
    {
      "id": "E_009_REVISIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "6号车厢依旧空着。你的视线刻意避开车窗，只注视通往5号车厢的门。"
        }
      ]
    },
    {
      "id": "E_GO_06_05",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "ev008_scouting_done",
              "equals": true
            }
          },
          "next": "E_GO_06_05_LOCKED"
        },
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "setFlag",
          "key": "carriage_05_newspaper_available",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "carriage_06_eaten",
          "value": true
        },
        {
          "type": "changeScene",
          "scene": "carriage_05"
        },
        {
          "type": "dialogue",
          "text": "你穿过门，来到5号车厢。"
        }
      ],
      "next": "E_010"
    },
    {
      "id": "E_GO_06_05_LOCKED",
      "actions": [
        {
          "type": "dialogue",
          "text": "远处不断传来怪异的断裂声。贸然前进之前，你得先确认7号车厢发生了什么。"
        }
      ]
    },
    {
      "id": "E_GO_05_04",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "hasItem": "newspaper"
            }
          },
          "next": "E_GO_05_04_LOCKED"
        },
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_04"
        },
        {
          "type": "setFlag",
          "key": "crew_met",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你穿过门，来到4号车厢。"
        }
      ],
      "next": "E_013_ENTRY"
    },
    {
      "id": "E_GO_05_04_LOCKED",
      "actions": [
        {
          "type": "dialogue",
          "text": "散落的物品中似乎藏着重要线索。你决定先调查清楚再继续前进。"
        }
      ]
    },
    {
      "id": "E_NOTE_06_ITEM",
      "actions": [
        {
          "type": "inspect",
          "item": "note_06_item",
          "title": "便签",
          "text": "「PRYH IRUZDUG」，背面写着：第三个箱子里有藏着钥匙。",
          "image": "assets/Image/Item/note.ie.png",
          "large": true
        }
      ]
    },
    {
      "id": "E_905",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "setFlag",
          "key": "carriage_06_people_reveal",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "ev009_seen",
          "value": true
        },
        {
          "type": "changeScene",
          "scene": "carriage_06"
        },
        {
          "type": "dialogue",
          "text": "你从7号车厢回到6号车厢。"
        }
      ]
    },
    {
      "id": "E_001",
      "actions": [
        {
          "type": "dialogue",
          "text": "2013年11月15日，你搭乘了本日的1号线末班电车，目的地是终点站。"
        },
        {
          "type": "dialogue",
          "text": "车上的乘客无论是忙了一天，还是刚参加完应酬，都各自拖着疲累的身躯在车厢里陷入了深沉的睡眠。"
        },
        {
          "type": "dialogue",
          "text": "由于睡得太熟，直到现在才醒来的你发现车厢里只剩自己和几名沉睡的乘客。"
        },
        {
          "type": "dialogue",
          "text": "你并不清楚自己睡了多久，但电车还在继续奔走。"
        },
        {
          "type": "dialogue",
          "text": "窗外没有任何街灯或照明，有如在漆黑的隧道中。"
        },
        {
          "type": "dialogue",
          "text": "你总感觉哪里不太对，或许……"
        },
        {
          "type": "check",
          "dice": "ev001_insight_01",
          "outcomes": [
            "E_001_S",
            "E_001_F"
          ]
        }
      ]
    },
    {
      "id": "E_001_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "不对，现在明明早应该到了终点站了……"
        },
        {
          "type": "dialogue",
          "text": "不祥的预感在你心头笼罩。"
        }
      ],
      "next": "E_OPENING_RETURN_06"
    },
    {
      "id": "E_001_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "或许只是太累了吧。还有几站到站？"
        }
      ],
      "next": "E_OPENING_RETURN_06"
    },
    {
      "id": "E_OPENING_RETURN_06",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_06_people_reveal",
          "value": true
        },
        {
          "type": "changeScene",
          "scene": "carriage_06"
        }
      ],
      "next": "E_009"
    },
    {
      "id": "E_002",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "note_front_seen",
            "equals": true
          },
          "next": "E_002_REVISIT"
        },
        {
          "type": "inspect",
          "title": "便签",
          "text": "「PRYH IRUZDUG」这是……什么意思？",
          "image": "assets/Image/Ui/label-front.ie.png",
          "large": true
        },
        {
          "type": "check",
          "dice": "ev002_insight_01",
          "outcomes": [
            "E_002_S",
            "E_002_F"
          ]
        }
      ]
    },
    {
      "id": "E_002_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你莫名觉得有些眼熟，思索片刻，你想起来这是凯撒密码。"
        },
        {
          "type": "dialogue",
          "text": "每个字母往前推三个的话，就是……"
        },
        {
          "type": "dialogue",
          "text": "「MOVE FORWARD」"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "……"
        },
        {
          "type": "setFlag",
          "key": "note_front_seen",
          "value": true
        }
      ]
    },
    {
      "id": "E_002_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你盯着便签看了半天，只是一堆混乱的字母，没有丝毫头绪。"
        },
        {
          "type": "setFlag",
          "key": "note_front_seen",
          "value": true
        }
      ]
    },
    {
      "id": "E_002_REVISIT",
      "actions": [
        {
          "type": "inspect",
          "title": "便签正面",
          "text": "「PRYH IRUZDUG」这是……什么意思？",
          "image": "assets/Image/Ui/label-front.ie.png",
          "large": true
        }
      ]
    },
    {
      "id": "E_003",
      "actions": [
        {
          "type": "sound",
          "sound": "tearing"
        },
        {
          "type": "dialogue",
          "text": "你把便签撕了下来，发现背面居然还有字。"
        },
        {
          "type": "inspect",
          "title": "便签背面",
          "text": "「第三个箱子里藏着钥匙。」箱子？这里哪有箱子。",
          "image": "assets/Image/Ui/label-back.ie.png",
          "large": true
        },
        {
          "type": "setFlag",
          "key": "note_back_seen",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "note_collected",
          "value": true
        },
        {
          "type": "setObjectState",
          "object": "note_back_06",
          "patch": {
            "hidden": true
          }
        },
        {
          "type": "setObjectState",
          "object": "note_06",
          "patch": {
            "hidden": true
          }
        },
        {
          "type": "addItem",
          "item": "note_06_item"
        },
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "flag": "note_back_seen",
                "equals": true
              },
              {
                "flag": "map_seen",
                "equals": true
              },
              {
                "not": {
                  "flag": "carriage_06_guide_seen",
                  "equals": true
                }
              }
            ]
          },
          "next": "E_005_GUIDE"
        }
      ]
    },
    {
      "id": "E_004",
      "actions": [
        {
          "type": "dialogue",
          "text": "车门上有一张不知谁贴上去的纸。好像是电车车厢示意图。纸角有怪异的污渍。"
        },
        {
          "type": "check",
          "dice": "ev004_insight_01",
          "outcomes": [
            "E_004_S",
            "E_004_F"
          ]
        }
      ]
    },
    {
      "id": "E_004_S",
      "actions": [
        {
          "type": "inspect",
          "title": "地图检定成功",
          "text": "你仔细查看地图，猛然发觉 7 号车厢以后的部分是被人蓄意涂掉的。",
          "image": "assets/Image/Ui/map-success.ie.png",
          "large": true
        },
        {
          "type": "setFlag",
          "key": "map_seen",
          "value": true
        },
        {
          "type": "setObjectState",
          "object": "map_06",
          "patch": {
            "hidden": true
          }
        },
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "flag": "note_back_seen",
                "equals": true
              },
              {
                "flag": "map_seen",
                "equals": true
              },
              {
                "not": {
                  "flag": "carriage_06_guide_seen",
                  "equals": true
                }
              }
            ]
          },
          "next": "E_005_GUIDE"
        }
      ]
    },
    {
      "id": "E_004_F",
      "actions": [
        {
          "type": "inspect",
          "title": "地图检定失败",
          "text": "你仔细查看，但是 7 号车厢以后的部分被染红，看不清楚。",
          "image": "assets/Image/Ui/map-failure.ie.png",
          "large": true
        },
        {
          "type": "setFlag",
          "key": "map_seen",
          "value": true
        },
        {
          "type": "setObjectState",
          "object": "map_06",
          "patch": {
            "hidden": true
          }
        },
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "flag": "note_back_seen",
                "equals": true
              },
              {
                "flag": "map_seen",
                "equals": true
              },
              {
                "not": {
                  "flag": "carriage_06_guide_seen",
                  "equals": true
                }
              }
            ]
          },
          "next": "E_005_GUIDE"
        }
      ]
    },
    {
      "id": "E_007_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你观察尸体，组织仍有弹性，血液也没有干透，有些部分还是鲜红色。"
        },
        {
          "type": "dialogue",
          "text": "看上去刚刚死去不久。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "portrait": "assets/Image/Portrait/player-scared.ie.png",
          "text": "这是否意味着这附近……"
        },
        {
          "type": "dialogue",
          "text": "不远处，一台收音机发出嘶嘶的电流声，吸引了你的注意。"
        },
        {
          "type": "setFlag",
          "key": "visited_carriage_07",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "radio_07_ready",
          "value": true
        }
      ]
    },
    {
      "id": "E_007_F",
      "actions": [
        {
          "type": "dialogue",
          "speaker": "你",
          "portrait": "assets/Image/Portrait/player-scared.ie.png",
          "text": "天哪……还是不要继续看下去了。"
        },
        {
          "type": "dialogue",
          "text": "死者生前究竟经历了什么？你只感觉脊背发凉。"
        },
        {
          "type": "dialogue",
          "text": "不远处，一台收音机发出嘶嘶的电流声，吸引了你的注意。"
        },
        {
          "type": "setFlag",
          "key": "visited_carriage_07",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "radio_07_ready",
          "value": true
        }
      ]
    },
    {
      "id": "E_008_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你屏住呼吸，终于发现黑暗的边缘正在有规律地收缩。"
        },
        {
          "type": "dialogue",
          "text": "两排金属座椅被缓慢拖进去。"
        },
        {
          "type": "dialogue",
          "text": "然后传来刚才那个声音。"
        },
        {
          "type": "dialogue",
          "text": "咔————"
        },
        {
          "type": "dialogue",
          "text": "明暗交界处，你看到了一个疑似嘴的东西。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "portrait": "assets/Image/Portrait/player-scared.ie.png",
          "text": "这……这是什么！"
        },
        {
          "type": "setFlag",
          "key": "ev008_scouting_ok",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "ev008_scouting_done",
          "value": true
        },
        {
          "type": "check",
          "dice": "ev008_san_01",
          "outcomes": [
            "E_008_SAN_S",
            "E_008_SAN_F"
          ]
        }
      ]
    },
    {
      "id": "E_008_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "即使盯得双眼发酸，你仍无法看清黑暗里究竟藏着什么。"
        },
        {
          "type": "dialogue",
          "text": "一股带着腥气的热风贴着地面涌来，紧接着，金属座椅在黑暗中发出被挤压的呻吟。"
        },
        {
          "type": "dialogue",
          "text": "咔————"
        },
        {
          "type": "dialogue",
          "text": "你不知道那里是什么，但你知道真的不应该再靠近了。"
        },
        {
          "type": "setFlag",
          "key": "ev008_scouting_ok",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "ev008_scouting_done",
          "value": true
        }
      ],
      "next": "E_008_AFTER"
    },
    {
      "id": "E_008_SAN_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你死死抓住座椅边缘，冰冷的金属让你确认自己仍站在车厢里。那个东西现在还没有靠近。"
        }
      ],
      "next": "E_008_AFTER"
    },
    {
      "id": "E_008_SAN_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "那张嘴开合的节奏钻进了脑海。你听见自己的牙齿相互碰撞，双腿几乎不听使唤。"
        }
      ],
      "next": "E_008_AFTER"
    },
    {
      "id": "E_008_AFTER",
      "actions": [
        {
          "type": "setFlag",
          "key": "visited_carriage_07",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你不敢继续停留，扶着座椅迅速退回门边。这里必须尽快离开。"
        }
      ]
    },
    {
      "id": "E_008_REVISIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "车厢尽头仍被那片黑暗吞没，你觉得不应该再靠近了。"
        }
      ]
    },
    {
      "id": "E_010",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carriage_05_entry_seen",
            "equals": true
          },
          "next": "E_010_REVISIT"
        },
        {
          "type": "setFlag",
          "key": "carriage_05_entry_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "5号车厢同样空无一人。报纸、背包和零散杂物落在座椅与过道间。"
        },
        {
          "type": "dialogue",
          "text": "像是乘客在同一瞬间凭空消失了。"
        },
        {
          "type": "dialogue",
          "text": "你回头看6号车厢，物品还在，灯也还亮着。"
        }
      ]
    },
    {
      "id": "E_011",
      "actions": [
        {
          "type": "custom",
          "name": "newspaperBlackout"
        },
        {
          "type": "sound",
          "sound": "switch1",
          "startWithoutMetadata": true,
          "fadeMs": 0
        },
        {
          "type": "dialogue",
          "text": "你从座椅下抽出报纸，抖掉沾在纸角的灰。展开它的瞬间，5号车厢的灯突然灭了。"
        },
        {
          "type": "dialogue",
          "text": "回头望去，6号车厢同样一片黑暗。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "flashlight"
          },
          "next": "E_011_FLASHLIGHT"
        }
      ],
      "next": "E_011_NO_FLASHLIGHT"
    },
    {
      "id": "E_011_FLASHLIGHT",
      "actions": [
        {
          "type": "dialogue",
          "text": "你突然想起来，自己刚刚好像找到了手电筒，不知道能不能用。"
        },
        {
          "type": "custom",
          "name": "awaitNewspaperFlashlight",
          "params": {
            "label": "点击手电筒"
          }
        },
        {
          "type": "dialogue",
          "text": "借着手电筒的光，你看清了报纸上的字。"
        }
      ],
      "next": "E_011_S"
    },
    {
      "id": "E_011_NO_FLASHLIGHT",
      "actions": [
        {
          "type": "sound",
          "sound": "heartbeats",
          "loop": true,
          "stopOnDialogueAdvance": true
        },
        {
          "type": "dialogue",
          "text": "你不敢贸然行动，只得等待。心跳的声音在空荡的车厢中震耳欲聋，不知过了多久——"
        },
        {
          "type": "dialogue",
          "text": "灯突然亮了。"
        },
        {
          "type": "custom",
          "name": "restoreNewspaperLighting"
        }
      ],
      "next": "E_011_S"
    },
    {
      "id": "E_011_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你先检查报头和版次，日期清楚地印着“11月17日”。"
        },
        {
          "type": "sound",
          "sound": "tinnitus_e011",
          "loop": true,
          "segmentDuration": 2000,
          "stopOnDialogueAdvance": true
        },
        {
          "type": "dialogue",
          "text": "它所报道的，正是你现在乘坐的这一班电车。"
        },
        {
          "type": "dialogue",
          "text": "你接着往后读。"
        },
        {
          "type": "dialogue",
          "text": "截至本报截稿时，共有22名乘客获救，1名女性乘务员生还……"
        },
        {
          "type": "dialogue",
          "text": "事故原因警方仍在调查中……"
        },
        {
          "type": "dialogue",
          "text": "幸存者声称……"
        },
        {
          "type": "dialogue",
          "text": "后面的内容看不清了。"
        },
        {
          "type": "dialogue",
          "text": "你不可置信地反复确认，却只见版面上写着："
        },
        {
          "type": "sound",
          "sound": "siren_e011",
          "loop": true,
          "segmentDuration": 3000,
          "stopOnDialogueAdvance": true,
          "stopAfterDialogueAdvances": 3
        },
        {
          "type": "dialogue",
          "text": "「只管前进吧，已经没有退路了。」"
        },
        {
          "type": "dialogue",
          "text": "「只管前进吧，已经没有退路了。」"
        },
        {
          "type": "dialogue",
          "text": "「只管前进吧，已经没有退路了。」"
        },
        {
          "type": "dialogue",
          "text": "报纸底边，有一行小字："
        },
        {
          "type": "dialogue",
          "text": "「DON'T STOP.」"
        },
        {
          "type": "dialogue",
          "text": "字迹与6号车厢那张便签几乎一模一样。"
        },
        {
          "type": "dialogue",
          "text": "写下这些话的人，看来是同一个。"
        },
        {
          "type": "setFlag",
          "key": "carriage_05_newspaper_available",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "carriage_05_newspaper_collected",
          "value": true
        },
        {
          "type": "addItem",
          "item": "newspaper"
        },
        {
          "type": "setFlag",
          "key": "carriage_05_inspected_newspaper",
          "value": true
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carriage_05_newspaper_flashlight",
            "equals": true
          },
          "next": "E_011_FLASHLIGHT_LIGHTS_ON"
        },
        {
          "type": "custom",
          "name": "restoreNewspaperLighting",
          "params": {
            "halfDark": true
          }
        },
        {
          "type": "check",
          "dice": "ev011_san_01",
          "outcomes": [
            "E_011_SAN_S",
            "E_011_SAN_F"
          ]
        }
      ]
    },
    {
      "id": "E_011_FLASHLIGHT_LIGHTS_ON",
      "actions": [
        {
          "type": "dialogue",
          "text": "电力又恢复了，但是灯只亮了一半。"
        },
        {
          "type": "dialogue",
          "text": "后排车厢的阴影令人感到不安。"
        },
        {
          "type": "custom",
          "name": "restoreNewspaperLighting",
          "params": {
            "halfDark": true
          }
        },
        {
          "type": "check",
          "dice": "ev011_san_01",
          "outcomes": [
            "E_011_SAN_S",
            "E_011_SAN_F"
          ]
        }
      ]
    },
    {
      "id": "E_011_SAN_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你压住报纸发颤的边角，把日期、获救人数和那句警告重新记了一遍。恐惧没有消失，但线索至少还能被整理。"
        }
      ],
      "next": "E_011_AFTER"
    },
    {
      "id": "E_011_SAN_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "纸上的字像虫群一样挤在一起。你用力折起报纸，指尖仍止不住地发抖，那句“不要停下”却牢牢留在脑中。"
        }
      ],
      "next": "E_011_AFTER"
    },
    {
      "id": "E_011_AFTER",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "flag": "carriage_05_inspected_clutter_a",
                "equals": true
              },
              {
                "flag": "carriage_05_inspected_clutter_b",
                "equals": true
              },
              {
                "flag": "carriage_05_inspected_tools",
                "equals": true
              },
              {
                "flag": "carriage_05_inspected_newspaper",
                "equals": true
              },
              {
                "flag": "carriage_05_inspected_clutter_c",
                "equals": true
              },
              {
                "flag": "carriage_05_inspected_clutter_d",
                "equals": true
              },
              {
                "not": {
                  "flag": "carriage_05_all_inspected_rewarded",
                  "equals": true
                }
              }
            ]
          },
          "next": "E_05_ALL_INSPECTED_REWARD_NEWSPAPER"
        }
      ],
      "next": "E_011_AFTER_CONTINUE"
    },
    {
      "id": "E_05_ALL_INSPECTED_REWARD_NEWSPAPER",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_05_all_inspected_rewarded",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你把车厢里散落的物品逐一检查完毕，混乱的细节终于在脑中连成了线索。"
        },
        {
          "type": "modifyAttribute",
          "attribute": "insight",
          "amount": 1
        },
        {
          "type": "modifyAttribute",
          "attribute": "san",
          "amount": 1
        }
      ],
      "next": "E_011_AFTER_CONTINUE"
    },
    {
      "id": "E_011_AFTER_CONTINUE",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev008_scouting_ok",
            "equals": true
          },
          "next": "E_012"
        }
      ]
    },
    {
      "id": "E_012",
      "actions": [
        {
          "type": "dialogue",
          "text": "你听到背后传来一阵声响，来自6号车厢的方向。"
        }
      ],
      "next": "E_012_AFTER"
    },
    {
      "id": "E_012_S",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_06_eaten_reveal_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "portrait": "assets/Image/Portrait/player-scared.ie.png",
          "text": "你跨进6号车厢，终于看清刚才那阵声响留下了什么。"
        },
        {
          "type": "dialogue",
          "text": "你的眼前，6号车厢只剩不到半截。"
        },
        {
          "type": "dialogue",
          "text": "而在车厢尽头，是和7号车厢如出一辙的黑暗。"
        },
        {
          "type": "check",
          "dice": "ev012_san_01",
          "outcomes": [
            "E_012_SAN_S",
            "E_012_SAN_F"
          ]
        }
      ]
    },
    {
      "id": "E_012_SAN_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你咬住舌尖，用疼痛把意识从那片黑暗中拽回来。车厢正在被吞掉，这不是错觉。"
        }
      ]
    },
    {
      "id": "E_012_SAN_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你眼睁睁看着黑暗侵入车厢，却无法判断它离自己还有多远。直到灯光闪烁，你才发现自己一直忘了呼吸。"
        }
      ]
    },
    {
      "id": "E_012_AFTER",
      "actions": [
        {
          "type": "dialogue",
          "text": "当你回过神来，你发现5号车厢的灯灭了一半。"
        },
        {
          "type": "dialogue",
          "text": "你感到黑暗即将把你吞没，这里不能再呆下去了。"
        },
        {
          "type": "dialogue",
          "text": "本能催促着你尽快离开这里，继续向前。"
        }
      ]
    },
    {
      "id": "E_013_ENTRY",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_entry_seen",
            "equals": true
          },
          "next": "E_013_REVISIT"
        },
        {
          "type": "setFlag",
          "key": "crew_04_entry_seen",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "crew_met",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "一进入车厢，你就发现一名重伤昏迷的乘务员倒在地上。"
        }
      ]
    },
    {
      "id": "E_013_REVISIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员仍然倒在这里，没有苏醒。你还没有处理她的伤口。"
        }
      ]
    },
    {
      "id": "E_013",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_interacted",
            "equals": true
          },
          "next": "E_013_CANCEL"
        }
      ],
      "next": "E_013_USE"
    },
    {
      "id": "E_013_USE",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_medical_attempted",
            "equals": true
          },
          "next": "E_013_USE_SECOND"
        },
        {
          "type": "setFlag",
          "key": "crew_04_medical_attempted",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你先确认她仍有呼吸，再检查腿上的咬伤。出血最严重的位置在膝下，必须先压迫止血，再固定伤口。"
        },
        {
          "type": "check",
          "dice": "ev013_education_01",
          "checkId": "crew_04_medical",
          "outcomes": [
            "E_013_S",
            "E_013_F_RETRY"
          ]
        }
      ]
    },
    {
      "id": "E_013_USE_SECOND",
      "actions": [
        {
          "type": "dialogue",
          "text": "你擦掉手心的血，重新调整布条的位置。这一次必须避开伤口边缘，把压力准确落在出血点上。"
        },
        {
          "type": "check",
          "dice": "ev013_education_01",
          "checkId": "crew_04_medical",
          "outcomes": [
            "E_013_S",
            "E_013_F"
          ]
        }
      ]
    },
    {
      "id": "E_013_CANCEL",
      "actions": []
    },
    {
      "id": "E_013_S",
      "actions": [
        {
          "type": "setFlag",
          "key": "crew_04_interacted",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "crew_04_medical_success",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你收紧最后一道固定结，确认渗血速度慢了下来。乘务员皱起眉，终于恢复了意识。"
        },
        {
          "type": "modifyAttribute",
          "attribute": "san",
          "amount": 2
        },
        {
          "type": "setFlag",
          "key": "crew_04_medical_failed",
          "value": false
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "啊……呃……天哪……"
        }
      ],
      "next": "E_014_TALK_ENTRY"
    },
    {
      "id": "E_013_F_RETRY",
      "actions": [
        {
          "type": "dialogue",
          "text": "你试着压住伤口，却把布条缠得太松。鲜血很快从边缘渗出，颤抖的双手也让固定结不断滑脱。"
        },
        {
          "type": "dialogue",
          "text": "乘务员的情况仍然危急，也许你还能再试一次。"
        },
        {
          "type": "setFlag",
          "key": "crew_04_medical_failed",
          "value": true
        }
      ]
    },
    {
      "id": "E_013_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你再次尝试调整包扎，可越是催促自己冷静，手指越不听使唤。伤口仍在渗血，乘务员的呼吸也没有好转。"
        },
        {
          "type": "dialogue",
          "text": "多次尝试无果后，你只能放弃对这位乘务员的救治。"
        },
        {
          "type": "setFlag",
          "key": "crew_04_medical_failed",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "crew_04_interacted",
          "value": true
        }
      ]
    },
    {
      "id": "E_014_TALK_ENTRY",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员脸色惨白，额头不断冒出冷汗。她忍着疼痛睁开眼，喉咙里挤出微弱的声音。"
        },
        {
          "type": "dialogue",
          "text": "或许她是帮助你逃离这里的关键。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "你还能说话吗？这里到底发生了什么？"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "看……看起来像人的怪物，突然袭击了我们。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "它们扑向乘客，一个接一个地撕咬，像野兽捕食一样。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "到处都是惨叫……我逃跑时也被咬了一口，幸好还是从那节车厢里逃了出来。"
        },
        {
          "type": "dialogue",
          "text": "你不敢相信这样人吃人的故事，但乘务员腿上的咬伤又强迫着你相信。"
        },
        {
          "type": "dialogue",
          "text": "你硬着头皮，想要追问更多信息。"
        }
      ],
      "next": "E_014_TALK"
    },
    {
      "id": "E_014_TALK",
      "actions": [
        {
          "type": "minigame",
          "game": "crew_negotiation"
        },
        {
          "type": "check",
          "dice": "ev014_negotiation_final_01",
          "outcomes": [
            "E_014_TALK_S",
            "E_014_TALK_F"
          ]
        }
      ]
    },
    {
      "id": "E_014_TALK_S",
      "actions": [
        {
          "type": "setFlag",
          "key": "monster_behavior_known",
          "value": true
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "那些怪物具体是什么样的？你还能想起来吗？"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "样子……我当时跑得太匆忙，记不清了。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "但它们似乎对声音很敏感。我被咬伤时，疼得把手边的东西甩到墙上，它们立刻转向了声响。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "呃啊……"
        }
      ],
      "next": "E_015"
    },
    {
      "id": "E_014_TALK_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你接连抛出几个问题，却没有给她喘息和回忆的时间。乘务员缩回座椅，只重复着“记不清了”。"
        },
        {
          "type": "dialogue",
          "text": "你没能问出怪物的弱点，只能先记住她提到的袭击方向。"
        }
      ],
      "next": "E_015"
    },
    {
      "id": "E_015",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员看着列车还在行进，突然想到了什么。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "我原本...保管着驾驶室钥匙和操作面板钥匙，放在随身黑色包里。"
        },
        {
          "type": "dialogue",
          "text": "钥匙？！在哪里？"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "逃跑...逃跑时背带被切断了，没时间去捡。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "天呐...那大概掉在哪里，你记得吗？"
        },
        {
          "type": "dialogue",
          "text": "乘务员皱起眉头，努力回想。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "大概在... 3号车厢前门附近。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "...请想办法停车逃跑，拜托了。"
        }
      ],
      "next": "E_016"
    },
    {
      "id": "E_016",
      "actions": [
        {
          "type": "dialogue",
          "text": "她再次抓住你的衣角："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "3号车厢堆了不少行李。要是通道被堵住，4号员工柜里有应急割带器和撬杆。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "快去拿钥匙。进了驾驶室，把右杆持续往上拉——列车会不断减速，直到停下来。"
        },
        {
          "type": "dialogue",
          "text": "你点点头，却控制不住想起报纸上那一行小字「DON'T STOP」。"
        },
        {
          "type": "dialogue",
          "text": "生命的重量压得你有些喘不过气。"
        },
        {
          "type": "dialogue",
          "text": "接下来得马上去3号车厢找钥匙了。"
        },
        {
          "type": "dialogue",
          "text": "看着眼前腿部重伤的乘务员，你内心万般纠结。"
        },
        {
          "type": "choice",
          "prompt": "",
          "options": [
            {
              "label": "背起乘务员",
              "next": "E_016_CARRY_CHECK"
            },
            {
              "label": "留下乘务员",
              "next": "E_016_LEAVE"
            }
          ]
        }
      ]
    },
    {
      "id": "E_016_LEAVE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你把她扶到靠窗的座位上，用散落的行李简单遮挡住她："
        },
        {
          "type": "dialogue",
          "text": "“等我拿到钥匙，就回来接你。”"
        },
        {
          "type": "dialogue",
          "text": "她抓住你的手腕，眼神里既有恐惧，也有恳求："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "好，我等你...但不管你回不回来，记得停车。"
        },
        {
          "type": "dialogue",
          "text": "你点头，却说不出话。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "（停下车逃出去吗？可是刚刚我所看见的……）"
        },
        {
          "type": "dialogue",
          "text": "挥之不去的焦虑袭上你的心头。"
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "crew_04_left_seated",
          "value": true
        }
      ]
    },
    {
      "id": "E_016_CARRY_CHECK",
      "actions": [
        {
          "type": "dialogue",
          "text": "你让她把手臂搭过肩膀，自己半蹲下去，试着在不碰到伤腿的情况下托住她的身体。"
        },
        {
          "type": "check",
          "dice": "ev016_constitution_01",
          "outcomes": [
            "E_016_CARRY_SUCCESS",
            "E_016_CARRY_FAIL"
          ]
        }
      ]
    },
    {
      "id": "E_016_CARRY_SUCCESS",
      "actions": [
        {
          "type": "dialogue",
          "text": "你深吸一口气，绷紧腰背，稳稳撑住了她下坠的重量。"
        },
        {
          "type": "dialogue",
          "text": "起身时你的膝盖一阵发酸，但重心没有散。你调整好她的手臂，终于把她背了起来。"
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": true
        }
      ]
    },
    {
      "id": "E_016_CARRY_FAIL",
      "actions": [
        {
          "type": "dialogue",
          "text": "你刚撑起身体，伤腿的晃动就让她痛得倒吸一口冷气。你的手臂也随之一软，只能立刻把她放回地面。"
        },
        {
          "type": "dialogue",
          "text": "你把她扶到靠窗的座位上，用散落的行李简单遮挡住她："
        },
        {
          "type": "dialogue",
          "text": "“等我拿到钥匙，就回来接你。”"
        },
        {
          "type": "dialogue",
          "text": "她抓住你的手腕，眼神里既有恐惧，也有恳求："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "好，我等你...但不管你回不回来，记得停车。"
        },
        {
          "type": "dialogue",
          "text": "你点头，却说不出话。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "（停下车逃出去吗？可是刚刚我所看见的……）"
        },
        {
          "type": "dialogue",
          "text": "挥之不去的焦虑袭上你的心头。"
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": false
        }
      ]
    },
    {
      "id": "E_017",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "carriage_03_entry_narrative_v2_done",
              "equals": true
            }
          },
          "next": "E_018"
        },
        {
          "type": "dialogue",
          "text": "你一路清开通道，向3号车厢前门移动。越靠近前门，行李堆得越高，几乎齐腰。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_bag_interacted",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        },
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "hasItem": "emergency_cutter"
              },
              {
                "hasItem": "pry_bar"
              }
            ]
          },
          "next": "E_017_TOOLS_READY"
        },
        {
          "type": "dialogue",
          "text": "透过行李缝隙，你看到了那个黑色背包——背带被整整齐齐地切断。可它被压在行李堆最底下，你伸手试了几次，只碰到一根冰凉的带子，拉不出来。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_018_CARRIED_TOOL_HINT"
        }
      ],
      "next": "E_018_ALONE_TOOL_HINT"
    },
    {
      "id": "E_017_TOOLS_READY",
      "actions": [],
      "next": "E_018_TOOLS_READY"
    },
    {
      "id": "E_018_TOOLS_READY",
      "actions": [
        {
          "type": "dialogue",
          "text": "你一路清开通道，向3号车厢前门移动。越靠近前门，行李堆得越高，几乎齐腰。"
        },
        {
          "type": "dialogue",
          "text": "你用应急割带器和撬杆清开行李。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_bag_exposed",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        },
        {
          "type": "dialogue",
          "text": "黑色背包终于露了出来。"
        }
      ],
      "next": "E_018_SEARCH_PHONE"
    },
    {
      "id": "E_018",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_03_first_entry_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "车厢内散落着大量行李，你的行动受阻。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_018_CARRIED_ENTRY"
        }
      ],
      "next": "E_018_ALONE_ENTRY"
    },
    {
      "id": "E_018_CARRIED_ENTRY",
      "actions": [
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "...前门，就在前面。"
        },
        {
          "type": "dialogue",
          "text": "你背着她走进3号车厢。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "......前面，就是4号车厢了。"
        },
        {
          "type": "dialogue",
          "text": "你停下：“这里是3号车厢。”"
        },
        {
          "type": "dialogue",
          "text": "她抬头看了看门上的编号，良久，沉默下来。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "......对。"
        },
        {
          "type": "dialogue",
          "text": "你们都没有再说话。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_entry_narrative_v2_done",
          "value": true
        }
      ]
    },
    {
      "id": "E_018_ALONE_ENTRY",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_medical_failed",
            "equals": true
          },
          "next": "E_018_ALONE_ENTRY_NO_CREW"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_dead",
            "equals": true
          },
          "next": "E_018_ALONE_ENTRY_NO_CREW"
        },
        {
          "type": "dialogue",
          "text": "你想起她的话：黑包，3号前门。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_entry_narrative_v2_done",
          "value": true
        }
      ]
    },
    {
      "id": "E_018_CARRIED_TOOL_HINT",
      "actions": [
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "......得先清开这些行李。靠手是扯不断的。"
        }
      ],
      "next": "E_018_SEARCH_PHONE"
    },
    {
      "id": "E_018_ALONE_TOOL_HINT",
      "actions": [
        {
          "type": "dialogue",
          "text": "你试着硬拽，行李纹丝不动。你需要能割断带子、撬开箱体的工具。"
        }
      ],
      "next": "E_018_SEARCH_PHONE"
    },
    {
      "id": "E_018_SEARCH_PHONE",
      "actions": [
        {
          "type": "sound",
          "sound": "finding_in_papers"
        },
        {
          "type": "dialogue",
          "text": "你决定先看看四周有什么能用的东西，在杂乱中翻找到了一部手机。"
        },
        {
          "type": "dialogue",
          "text": "呼...太好了。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_phone_available",
          "value": true
        }
      ]
    },
    {
      "id": "E_018_PHONE",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_03_phone_available",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "carriage_03_phone_collected",
          "value": true
        },
        {
          "type": "addItem",
          "item": "phone"
        },
        {
          "type": "dialogue",
          "text": "屏幕上赫然显示：2013年11月15日。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_018_PHONE_SOUND_CARRIED"
        }
      ],
      "next": "E_018_PHONE_SOUND_ALONE"
    },
    {
      "id": "E_018_PHONE_SOUND_CARRIED",
      "actions": [
        {
          "type": "sound",
          "sound": "horror_piano_e018",
          "loop": true,
          "segmentDuration": 5000,
          "stopOnDialogueAdvance": true,
          "stopAfterDialogueAdvances": 10
        },
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "newspaper"
          },
          "next": "E_018_NEWSPAPER_MEMORY"
        }
      ],
      "next": "E_018_NO_NEWSPAPER_MEMORY"
    },
    {
      "id": "E_018_PHONE_SOUND_ALONE",
      "actions": [
        {
          "type": "sound",
          "sound": "horror_piano_e018",
          "loop": true,
          "segmentDuration": 5000,
          "stopOnDialogueAdvance": true,
          "stopAfterDialogueAdvances": 8
        },
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "newspaper"
          },
          "next": "E_018_NEWSPAPER_MEMORY"
        }
      ],
      "next": "E_018_NO_NEWSPAPER_MEMORY"
    },
    {
      "id": "E_018_NEWSPAPER_MEMORY",
      "actions": [
        {
          "type": "dialogue",
          "text": "你回想起报纸上的报道，一阵寒意再次向你袭来。"
        }
      ],
      "next": "E_018_PHONE_MESSAGE"
    },
    {
      "id": "E_018_NO_NEWSPAPER_MEMORY",
      "actions": [
        {
          "type": "dialogue",
          "text": "你盯着屏幕上的日期，寒意从指尖一路爬上来。"
        }
      ],
      "next": "E_018_PHONE_MESSAGE"
    },
    {
      "id": "E_018_PHONE_MESSAGE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你发现屏保上有一条未读信息，内容只有四个字："
        },
        {
          "type": "dialogue",
          "text": "「不要停车。」"
        },
        {
          "type": "dialogue",
          "text": "发送时间：2013/11/17 02:13"
        },
        {
          "type": "dialogue",
          "text": "今天是11月15日。手机上却收到了来自两天之后的信息？！"
        },
        {
          "type": "dialogue",
          "text": "你的指尖微微发抖：这是谁写的？又是写给谁的？"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_018_CARRIED_REACTION"
        }
      ],
      "next": "E_018_ALONE_REACTION"
    },
    {
      "id": "E_018_CARRIED_REACTION",
      "actions": [
        {
          "type": "dialogue",
          "text": "她趴在你背上，看到信息内容，急道："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "别信这个！谁知道是谁发的？停车！停车我们才能活！"
        },
        {
          "type": "dialogue",
          "text": "她的声音很大，像是在说服你，也像是在说服她自己。"
        }
      ],
      "next": "E_018_FINAL"
    },
    {
      "id": "E_018_ALONE_REACTION",
      "actions": [
        {
          "type": "dialogue",
          "text": "你盯着屏幕上的“不要停车”，一时不知该如何理解。"
        }
      ],
      "next": "E_018_FINAL"
    },
    {
      "id": "E_018_FINAL",
      "actions": [
        {
          "type": "dialogue",
          "text": "你不知道该相信哪一个。"
        },
        {
          "type": "dialogue",
          "text": "你望向被行李压住的黑包，又望向自己来时的方向——要清开这些行李，得先找能割断带子、撬开箱体的工具。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "newspaper"
          },
          "next": "E_019"
        }
      ]
    },
    {
      "id": "E_019",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_019_CARRIED"
        }
      ],
      "next": "E_019_ALONE"
    },
    {
      "id": "E_019_CARRIED",
      "actions": [
        {
          "type": "dialogue",
          "text": "你想起口袋里那份报纸，展开重读。"
        },
        {
          "type": "dialogue",
          "text": "报纸上写着："
        },
        {
          "type": "dialogue",
          "text": "截至本报截稿时，共有22名乘客获救，1名女性乘务员生还……"
        },
        {
          "type": "dialogue",
          "text": "你合上报纸，若有所思。"
        }
      ]
    },
    {
      "id": "E_019_ALONE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你想起口袋里那份报纸，展开重读。"
        },
        {
          "type": "dialogue",
          "text": "报纸上写着："
        },
        {
          "type": "dialogue",
          "text": "截至本报截稿时，共有21名乘客获救，1名女性乘务员生还……"
        },
        {
          "type": "dialogue",
          "text": "你愣了一下，从头再看了一遍。"
        },
        {
          "type": "dialogue",
          "text": "21名。"
        },
        {
          "type": "dialogue",
          "text": "你记得刚才明明是22名。"
        },
        {
          "type": "dialogue",
          "text": "报纸中段，关于“一名在3号车厢获救的乘客”的描述消失了。那一栏只剩下空白。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "......我记得，刚才不是这么写的。"
        },
        {
          "type": "dialogue",
          "text": "你盯着那行“1名女性乘务员生还”。"
        },
        {
          "type": "dialogue",
          "text": "她还活着。可如果你没有选择带她走，谁会去救她？"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "或许如果我不回去......生还名单里，就再也不会有我了。"
        },
        {
          "type": "dialogue",
          "text": "你攥紧报纸，转身往来路走去。"
        }
      ]
    },
    {
      "id": "E_020",
      "actions": [
        {
          "type": "sound",
          "sound": "locker_open"
        },
        {
          "type": "dialogue",
          "text": "你打开了员工柜。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_dead",
            "equals": true
          },
          "next": "E_020_DEAD_TOOLS"
        },
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "carriage_03_bag_interacted",
              "equals": true
            }
          },
          "next": "E_020_NOT_INVESTIGATED"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_020_CARRIED"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_medical_failed",
            "equals": true
          },
          "next": "E_020_SECOND_MEDICAL"
        },
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "crew_04_interacted",
              "equals": true
            }
          },
          "next": "E_020_LOCKED"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_medical_failed",
            "equals": true
          },
          "next": "E_020_LOCKED"
        }
      ],
      "next": "E_020_LEFT_AWAKE"
    },
    {
      "id": "E_020_LOCKED",
      "actions": [
        {
          "type": "dialogue",
          "text": "柜门虽然打开了，但里面的工具被锁在内层，你暂时拿不到它们。"
        }
      ]
    },
    {
      "id": "E_018_ALONE_ENTRY_NO_CREW",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_03_entry_narrative_v2_done",
          "value": true
        }
      ]
    },
    {
      "id": "E_020_NOT_INVESTIGATED",
      "actions": [
        {
          "type": "dialogue",
          "text": "你翻了翻，没有找到什么看起来有用的东西。"
        }
      ]
    },
    {
      "id": "E_020_CARRIED",
      "actions": [
        {
          "type": "dialogue",
          "text": "你从4号车厢的员工柜里找到应急割带器和撬杆。"
        },
        {
          "type": "addItem",
          "item": "emergency_cutter"
        },
        {
          "type": "addItem",
          "item": "pry_bar"
        },
        {
          "type": "setFlag",
          "key": "tools_ready",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "已经找到需要的工具。你们可以返回3号车厢了。"
        }
      ]
    },
    {
      "id": "E_020_LEFT_AWAKE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你正要取出工具，忽然注意到座椅方向传来动静。"
        },
        {
          "type": "dialogue",
          "text": "你离开前，把她扶在左侧的座位上。可现在，她坐在右侧的座位上，望着窗外出神。"
        },
        {
          "type": "dialogue",
          "text": "你：“你怎么过去了？”"
        },
        {
          "type": "dialogue",
          "text": "她转过头，一脸茫然：“什么？”"
        },
        {
          "type": "dialogue",
          "text": "你：“你刚才不是坐在那边吗？”"
        },
        {
          "type": "dialogue",
          "text": "她顺着你指的方向看了看，确定道："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "没有啊，我一直坐在这儿。"
        },
        {
          "type": "dialogue",
          "text": "你张了张嘴，最终没再问下去。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "......你果然回来了。"
        },
        {
          "type": "dialogue",
          "text": "她像是松了口气，又像是早就知道你会回来。"
        },
        {
          "type": "dialogue",
          "text": "员工柜里能找到应急割带器和撬杆。"
        },
        {
          "type": "addItem",
          "item": "emergency_cutter"
        },
        {
          "type": "addItem",
          "item": "pry_bar"
        },
        {
          "type": "setFlag",
          "key": "tools_ready",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你把她扶起来。这一次，她没有拒绝。"
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": true
        }
      ]
    },
    {
      "id": "E_020_SECOND_MEDICAL",
      "actions": [
        {
          "type": "dialogue",
          "text": "你正要取出工具，忽然想起乘务员的情况。"
        },
        {
          "type": "dialogue",
          "text": "她还在那里昏迷着，但姿势像是被什么人挪动过。你蹲下来探她的鼻息——很弱，比离开时更弱了。"
        },
        {
          "type": "check",
          "dice": "ev020_education_01",
          "outcomes": [
            "E_020_SECOND_MEDICAL_S",
            "E_020_SECOND_MEDICAL_F"
          ]
        }
      ]
    },
    {
      "id": "E_020_SECOND_MEDICAL_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你重新检查脉搏和出血点，用撕下的布条垫住伤口，再把固定结收紧到不会阻断血流的位置。"
        },
        {
          "type": "dialogue",
          "text": "乘务员咳了一声，终于睁开眼。"
        },
        {
          "type": "modifyAttribute",
          "attribute": "san",
          "amount": 2
        },
        {
          "type": "setFlag",
          "key": "crew_04_medical_success",
          "value": true
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "……钥匙……黑包……停车……"
        },
        {
          "type": "dialogue",
          "text": "她只能断断续续说出这几个词，没有力气再回答更多问题了。"
        },
        {
          "type": "setFlag",
          "key": "crew_04_medical_failed",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "她可以跟着你走，但虚弱得说不了几句完整的话，也无法提供更多信息。"
        },
        {
          "type": "dialogue",
          "text": "员工柜……割带……撬杆。"
        },
        {
          "type": "addItem",
          "item": "emergency_cutter"
        },
        {
          "type": "addItem",
          "item": "pry_bar"
        },
        {
          "type": "setFlag",
          "key": "tools_ready",
          "value": true
        }
      ]
    },
    {
      "id": "E_020_SECOND_MEDICAL_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你一次次调整按压的位置，可指尖下的脉搏还是越来越弱。"
        },
        {
          "type": "dialogue",
          "text": "她的手终于垂了下去。"
        },
        {
          "type": "dialogue",
          "text": "她死了。"
        },
        {
          "type": "setFlag",
          "key": "crew_04_dead",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": false
        }
      ],
      "next": "E_020_DEAD_TOOLS"
    },
    {
      "id": "E_020_DEAD_TOOLS",
      "actions": [
        {
          "type": "dialogue",
          "text": "你沉默地站了一会儿。乘务员已经死了，但眼下不能再让这场意外困住你。"
        },
        {
          "type": "dialogue",
          "text": "你从员工柜里取出应急割带器和撬杆，收进背包。"
        },
        {
          "type": "addItem",
          "item": "emergency_cutter"
        },
        {
          "type": "addItem",
          "item": "pry_bar"
        },
        {
          "type": "setFlag",
          "key": "tools_ready",
          "value": true
        }
      ]
    },
    {
      "id": "E_021",
      "actions": [
        {
          "type": "dialogue",
          "text": "回到3号车厢，你取出工具。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_021_CARRIED"
        },
        {
          "type": "dialogue",
          "text": "你割断缠在行李上的带子，撬开压住通道的箱体。行李向两边塌落。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_bag_exposed",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        },
        {
          "type": "dialogue",
          "text": "前门附近，黑色背包完整地露了出来——背带被整整齐齐地切断，切口平整。"
        }
      ],
      "next": "E_021_ALONE"
    },
    {
      "id": "E_021_CARRIED",
      "actions": [
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "......先割带子，然后撬开箱子。"
        },
        {
          "type": "dialogue",
          "text": "你割断缠在行李上的带子，撬开压住通道的箱体。行李向两边塌落。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_bag_exposed",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        },
        {
          "type": "dialogue",
          "text": "前门附近，黑色背包完整地露了出来——背带被整整齐齐地切断，切口平整。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "......找到了。"
        },
        {
          "type": "sound",
          "sound": "finding_in_papers"
        },
        {
          "type": "dialogue",
          "text": "你把黑包拿到她面前。她伸手进去翻找，却在摸到钥匙时停顿了一下。你注意到她犹豫的神色，以及悄悄握紧的手。"
        },
        {
          "type": "dialogue",
          "text": "你回想她先前的说法和操作规程，试着判断她此刻是否真的愿意把钥匙交给你。"
        },
        {
          "type": "check",
          "dice": "ev021_education_insight_01",
          "outcomes": [
            "E_021_CARRIED_S",
            "E_021_CARRIED_F"
          ]
        }
      ]
    },
    {
      "id": "E_021_CARRIED_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你指出她伤势太重，若在驾驶室前失去意识，所有人都会被锁在门外。乘务员沉默片刻，终于把两把钥匙递给你："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "拿着吧……我现在的状态，确实保管不好。"
        },
        {
          "type": "addItem",
          "item": "driver_cab_key"
        },
        {
          "type": "addItem",
          "item": "control_panel_key"
        },
        {
          "type": "custom",
          "name": "keyHopeSanReward",
          "params": {
            "holder": "player"
          }
        },
        {
          "type": "setFlag",
          "key": "keys_player",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "keys_crew",
          "value": false
        }
      ],
      "next": "E_022"
    },
    {
      "id": "E_021_CARRIED_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你没能从她含糊的回答里判断出操作规程，也找不到足以说服她交出钥匙的理由。她把两把钥匙攥在自己手心里："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "……我来拿着吧。到了车头，我比你熟悉。"
        },
        {
          "type": "custom",
          "name": "keyHopeSanReward",
          "params": {
            "holder": "crew"
          }
        },
        {
          "type": "setFlag",
          "key": "keys_player",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "keys_crew",
          "value": true
        }
      ],
      "next": "E_022"
    },
    {
      "id": "E_021_ALONE",
      "actions": [
        {
          "type": "sound",
          "sound": "finding_in_papers"
        },
        {
          "type": "dialogue",
          "text": "你拉开黑包的夹层，沿着内衬逐寸摸索，终于在一只带拉链的小袋里碰到金属。"
        }
      ],
      "next": "E_021_ALONE_S"
    },
    {
      "id": "E_021_ALONE_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你取出两把钥匙。上面的标签分别写着“驾驶室”和“操作面板”。"
        },
        {
          "type": "addItem",
          "item": "driver_cab_key"
        },
        {
          "type": "addItem",
          "item": "control_panel_key"
        },
        {
          "type": "custom",
          "name": "keyHopeSanReward",
          "params": {
            "holder": "player"
          }
        },
        {
          "type": "setFlag",
          "key": "keys_player",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "keys_missing",
          "value": false
        }
      ],
      "next": "E_022"
    },
    {
      "id": "E_022",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_022_CARRIED"
        }
      ],
      "next": "E_022_ALONE"
    },
    {
      "id": "E_022_CARRIED",
      "actions": [
        {
          "type": "dialogue",
          "text": "你们继续检查包里的东西。"
        },
        {
          "type": "dialogue",
          "text": "她的手指碰到一枚硬物，摸出来——是一张乘务员工牌。"
        },
        {
          "type": "dialogue",
          "text": "照片、姓名、编号、日期......与你面前她胸前挂着的那一张，一模一样。"
        },
        {
          "type": "dialogue",
          "text": "她看看手里的，又低头看看自己胸前的。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "......我不知道。"
        },
        {
          "type": "dialogue",
          "text": "只有这四个字。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_forward_note_visible",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        },
        {
          "type": "dialogue",
          "text": "随后，她的手指又碰到一张叠得整齐的便签。展开——\n\n一个前进的箭头"
        },
        {
          "type": "dialogue",
          "text": "你沉默着，把报纸递到她面前。\n\n她看了很久，没有说话。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_forward_note_visible",
          "value": false
        },
        {
          "type": "custom",
          "name": "refreshScene"
        }
      ],
      "next": "E_022_ITEM"
    },
    {
      "id": "E_022_ALONE",
      "actions": [
        {
          "type": "sound",
          "sound": "finding_in_papers"
        },
        {
          "type": "dialogue",
          "text": "你继续检查包里的东西。"
        },
        {
          "type": "dialogue",
          "text": "你摸到一张乘务员工牌——照片上的人，正是你在4号车厢里没能救下的她。"
        },
        {
          "type": "dialogue",
          "text": "你把它和记忆里她胸前那张对照：一样的照片和编号。\n\n但没有人为你解释。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_forward_note_visible",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        },
        {
          "type": "dialogue",
          "text": "包里还有一张叠得整齐的便签：\n\n展开，是一个前进的箭头。\n\n你回想起报纸上的字，「只管前进吧，已经没有退路了。」"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_forward_note_visible",
          "value": false
        },
        {
          "type": "custom",
          "name": "refreshScene"
        }
      ],
      "next": "E_022_ITEM"
    },
    {
      "id": "E_022_ITEM",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_03_bag_resolved",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        }
      ]
    },
    {
      "id": "E_022_ITEM_END",
      "actions": []
    },
    {
      "id": "E_023",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "any": [
                {
                  "flag": "carriage_03_bag_resolved",
                  "equals": true
                },
                {
                  "flag": "keys_player",
                  "equals": true
                },
                {
                  "flag": "keys_crew",
                  "equals": true
                },
                {
                  "flag": "keys_missing",
                  "equals": true
                },
                {
                  "flag": "inner_world_entered",
                  "equals": true
                },
                {
                  "flag": "inner_world_left",
                  "equals": true
                }
              ]
            }
          },
          "next": "E_023_LOCKED"
        },
        {
          "type": "conditionalJump",
          "when": {
            "any": [
              {
                "flag": "ev023_intro_seen",
                "equals": true
              },
              {
                "flag": "inner_world_entered",
                "equals": true
              }
            ]
          },
          "next": "E_501"
        },
        {
          "type": "setFlag",
          "key": "ev023_intro_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你站在3号通往2号的车门前。手电的光在黑暗里只照出几步远。"
        },
        {
          "type": "dialogue",
          "text": "你最后回头看了一眼——4号车厢还在，灯光昏黄，一切如常。"
        },
        {
          "type": "dialogue",
          "text": "你低头确认了一眼手里的东西。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "phone"
          },
          "next": "E_023_PHONE"
        },
        {
          "type": "dialogue",
          "text": "你没有手机可看。"
        }
      ],
      "next": "E_023_LOOP"
    },
    {
      "id": "E_023_LOCKED",
      "actions": [
        {
          "type": "dialogue",
          "text": "通往2号车厢的门后漆黑一片。你还没有准备好，最好先处理前门附近的黑包。"
        }
      ]
    },
    {
      "id": "E_023_PHONE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你低头看了一眼手机。屏幕仍显示：2013年11月15日。"
        }
      ],
      "next": "E_023_LOOP"
    },
    {
      "id": "E_023_LOOP",
      "actions": [
        {
          "type": "dialogue",
          "text": "再抬头时，通往2号车厢的门上方，车厢编号变成了——\n\n3号。"
        },
        {
          "type": "dialogue",
          "text": "你愣了一下，以为自己看错了。你转头看向来路那一侧的车门。\n\n也是3号。\n\n前后两边，都是3号车厢。"
        },
        {
          "type": "dialogue",
          "text": "来路的方向，连接4号车厢的门消失了，取而代之的，是一段被黑暗吞没的车厢。"
        },
        {
          "type": "dialogue",
          "text": "这时，熟悉的广播声忽然再次响起：\n\n“下一站——”\n\n停顿了很久。\n\n“下一站——”\n\n还是没有站名。"
        },
        {
          "type": "sound",
          "sound": "electrical_noise_e023",
          "loop": true,
          "segmentDuration": 4500,
          "stopOnDialogueAdvance": true,
          "stopAfterDialogueAdvances": 4
        },
        {
          "type": "dialogue",
          "text": "然后，一个声音一字一顿地说：\n\n“请不要下车。”"
        },
        {
          "type": "dialogue",
          "text": "灯灭了。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_blackout",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        },
        {
          "type": "dialogue",
          "text": "黑暗中，你摸到了通往2号车厢的门。"
        }
      ],
      "next": "E_501"
    },
    {
      "id": "E_023_BOTTLE",
      "actions": [
        {
          "type": "inspect",
          "item": "bottle"
        }
      ]
    },
    {
      "id": "E_025",
      "actions": [
        {
          "type": "dialogue",
          "text": "四周毫无光源。"
        },
        {
          "type": "dialogue",
          "text": "在一片漆黑中，你听到粗重的喘息声。\n\n那不是人类的喘息。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_025_CARRIED"
        }
      ]
    },
    {
      "id": "E_025_CARRIED",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员伏在你的耳边，声音颤抖着低语："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "...别出声。"
        },
        {
          "type": "dialogue",
          "text": "你听出她声音里的恐惧，与她警告你时如出一辙。"
        }
      ]
    },
    {
      "id": "E_026",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "clicker_first_encounter_seen",
            "equals": true
          },
          "next": "E_026_REVISIT"
        },
        {
          "type": "setFlag",
          "key": "clicker_first_encounter_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "portrait": "assets/Image/Portrait/monster.ie.png",
          "text": "借着应急灯微弱的光芒，你终于看清喘息声的来源：一个没有眼睛、头部像裂口般张开的怪物正伏在尸体间。"
        },
        {
          "type": "check",
          "dice": "ev026_san_01"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "monster_behavior_known",
            "equals": true
          },
          "next": "E_026_KNOWLEDGE"
        },
        {
          "type": "dialogue",
          "text": "你僵在原地，不敢发出任何声音。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "bottle"
          },
          "next": "E_026_BOTTLE_HINT"
        }
      ]
    },
    {
      "id": "E_026_BOTTLE_HINT",
      "actions": [
        {
          "type": "dialogue",
          "text": "你摸了摸口袋里的瓶子。"
        }
      ]
    },
    {
      "id": "E_026_KNOWLEDGE",
      "actions": [
        {
          "type": "dialogue",
          "text": "它与你听到的描述完全一致——没有眼睛，却把头部转向你的方向，像在听。"
        },
        {
          "type": "dialogue",
          "text": "你没有动。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "bottle"
          },
          "next": "E_026_BOTTLE_HINT"
        }
      ]
    },
    {
      "id": "E_026_ACTION",
      "actions": [
        {
          "type": "choice",
          "prompt": "你打算怎么做？",
          "options": [
            {
              "label": "安静潜行",
              "next": "E_027"
            },
            {
              "label": "正面对抗",
              "next": "E_029"
            }
          ]
        }
      ]
    },
    {
      "id": "E_GO_02_FRONT_DOOR",
      "actions": [
        {
          "type": "choice",
          "prompt": "要打开通往先头车厢的门吗？",
          "options": [
            {
              "label": "推开安全门",
              "next": "E_031",
              "when": {
                "flag": "carriage_02_passed",
                "equals": true
              }
            },
            {
              "label": "强行推门",
              "next": "E_026_BLOCKED",
              "when": {
                "not": {
                  "flag": "carriage_02_passed",
                  "equals": true
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "E_026_BLOCKED",
      "actions": [
        {
          "type": "sound",
          "sound": "door_locked"
        },
        {
          "type": "dialogue",
          "text": "Clicker还堵在通往先头车厢的门前，你无法安全开门通过。"
        }
      ]
    },
    {
      "id": "E_027",
      "actions": [
        {
          "type": "dialogue",
          "text": "你压低身体，小心翼翼地踩在没有碎玻璃和尸体的落脚点。\n\n接下来几步必须慎之又慎，否则...后果你不敢想象。"
        },
        {
          "type": "check",
          "dice": "ev027_constitution_01",
          "outcomes": [
            "E_027_STEP_1_S",
            "E_027_F"
          ]
        }
      ]
    },
    {
      "id": "E_027_STEP_1_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你踩进第一片阴影，屏住呼吸从一排座椅后方挪了过去。"
        },
        {
          "type": "check",
          "dice": "ev027_san_01"
        }
      ],
      "next": "E_027_STEP_2"
    },
    {
      "id": "E_027_STEP_2",
      "actions": [
        {
          "type": "dialogue",
          "text": "前方散落着碎玻璃和尸体，你必须在怪物再次转头前穿过这段空隙。"
        },
        {
          "type": "check",
          "dice": "ev027_constitution_02",
          "outcomes": [
            "E_027_STEP_2_S",
            "E_027_F"
          ]
        }
      ]
    },
    {
      "id": "E_027_STEP_2_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你稳住发软的膝盖，从尸体与座椅之间无声地侧身通过。"
        },
        {
          "type": "check",
          "dice": "ev027_san_02"
        }
      ],
      "next": "E_027_STEP_3"
    },
    {
      "id": "E_027_STEP_3",
      "actions": [
        {
          "type": "dialogue",
          "text": "安全门已经近在眼前。最后几步没有遮挡，你只能趁Clicker背对你时一口气贴过去。"
        },
        {
          "type": "check",
          "dice": "ev027_constitution_03",
          "outcomes": [
            "E_027_STEP_3_S",
            "E_027_F"
          ]
        }
      ]
    },
    {
      "id": "E_027_STEP_3_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你咬紧牙关跨过最后一具尸体，怪物的裂口几乎擦着你的肩膀转了过去。"
        },
        {
          "type": "check",
          "dice": "ev027_san_03"
        }
      ],
      "next": "E_027_S"
    },
    {
      "id": "E_027_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你把每一步都踩在座椅投下的阴影里。怪物只追随着远处的杂音转动头颅，你终于贴到了先头车厢门前。"
        },
        {
          "type": "setFlag",
          "key": "carriage_02_passed",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "clicker_cleared",
          "value": true
        }
      ]
    },
    {
      "id": "E_027_F",
      "actions": [
        {
          "type": "sound",
          "sound": "can_striking"
        },
        {
          "type": "dialogue",
          "text": "跨过一具尸体时，你绷紧太久的腿突然发软，鞋底擦过散落的金属罐。清脆的滚动声传遍车厢，怪物们齐刷刷地转向你。"
        },
        {
          "type": "dialogue",
          "text": "潜行失败，你在毫无准备的情况下被迫迎战。"
        }
      ],
      "next": "E_029_CARD_HARD"
    },
    {
      "id": "E_028_THROW_FIRST",
      "actions": [
        {
          "type": "dialogue",
          "text": "你悄悄握住瓶身，瞄准远处的车厢壁。只要声响落得足够远，或许能把Clicker引开。"
        },
        {
          "type": "removeItem",
          "item": "bottle"
        },
        {
          "type": "check",
          "dice": "ev028_throw_01",
          "outcomes": [
            "E_028_THROW_SUCCESS",
            "E_028_THROW_FAIL"
          ]
        }
      ]
    },
    {
      "id": "E_028_THROW_CAN_FIRST",
      "actions": [
        {
          "type": "dialogue",
          "text": "你捏住空易拉罐，瞄准远处的车厢壁。只要声响足够远，或许能把 Clicker 引开。"
        },
        {
          "type": "removeItem",
          "item": "drink_empty"
        },
        {
          "type": "check",
          "dice": "ev028_throw_01",
          "outcomes": [
            "E_028_THROW_CAN_SUCCESS",
            "E_028_THROW_CAN_FAIL"
          ]
        }
      ]
    },
    {
      "id": "E_028_THROW_SUCCESS",
      "actions": [
        {
          "type": "sound",
          "sound": "breaking_glass"
        },
        {
          "type": "dialogue",
          "text": "彩色玻璃瓶越过座椅，在远处的车厢壁上炸开。Clicker立刻扑向声响传来的方向。"
        },
        {
          "type": "dialogue",
          "text": "你趁机绕过它，抵达通往先头车厢的安全门前。"
        },
        {
          "type": "setFlag",
          "key": "carriage_02_passed",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "clicker_cleared",
          "value": true
        }
      ]
    },
    {
      "id": "E_028_THROW_FAIL",
      "actions": [
        {
          "type": "sound",
          "sound": "breaking_glass"
        },
        {
          "type": "dialogue",
          "text": "瓶身从汗湿的指间滑脱，在你脚边摔得粉碎。近在咫尺的脆响让Clicker猛地转向你。"
        },
        {
          "type": "dialogue",
          "text": "你彻底暴露了，只能在它占尽先手时迎战。"
        }
      ],
      "next": "E_029_CARD_HARD"
    },
    {
      "id": "E_029",
      "actions": [
        {
          "type": "dialogue",
          "text": "你握紧能当作武器的东西，主动迎向Clicker，在它扑击前抢占了更开阔的位置。"
        },
        {
          "type": "setFlag",
          "key": "card_battle_won",
          "value": false
        },
        {
          "type": "minigame",
          "game": "card_battle"
        }
      ]
    },
    {
      "id": "E_029_CARD_HARD",
      "actions": [
        {
          "type": "dialogue",
          "text": "Clicker已经锁定了你的位置。你被逼到座椅之间，战斗轮进入困难模式。"
        },
        {
          "type": "setFlag",
          "key": "card_battle_won",
          "value": false
        },
        {
          "type": "minigame",
          "game": "card_battle_hard"
        }
      ]
    },
    {
      "id": "E_030",
      "actions": [
        {
          "type": "custom",
          "name": "endGame",
          "params": {
            "reason": "bad_end"
          }
        }
      ]
    },
    {
      "id": "E_ITEM_NEWSPAPER_INSPECT",
      "actions": [
        {
          "type": "inspect",
          "item": "newspaper",
          "title": "报纸",
          "text": "标题：昨晚1号线电车的末班车遭遇大规模恐怖事件，幸存者精神异常被送医，警方调查困难。"
        }
      ]
    },
    {
      "id": "E_ITEM_DRIVER_CAB_KEY_INSPECT",
      "actions": [
        {
          "type": "inspect",
          "item": "driver_cab_key",
          "title": "驾驶室钥匙",
          "text": "用于打开列车驾驶室门的钥匙。"
        }
      ]
    },
    {
      "id": "E_026_REVISIT",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "monster_behavior_known",
            "equals": true
          },
          "next": "E_026_KNOWLEDGE"
        },
        {
          "type": "dialogue",
          "text": "那只无眼的怪物仍在黑暗中侧耳倾听。"
        }
      ]
    },
    {
      "id": "E_010_REVISIT",
      "actions": []
    },
    {
      "id": "E_ITEM_CONTROL_PANEL_KEY_INSPECT",
      "actions": [
        {
          "type": "inspect",
          "item": "control_panel_key",
          "title": "操作面板钥匙",
          "text": "用于打开驾驶室操作面板的钥匙。"
        }
      ]
    },
    {
      "id": "E_ITEM_PHONE_INSPECT",
      "actions": [
        {
          "type": "custom",
          "name": "useLight",
          "params": {
            "item": "phone"
          }
        }
      ]
    },
    {
      "id": "E_ITEM_FLASHLIGHT_INSPECT",
      "actions": [
        {
          "type": "custom",
          "name": "useLight",
          "params": {
            "item": "flashlight"
          }
        }
      ]
    },
    {
      "id": "E_ITEM_DRINK_INSPECT",
      "actions": [
        {
          "type": "inspect",
          "item": "drink"
        }
      ],
      "next": "E_ITEM_DRINK_CONFIRM"
    },
    {
      "id": "E_ITEM_DRINK_CONFIRM",
      "actions": [
        {
          "type": "choice",
          "prompt": "要饮用这罐饮料吗？",
          "options": [
            {
              "label": "饮用",
              "next": "E_ITEM_DRINK_USE"
            },
            {
              "label": "暂时保留",
              "next": "E_ITEM_DRINK_KEEP"
            }
          ]
        }
      ]
    },
    {
      "id": "E_ITEM_DRINK_USE",
      "actions": [
        {
          "type": "dialogue",
          "text": "冰凉的饮料让你稍微冷静下来。"
        },
        {
          "type": "removeItem",
          "item": "drink"
        },
        {
          "type": "addItem",
          "item": "drink_empty"
        },
        {
          "type": "modifyAttribute",
          "attribute": "san",
          "amount": 2
        }
      ]
    },
    {
      "id": "E_ITEM_DRINK_KEEP",
      "actions": []
    },
    {
      "id": "E_ITEM_DRINK_CLICKER_INSPECT",
      "actions": [
        {
          "type": "inspect",
          "item": "drink"
        }
      ],
      "next": "E_ITEM_DRINK_CLICKER_CONFIRM"
    },
    {
      "id": "E_ITEM_DRINK_CLICKER_CONFIRM",
      "actions": [
        {
          "type": "choice",
          "prompt": "Clicker 就在前方。要饮用这罐饮料吗？",
          "options": [
            {
              "label": "饮用",
              "next": "E_ITEM_DRINK_CLICKER_USE"
            },
            {
              "label": "暂时保留",
              "next": "E_ITEM_DRINK_KEEP"
            }
          ]
        }
      ]
    },
    {
      "id": "E_ITEM_DRINK_CLICKER_USE",
      "actions": [
        {
          "type": "dialogue",
          "text": "拉环弹开的清脆声在死寂的车厢里格外刺耳。Clicker 猛地转向你。"
        },
        {
          "type": "removeItem",
          "item": "drink"
        },
        {
          "type": "addItem",
          "item": "drink_empty"
        },
        {
          "type": "modifyAttribute",
          "attribute": "san",
          "amount": 2
        }
      ],
      "next": "E_029_CARD_HARD"
    },
    {
      "id": "E_ITEM_DRINK_DARK_INSPECT",
      "actions": [
        {
          "type": "inspect",
          "item": "drink"
        }
      ],
      "next": "E_ITEM_DRINK_DARK_CONFIRM"
    },
    {
      "id": "E_ITEM_DRINK_DARK_CONFIRM",
      "actions": [
        {
          "type": "choice",
          "prompt": "四周一片漆黑。要饮用这罐饮料吗？",
          "options": [
            {
              "label": "饮用",
              "next": "E_ITEM_DRINK_DARK_USE"
            },
            {
              "label": "暂时保留",
              "next": "E_ITEM_DRINK_KEEP"
            }
          ]
        }
      ]
    },
    {
      "id": "E_ITEM_DRINK_DARK_USE",
      "actions": [
        {
          "type": "sound",
          "sound": "drinking"
        },
        {
          "type": "dialogue",
          "text": "拉环弹开的清脆声在死寂的车厢里炸开。黑暗深处的喘息声骤然停了。"
        },
        {
          "type": "dialogue",
          "text": "有什么东西被惊动了。你慌忙去摸手机和手电筒，却在混乱中什么也抓不住。"
        },
        {
          "type": "sound",
          "sound": "can_striking"
        },
        {
          "type": "dialogue",
          "text": "尖锐的撞击声贴着耳边响起。下一秒，冰冷的利爪从黑暗中扑来。"
        },
        {
          "type": "modifyAttribute",
          "attribute": "san",
          "amount": -9999
        }
      ]
    },
    {
      "id": "E_028_THROW_CAN_SUCCESS",
      "actions": [
        {
          "type": "sound",
          "sound": "breaking_glass"
        },
        {
          "type": "dialogue",
          "text": "空易拉罐越过座椅，在远处的车厢壁上撞得变形。Clicker 立刻扑向声响传来的方向。"
        },
        {
          "type": "dialogue",
          "text": "你趁机绕过它，抵达通往先头车厢的安全门前。"
        },
        {
          "type": "setFlag",
          "key": "carriage_02_passed",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "clicker_cleared",
          "value": true
        }
      ]
    },
    {
      "id": "E_028_THROW_CAN_FAIL",
      "actions": [
        {
          "type": "sound",
          "sound": "breaking_glass"
        },
        {
          "type": "dialogue",
          "text": "空易拉罐从汗湿的指间滑脱，在你脚边发出刺耳的撞击声。Clicker 猛地转向你。"
        },
        {
          "type": "dialogue",
          "text": "你彻底暴露了，只能在它占尽先手时迎战。"
        }
      ],
      "next": "E_029_CARD_HARD"
    },
    {
      "id": "E_ITEM_DRINK_EMPTY_INSPECT",
      "actions": [
        {
          "type": "inspect",
          "item": "drink_empty"
        }
      ]
    },
    {
      "id": "E_ITEM_EMERGENCY_CUTTER_INSPECT",
      "actions": [
        {
          "type": "inspect",
          "item": "emergency_cutter",
          "title": "应急割带器",
          "text": "一件可以割断背包背带的应急工具。"
        }
      ]
    },
    {
      "id": "E_ITEM_PRY_BAR_INSPECT",
      "actions": [
        {
          "type": "inspect",
          "item": "pry_bar",
          "title": "撬杆",
          "text": "一根可以撬开箱体、清理行李的工具。"
        }
      ]
    },
    {
      "id": "E_DOOR_04",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "crew_04_interacted",
              "equals": true
            }
          },
          "next": "E_DOOR_04_LOCKED"
        },
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_03"
        },
        {
          "type": "dialogue",
          "text": "你穿过门，返回3号车厢。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "carriage_03_first_entry_seen",
              "equals": true
            }
          },
          "next": "E_018"
        },
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "flag": "tools_ready",
                "equals": true
              },
              {
                "not": {
                  "any": [
                    {
                      "flag": "carriage_03_bag_resolved",
                      "equals": true
                    },
                    {
                      "flag": "keys_player",
                      "equals": true
                    },
                    {
                      "flag": "keys_crew",
                      "equals": true
                    },
                    {
                      "flag": "keys_missing",
                      "equals": true
                    },
                    {
                      "flag": "inner_world_entered",
                      "equals": true
                    },
                    {
                      "flag": "inner_world_left",
                      "equals": true
                    }
                  ]
                }
              }
            ]
          },
          "next": "E_021"
        }
      ]
    },
    {
      "id": "E_DOOR_04_LOCKED",
      "actions": [
        {
          "type": "dialogue",
          "text": "重伤的乘务员仍倒在这里。继续前进之前，你至少得确认一次她的状况。"
        }
      ]
    },
    {
      "id": "E_DOOR_03",
      "actions": [
        {
          "type": "dialogue",
          "text": "你推开通往2号车厢的门。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_02"
        },
        {
          "type": "dialogue",
          "text": "你走进2号车厢。黑暗中传来明显的喘息声。"
        }
      ]
    },
    {
      "id": "E_GO_05_06",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_06"
        },
        {
          "type": "dialogue",
          "text": "你穿过门，返回6号车厢。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "carriage_06_eaten_reveal_seen",
              "equals": true
            }
          },
          "next": "E_012_S"
        }
      ]
    },
    {
      "id": "E_GO_04_05",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_05"
        },
        {
          "type": "dialogue",
          "text": "你穿过门，回到5号车厢。"
        }
      ]
    },
    {
      "id": "E_GO_03_04",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_04"
        },
        {
          "type": "dialogue",
          "text": "你穿过门，返回4号车厢。"
        }
      ]
    },
    {
      "id": "E_GO_02_03",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_03"
        },
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "carriage_03_first_entry_seen",
              "equals": true
            }
          },
          "next": "E_018"
        },
        {
          "type": "dialogue",
          "text": "你穿过门，返回3号车厢。"
        }
      ]
    },
    {
      "id": "E_GO_FRONT_02",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_02"
        },
        {
          "type": "dialogue",
          "text": "你穿过门，回到2号车厢。"
        }
      ]
    },
    {
      "id": "E_02_DARK",
      "actions": [
        {
          "type": "inspect",
          "title": "黑暗中的喘息",
          "text": "太暗了，看不清怪物在哪里。也许手机闪光灯或手电筒能把这里照亮。"
        }
      ]
    },
    {
      "id": "E_05_SEARCH_TOOLS",
      "actions": [
        {
          "type": "sound",
          "sound": "finding_in_papers"
        },
        {
          "type": "dialogue",
          "text": "你决定仔细翻找这只倒下的背包。"
        }
      ],
      "next": "E_05_TOOLS_SUCCESS"
    },
    {
      "id": "E_05_TOOLS_SUCCESS",
      "actions": [
        {
          "type": "dialogue",
          "text": "背包里有一支还能发光的手电筒。"
        },
        {
          "type": "addItem",
          "item": "flashlight"
        },
        {
          "type": "setObjectState",
          "object": "tool_clutter_05",
          "patch": {
            "hidden": true
          }
        },
        {
          "type": "setFlag",
          "key": "carriage_05_inspected_tools",
          "value": true
        }
      ],
      "next": "E_05_CHECK_ALL"
    },
    {
      "id": "E_05_JUNK_A",
      "actions": [
        {
          "type": "custom",
          "name": "randomDialogue",
          "params": {
            "texts": [
              "你拨开散落的行李，衣物和空袋子交叠在一起，没找到有用的东西。",
              "行李箱和外套都被胡乱翻过，夹层里只剩车票碎片和灰尘。"
            ]
          }
        },
        {
          "type": "setFlag",
          "key": "carriage_05_inspected_clutter_a",
          "value": true
        }
      ],
      "next": "E_05_CHECK_ALL"
    },
    {
      "id": "E_05_JUNK_B",
      "actions": [
        {
          "type": "custom",
          "name": "randomDialogue",
          "params": {
            "texts": [
              "你打开遗落的提包，里面只有零钱、纸巾和一支没水的笔。",
              "提包的夹层已经被人掏空，只留下几张皱掉的收据。"
            ]
          }
        },
        {
          "type": "setFlag",
          "key": "carriage_05_inspected_clutter_b",
          "value": true
        }
      ],
      "next": "E_05_CHECK_ALL"
    },
    {
      "id": "E_05_JUNK_LEFT",
      "actions": [
        {
          "type": "custom",
          "name": "randomDialogue",
          "params": {
            "texts": [
              "你蹲下翻了翻这堆袋子，里面只有废纸和空包装。",
              "塑料袋被碰得窸窣作响，却没有露出任何有用的东西。",
              "你把最上面的袋子挪开，下面只有落满灰尘的地板。"
            ]
          }
        },
        {
          "type": "setFlag",
          "key": "carriage_05_inspected_clutter_c",
          "value": true
        }
      ],
      "next": "E_05_CHECK_ALL"
    },
    {
      "id": "E_05_JUNK_RIGHT",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carriage_05_drink_collected",
            "equals": true
          },
          "next": "E_05_JUNK_RIGHT_REPEAT"
        },
        {
          "type": "dialogue",
          "text": "你拨开右侧堆叠的塑料袋，发现里面还塞着一罐饮料。"
        },
        {
          "type": "addItem",
          "item": "drink"
        },
        {
          "type": "setFlag",
          "key": "carriage_05_drink_collected",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "carriage_05_inspected_clutter_d",
          "value": true
        }
      ],
      "next": "E_05_CHECK_ALL"
    },
    {
      "id": "E_05_JUNK_RIGHT_REPEAT",
      "actions": [
        {
          "type": "custom",
          "name": "randomDialogue",
          "params": {
            "texts": [
              "你拨开右侧堆叠的袋子，只找到几个压扁的空盒。",
              "袋子里装着揉皱的包装纸，没有任何可用的东西。",
              "你试着提起其中一袋，里面的东西轻轻晃动，没有特别之处。"
            ]
          }
        },
        {
          "type": "setFlag",
          "key": "carriage_05_inspected_clutter_d",
          "value": true
        }
      ],
      "next": "E_05_CHECK_ALL"
    },
    {
      "id": "E_05_CHECK_ALL",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "flag": "carriage_05_inspected_clutter_a",
                "equals": true
              },
              {
                "flag": "carriage_05_inspected_clutter_b",
                "equals": true
              },
              {
                "flag": "carriage_05_inspected_tools",
                "equals": true
              },
              {
                "flag": "carriage_05_inspected_newspaper",
                "equals": true
              },
              {
                "flag": "carriage_05_inspected_clutter_c",
                "equals": true
              },
              {
                "flag": "carriage_05_inspected_clutter_d",
                "equals": true
              },
              {
                "not": {
                  "flag": "carriage_05_all_inspected_rewarded",
                  "equals": true
                }
              }
            ]
          },
          "next": "E_05_ALL_INSPECTED_REWARD"
        }
      ]
    },
    {
      "id": "E_05_ALL_INSPECTED_REWARD",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_05_all_inspected_rewarded",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你把车厢里散落的物品逐一检查完毕，混乱的细节终于在脑中连成了线索。"
        },
        {
          "type": "modifyAttribute",
          "attribute": "insight",
          "amount": 1
        },
        {
          "type": "modifyAttribute",
          "attribute": "san",
          "amount": 1
        }
      ]
    },
    {
      "id": "E_031",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "front_carriage"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "front_carriage_entry_seen",
            "equals": true
          },
          "next": "E_031_REVISIT"
        },
        {
          "type": "setFlag",
          "key": "front_carriage_entry_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你穿过安全门，终于进入先头车厢。这里比后方更加昏暗，列车震动通过地板直接传到脚底，前方只剩一扇紧闭的驾驶室门。"
        },
        {
          "type": "dialogue",
          "text": "门上有一块褪色的铭牌：驾驶室。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "any": [
              {
                "flag": "keys_player",
                "equals": true
              },
              {
                "hasItem": "driver_cab_key"
              }
            ]
          },
          "next": "E_031_PLAYER_KEY"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "keys_crew",
            "equals": true
          },
          "next": "E_031_CREW_KEY"
        },
        {
          "type": "dialogue",
          "text": "你伸手推了推门——锁着。"
        }
      ],
      "next": "E_031_NO_KEY_S"
    },
    {
      "id": "E_031_REVISIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "你又回到驾驶室门前。门锁、操作面板和两根拉杆都维持着离开时的状态。"
        }
      ]
    },
    {
      "id": "E_031_PLAYER_KEY",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "你摸出钥匙，插进锁孔。金属咬合的声音在安静中格外清晰。"
        }
      ],
      "next": "E_032_INTRO"
    },
    {
      "id": "E_031_CREW_KEY",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "她颤抖着摸出钥匙，替你打开门。"
        },
        {
          "type": "dialogue",
          "text": "你注意到，她看向驾驶室的目光里，有一种近乎执念的光。"
        }
      ],
      "next": "E_032_CREW_AUTO"
    },
    {
      "id": "E_031_NO_KEY_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你在门边的消防柜夹层里摸到了两把钥匙，也许是其他乘务员留下的。"
        },
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "你用它打开了驾驶室的门。"
        },
        {
          "type": "addItem",
          "item": "driver_cab_key"
        },
        {
          "type": "addItem",
          "item": "control_panel_key"
        },
        {
          "type": "custom",
          "name": "keyHopeSanReward",
          "params": {
            "holder": "player"
          }
        },
        {
          "type": "setFlag",
          "key": "keys_player",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "keys_missing",
          "value": false
        }
      ],
      "next": "E_032_INTRO"
    },
    {
      "id": "E_032_INTRO",
      "actions": [
        {
          "type": "dialogue",
          "text": "操作面板的钥匙转动后，盖板向外弹开。你拂去薄灰，确认每个标识仍然清晰可读。"
        },
        {
          "type": "dialogue",
          "text": "两根拉杆并排立在你面前：左杆是刹车/起步装置，右杆是油门。右杆上推加速，持续下拉则不断减速直至停车。"
        },
        {
          "type": "dialogue",
          "text": "操作台边缘的灰尘里，有人用手指写了一行字：\n\n**MOVE FORWARD**\n\n笔画很新，像是不久前才留下的。"
        }
      ]
    },
    {
      "id": "E_032",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_032_CREW_AUTO"
        },
        {
          "type": "choice",
          "prompt": "你要怎么操作拉杆？",
          "options": [
            {
              "label": "右杆上推——加速，继续前进",
              "next": "E_034"
            },
            {
              "label": "右杆下拉——减速，停车",
              "next": "E_035"
            }
          ]
        }
      ]
    },
    {
      "id": "E_032_CREW_AUTO",
      "actions": [
        {
          "type": "dialogue",
          "text": "操作面板的钥匙转动后，盖板向外弹开。你拂去薄灰，确认每个标识仍然清晰可读。"
        },
        {
          "type": "dialogue",
          "text": "两根拉杆并排立在你面前：左杆是刹车/起步装置，右杆是油门。右杆上推加速，持续下拉则不断减速直至停车。"
        },
        {
          "type": "dialogue",
          "text": "操作台边缘的灰尘里，有人用手指写了一行字：\n\n**MOVE FORWARD**\n\n笔画很新，像是不久前才留下的。"
        },
        {
          "type": "dialogue",
          "text": "乘务员没有看你，只是一瘸一拐地走到驾驶台前，伸手握住右杆。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "停车……我们得停车。"
        },
        {
          "type": "custom",
          "name": "timedStoryChoice",
          "params": {
            "prompt": "乘务员正要把右杆向下拉——",
            "duration": 5000,
            "flag": "ev032_take_lever",
            "defaultValue": false,
            "options": [
              {
                "label": "抢过把手，向上推——加速",
                "value": true
              },
              {
                "label": "让乘务员来操作",
                "value": false
              }
            ]
          }
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev032_take_lever",
            "equals": true
          },
          "next": "E_033"
        }
      ],
      "next": "E_035"
    },
    {
      "id": "E_033",
      "actions": [
        {
          "type": "dialogue",
          "text": "你猛地抢过右杆，向上推去。乘务员从身后扑来，死死抓住你的手腕。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "不行！停下来！我们必须逃出去——！"
        },
        {
          "type": "minigame",
          "game": "conductor_tug"
        }
      ]
    },
    {
      "id": "E_034",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev510_flower_sea",
            "equals": true
          },
          "next": "E_515"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_dead",
            "equals": true
          },
          "next": "E_034_CRY_END"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_medical_failed",
            "equals": true
          },
          "next": "E_034_CRY_END"
        },
        {
          "type": "custom",
          "name": "endGame",
          "params": {
            "reason": "true_end"
          }
        }
      ]
    },
    {
      "id": "E_034_CRY_END",
      "actions": [
        {
          "type": "custom",
          "name": "endGame",
          "params": {
            "reason": "cry_end"
          }
        }
      ]
    },
    {
      "id": "E_035",
      "actions": [
        {
          "type": "custom",
          "name": "endGame",
          "params": {
            "reason": "bad_end"
          }
        }
      ]
    },
    {
      "id": "E_MG3D_DEMO",
      "actions": [
        {
          "type": "dialogue",
          "text": "你注意到驾驶台上一个不显眼的球形陀螺仪校准装置。"
        },
        {
          "type": "minigame",
          "game": "webgl3d_demo"
        },
        {
          "type": "dialogue",
          "text": "演示结束，剧情继续。"
        }
      ]
    },
    {
      "id": "E_501",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_03_blackout",
          "value": false
        },
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "inner_world_entered",
            "equals": true
          },
          "next": "E_DOOR_03"
        },
        {
          "type": "dialogue",
          "text": "你深吸一口气，伸手推开了通往2号的车门。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_inner_01"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_501_CREW_ENTRY"
        }
      ],
      "next": "E_501_INTRO_BODY"
    },
    {
      "id": "E_501_CREW_ENTRY",
      "actions": [
        {
          "type": "setFlag",
          "key": "crew_waiting_outside_inner_world",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": false
        },
        {
          "type": "dialogue",
          "text": "你突然发现身边的乘务员不见了。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "（刚刚还在这里的……怎么就？）"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "喂喂？你还在吗？"
        },
        {
          "type": "dialogue",
          "text": "没有回应。3号车厢还在那里，被你撬开的行李静悄悄地躺在地上。"
        },
        {
          "type": "dialogue",
          "text": "或许她先一步进入了这个陌生的车厢？"
        },
        {
          "type": "dialogue",
          "text": "你只好继续前进。"
        }
      ],
      "next": "E_501_INTRO_BODY"
    },
    {
      "id": "E_501_INTRO_BODY",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev502_intro_seen",
            "equals": true
          },
          "next": "E_502"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "这里就是……"
        },
        {
          "type": "dialogue",
          "text": "不。门后不是2号车厢——而是一节你从未见过的车厢。空荡荡的，连座椅也没有。"
        },
        {
          "type": "dialogue",
          "text": "你回头看了一眼来路。3号车厢还在那里。"
        },
        {
          "type": "dialogue",
          "text": "列车行驶的声音在车厢里回荡，夹杂着断断续续的摩擦和断裂声。"
        },
        {
          "type": "dialogue",
          "text": "你迈过门槛，身后的列车噪音骤然减弱。"
        },
        {
          "type": "dialogue",
          "text": "门还开着，3号车厢却像隔在很远的地方。"
        },
        {
          "type": "dialogue",
          "text": "安静得仿佛整个世界都睡着了。"
        }
      ],
      "next": "E_502"
    },
    {
      "id": "E_502",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev502_intro_seen",
            "equals": true
          },
          "next": "E_502_REVISIT"
        },
        {
          "type": "dialogue",
          "text": "不知名的空车厢，甚至没有座椅。四面的墙壁光秃秃的，地板跟着车轮的震动轻轻发颤。"
        },
        {
          "type": "dialogue",
          "text": "车厢两头各有一扇门。你站在正中央，两侧都望不到尽头。"
        },
        {
          "type": "setFlag",
          "key": "ev502_intro_seen",
          "value": true
        }
      ]
    },
    {
      "id": "E_502_REVISIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "空车厢仍在轻轻震动。两端的门看起来完全相同，只有你留下的脚步声能证明自己不是一直站在原地。"
        }
      ]
    },
    {
      "id": "E_502_RETURN",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "inner_world_entered",
            "equals": true
          },
          "next": "E_523"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev502_return_rolled",
            "equals": true
          },
          "next": "E_502_LOCKED"
        },
        {
          "type": "dialogue",
          "text": "你折返向身后的车门，握住门把。"
        },
        {
          "type": "setFlag",
          "key": "ev502_return_rolled",
          "value": true
        },
        {
          "type": "custom",
          "name": "weightedBranch",
          "params": {
            "outcomes": [
              {
                "weight": 10,
                "flag": "ev502_return_eaten"
              },
              {
                "weight": 60,
                "flag": "ev502_return_locked"
              },
              {
                "weight": 30,
                "flag": "ev502_return_carriage03"
              }
            ]
          }
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev502_return_eaten",
            "equals": true
          },
          "next": "E_525"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev502_return_carriage03",
            "equals": true
          },
          "next": "E_502_CARRIAGE03"
        }
      ],
      "next": "E_502_LOCKED"
    },
    {
      "id": "E_502_LOCKED",
      "actions": [
        {
          "type": "sound",
          "sound": "door_locked"
        },
        {
          "type": "dialogue",
          "text": "门被关死，打不开。"
        }
      ]
    },
    {
      "id": "E_502_CARRIAGE03",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "你推开了车门。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_03"
        },
        {
          "type": "dialogue",
          "text": "门外是3号车厢，灯光昏黄，一切如常。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_waiting_outside_inner_world",
            "equals": true
          },
          "next": "E_502_CARRIAGE03_CREW"
        }
      ]
    },
    {
      "id": "E_502_CARRIAGE03_CREW",
      "actions": [
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "crew_waiting_outside_inner_world",
          "value": false
        },
        {
          "type": "dialogue",
          "text": "你身旁的乘务员似乎并不知道这一切。"
        },
        {
          "type": "dialogue",
          "text": "如果这样的话，那你刚刚遇到的是……？"
        }
      ]
    },
    {
      "id": "E_503",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "你穿过车门。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_inner_02"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev503_intro_seen",
            "equals": true
          },
          "next": "E_503_TAIL"
        },
        {
          "type": "dialogue",
          "text": "同样是一节空车厢，但是色调似乎有些不同。"
        },
        {
          "type": "dialogue",
          "text": "车厢角落有一些裂缝，从中长出来了很多杂草和植物。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "……这是什么地方？"
        },
        {
          "type": "dialogue",
          "text": "先前的噪音不知何时已经渐渐退去，车厢的振动也变得轻微。"
        },
        {
          "type": "dialogue",
          "text": "列车还在行驶吗？"
        },
        {
          "type": "dialogue",
          "text": "你无法判断。"
        },
        {
          "type": "setFlag",
          "key": "ev503_intro_seen",
          "value": true
        }
      ],
      "next": "E_503_TAIL"
    },
    {
      "id": "E_503_TAIL",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "ev503_bottle_taken",
              "equals": true
            }
          },
          "next": "E_503_BOTTLES"
        }
      ]
    },
    {
      "id": "E_503_PICK",
      "actions": [
        {
          "type": "dialogue",
          "text": "你俯身捡起一支彩色的空玻璃瓶。"
        },
        {
          "type": "addItem",
          "item": "bottle"
        },
        {
          "type": "setFlag",
          "key": "ev503_bottle_taken",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        },
        {
          "type": "dialogue",
          "text": "握住瓶身的一瞬间，你听到像是歌声的东西……又或者像哭声或祈祷？",
          "audio": {
            "sound": "ghost_calling"
          }
        },
        {
          "type": "dialogue",
          "text": "你抬起头，声音消失了。"
        }
      ]
    },
    {
      "id": "E_504",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "flag": "ev504_scouting_done",
                "equals": true
              },
              {
                "flag": "ev504_scouting_ok",
                "equals": true
              }
            ]
          },
          "next": "E_504_S_REVISIT"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev504_scouting_done",
            "equals": true
          },
          "next": "E_504_F_REVISIT"
        },
        {
          "type": "dialogue",
          "text": "你用袖口擦开玻璃上的水雾，贴近车窗向外看。"
        },
        {
          "type": "dialogue",
          "text": "雾蒙蒙的，远方的一切都看不清。"
        },
        {
          "type": "check",
          "dice": "ev504_insight_01",
          "outcomes": [
            "E_504_S",
            "E_504_F"
          ]
        }
      ]
    },
    {
      "id": "E_504_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "雾后并不完全黑。你顺着玻璃上的反光避开车内灯影，终于看见远处有微光缓慢起伏。"
        },
        {
          "type": "dialogue",
          "text": "你把耳朵贴上冰冷的玻璃，听见密集的窸窣声，像无数叶片正贴着列车生长。"
        },
        {
          "type": "setFlag",
          "key": "ev504_scouting_ok",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "ev504_scouting_done",
          "value": true
        }
      ]
    },
    {
      "id": "E_504_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "车内灯光不断映回玻璃，雾中的影子全都重叠在一起。你看了很久，仍无法判断外面是否真的存在地面或天空。"
        },
        {
          "type": "setFlag",
          "key": "ev504_scouting_ok",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "ev504_scouting_done",
          "value": true
        }
      ]
    },
    {
      "id": "E_504_S_REVISIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "雾后仍浮着微弱的光，窸窣声没有消失。"
        }
      ]
    },
    {
      "id": "E_504_F_REVISIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "窗外依旧茫茫一片，什么也看不清。"
        }
      ]
    },
    {
      "id": "E_505",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "你继续前进。"
        },
        {
          "type": "dialogue",
          "text": "不知从哪一刻起，身后的噪音已经完全听不到了。"
        },
        {
          "type": "dialogue",
          "text": "取而代之的，是隐隐约约的音乐声。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_fake_04"
        },
        {
          "type": "setFlag",
          "key": "inner_world_entered",
          "value": true
        }
      ],
      "next": "E_506"
    },
    {
      "id": "E_506",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev506_intro_seen",
            "equals": true
          },
          "next": "E_506_REVISIT"
        },
        {
          "type": "dialogue",
          "text": "门上的编号写着：4。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "……见鬼。"
        },
        {
          "type": "dialogue",
          "text": "但这里不是4号车厢。座椅、车窗、天花板的灯——全都对不上号。哪里都相似，哪里都不对。"
        },
        {
          "type": "dialogue",
          "text": "这里为什么会有音乐声？"
        },
        {
          "type": "dialogue",
          "text": "诡异的柔和与温馨。"
        },
        {
          "type": "dialogue",
          "text": "想到之前在车厢中的见闻，你不由得打了个寒颤。"
        },
        {
          "type": "setFlag",
          "key": "ev506_intro_seen",
          "value": true
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_dead",
            "equals": true
          },
          "next": "E_507"
        }
      ],
      "next": "E_508"
    },
    {
      "id": "E_506_REVISIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "柔和的音乐仍在循环，音量与曲调分毫不差。你越听越觉得，这节车厢只是在模仿“温馨”。"
        }
      ]
    },
    {
      "id": "E_507",
      "actions": [
        {
          "type": "dialogue",
          "text": "车厢深处响起低语。那声音你认得，却又无比陌生——既像乘务员，也像是从你自己喉咙里漏出来的。"
        },
        {
          "type": "dialogue",
          "text": "那声音说："
        },
        {
          "type": "dialogue",
          "text": "为什么……为什么会变成这样？"
        },
        {
          "type": "dialogue",
          "text": "都是你的错……全都是你的错……是你…………"
        },
        {
          "type": "dialogue",
          "text": "我什么都不知道……我什么都没有做……我的双手干干净净……我的眼睛没有见过那些扭曲的形影……"
        },
        {
          "type": "dialogue",
          "text": "为什么，为什么会缠上我，"
        },
        {
          "type": "dialogue",
          "text": "都是你的错。"
        },
        {
          "type": "custom",
          "name": "innerWhisperScare"
        },
        {
          "type": "dialogue",
          "text": "低语戛然而止。"
        },
        {
          "type": "dialogue",
          "text": "你站在原地，后颈全是冷汗。"
        }
      ],
      "next": "E_509"
    },
    {
      "id": "E_508",
      "actions": [
        {
          "type": "dialogue",
          "text": "车厢深处响起一个声音。"
        },
        {
          "type": "dialogue",
          "text": "平静，温和，"
        },
        {
          "type": "dialogue",
          "text": "像是一直在等你。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "已经没事了，很快就会获救了。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "谁？"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "善良的，伟大的，仁慈的……我呼唤了祂的名字，我交换了愿望，主已经回应我了……"
        },
        {
          "type": "dialogue",
          "text": "某种沉沉的东西落在你肩上。"
        }
      ],
      "next": "E_509"
    },
    {
      "id": "E_509",
      "actions": [
        {
          "type": "dialogue",
          "text": "你站在原地。车厢尽头有一扇门通向更深处；来路那扇门还在原地；一旁的车窗映着幽暗的光。"
        }
      ]
    },
    {
      "id": "E_510",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "你推开那扇门。"
        },
        {
          "type": "changeScene",
          "scene": "flower_sea"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev510_flower_sea",
            "equals": true
          },
          "next": "E_510_REVISIT"
        },
        {
          "type": "dialogue",
          "text": "车门外就是花海。无边无际的花漫过车轨，铺到天尽头。这里真的还是现实世界吗？"
        },
        {
          "type": "dialogue",
          "text": "花丛在你踏出车门的一瞬间同时偏转，仿佛那些东西早已看见了你。"
        },
        {
          "type": "dialogue",
          "text": "当你意识到它们存在时，它们也已经看见并抓住了你。"
        },
        {
          "type": "dialogue",
          "text": "一阵不合时宜的快感沿脊背升起，紧接着变成反胃。你弯腰干呕，不安一点点渗进心口与指缝。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "text": "还来得及吗？快点……"
        },
        {
          "type": "setFlag",
          "key": "ev510_flower_sea",
          "value": true
        },
        {
          "type": "choice",
          "prompt": "",
          "options": [
            {
              "label": "继续深入",
              "next": "E_511"
            },
            {
              "label": "调头",
              "next": "E_513"
            }
          ]
        }
      ]
    },
    {
      "id": "E_510_REVISIT",
      "actions": [
        {
          "type": "choice",
          "prompt": "",
          "options": [
            {
              "label": "继续深入",
              "next": "E_511"
            },
            {
              "label": "调头",
              "next": "E_513"
            }
          ]
        }
      ]
    },
    {
      "id": "E_511",
      "actions": [
        {
          "type": "changeScene",
          "scene": "flower_sea_inside"
        },
        {
          "type": "dialogue",
          "text": "不适仅仅是一瞬间的，你很快便如鱼得水。"
        },
        {
          "type": "dialogue",
          "text": "你被它们捕获和容纳了。"
        },
        {
          "type": "dialogue",
          "text": "……"
        },
        {
          "type": "dialogue",
          "text": "已经过去多久了？"
        },
        {
          "type": "dialogue",
          "text": "你已经不太记得现实世界的事情了。现在你与它们坐谈终日。这其中内有洞天，穷尽一生也追不尽。"
        },
        {
          "type": "dialogue",
          "text": "层层嵌套，自我指涉，盘曲虬结，错综复杂。"
        },
        {
          "type": "dialogue",
          "text": "花的海洋，分形的海洋，爱的海洋，真理的海洋。"
        },
        {
          "type": "dialogue",
          "text": "你不再记得自己曾坐上一班列车。"
        },
        {
          "type": "dialogue",
          "text": "你不再记得自己要去哪里。"
        },
        {
          "type": "dialogue",
          "text": "花海在你体内生长。"
        },
        {
          "type": "dialogue",
          "text": "你终于属于这里了。"
        },
        {
          "type": "custom",
          "name": "endGame",
          "params": {
            "reason": "lost"
          }
        }
      ]
    },
    {
      "id": "E_513",
      "actions": [
        {
          "type": "dialogue",
          "text": "你退出花海，沿来路折返。本应回到原处的车门后，却出现了另一节陌生车厢。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_fake_03"
        }
      ],
      "next": "E_FAKE03_INTRO"
    },
    {
      "id": "E_515",
      "actions": [
        {
          "type": "custom",
          "name": "endGame",
          "params": {
            "reason": "fake_end"
          }
        }
      ]
    },
    {
      "id": "E_516",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev516_conversation_seen",
            "equals": true
          },
          "next": "E_516_REVISIT"
        },
        {
          "type": "setFlag",
          "key": "ev516_conversation_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你走向车窗。就在指尖将要碰到玻璃的一刻，一个声音在身后响起——"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_04_dead",
            "equals": true
          },
          "next": "E_516_DEAD"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_met",
            "equals": true
          },
          "next": "E_516_MET"
        },
        {
          "type": "dialogue",
          "text": "一个陌生的声音。你回过头，看向坐在窗边的乘务员。"
        }
      ],
      "next": "E_516_VOICE"
    },
    {
      "id": "E_516_REVISIT",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev517_flower_revealed",
            "equals": true
          },
          "next": "E_516_REVISIT_FLOWER"
        },
        {
          "type": "dialogue",
          "text": "窗外仍是一片浓雾，那个声音没有再次开口。"
        }
      ]
    },
    {
      "id": "E_516_REVISIT_FLOWER",
      "actions": [
        {
          "type": "dialogue",
          "text": "花海仍在窗外无声起伏，那个声音没有再次开口。"
        }
      ]
    },
    {
      "id": "E_517",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev517_flower_revealed",
            "equals": true
          },
          "next": "E_517_TALK"
        },
        {
          "type": "dialogue",
          "text": "窗外的雾气散开了。"
        },
        {
          "type": "setFlag",
          "key": "ev517_flower_revealed",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        }
      ],
      "next": "E_517_TALK"
    },
    {
      "id": "E_518",
      "actions": [
        {
          "type": "dialogue",
          "text": "你望向窗外。"
        },
        {
          "type": "dialogue",
          "text": "雾蒙蒙的，看不清。"
        },
        {
          "type": "dialogue",
          "text": "她坐在窗边，嘴唇开合——一字一句地对你说："
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "有时候我觉得活着挺没劲的。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "忙不完的工作，交际，应付，假笑，点头，弯腰，灵魂被磨成胸前一张薄薄的工牌，晃啊，晃啊，晃到终点站。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "每天踏上同一班列车，同一节车厢，同一个靠门的位置。看同一张令人厌恶的脸映在玻璃上，碌碌无为。惶惶终日。像被什么无形的轨道钉死了，只能沿着既定的方向滑行，滑行，滑行。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "机器至少知道自己被造出来是为了什么。你呢？"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "你只知道闹钟响。起床。刷牙。出门。刷卡。进站。等车。上车。换乘。出站。打卡。开机。回邮件。开会。午休。开机。回邮件。开会。下班。打卡。进站。等车。上车。换乘。出站。回家。吃饭。洗澡。刷手机。睡觉。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "如果有谁能拯救我们就好了。如果有谁能改变这无聊的一切就好了。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "而祂现在来了，亲爱的。春天来了。你人生的美妙意义来了。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "崭新的，全新的，完美的，极乐的，新世界。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "让这花的洪流席卷一切，"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "大脑从耳朵里温热地流出来，从此不再为莫名其妙的东西发愁。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "我们一起改造这个世界，"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "把这无聊的一切全部撕碎。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "撕碎，撕碎……"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "碎片落进浪潮里，浪潮涌向新世界。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "新世界里没有昨天，今天和明天，没有我，你和他……ONLY US"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "永恒"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "你找到钥匙了吗？把它给我吧。我们去结束这一切。"
        }
      ],
      "next": "E_519"
    },
    {
      "id": "E_519",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "hasItem": "driver_cab_key"
              },
              {
                "hasItem": "control_panel_key"
              }
            ]
          },
          "next": "E_519_HASKEY"
        }
      ],
      "next": "E_519_NOKEY"
    },
    {
      "id": "E_519_NOKEY",
      "actions": [
        {
          "type": "dialogue",
          "text": "…………"
        },
        {
          "type": "dialogue",
          "text": "她没有再问。夜色般的沉默垂落下来，你只能自己做出决定。"
        }
      ],
      "next": "E_520"
    },
    {
      "id": "E_519_HASKEY",
      "actions": [
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "你找到钥匙了吗？"
        },
        {
          "type": "dialogue",
          "text": "你摸到了口袋里那把钥匙。"
        },
        {
          "type": "choice",
          "prompt": "",
          "options": [
            {
              "label": "把钥匙给她",
              "next": "E_519_GIVE"
            },
            {
              "label": "留着",
              "next": "E_519_KEEP"
            }
          ]
        }
      ]
    },
    {
      "id": "E_519_GIVE",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "all": [
                {
                  "hasItem": "driver_cab_key"
                },
                {
                  "hasItem": "control_panel_key"
                }
              ]
            }
          },
          "next": "E_519_NOKEY"
        },
        {
          "type": "dialogue",
          "text": "你把钥匙递出去。她接过去，指腹拂过齿纹，神情安静得可怕。"
        },
        {
          "type": "removeItem",
          "item": "driver_cab_key"
        },
        {
          "type": "removeItem",
          "item": "control_panel_key"
        },
        {
          "type": "setFlag",
          "key": "ev519_key_given",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "ev519_key_ever_given",
          "value": true
        }
      ],
      "next": "E_520"
    },
    {
      "id": "E_519_KEEP",
      "actions": [
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "portrait": "assets/Image/Portrait/conductor-crazy.ie.png",
          "text": "……"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "portrait": "assets/Image/Portrait/conductor-crazy.ie.png",
          "text": "这就是你的选择吗，亲爱的？"
        },
        {
          "type": "custom",
          "name": "startInnerWorldLaugh"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "portrait": "assets/Image/Portrait/conductor-crazy.ie.png",
          "text": "愚蠢。"
        },
        {
          "type": "custom",
          "name": "centeredCinematic",
          "params": {
            "image": "assets/Image/Scene/Background/inner-refusal-crew-01.ie.jpg",
            "text": "你以为，不给我，你就能从这里出去吗？",
            "duration": 2400
          }
        },
        {
          "type": "custom",
          "name": "centeredCinematic",
          "params": {
            "image": "assets/Image/Scene/Background/inner-refusal-crew-02.ie.jpg",
            "text": "把钥匙给我",
            "duration": 1600,
            "flash": true
          }
        },
        {
          "type": "custom",
          "name": "timedStoryChoice",
          "params": {
            "prompt": "往哪边跑？",
            "duration": 5000,
            "flag": "ev519_escape_left",
            "defaultValue": true,
            "options": [
              {
                "label": "往左跑",
                "value": true
              },
              {
                "label": "往右跑",
                "value": false
              }
            ]
          }
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev519_escape_left",
            "equals": true
          },
          "next": "E_REFUSAL_LEFT"
        }
      ],
      "next": "E_510"
    },
    {
      "id": "E_REFUSAL_LEFT",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_fake_02"
        },
        {
          "type": "custom",
          "name": "fakeCarriageHandprints",
          "params": {
            "flags": [
              "ev_fake02_blood_1",
              "ev_fake02_blood_2",
              "ev_fake02_blood_3",
              "ev_fake02_blood_4"
            ],
            "doneFlag": "ev_fake02_handprints_done",
            "sound": "knocking_wall",
            "interval": 1200,
            "lockedEvent": "E_FAKE02_LEFT"
          }
        }
      ]
    },
    {
      "id": "E_FAKE02_LEFT",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "setFlag",
          "key": "ev_fake01_crew_seen",
          "value": false
        },
        {
          "type": "changeScene",
          "scene": "carriage_fake_01"
        },
        {
          "type": "dialogue",
          "text": "你撞开车门，周围顿时天旋地转。车厢、车门与把手同时向不同方向弯折，所有熟悉的形状都变得畸形。"
        },
        {
          "type": "dialogue",
          "text": "体内的五脏六腑好像也被扭曲了，嚎叫着要冲破肉体可悲的屏障。"
        },
        {
          "type": "dialogue",
          "text": "一阵无法控制的反胃猛地涌上来。你扶住墙壁，干呕起来。"
        },
        {
          "type": "dialogue",
          "text": "每一步都变得如此艰难。"
        },
        {
          "type": "dialogue",
          "speaker": "你",
          "portrait": "assets/Image/Portrait/player-scared.ie.png",
          "text": "放过我吧……"
        }
      ]
    },
    {
      "id": "E_FAKE02_RIGHT",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_fake_03"
        }
      ],
      "next": "E_FAKE03_INTRO"
    },
    {
      "id": "E_FAKE03_INTRO",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev_fake03_intro_seen",
            "equals": true
          },
          "next": "E_FAKE03_REVISIT"
        },
        {
          "type": "setFlag",
          "key": "ev_fake03_intro_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你匆忙踏进眼前这节陌生车厢。"
        },
        {
          "type": "dialogue",
          "text": "车厢的颜色发生了不可名状的变化。"
        },
        {
          "type": "dialogue",
          "text": "乘务员呢？"
        },
        {
          "type": "dialogue",
          "text": "你定睛一看，乘务员的头颅已然掉在地上，鲜血流成了湖泊。"
        },
        {
          "type": "dialogue",
          "text": "你不敢再仔细观察。"
        }
      ]
    },
    {
      "id": "E_FAKE03_LEFT",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "changeScene",
          "scene": "carriage_fake_02"
        },
        {
          "type": "custom",
          "name": "fakeCarriageHandprints",
          "params": {
            "flags": [
              "ev_fake02_blood_1",
              "ev_fake02_blood_2",
              "ev_fake02_blood_3",
              "ev_fake02_blood_4"
            ],
            "doneFlag": "ev_fake02_handprints_done",
            "sound": "knocking_wall",
            "interval": 1200,
            "lockedEvent": "E_FAKE02_LEFT"
          }
        }
      ]
    },
    {
      "id": "E_FAKE02_HANDPRINT_NOOP",
      "actions": []
    },
    {
      "id": "E_FAKE01_EXIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "你心怀一丝侥幸地爬到了门口，抬手推门。"
        },
        {
          "type": "sound",
          "sound": "door_locked"
        },
        {
          "type": "dialogue",
          "text": "——打不开。"
        },
        {
          "type": "dialogue",
          "text": "一阵强烈的晕眩袭来，你下意识地四处张望。"
        },
        {
          "type": "sound",
          "sound": "tinnitus_fake01"
        },
        {
          "type": "setFlag",
          "key": "ev_fake01_crew_seen",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        },
        {
          "type": "dialogue",
          "text": "窗外那是什么？"
        },
        {
          "type": "dialogue",
          "text": "你终于看清了。"
        },
        {
          "type": "dialogue",
          "text": "是乘务员扭曲的脸。"
        },
        {
          "type": "dialogue",
          "text": "你失去了呼喊的力气。"
        },
        {
          "type": "check",
          "dice": "ev_fake01_exit_san_01"
        },
        {
          "type": "custom",
          "name": "fadeScene",
          "params": {
            "scene": "carriage_03",
            "fadeIn": 1600,
            "hold": 550,
            "fadeOut": 900
          }
        }
      ]
    },
    {
      "id": "E_520",
      "actions": [
        {
          "type": "dialogue",
          "text": "你站在窗边。车厢两头的门仍在原处，你得决定接下来往哪边走。"
        }
      ]
    },
    {
      "id": "E_522",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "你穿过来路的车门。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_inner_02"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev522_intro_seen",
            "equals": true
          },
          "next": "E_522_TAIL"
        },
        {
          "type": "dialogue",
          "text": "角落里仍长着从裂缝钻出的花草。你认得这里，也认得通往现实的方向。"
        },
        {
          "type": "setFlag",
          "key": "ev522_intro_seen",
          "value": true
        }
      ],
      "next": "E_522_TAIL"
    },
    {
      "id": "E_522_TAIL",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "bottle"
          },
          "next": "E_522_BOTTLE"
        }
      ]
    },
    {
      "id": "E_523",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev523_seen",
            "equals": true
          },
          "next": "E_524"
        },
        {
          "type": "dialogue",
          "text": "你注意到新出现了一扇高度磨损的车门，散发着不祥的气息。"
        },
        {
          "type": "dialogue",
          "text": "恐怕，就是这里了。"
        },
        {
          "type": "dialogue",
          "text": "噪音再次清晰起来——真实世界的声音，从门缝里透进来。"
        },
        {
          "type": "dialogue",
          "text": "你深吸一口气。"
        },
        {
          "type": "setFlag",
          "key": "ev523_seen",
          "value": true
        }
      ],
      "next": "E_524"
    },
    {
      "id": "E_524",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "你握紧门把，确认身上的钥匙与物品都还在，随后推开门——"
        },
        {
          "type": "changeScene",
          "scene": "carriage_02"
        },
        {
          "type": "dialogue",
          "text": "这一次，门后是真正的2号车厢。"
        },
        {
          "type": "setFlag",
          "key": "inner_world_left",
          "value": true
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev519_key_given",
            "equals": true
          },
          "next": "E_524_KEY"
        }
      ],
      "next": "E_524_DONE"
    },
    {
      "id": "E_525",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "你推开那扇门——门外不是来路。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_06"
        },
        {
          "type": "dialogue",
          "text": "你踏出去，这里是……6号车厢。"
        },
        {
          "type": "dialogue",
          "text": "此时的车厢已经被啃食。座椅东倒西歪，墙壁与地板布满撕咬的痕迹，空气中残留着潮湿的铁锈味。"
        }
      ]
    },
    {
      "id": "E_503_BACK",
      "actions": [
        {
          "type": "sound",
          "sound": "door_open"
        },
        {
          "type": "dialogue",
          "text": "你向来路折返。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_inner_01"
        }
      ],
      "next": "E_502"
    },
    {
      "id": "E_503_BOTTLES",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev503_bottles_seen",
            "equals": true
          },
          "next": "E_503_BOTTLES_REVISIT"
        },
        {
          "type": "setFlag",
          "key": "ev503_bottles_seen",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "角落里散落着几支彩色的空玻璃瓶，在昏暗中泛着不真实的颜色。瓶身彼此轻碰，发出的却不是玻璃声，而像很远处的低语。"
        }
      ]
    },
    {
      "id": "E_FAKE03_REVISIT",
      "actions": [
        {
          "type": "dialogue",
          "text": "那颗头颅仍倒在血泊里，位置却像是比刚才更靠近门口。你移开视线，不愿确认。"
        }
      ]
    },
    {
      "id": "E_503_BOTTLES_REVISIT",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "ev503_bottle_taken",
              "equals": true
            }
          },
          "next": "E_503_BOTTLES_REVISIT_EMPTY"
        },
        {
          "type": "dialogue",
          "text": "剩下的玻璃瓶仍挤在角落里。你没有再碰它们，只确认先前拿走的那一支还在身上。"
        }
      ]
    },
    {
      "id": "E_503_BOTTLES_REVISIT_EMPTY",
      "actions": [
        {
          "type": "dialogue",
          "text": "玻璃瓶仍挤在角落里。你没有碰它们。"
        }
      ]
    },
    {
      "id": "E_516_MET",
      "actions": [
        {
          "type": "dialogue",
          "text": "是她的声音，平静得好像她本来就属于这里。"
        }
      ],
      "next": "E_516_VOICE"
    },
    {
      "id": "E_516_DEAD",
      "actions": [
        {
          "type": "dialogue",
          "text": "是她的声音。你认得出来——她不是已经死了吗？是谁在说话……？"
        }
      ],
      "next": "E_516_VOICE"
    },
    {
      "id": "E_516_VOICE",
      "actions": [
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "……你在看什么？"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev504_scouting_ok",
            "equals": true
          },
          "next": "E_517"
        }
      ],
      "next": "E_518"
    },
    {
      "id": "E_517_TALK",
      "actions": [
        {
          "type": "dialogue",
          "text": "你看到一片花海，无边无际，在幽暗的光线下安静地起伏。"
        },
        {
          "type": "dialogue",
          "text": "她坐在窗边，望着那片花海。过了很久，她开口了："
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "有时候我觉得活着挺没劲的。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "忙不完的工作，交际，应付，假笑，点头，弯腰，灵魂被磨成胸前一张薄薄的工牌，晃啊，晃啊，晃到终点站。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "每天踏上同一班列车，同一节车厢，同一个靠门的位置。看同一张令人厌恶的脸映在玻璃上，碌碌无为。惶惶终日。像被什么无形的轨道钉死了，只能沿着既定的方向滑行，滑行，滑行。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "机器至少知道自己被造出来是为了什么。你呢？"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "你只知道闹钟响。起床。刷牙。出门。刷卡。进站。等车。上车。换乘。出站。打卡。开机。回邮件。开会。午休。开机。回邮件。开会。下班。打卡。进站。等车。上车。换乘。出站。回家。吃饭。洗澡。刷手机。睡觉。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "如果有谁能拯救我们就好了。如果有谁能改变这无聊的一切就好了。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "我们曾一直期待它会来。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "期待一场浪潮，一场盛大而危险的春天。不管它带来什么东西，总会好过……"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "你知道许愿柳的故事吗？或者猴爪。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "在你愿望的时候，你甚至其实不知道自己在愿望什么……"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "我们无数人的盼望下，降生的是什么？在它真的到来的一天，这里剩下的是什么？"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "个人的能力是多么的渺小啊，在大势所趋面前，所有的努力终如蚍蜉撼树。"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "所以，停下来，求求你。然后我们逃离这里，再也不回来……"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "……只要我们活到明天，一切最终会好起来……不是吗？"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "虔诚地相信，置身事外，热爱生活。在那之后，我们就可以……"
        },
        {
          "type": "dialogue",
          "speaker": "？？？",
          "text": "你找到钥匙了吗？我们去停下列车……"
        }
      ],
      "next": "E_519"
    },
    {
      "id": "E_522_BOTTLE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你摸了摸口袋里的彩色玻璃瓶，瓶身冰凉。"
        }
      ]
    },
    {
      "id": "E_524_KEY",
      "actions": [
        {
          "type": "addItem",
          "item": "driver_cab_key"
        },
        {
          "type": "addItem",
          "item": "control_panel_key"
        },
        {
          "type": "setFlag",
          "key": "ev519_key_ever_given",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "ev519_key_given",
          "value": false
        },
        {
          "type": "dialogue",
          "text": "你低头看去——那把钥匙不知何时回到了自己身上。"
        },
        {
          "type": "custom",
          "name": "keyHopeSanReward",
          "params": {
            "holder": "player"
          }
        }
      ],
      "next": "E_524_DONE"
    },
    {
      "id": "E_524_DONE",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_waiting_outside_inner_world",
            "equals": true
          },
          "next": "E_524_CREW"
        }
      ],
      "next": "E_025"
    },
    {
      "id": "E_524_CREW",
      "actions": [
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "crew_waiting_outside_inner_world",
          "value": false
        },
        {
          "type": "dialogue",
          "text": "你身旁的乘务员似乎并不知道这一切。"
        },
        {
          "type": "dialogue",
          "text": "如果这样的话，那你刚刚遇到的是……？"
        }
      ],
      "next": "E_025"
    }
  ],
  "items": [
    {
      "id": "note_06_item",
      "name": "便签",
      "image": "assets/Image/Item/note.ie.png",
      "description": "从 6 号车厢门上取下来的便签。",
      "inspectEvent": "E_NOTE_06_ITEM"
    },
    {
      "id": "bottle",
      "name": "彩色玻璃瓶",
      "image": "assets/Image/Item/bottle.ie.png",
      "description": "从诡异的花草车厢里捡到的空瓶子，瓶身是粉红色的普通玻璃。",
      "inspectEvent": "E_023_BOTTLE"
    },
    {
      "id": "newspaper",
      "name": "报纸",
      "image": "assets/Image/Item/newspaper.ie.png",
      "description": "标题：昨晚1号线电车的末班车遭遇大规模恐怖事件，幸存者精神异常被送医，警方调查困难。",
      "inspectEvent": "E_ITEM_NEWSPAPER_INSPECT"
    },
    {
      "id": "driver_cab_key",
      "name": "驾驶室钥匙",
      "image": "assets/Image/Item/driver-cab-key.ie.png",
      "description": "用于打开列车驾驶室门的钥匙。",
      "inspectEvent": "E_ITEM_DRIVER_CAB_KEY_INSPECT"
    },
    {
      "id": "control_panel_key",
      "name": "操作面板钥匙",
      "image": "assets/Image/Item/control-panel-key.ie.png",
      "description": "用于打开驾驶室操作面板的钥匙。",
      "inspectEvent": "E_ITEM_CONTROL_PANEL_KEY_INSPECT"
    },
    {
      "id": "phone",
      "name": "手机",
      "image": "assets/Image/Item/phone.ie.png",
      "description": "一部手机。",
      "inspectEvent": "E_ITEM_PHONE_INSPECT"
    },
    {
      "id": "flashlight",
      "name": "手电筒",
      "image": "assets/Image/Item/flashlight.ie.png",
      "description": "一支还能发光的手电筒。",
      "inspectEvent": "E_ITEM_FLASHLIGHT_INSPECT"
    },
    {
      "id": "drink",
      "name": "饮料",
      "image": "assets/Image/Item/drink.ie.png",
      "description": "一罐还未开封的饮料。",
      "inspectEvent": "E_ITEM_DRINK_INSPECT"
    },
    {
      "id": "drink_empty",
      "name": "空易拉罐",
      "image": "assets/Image/Item/drink_empty.ie.png",
      "description": "喝完饮料后留下的空易拉罐。制造声响时，也许能派上用场。",
      "inspectEvent": "E_ITEM_DRINK_EMPTY_INSPECT"
    },
    {
      "id": "emergency_cutter",
      "name": "应急割带器",
      "image": "assets/Image/Item/emergency-belt-cutter.ie.png",
      "description": "可以割断黑色背包背带的应急工具。",
      "inspectEvent": "E_ITEM_EMERGENCY_CUTTER_INSPECT"
    },
    {
      "id": "pry_bar",
      "name": "撬杆",
      "image": "assets/Image/Item/pry-bar.ie.png",
      "description": "可以撬开被行李压住的箱体。",
      "inspectEvent": "E_ITEM_PRY_BAR_INSPECT"
    }
  ],
  "attributes": {
    "totalPoints": 22,
    "attributes": [
      {
        "id": "constitution",
        "name": "体质",
        "description": "衡量身体力量、耐力、行动和负重能力。",
        "initial": 3,
        "min": 1,
        "max": 10
      },
      {
        "id": "education",
        "name": "教育",
        "description": "衡量知识储备、专业训练和学习能力。",
        "initial": 3,
        "min": 1,
        "max": 10
      },
      {
        "id": "insight",
        "name": "灵感",
        "description": "衡量观察异常、联想线索和理解现象的能力。",
        "initial": 3,
        "min": 1,
        "max": 10
      },
      {
        "id": "san",
        "name": "SAN",
        "description": "衡量角色承受精神冲击的能力，游戏过程中可降低至0。",
        "initial": 1,
        "min": 0,
        "max": null
      }
    ]
  },
  "skills": [
    {
      "id": "throwing",
      "name": "投掷",
      "description": "将物品准确投向目标位置或利用声响转移敌人注意。",
      "initial": false
    }
  ],
  "audio": [
    {
      "id": "dice_rolling",
      "name": "检定滚动",
      "file": "assets/Audio/SoundEffect/dice-rolling.mp3",
      "description": "检定动画抖动阶段播放。"
    },
    {
      "id": "dice_success",
      "name": "检定成功",
      "file": "assets/Audio/SoundEffect/dice-success.mp3",
      "description": "检定结果显示成功时播放。"
    },
    {
      "id": "dice_fail",
      "name": "检定失败",
      "file": "assets/Audio/SoundEffect/dice-fail.mp3",
      "description": "检定结果显示失败时播放。"
    },
    {
      "id": "train_ambient",
      "name": "列车行驶背景音",
      "file": "assets/Audio/SoundEffect/train-ambient.mp3",
      "volume": 0.45,
      "description": "正式进入游戏后循环播放的背景音。"
    },
    {
      "id": "door_open",
      "name": "铁门打开",
      "file": "assets/Audio/SoundEffect/iron-door-open.mp3",
      "volume": 0.8,
      "description": "车门可以打开并实际通行时播放。"
    },
    {
      "id": "door_locked",
      "name": "车门无法打开",
      "file": "assets/Audio/SoundEffect/iron-door-knock.mp3",
      "volume": 0.8,
      "description": "车门锁死、被堵住或无法打开时播放。"
    },
    {
      "id": "loud_noise",
      "name": "收音机成功后的巨响",
      "file": "assets/Audio/SoundEffect/loud-noise.mp3",
      "volume": 0.8,
      "description": "收音机调频小游戏成功、在7号车厢解码广播后播放。"
    },
    {
      "id": "metro_speed_up",
      "name": "列车加速",
      "file": "assets/Audio/SoundEffect/metro-speed-up.mp3",
      "volume": 0.8,
      "description": "头车选择加速并成功控制列车时播放。"
    },
    {
      "id": "metro_speed_down",
      "name": "列车减速",
      "file": "assets/Audio/SoundEffect/metro-speed-down.mp3",
      "volume": 0.8,
      "description": "头车选择减速或控制杆争夺失败时播放。"
    },
    {
      "id": "metro_arriving",
      "name": "终点站到达广播",
      "file": "assets/Audio/SoundEffect/metro-arriving.mp3",
      "volume": 0.8,
      "description": "结局 A 醒来后播放的终点站广播。"
    },
    {
      "id": "airport_gate1",
      "name": "站台人流与出站环境音",
      "file": "assets/Audio/SoundEffect/airport-gate1.mp3",
      "volume": 0.72,
      "description": "结局 A 跟随人群走出站台时播放。"
    },
    {
      "id": "devil_scared",
      "name": "二号车厢循环环境音",
      "file": "assets/Audio/SoundEffect/devil-scared.mp3",
      "volume": 0.45,
      "description": "玩家位于2号车厢时循环播放。"
    },
    {
      "id": "breaking_glass",
      "name": "玻璃瓶破碎",
      "file": "assets/Audio/SoundEffect/breaking-glass.mp3",
      "volume": 0.8,
      "description": "在2号车厢成功投掷并击碎玻璃瓶时播放。"
    },
    {
      "id": "drinking",
      "name": "饮用饮料",
      "file": "assets/Audio/SoundEffect/drinking1.mp3",
      "volume": 0.8,
      "description": "玩家饮用饮料时播放。"
    },
    {
      "id": "can_striking",
      "name": "易拉罐碰撞",
      "file": "assets/Audio/SoundEffect/striking.mp3",
      "volume": 0.8,
      "description": "易拉罐被碰撞或丢出并发出声响时播放。"
    },
    {
      "id": "tearing",
      "name": "撕裂声",
      "file": "assets/Audio/SoundEffect/tearing.mp3",
      "volume": 0.7,
      "description": "6号车厢查看便签背面时播放。"
    },
    {
      "id": "finding_in_papers",
      "name": "翻找物品",
      "file": "assets/Audio/SoundEffect/finding-in-papers.mp3",
      "volume": 0.6,
      "description": "翻找背包、行李或杂物时播放。"
    },
    {
      "id": "cry_of_despair_girls",
      "name": "乘务员绝望的哭喊",
      "file": "assets/Audio/SoundEffect/cry-of-despair-girls.mp3",
      "volume": 0.9,
      "description": "未能救活乘务员的加速结局尾声中播放。"
    },
    {
      "id": "locker_open",
      "name": "员工柜开门",
      "file": "assets/Audio/SoundEffect/locker_O.mp3",
      "volume": 0.8,
      "description": "点击4号车厢员工柜时播放。"
    },
    {
      "id": "eating_crisps",
      "name": "啃食循环音",
      "file": "assets/Audio/SoundEffect/eating-crisps.mp3",
      "volume": 0.45,
      "description": "7号车厢和被啃食后的里6号车厢循环播放，每轮之间留出间隔。"
    },
    {
      "id": "pouring_sake",
      "name": "粘稠液体流过",
      "file": "assets/Audio/SoundEffect/pouring-sake.mp3",
      "volume": 0.72,
      "description": "停车结局中血水流过脚下的声音。"
    },
    {
      "id": "ending_san0",
      "name": "SAN 归零结局音乐",
      "file": "assets/Audio/Bgm/san0.mp3",
      "volume": 0.8,
      "description": "SAN 归零结局开场播放，抬头露出笑容前停止。"
    },
    {
      "id": "ending_bad",
      "name": "停车结局音乐",
      "file": "assets/Audio/Bgm/be.mp3",
      "volume": 0.8,
      "description": "停车结局血水出现时播放。"
    },
    {
      "id": "ending_he",
      "name": "真结局前段音乐",
      "file": "assets/Audio/Bgm/he.mp3",
      "volume": 0.8,
      "description": "真结局开场播放至醒来。"
    },
    {
      "id": "ending_he2",
      "name": "真结局醒来音乐",
      "file": "assets/Audio/Bgm/he2.mp3",
      "volume": 0.8,
      "description": "真结局醒来后播放。"
    },
    {
      "id": "ending_lost",
      "name": "失落结局音乐",
      "file": "assets/Audio/Bgm/lost.mp3",
      "volume": 0.8,
      "description": "失落结局三段画面演出期间循环播放。"
    },
    {
      "id": "opening_cracker_bag",
      "name": "拆开包装",
      "file": "assets/Audio/SoundEffect/opening-cracker-bag.mp3",
      "volume": 0.7,
      "description": "6号车厢听到远处怪异声音时播放。"
    },
    {
      "id": "fake",
      "name": "伪4号与花海场景音乐",
      "file": "assets/Audio/SoundEffect/fake.mp3",
      "volume": 0.7,
      "description": "停留在伪4号车厢或花海场景时连续循环播放，跨场景不重置进度。"
    },
    {
      "id": "woman_laughing",
      "name": "乘务员讥笑",
      "file": "assets/Audio/SoundEffect/woman-laughing.mp3",
      "volume": 0.8,
      "description": "里世界拒绝交出钥匙后循环播放；进入花海车厢时让位给花海场景音乐。"
    },
    {
      "id": "ghost_calling",
      "name": "玻璃瓶中的歌声",
      "file": "assets/Audio/SoundEffect/ghost-calling.mp3",
      "volume": 0.7,
      "description": "里世界花草车厢拾起彩色玻璃瓶、听见歌声时播放。"
    },
    {
      "id": "tinnitus_e011",
      "name": "E-011耳鸣",
      "file": "assets/Audio/SoundEffect/tinnitus-1.mp3",
      "volume": 0.7,
      "description": "E-011成功分支只循环音频开头2秒，点击当前对白后停止。"
    },
    {
      "id": "siren_e011",
      "name": "E-011警报",
      "file": "assets/Audio/SoundEffect/siren-2.mp3",
      "volume": 0.7,
      "description": "E-011成功分支只循环音频开头3秒，覆盖连续三句对白后停止。"
    },
    {
      "id": "distortion_e006",
      "name": "E-006维度失真",
      "file": "assets/Audio/SoundEffect/distortion-of-the-dim.mp3",
      "volume": 0.7,
      "description": "进入7号车厢时播放2秒。"
    },
    {
      "id": "dark_atmosphere_e009",
      "name": "E-009阴暗氛围",
      "file": "assets/Audio/SoundEffect/dark-atmosphere.mp3",
      "volume": 0.7,
      "description": "E-009进入6号车厢后循环播放音频开头5秒，推进完前十句旁白后停止。"
    },
    {
      "id": "bullying_e009",
      "name": "E-009刺耳诡异",
      "file": "assets/Audio/SoundEffect/bullying.mp3",
      "volume": 0.7,
      "description": "E-009‘刚才的人，都去哪了？’播放音频开头0至3秒，不循环。"
    },
    {
      "id": "electrical_noise_e023",
      "name": "E-023电流嘶鸣",
      "file": "assets/Audio/SoundEffect/electrical-noise-1.mp3",
      "volume": 0.7,
      "description": "E-023从‘然后，一个声音一字一顿地说’开始循环播放音频开头4.5秒，推进完后续三句对白后停止。"
    },
    {
      "id": "horror_piano_e018",
      "name": "E-018恐怖钢琴",
      "file": "assets/Audio/SoundEffect/horror-piano-chord-4.mp3",
      "volume": 0.7,
      "description": "E-018手机日期后循环音频开头5秒，直到‘你不知道该相信哪一个。’推进后停止。"
    },
    {
      "id": "knocking_wall",
      "name": "血手印拍击",
      "file": "assets/Audio/SoundEffect/knocking-a-wall.mp3",
      "volume": 0.9,
      "description": "假里2号车厢每出现一个血手印时播放一次。"
    },
    {
      "id": "maze",
      "name": "假里1号车厢扭曲氛围",
      "file": "assets/Audio/SoundEffect/maze.mp3",
      "volume": 0.76,
      "description": "进入假里1号车厢、空间开始扭曲时播放。"
    },
    {
      "id": "tinnitus_fake01",
      "name": "假里1号车厢耳鸣",
      "file": "assets/Audio/SoundEffect/tinnitus-3.mp3",
      "volume": 0.8,
      "description": "假里1号车厢发现窗外乘务员前播放。"
    },
    {
      "id": "button_select",
      "name": "按钮点击",
      "file": "assets/Audio/SoundEffect/select02.mp3",
      "description": "游戏内按钮点击时播放；开场与结局演出除外。"
    },
    {
      "id": "switch1",
      "name": "车厢熄灯开关声",
      "file": "assets/Audio/SoundEffect/switch1.mp3",
      "volume": 0.85,
      "description": "5号车厢打开报纸、灯光骤灭时播放。"
    },
    {
      "id": "heartbeats",
      "name": "黑暗中的心跳",
      "file": "assets/Audio/SoundEffect/heartbeats.mp3",
      "volume": 0.82,
      "description": "5号车厢读报时未持有手电筒的等待分支循环播放。"
    }
  ]
};
