window.GAME_DATA = {
  "meta": {
    "formatVersion": 3,
    "title": "常暗之厢（框架演示）",
    "coverImage": "assets/cover-placeholder.svg",
    "startEvent": "E_001",
    "initialScene": "carriage_06",
    "initialState": {
      "sceneId": "carriage_06",
      "currentEventId": null,
      "flags": {},
      "inventory": [],
      "objectStates": {},
      "checkResults": {}
    }
  },
  "scenes": [
    {
      "id": "carriage_06",
      "name": "6 号车厢",
      "background": "assets/carriage-06.png",
      "backgroundVariants": [
        {
          "image": "assets/carriage-06-eaten.png",
          "visibleWhen": {
            "flag": "carriage_06_eaten",
            "equals": true
          }
        },
        {
          "image": "assets/carriage-06-note-removed.png",
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
          "image": "assets/note-06.png",
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
          "image": "assets/door.svg",
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_005",
          "visibleWhen": {
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
        {
          "id": "door_06_to_05",
          "name": "通往5号车厢的门",
          "image": "assets/door.svg",
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
          "id": "note_back_06",
          "name": "便签背面",
          "image": "assets/note-06.png",
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
          "image": "assets/map-06.png",
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
          "image": "assets/mg3d-demo-spot.svg",
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
      "background": "assets/carriage-07.png",
      "objects": [
        {
          "id": "radio_07",
          "name": "损坏的收音机",
          "image": "assets/radio-07.png",
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
          "image": "assets/door.svg",
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
          "image": "assets/corpse-07.png",
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
          "image": "assets/door.svg",
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
      "background": "assets/carriage-05.png",
      "objects": [
        {
          "id": "door_05_to_06",
          "name": "通往6号车厢的门",
          "image": "assets/door.svg",
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
          "image": "assets/door.svg",
          "position": {
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_013"
        },
        {
          "id": "clutter_05_a",
          "name": "散落的行李",
          "image": "assets/bag-05-a.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_05_JUNK_A"
        },
        {
          "id": "clutter_05_b",
          "name": "遗落的提包",
          "image": "assets/bag-05-b.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_05_JUNK_A"
        },
        {
          "id": "tool_clutter_05",
          "name": "倒下的背包",
          "image": "assets/black-bag-03.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
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
          "image": "assets/newspaper-05.png",
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
          "clickEvent": "E_05_SEARCH_NEWS",
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
          "image": "assets/trash-05-b.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_05_JUNK_C"
        },
        {
          "id": "clutter_05_d",
          "name": "散落的垃圾袋",
          "image": "assets/trash-05-a.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_05_JUNK_C"
        }
      ]
    },
    {
      "id": "carriage_04",
      "name": "4 号车厢",
      "background": "assets/carriage-04.png",
      "backgroundVariants": [
        {
          "image": "assets/4号车厢_乘务员_背走后.png",
          "visibleWhen": {
            "flag": "carried_crew",
            "equals": true
          }
        }
      ],
      "objects": [
        {
          "id": "door_04_to_05",
          "name": "通往5号车厢的门",
          "image": "assets/door.svg",
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
          "image": "assets/door.svg",
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
          "id": "crew_04",
          "name": "重伤的乘务员",
          "image": "assets/4号车厢_乘务员.png",
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
          "clickEvent": "E_014"
        }
      ]
    },
    {
      "id": "carriage_03",
      "name": "3 号车厢",
      "background": "assets/carriage-03.png",
      "objects": [
        {
          "id": "door_03_to_04",
          "name": "通往4号车厢的门",
          "image": "assets/door.svg",
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
          "image": "assets/door.svg",
          "position": {
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_501"
        },
        {
          "id": "black_bag_03",
          "name": "黑色背包",
          "image": "assets/black-bag-03.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "hitPosition": {
            "x": 26,
            "y": 50,
            "width": 15,
            "height": 12
          },
          "zIndex": 12,
          "clickEvent": "E_017",
          "glow": true,
          "visibleWhen": {
            "not": {
              "flag": "carriage_03_bag_interacted",
              "equals": true
            }
          }
        },
        {
          "id": "phone_03",
          "name": "发光的手机",
          "image": "assets/手机.png",
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
          "image": "assets/black-bag-03.png",
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
            "flag": "carriage_03_bag_interacted",
            "equals": true
          }
        }
      ]
    },
    {
      "id": "carriage_02",
      "name": "2 号车厢",
      "background": "assets/carriage-02.png",
      "objects": [
        {
          "id": "dark_hint_02",
          "name": "黑暗中的喘息",
          "image": "assets/deep-07.svg",
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
          "image": "assets/door.svg",
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
          "image": "assets/clicker-02.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_021",
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
          "id": "bottle_02",
          "name": "地上的空瓶子",
          "image": "assets/bottle-inner.png",
          "position": {
            "x": 42,
            "y": 72,
            "width": 10,
            "height": 14
          },
          "zIndex": 13,
          "clickEvent": "E_028_PICK_BOTTLE",
          "visibleWhen": {
            "all": [
              {
                "flag": "bottle_02_available",
                "equals": true
              },
              {
                "not": {
                  "flag": "bottle_02_taken",
                  "equals": true
                }
              },
              {
                "not": {
                  "hasItem": "bottle"
                }
              }
            ]
          }
        },
        {
          "id": "door_02_to_03",
          "name": "通往3号车厢的门",
          "image": "assets/door.svg",
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
      "background": "assets/front-carriage.png",
      "objects": [
        {
          "id": "door_front_to_02",
          "name": "通往2号车厢的门",
          "image": "assets/door.svg",
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
          "image": "assets/control-lever.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_027",
          "visibleWhen": {
            "hasItem": "crew_keys"
          }
        }
      ]
    },
    {
      "id": "carriage_inner_01",
      "name": "里世界·空车厢",
      "background": "assets/carriage-inner-01.png",
      "objects": [
        {
          "id": "door_inner01_to_inner02",
          "name": "通往花草车厢的门",
          "image": "assets/door.svg",
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
          "image": "assets/door.svg",
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
      "background": "assets/carriage-inner-02.png",
      "objects": [
        {
          "id": "window_inner",
          "name": "窗外",
          "image": "assets/inner-02-window.png",
          "fullCanvas": true,
          "position": {
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100
          },
          "zIndex": 12,
          "clickEvent": "E_504",
          "visibleWhen": {
            "not": {
              "flag": "ev504_scouting_ok",
              "equals": true
            }
          }
        },
        {
          "id": "bottle_inner",
          "name": "彩色玻璃瓶",
          "image": "assets/inner-02-bottle.png",
          "fullCanvas": true,
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
          "image": "assets/door.svg",
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
          "image": "assets/door.svg",
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
      "id": "carriage_fake_04",
      "name": "里世界·伪4号车厢",
      "background": "assets/carriage-fake-04-fog.png",
      "objects": [
        {
          "id": "door_fake04_back",
          "name": "原路返回的门",
          "image": "assets/door.svg",
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
          "image": "assets/door.svg",
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
          "image": "assets/inner-03-flower-window.png",
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
          "image": "assets/inner-03-fog-window.png",
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
          "image": "assets/carriage-fake-04.png",
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
      "background": "assets/flower-sea.png",
      "objects": []
    },
    {
      "id": "flower_sea_inside",
      "name": "花海·室内",
      "background": "assets/flower-sea-inside.png",
      "objects": []
    }
  ],
  "events": [
    {
      "id": "E_901",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_06"
        },
        {
          "type": "dialogue",
          "text": "你在规律的铁轨声中醒来。车厢里没有别人。"
        },
        {
          "type": "dialogue",
          "text": "请先调查门上的便签和门旁的地图；两项调查完成后，通往7号车厢的门才会打开。"
        },
        {
          "type": "setFlag",
          "key": "gameStarted",
          "value": true
        }
      ]
    },
    {
      "id": "E_902",
      "actions": [
        {
          "type": "dialogue",
          "text": "便签被潮气浸得发软，背面却粘着一张旧车票。"
        },
        {
          "type": "addItem",
          "item": "old_ticket"
        },
        {
          "type": "setObjectState",
          "object": "note_06",
          "patch": {
            "hidden": true
          }
        },
        {
          "type": "dialogue",
          "text": "你获得了【旧车票】。便签从门上消失了。"
        }
      ]
    },
    {
      "id": "E_005",
      "actions": [
        {
          "type": "check",
          "dice": "ev005_insight_01",
          "offerScouting": true,
          "outcomes": [
            "E_005_S",
            "E_005_F"
          ]
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
          "type": "setFlag",
          "key": "carriage_06_guide_pending",
          "value": false
        },
        {
          "type": "dialogue",
          "text": "诡异的气氛笼罩着这节6号车厢。"
        },
        {
          "type": "dialogue",
          "text": "突然，你听到一阵怪异的声音。"
        },
        {
          "type": "dialogue",
          "text": "咔。"
        },
        {
          "type": "dialogue",
          "text": "咔。"
        },
        {
          "type": "dialogue",
          "text": "咔。"
        },
        {
          "type": "dialogue",
          "text": "像有人在很远的地方掰断什么东西。"
        },
        {
          "type": "dialogue",
          "text": "仔细辨别，你发现声音是从你的左边————7号车厢传来的。"
        },
        {
          "type": "dialogue",
          "text": "再次观察周围乘客，你发现还是没有人醒来。"
        },
        {
          "type": "dialogue",
          "text": "你走到了通往7号车厢的门旁边。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carriage_06_entry_route_a",
            "equals": true
          },
          "next": "E_006A"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carriage_06_entry_route_b",
            "equals": true
          },
          "next": "E_006B"
        }
      ]
    },
    {
      "id": "E_005_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你闻到一股浓重的血腥味。直觉告诉你，门后的情况绝对不简单。"
        },
        {
          "type": "choice",
          "prompt": "",
          "options": [
            {
              "label": "继续前进",
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
          "type": "dialogue",
          "text": "你从门前退开，决定先留在6号车厢再作打算。"
        }
      ]
    },
    {
      "id": "E_005_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你闻到一股浓重的血腥味。但在好奇心的驱使下，你仍然决定进入7号车厢。"
        }
      ],
      "next": "E_005_DEPARTURE_B"
    },
    {
      "id": "E_005_DEPARTURE_A",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_06_entry_route_a",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "carriage_06_entry_route_b",
          "value": false
        },
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "flag": "carriage_06_guide_pending",
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
      ],
      "next": "E_006A"
    },
    {
      "id": "E_005_DEPARTURE_B",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_06_entry_route_a",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "carriage_06_entry_route_b",
          "value": true
        },
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "flag": "carriage_06_guide_pending",
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
          "type": "dialogue",
          "text": "车厢内部，被撕裂的人类肢体散落一地。"
        },
        {
          "type": "check",
          "dice": "ev006a_san_01"
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
          "type": "dialogue",
          "text": "车厢内部，被撕裂的人类肢体散落一地。"
        },
        {
          "type": "check",
          "dice": "ev006b_san_01"
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
          "type": "dialogue",
          "text": "你听到收音机传到了混杂着电流声的人声:"
        },
        {
          "type": "dialogue",
          "text": "7月15日，1号末班车发生的重大事故还在调查中.....嘶嘶"
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
          "text": "咔————咔————"
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
          "text": "咔————咔————"
        }
      ],
      "next": "E_008"
    },
    {
      "id": "E_007",
      "actions": [
        {
          "type": "dialogue",
          "text": "尸体被浓浓的血浆覆盖着，四周散落着大大小小的尸块。"
        },
        {
          "type": "check",
          "dice": "skill_medicine",
          "outcomes": [
            "E_007_S",
            "E_007_F"
          ]
        }
      ]
    },
    {
      "id": "E_008",
      "actions": [
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
          "text": "通往8号车厢的门不见了，取而代之的是黑暗。"
        },
        {
          "type": "dialogue",
          "text": "不安感笼罩着你。"
        },
        {
          "type": "dialogue",
          "text": "这里……到底发生了什么？！"
        },
        {
          "type": "check",
          "dice": "skill_scouting",
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
          "type": "setFlag",
          "key": "ev009_seen",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "carriage_06_entry_route_a",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "carriage_06_entry_route_b",
          "value": false
        },
        {
          "type": "changeScene",
          "scene": "carriage_06"
        },
        {
          "type": "dialogue",
          "text": "6号车厢空无一人。"
        },
        {
          "type": "dialogue",
          "text": "刚才那个男人坐过的位置，椅垫还微微凹陷着。"
        },
        {
          "type": "dialogue",
          "text": "女人的杂志摊在座位上，纸页摸上去竟然是温的。"
        },
        {
          "type": "dialogue",
          "text": "你瞥见车窗有什么一闪而过。"
        },
        {
          "type": "dialogue",
          "text": "车窗里映出你苍白的脸——还有你身后的乘客们。"
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
          "text": "空无一人。"
        },
        {
          "type": "dialogue",
          "text": "你再看车窗。"
        },
        {
          "type": "dialogue",
          "text": "这一次，连他们也不见了。"
        },
        {
          "type": "dialogue",
          "text": "（主角表情：惊恐）刚才的人，都去哪了？"
        },
        {
          "type": "dialogue",
          "text": "突然，广播再次响起："
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
          "type": "check",
          "dice": "ev010_san_01"
        }
      ],
      "next": "E_010"
    },
    {
      "id": "E_GO_06_05",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_05"
        },
        {
          "type": "dialogue",
          "text": "你穿过门，来到5号车厢。"
        }
      ]
    },
    {
      "id": "E_903",
      "actions": [
        {
          "type": "inspect",
          "item": "old_ticket"
        }
      ]
    },
    {
      "id": "E_NOTE_06_ITEM",
      "actions": [
        {
          "type": "inspect",
          "title": "便签",
          "text": "「只管前进吧，已经没有退路了。」背面写着：第三个箱子里有藏着钥匙。",
          "image": "assets/note.png",
          "large": true
        }
      ]
    },
    {
      "id": "E_904",
      "actions": [
        {
          "type": "inspect",
          "title": "损坏的收音机",
          "text": "旋钮已经脱落，扬声器网罩后却有微弱的红光。这是由通用窗口基类派生的调查窗口。",
          "image": "assets/radio.svg"
        }
      ]
    },
    {
      "id": "E_905",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_06"
        },
        {
          "type": "dialogue",
          "text": "你回到了6号车厢。"
        }
      ],
      "next": "E_009"
    },
    {
      "id": "E_001",
      "actions": [
        {
          "type": "dialogue",
          "text": "2013年的某天，你们搭乘本日的1号线末班电车。"
        },
        {
          "type": "dialogue",
          "text": "目的地是终点站，车上的乘客无论是在加班后也好，还是参加了酒会后也好，都各自拖着疲累的身躯在车厢里陷入了深沉的睡眠。"
        },
        {
          "type": "dialogue",
          "text": "由于睡得太熟，直到现在才醒来的你发现车厢里除了他们没有其他的乘客。"
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
          "text": "你发现所在车厢的门扉上贴着一张便签。"
        },
        {
          "type": "check",
          "dice": "ev001_insight_01",
          "offerScouting": true,
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
          "text": "你察觉到现在明明早应该到了终点站了，不祥的预感在你心头笼罩。"
        }
      ]
    },
    {
      "id": "E_001_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你没发现任何异常，或许你只是睡过了站。"
        }
      ]
    },
    {
      "id": "E_002",
      "actions": [
        {
          "type": "inspect",
          "title": "便签·正面",
          "text": "「只管前进吧，已经没有退路了。」这是……什么意思？",
          "image": "assets/label-front.png",
          "large": true
        },
        {
          "type": "setFlag",
          "key": "note_front_seen",
          "value": true
        }
      ]
    },
    {
      "id": "E_003",
      "actions": [
        {
          "type": "inspect",
          "title": "便签·背面",
          "text": "「第三个箱子里有藏着钥匙。」箱子？这里哪有箱子。",
          "image": "assets/label-back.png",
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
          "text": "门扉旁有电车示意图。"
        },
        {
          "type": "check",
          "dice": "ev004_insight_01",
          "offerScouting": true,
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
          "text": "你仔细查看这张地图，发觉 7 号车厢以后的部分是被人蓄意涂掉的。",
          "image": "assets/map-success.png",
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
          "text": "你努力查看这张地图，只能看出 7 号车厢以后的部分看不清楚。",
          "image": "assets/map-failure.png",
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
          "text": "你观察尸体，发现距离死亡时间并未过去很久。"
        },
        {
          "type": "dialogue",
          "text": "不远处，一台收音机发出嘶嘶的电流声，把你吸引了过去。"
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
          "text": "你观察尸体，但并未发现任何异常。"
        },
        {
          "type": "dialogue",
          "text": "不远处，一台收音机发出嘶嘶的电流声，把你吸引了过去。"
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
          "text": "黑暗边缘似乎在移动。"
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
          "text": "咔。"
        },
        {
          "type": "dialogue",
          "text": "明暗交界处，你看到了一个疑似嘴的东西。"
        },
        {
          "type": "dialogue",
          "text": "（主角表情：惊恐）这……这是什么！"
        },
        {
          "type": "setFlag",
          "key": "ev008_scouting_ok",
          "value": true
        },
        {
          "type": "check",
          "dice": "ev008_san_01"
        },
        {
          "type": "setFlag",
          "key": "visited_carriage_07",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你不敢继续停留，打算沿来路退回6号车厢。"
        }
      ],
      "next": "E_009"
    },
    {
      "id": "E_008_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "不能再在7号车厢呆下去了，先回到6号车厢看看其他人吧。"
        },
        {
          "type": "setFlag",
          "key": "ev008_scouting_ok",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "visited_carriage_07",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你不敢继续停留，打算沿来路退回6号车厢。"
        }
      ],
      "next": "E_009"
    },
    {
      "id": "E_009_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "在杂乱无章的物品中，你找到一份报纸。"
        },
        {
          "type": "dialogue",
          "text": "标题：昨晚1号线电车的末班车遭遇大规模恐怖事件，幸存者精神异常被送医，警方调查困难。"
        },
        {
          "type": "dialogue",
          "text": "昨晚1号线末班车...？"
        },
        {
          "type": "addItem",
          "item": "newspaper"
        },
        {
          "type": "setObjectState",
          "object": "clue_clutter_05",
          "patch": {
            "hidden": true
          }
        }
      ],
      "next": "E_010"
    },
    {
      "id": "E_009_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "杂乱无章的物品让你本就眩晕的大脑更加昏沉，你决定忽略这些乱七八糟的东西。"
        }
      ]
    },
    {
      "id": "E_010",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_05"
        },
        {
          "type": "dialogue",
          "text": "5号车厢空无一人。四周散落着各种各样的物品。"
        },
        {
          "type": "dialogue",
          "text": "你回头看6号车厢，物品还在，灯也还亮着。"
        },
        {
          "type": "check",
          "dice": "skill_scouting",
          "outcomes": [
            "E_010_S",
            "E_010_F"
          ]
        }
      ]
    },
    {
      "id": "E_010_S",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_05_newspaper_available",
          "value": true
        }
      ]
    },
    {
      "id": "E_010_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你翻找了一番，并没有发现什么看起来有用的东西。"
        },
        {
          "type": "dialogue",
          "text": "杂乱无章的物品让你本就眩晕的大脑更加昏沉，你决定忽略这些乱七八糟的东西。"
        },
        {
          "type": "dialogue",
          "text": "你站起身，准备继续向前。身后，6号车厢方向的灯光一盏接一盏地熄灭了。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev008_scouting_ok",
            "equals": true
          },
          "next": "E_012"
        }
      ],
      "next": "E_013"
    },
    {
      "id": "E_010_JOIN",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev008_scouting_ok",
            "equals": true
          },
          "next": "E_012"
        }
      ],
      "next": "E_013"
    },
    {
      "id": "E_011",
      "actions": [
        {
          "type": "dialogue",
          "text": "你展开报纸的瞬间，6号车厢的灯灭了。"
        },
        {
          "type": "dialogue",
          "text": "先看看报纸再说吧。"
        },
        {
          "type": "check",
          "dice": "skill_scouting",
          "outcomes": [
            "E_011_S",
            "E_011_F"
          ]
        }
      ]
    },
    {
      "id": "E_011_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你发现报纸的日期是7月17日。"
        },
        {
          "type": "dialogue",
          "text": "（音效：惊悚诡异）"
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
          "text": "截至本报截稿时，共有22名乘客获救，1名女性乘务员生还......"
        },
        {
          "type": "dialogue",
          "text": "事故原因警方仍在调查中....."
        },
        {
          "type": "dialogue",
          "text": "幸存者声称......"
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
          "type": "dialogue",
          "text": "（音效：连续的警报声）"
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
          "text": "DON'T STOP."
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
          "type": "dialogue",
          "text": "（获得：报纸）"
        },
        {
          "type": "addItem",
          "item": "newspaper"
        },
        {
          "type": "check",
          "dice": "ev011_san_01"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev008_scouting_ok",
            "equals": true
          },
          "next": "E_012"
        }
      ],
      "next": "E_013"
    },
    {
      "id": "E_011_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你没发现什么特别的东西，过量的恐惧与紧张已麻痹了你的神经。"
        },
        {
          "type": "dialogue",
          "text": "装神弄鬼的，到底在说什么？"
        },
        {
          "type": "dialogue",
          "text": "你正要放下报纸，眼角却扫到底边有一行潦草的小字："
        },
        {
          "type": "dialogue",
          "text": "DON'T STOP."
        },
        {
          "type": "dialogue",
          "text": "字迹很眼熟——像6号车厢那张便签上的字。"
        },
        {
          "type": "dialogue",
          "text": "直觉告诉你，还是先留着吧。"
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
          "type": "dialogue",
          "text": "（获得：报纸）"
        },
        {
          "type": "addItem",
          "item": "newspaper"
        },
        {
          "type": "check",
          "dice": "ev011_san_01"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev008_scouting_ok",
            "equals": true
          },
          "next": "E_012"
        }
      ],
      "next": "E_013"
    },
    {
      "id": "E_012",
      "actions": [
        {
          "type": "dialogue",
          "text": "忽然，你感觉背后有哪里不对，于是转身看去。"
        },
        {
          "type": "check",
          "dice": "ev011_insight_01",
          "outcomes": [
            "E_012_S",
            "E_012_F"
          ]
        }
      ]
    },
    {
      "id": "E_012_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "（主角表情：惊恐）你不可置信地看着。"
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
          "dice": "ev011_san_01"
        }
      ],
      "next": "E_012_AFTER"
    },
    {
      "id": "E_012_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你没发现什么特别的东西，过量的恐惧与紧张已麻痹了你的神经。"
        }
      ],
      "next": "E_012_AFTER"
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
          "text": "本能驱使着你向前跑去，你来到4号车厢。"
        }
      ],
      "next": "E_013"
    },
    {
      "id": "E_013_ENTRY",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_04"
        },
        {
          "type": "dialogue",
          "text": "一进入车厢，你就发现一名重伤昏迷的乘务员倒在地上。"
        }
      ],
      "next": "E_013"
    },
    {
      "id": "E_013",
      "actions": [
        {
          "type": "setFlag",
          "key": "crew_met",
          "value": true
        },
        {
          "type": "check",
          "dice": "skill_medicine",
          "outcomes": [
            "E_013_S",
            "E_013_F"
          ]
        }
      ]
    },
    {
      "id": "E_013_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员苏醒过来。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "啊...呃...天哪..."
        }
      ],
      "next": "E_014_TALK_ENTRY"
    },
    {
      "id": "E_013_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "学校里教的那些急救知识你早已忘了个干净，不停颤抖的手也让你无法做完哪怕包扎这样最基础的动作。"
        },
        {
          "type": "dialogue",
          "text": "多次尝试无果后，你只能放弃对这位乘务员的救治。"
        }
      ]
    },
    {
      "id": "E_014",
      "actions": [
        {
          "type": "setFlag",
          "key": "crew_04_interacted",
          "value": true
        },
        {
          "type": "check",
          "dice": "skill_medicine",
          "outcomes": [
            "E_014_S",
            "E_014_F"
          ]
        }
      ],
      "next": "E_016"
    },
    {
      "id": "E_014_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员苏醒过来。"
        },
        {
          "type": "setFlag",
          "key": "crew_04_medical_success",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "crew_04_medical_failed",
          "value": false
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "啊...呃...天哪..."
        }
      ],
      "next": "E_014_TALK_ENTRY"
    },
    {
      "id": "E_014_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "学校里教的那些急救知识你早已忘了个干净，不停颤抖的手也让你无法做完哪怕包扎这样最基础的动作。"
        },
        {
          "type": "dialogue",
          "text": "多次尝试无果后，你只能放弃对这位乘务员的救治。"
        },
        {
          "type": "setFlag",
          "key": "crew_04_medical_failed",
          "value": true
        }
      ],
      "next": "E_016"
    },
    {
      "id": "E_014_TALK_ENTRY",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员表情十分痛苦，脸上不停地冒着冷汗，但你惊讶地发现她居然还能发出声音。"
        },
        {
          "type": "dialogue",
          "text": "或许这就是逃离这里的钥匙。"
        },
        {
          "type": "dialogue",
          "text": "您好，您还能说话吗，您知道这里发生了什么吗。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "看...看起来像是人的怪物，突然间袭击了我们."
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "他们向着乘客一个一个咬去，有如野兽在捕食一般。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "那场面简直像是人间地狱，到处都是惨叫。我当时在逃跑时候也被咬到了，万幸的是我跑了出来"
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
          "text": "那，那些怪物是怎么样的，您能想起来吗？"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "样子...跑得太匆忙，我记不清了。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "但我记得他们对于声音似乎很敏感，我当时被咬伤的时候，疼的把手边的一个东西甩到了墙壁上，吸引了他们的注意力。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "呃啊..."
        }
      ],
      "next": "E_015"
    },
    {
      "id": "E_014_TALK_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "冲击性的消息把你的脑子搅成一团乱麻，你不知道你该问什么。"
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
          "text": "钥匙！？在哪里？"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "逃跑...逃跑时背带被切断了，没时间去捡。"
        },
        {
          "type": "dialogue",
          "text": "天呐...那大概掉在哪里您记得吗。"
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
          "text": "你蹲下来，平视她的眼睛："
        },
        {
          "type": "dialogue",
          "text": "“黑包里的钥匙，是干什么用的？”"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "驾驶室钥匙是开门用的，操作面板钥匙是为了打开控制面板。两把都在包里。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "包掉在3号车厢前门附近。逃跑的时候背带被切断了...我没来得及捡。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "3号车厢堆了不少行李。要是通道被堵住，4号员工柜里有应急割带器和撬杆。"
        },
        {
          "type": "dialogue",
          "text": "她再次抓住你的衣角："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "快去拿钥匙。进了驾驶室，把右杆往上拉——车就能停下来。"
        },
        {
          "type": "dialogue",
          "text": "你点点头，不着痕迹地摸了摸口袋里那张泛黄的便签————「MOVE FORWARD」"
        },
        {
          "type": "dialogue",
          "text": "你心下了然，生命的重量压得你有些喘不过气。"
        },
        {
          "type": "dialogue",
          "text": "看来不得不去3号车厢找钥匙了。"
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
          "text": "你点头，却说不出那句“好”。"
        },
        {
          "type": "dialogue",
          "text": "因为你还不确定，这辆车到底该不该停。"
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": false
        },
        {
          "type": "changeScene",
          "scene": "carriage_03"
        }
      ],
      "next": "E_018"
    },
    {
      "id": "E_016_CARRY_CHECK",
      "actions": [
        {
          "type": "check",
          "dice": "ev016_strength_01",
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
          "text": "你深呼吸，将乘务员的手环在自己的脖子上，自己则用手托着她。"
        },
        {
          "type": "dialogue",
          "text": "这么多年的体测可不是白测的！咿呀————你成功背起乘务员。"
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": true
        },
        {
          "type": "changeScene",
          "scene": "carriage_03"
        }
      ],
      "next": "E_018"
    },
    {
      "id": "E_016_CARRY_FAIL",
      "actions": [
        {
          "type": "dialogue",
          "text": "作为多年来的体育苦手，你着实无法背起一名成年女性。"
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
          "text": "你点头，却说不出那句“好”。"
        },
        {
          "type": "dialogue",
          "text": "因为你还不确定，这辆车到底该不该停。"
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": false
        },
        {
          "type": "changeScene",
          "scene": "carriage_03"
        }
      ],
      "next": "E_018"
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
          "next": "E_018_TOOLS_READY"
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
      "id": "E_018_TOOLS_READY",
      "actions": [
        {
          "type": "dialogue",
          "text": "你一路清开通道，向3号车厢前门移动。越靠近前门，行李堆得越高，几乎齐腰。"
        },
        {
          "type": "dialogue",
          "text": "你用应急割带器和撬杆清开行李，黑色背包终于露了出来。"
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
          "text": "她在你背上轻声说：“...前门，就在前面。”"
        },
        {
          "type": "dialogue",
          "text": "你背着她走进3号车厢。她忽然说：“......前面就是4号车厢了。”"
        },
        {
          "type": "dialogue",
          "text": "你停下：“这里是3号。”"
        },
        {
          "type": "dialogue",
          "text": "她抬头看了很久门上的编号，低声说：“......对。”"
        },
        {
          "type": "dialogue",
          "text": "你们都没有再说话。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_entry_narrative_done",
          "value": true
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
          "type": "dialogue",
          "text": "你想起她的话（或昏迷前的呓语）：黑包，3号前门。"
        },
        {
          "type": "setFlag",
          "key": "carriage_03_entry_narrative_done",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "carriage_03_entry_narrative_v2_done",
          "value": true
        }
      ]
    },
    {
      "id": "E_018_CLEAR_PATH",
      "actions": [
        {
          "type": "dialogue",
          "text": "你一路清开通道，向3号车厢前门移动。越靠近前门，行李堆得越高，几乎齐腰。"
        }
      ]
    },
    {
      "id": "E_018_CARRIED_TOOL_HINT",
      "actions": [
        {
          "type": "dialogue",
          "text": "她低声说：“......得先清开这些行李。靠手是扯不断的。”"
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
          "type": "dialogue",
          "text": "（获得：手机）"
        },
        {
          "type": "addItem",
          "item": "phone"
        },
        {
          "type": "dialogue",
          "text": "屏幕上赫然显示：2013年7月15日。"
        },
        {
          "type": "dialogue",
          "text": "（音效：惊悚诡异）"
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
          "text": "发送时间：2013/07/17 02:13"
        },
        {
          "type": "dialogue",
          "text": "现在是7月15日。这条短信却来自两天之后？！"
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
          "text": "你想起乘务员反复念叨的那句“停车”，又低头看向屏幕上的“不要停车”。"
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
          "text": "你望向黑包，又望向自己来时的方向——行李需要工具才能清开，而工具，似乎在4号车厢里。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "newspaper"
          },
          "next": "E_019"
        }
      ],
      "next": "E_020"
    },
    {
      "id": "E_019",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "hasItem": "newspaper"
            }
          },
          "next": "E_020"
        },
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
          "text": "截至本报截稿时，共有22名乘客获救，1名女性乘务员生还......"
        },
        {
          "type": "dialogue",
          "text": "没有变化。"
        },
        {
          "type": "dialogue",
          "text": "名单里似乎有一个位置，写着某个与你相像的人；而她，也在。"
        },
        {
          "type": "dialogue",
          "text": "你合上报纸，不知道自己刚才在期待什么。"
        }
      ],
      "next": "E_020"
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
          "text": "截至本报截稿时，共有21名乘客获救，1名女性乘务员生还......"
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
          "text": "报纸中段，关于“一名在3号车厢获救的乘客”的描述消失了。那一栏只剩下空白，仿佛有人用橡皮，把“你”从未来里擦掉了。"
        },
        {
          "type": "dialogue",
          "speaker": "主角内心",
          "text": "......我记得刚才不是这么写的。"
        },
        {
          "type": "dialogue",
          "text": "你盯着那行“1名女性乘务员生还”。"
        },
        {
          "type": "dialogue",
          "text": "她还活着。可如果她不跟着你，谁会去救她？"
        },
        {
          "type": "dialogue",
          "speaker": "主角内心",
          "text": "如果我不回去......生还名单里，就再也不会有我了。"
        },
        {
          "type": "dialogue",
          "text": "你攥紧报纸，转身往来路走去。"
        },
        {
          "type": "setFlag",
          "key": "newspaper_21_version",
          "value": true
        }
      ],
      "next": "E_020"
    },
    {
      "id": "E_020",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_04"
        },
        {
          "type": "dialogue",
          "text": "你必须回到4号车厢：3号前门的行李需要割带器或撬杆才能清开，而那些工具，应该在4号车厢的员工柜里。"
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
        }
      ],
      "next": "E_020_LEFT_AWAKE"
    },
    {
      "id": "E_020_CARRIED",
      "actions": [
        {
          "type": "dialogue",
          "text": "你从4号车厢的员工柜里找到应急割带器和撬杆。"
        },
        {
          "type": "dialogue",
          "text": "（获得：应急割带器 ×1、撬杆 ×1）"
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
          "text": "【状态·工具齐备】"
        },
        {
          "type": "dialogue",
          "text": "你带着她返回3号车厢。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_03"
        }
      ],
      "next": "E_021"
    },
    {
      "id": "E_020_LEFT_AWAKE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你推开4号车厢的门，脚步顿住。"
        },
        {
          "type": "dialogue",
          "text": "你离开前，把她扶在左侧的座位上。可现在，她坐在右侧的座位上，望着窗外出神。"
        },
        {
          "type": "dialogue",
          "text": "你：“你怎么过去的？”"
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
          "text": "她顺着你指的方向看了看，又指指自己身下的座位："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "我一直坐在这儿。"
        },
        {
          "type": "dialogue",
          "text": "你张了张嘴，什么也没问。"
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
          "text": "你从员工柜里找到应急割带器和撬杆。"
        },
        {
          "type": "dialogue",
          "text": "（获得：应急割带器 ×1、撬杆 ×1）"
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
          "text": "【状态·工具齐备】"
        },
        {
          "type": "dialogue",
          "text": "你把她扶起来。这一次，她没有拒绝。"
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "【状态·乘务员同行】"
        },
        {
          "type": "changeScene",
          "scene": "carriage_03"
        }
      ],
      "next": "E_021"
    },
    {
      "id": "E_020_SECOND_MEDICAL",
      "actions": [
        {
          "type": "dialogue",
          "text": "你推开4号车厢的门。"
        },
        {
          "type": "dialogue",
          "text": "她还在那里，但姿势像是被什么人挪动过。你蹲下来探她的鼻息——很弱，比离开时更弱了。"
        },
        {
          "type": "check",
          "dice": "skill_medicine",
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
          "text": "你咬着牙，用颤抖的手完成了包扎。"
        },
        {
          "type": "dialogue",
          "text": "乘务员咳了一声，终于睁开眼。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "......钥匙......黑包......停车......"
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
          "text": "【状态·乘务员同行（虚弱）】她可以跟着你走，但无法提供完整的对话情报。"
        },
        {
          "type": "dialogue",
          "text": "你从员工柜里找到应急割带器和撬杆，扶起她，返回3号车厢。"
        },
        {
          "type": "dialogue",
          "text": "（获得：应急割带器 ×1、撬杆 ×1）"
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
          "type": "changeScene",
          "scene": "carriage_03"
        }
      ],
      "next": "E_021"
    },
    {
      "id": "E_020_SECOND_MEDICAL_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你试了一次，两次，三次。"
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
        },
        {
          "type": "dialogue",
          "text": "【状态·乘务员死亡】"
        },
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "newspaper"
          },
          "next": "E_020_DEAD_NEWSPAPER"
        }
      ],
      "next": "E_020_DEAD_TOOLS"
    },
    {
      "id": "E_020_DEAD_NEWSPAPER",
      "actions": [
        {
          "type": "dialogue",
          "text": "（报纸变为：共有21名乘客获救。现场未发现幸存乘务人员。）"
        },
        {
          "type": "setFlag",
          "key": "newspaper_21_version",
          "value": true
        }
      ],
      "next": "E_020_DEAD_TOOLS"
    },
    {
      "id": "E_020_DEAD_TOOLS",
      "actions": [
        {
          "type": "dialogue",
          "text": "你沉默地站了一会儿，从员工柜里找到应急割带器和撬杆，独自返回3号车厢。"
        },
        {
          "type": "dialogue",
          "text": "（获得：应急割带器 ×1、撬杆 ×1）"
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
          "type": "changeScene",
          "scene": "carriage_03"
        }
      ],
      "next": "E_021"
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
          "text": "......带子先割，箱子撬开。"
        },
        {
          "type": "dialogue",
          "text": "你割断缠在行李上的带子，撬开压住通道的箱体。行李向两边塌落。"
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
          "type": "dialogue",
          "text": "你把黑包拿到她面前。她伸手进去翻找。"
        },
        {
          "type": "check",
          "dice": "skill_talk",
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
          "text": "乘务员摸出两把钥匙，握在手里看了很久，才递给你："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "拿着吧......我现在这个样子，保管不好。"
        },
        {
          "type": "dialogue",
          "text": "（获得：驾驶室钥匙 ×1、操作面板钥匙 ×1）"
        },
        {
          "type": "addItem",
          "item": "crew_keys"
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
        },
        {
          "type": "dialogue",
          "text": "【状态·钥匙由主角保管】"
        }
      ],
      "next": "E_022"
    },
    {
      "id": "E_021_CARRIED_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员摸出两把钥匙，却没有递给你，而是攥在自己手心里："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "......我来拿着吧。到了车头，我比你熟悉。"
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
        },
        {
          "type": "dialogue",
          "text": "【状态·钥匙由乘务员保管】E-031进入驾驶室时由她开门；E-033中她离操作台更近，干预检定难度 +10%。"
        }
      ],
      "next": "E_022"
    },
    {
      "id": "E_021_ALONE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你打开黑包，在里面翻找。"
        },
        {
          "type": "check",
          "dice": "skill_scouting",
          "outcomes": [
            "E_021_ALONE_S",
            "E_021_ALONE_F"
          ]
        }
      ]
    },
    {
      "id": "E_021_ALONE_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你在包里摸到了两把钥匙。"
        },
        {
          "type": "dialogue",
          "text": "（获得：驾驶室钥匙 ×1、操作面板钥匙 ×1）"
        },
        {
          "type": "addItem",
          "item": "crew_keys"
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
        },
        {
          "type": "dialogue",
          "text": "【状态·钥匙由主角保管】"
        }
      ],
      "next": "E_022"
    },
    {
      "id": "E_021_ALONE_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你翻找了半天，最后还是没有找到钥匙，或许它们已经掉到哪个缝隙里去了。"
        },
        {
          "type": "dialogue",
          "text": "无奈之下，你只能先拿着黑色背包。"
        },
        {
          "type": "setFlag",
          "key": "keys_player",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "keys_missing",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "【状态·未获得钥匙】E-031进入驾驶室时将再进行一次侦查，若仍失败 → E-036结局C。"
        }
      ],
      "next": "E_022"
    },
    {
      "id": "E_02_DECIDE",
      "actions": [
        {
          "type": "choice",
          "prompt": "Clicker正挡在车厢中段，你打算怎么处理？",
          "options": [
            {
              "label": "蹑手蹑脚地通过",
              "next": "E_022"
            },
            {
              "label": "制造声响引开并清掉Clicker",
              "next": "E_023"
            }
          ]
        }
      ]
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
          "text": "她低头看看手里的，又低头看看自己胸前的。两张工牌叠在一起，严丝合缝。"
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
          "type": "dialogue",
          "text": "随后，她的手指又碰到一张叠得整齐的便签。展开——\n\n「MOVE FORWARD」\n\n“这个字......”"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "像我的字。"
        },
        {
          "type": "dialogue",
          "text": "你沉默着，把6号车厢揭下来的那张便签递到她面前。\n\n两张便签，字迹几乎一模一样。\n\n她看了很久，没有说话。"
        }
      ],
      "next": "E_022_ITEM"
    },
    {
      "id": "E_022_ALONE",
      "actions": [
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
          "text": "你把它和记忆里她胸前那张对照：一样的照片，一样的编号。\n\n没有人为你解释。"
        },
        {
          "type": "dialogue",
          "text": "包里还有一张叠得整齐的便签：\n\n「MOVE FORWARD」\n\n你翻出6号车厢的便签，两张字迹几乎一模一样。\n\n你握着便签站在原地。\n\n是谁在一切发生之前，就写好了答案？"
        }
      ],
      "next": "E_022_ITEM"
    },
    {
      "id": "E_022_ITEM",
      "actions": [
        {
          "type": "dialogue",
          "text": "你继续在行李间翻找，找到了一个手电筒。"
        },
        {
          "type": "dialogue",
          "text": "你试了试，勉强能用。"
        },
        {
          "type": "dialogue",
          "text": "（获得：手电筒）"
        },
        {
          "type": "addItem",
          "item": "flashlight"
        }
      ],
      "next": "E_023"
    },
    {
      "id": "E_022_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你谨慎通过，到达先头车厢门前。"
        },
        {
          "type": "dialogue",
          "text": "（获得手机）"
        },
        {
          "type": "addItem",
          "item": "phone"
        },
        {
          "type": "setFlag",
          "key": "carriage_02_passed",
          "value": true
        }
      ]
    },
    {
      "id": "E_022_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你踩到尸体发出声响，怪物们注意到了你。"
        }
      ],
      "next": "E_023"
    },
    {
      "id": "E_023",
      "actions": [
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
      "id": "E_023_PHONE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你低头看了一眼手机。屏幕仍显示：2013年7月15日。"
        }
      ],
      "next": "E_023_LOOP"
    },
    {
      "id": "E_023_LOOP",
      "actions": [
        {
          "type": "dialogue",
          "text": "再抬头时，通往2号车厢的门上方，车厢编号变成了——\n\n3。"
        },
        {
          "type": "dialogue",
          "text": "你愣了一下，以为自己看错了。你转头看向来路那一侧的车门。\n\n也是3。\n\n前后两边，都是3号车厢。"
        },
        {
          "type": "dialogue",
          "text": "你猛地再回头。\n\n来路的方向，已经不再是4号——门消失了，取而代之的是一段被黑暗吞没的车厢。"
        },
        {
          "type": "dialogue",
          "text": "广播忽然响起：\n\n“下一站——”\n\n停顿了很久。\n\n“下一站——”\n\n还是没有站名。\n\n然后，一个声音一字一顿地说：\n\n“请不要下车。”"
        },
        {
          "type": "dialogue",
          "text": "灯，灭了。\n\n（音效：电流嘶鸣）\n\n黑暗中，你摸到了通往2号车厢的门。"
        }
      ],
      "next": "E_024"
    },
    {
      "id": "E_023_AGILITY_CHECK",
      "actions": [
        {
          "type": "check",
          "dice": "ev023_agility_01",
          "outcomes": [
            "E_023_CARD_BATTLE_EASY",
            "E_023_CARD_BATTLE_HARD"
          ]
        }
      ]
    },
    {
      "id": "E_023_AGILITY_SUCCESS",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_02_passed",
          "value": true
        }
      ]
    },
    {
      "id": "E_023_CARD_BATTLE_EASY",
      "actions": [
        {
          "type": "dialogue",
          "text": "你抓住空隙冲向Clicker。敏捷检定成功，战斗轮进入简单模式。"
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
      "id": "E_023_CARD_BATTLE_HARD",
      "actions": [
        {
          "type": "dialogue",
          "text": "你的动作惊动了Clicker。战斗轮进入困难模式。"
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
      "id": "E_023_THROW_FIRST",
      "actions": [
        {
          "type": "dialogue",
          "text": "你把空瓶用力掷向远处的车厢壁，脆响吸引了Clicker的注意。"
        },
        {
          "type": "dialogue",
          "text": "Clicker扑向声响方向，你趁机通过并关上了身后的门。"
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
      "id": "E_023_THROW_AFTER_AGILITY_FAIL",
      "actions": [
        {
          "type": "check",
          "dice": "ev023_throw_after_agility_fail_01",
          "outcomes": [
            "E_023_THROW_AFTER_AGILITY_FAIL_SUCCESS",
            "E_023_THROW_AFTER_AGILITY_FAIL_FAIL"
          ]
        }
      ]
    },
    {
      "id": "E_023_THROW_AFTER_AGILITY_FAIL_SUCCESS",
      "actions": [
        {
          "type": "dialogue",
          "text": "瓶子的声响成功引开了Clicker，你抓紧机会脱身并通过。"
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
      "id": "E_023_THROW_AFTER_AGILITY_FAIL_FAIL",
      "actions": [],
      "next": "E_024"
    },
    {
      "id": "E_023_BOTTLE",
      "actions": [
        {
          "type": "dialogue",
          "text": "这是一个可以用来制造声响、转移 Clicker 注意的瓶子。"
        }
      ]
    },
    {
      "id": "E_024",
      "actions": [
        {
          "type": "check",
          "dice": "ev024_light_01",
          "outcomes": [
            "E_024_S",
            "E_024_F"
          ]
        }
      ]
    },
    {
      "id": "E_024_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你感觉黑暗中有人影行走，差不多有两三个。"
        },
        {
          "type": "dialogue",
          "text": "它们的头偶尔偏转，像在寻找。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "monster_behavior_known",
            "equals": true
          },
          "next": "E_024_S_KNOWLEDGE"
        }
      ],
      "next": "E_024_S_CONTINUE"
    },
    {
      "id": "E_024_S_KNOWLEDGE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你想起乘务员的话：它们没有眼睛，只靠声音。"
        }
      ],
      "next": "E_024_S_CONTINUE"
    },
    {
      "id": "E_024_S_CONTINUE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你屏住呼吸，压低身形，踏进2号车厢。"
        }
      ],
      "next": "E_025"
    },
    {
      "id": "E_024_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你觉得很黑，什么都看不清。"
        }
      ],
      "next": "E_025"
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
          "text": "在一片漆黑中，你听到明显的喘息声。\n\n那不是人类的喘息。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_025_CARRIED"
        }
      ],
      "next": "E_026"
    },
    {
      "id": "E_025_CARRIED",
      "actions": [
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "...别出声。"
        },
        {
          "type": "dialogue",
          "text": "你听出她声音里的恐惧，与她警告你时如出一辙。"
        }
      ],
      "next": "E_026"
    },
    {
      "id": "E_025_SINGLE",
      "actions": [
        {
          "type": "check",
          "dice": "ev025_strength_01",
          "outcomes": [
            "E_025_ESCAPE",
            "E_031"
          ]
        }
      ]
    },
    {
      "id": "E_025_MULTI",
      "actions": [],
      "next": "E_031"
    },
    {
      "id": "E_025_ESCAPE",
      "actions": [
        {
          "type": "setFlag",
          "key": "carriage_02_passed",
          "value": true
        }
      ]
    },
    {
      "id": "E_026",
      "actions": [
        {
          "type": "dialogue",
          "text": "你看到了，你看到了那个怪物—————那个无眼、头部异形的怪物。"
        },
        {
          "type": "check",
          "dice": "ev026_san_01"
        },
        {
          "type": "check",
          "dice": "ev026_extra_san_01"
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
          "text": "你没有动。"
        },
        {
          "type": "choice",
          "prompt": "你打算怎么做？",
          "options": [
            {
              "label": "屏住呼吸，尝试潜行通过",
              "next": "E_027"
            },
            {
              "label": "捡起手边的东西，制造声响引开它们",
              "next": "E_028"
            }
          ]
        }
      ]
    },
    {
      "id": "E_026_KNOWLEDGE",
      "actions": [
        {
          "type": "dialogue",
          "text": "它与你听到的描述完全一致——没有眼睛，却把耳朵转向你的方向，像在听。"
        },
        {
          "type": "dialogue",
          "text": "你没有动。"
        },
        {
          "type": "choice",
          "prompt": "你打算怎么做？",
          "options": [
            {
              "label": "屏住呼吸，尝试潜行通过",
              "next": "E_027"
            },
            {
              "label": "捡起手边的东西，制造声响引开它们",
              "next": "E_028"
            }
          ]
        }
      ]
    },
    {
      "id": "E_026_FRONT_LEGACY",
      "actions": [
        {
          "type": "changeScene",
          "scene": "front_carriage"
        },
        {
          "type": "dialogue",
          "text": "到达先头车厢，这里昏暗安静，车厢前方能看到操作把手。"
        },
        {
          "type": "minigame",
          "game": "conductor_tug"
        }
      ],
      "next": "E_027"
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
              "next": "E_026",
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
          "type": "dialogue",
          "text": "Clicker还堵在通往先头车厢的门前，你无法安全开门通过。"
        }
      ]
    },
    {
      "id": "E_027",
      "actions": [
        {
          "type": "check",
          "dice": "ev027_stealth_luck_01",
          "outcomes": [
            "E_027_S",
            "E_027_F"
          ]
        }
      ]
    },
    {
      "id": "E_027_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你谨慎通过，到达先头车厢门前。"
        }
      ],
      "next": "E_031"
    },
    {
      "id": "E_027_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你踩到尸体发出声响，怪物们齐刷刷地转向你。"
        },
        {
          "type": "choice",
          "prompt": "你打算怎么做？",
          "options": [
            {
              "label": "与它们正面对抗",
              "next": "E_029"
            },
            {
              "label": "退回阴影，捡起瓶子制造声响引开它们",
              "next": "E_028"
            }
          ]
        }
      ]
    },
    {
      "id": "E_028",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_02"
        },
        {
          "type": "dialogue",
          "text": "你退回2号车厢，在地上发现了一个空瓶子。"
        },
        {
          "type": "setFlag",
          "key": "bottle_02_available",
          "value": true
        },
        {
          "type": "custom",
          "name": "refreshScene"
        }
      ]
    },
    {
      "id": "E_028_PICK_BOTTLE",
      "actions": [
        {
          "type": "dialogue",
          "text": "你俯身捡起地上的空瓶子。"
        },
        {
          "type": "addItem",
          "item": "bottle"
        },
        {
          "type": "learnSkill",
          "skill": "throwing"
        },
        {
          "type": "setFlag",
          "key": "bottle_02_taken",
          "value": true
        },
        {
          "type": "dialogue",
          "text": "你获得了投掷技能。"
        }
      ],
      "next": "E_028_BOTTLE_READY"
    },
    {
      "id": "E_028_BOTTLE_READY",
      "actions": [
        {
          "type": "choice",
          "prompt": "你要怎么通过或引开 Clicker？",
          "options": [
            {
              "label": "直接冲过去",
              "next": "E_028_AGILITY_CHECK"
            },
            {
              "label": "投掷瓶子",
              "next": "E_028_THROW_FIRST"
            }
          ]
        }
      ]
    },
    {
      "id": "E_028_AGILITY_CHECK",
      "actions": [
        {
          "type": "check",
          "dice": "ev028_agility_01",
          "outcomes": [
            "E_028_AGILITY_SUCCESS",
            "E_028_AGILITY_FAIL"
          ]
        }
      ]
    },
    {
      "id": "E_028_AGILITY_SUCCESS",
      "actions": [
        {
          "type": "dialogue",
          "text": "你抓住空隙冲过了Clicker，成功到达先头车厢门前。"
        },
        {
          "type": "setFlag",
          "key": "carriage_02_passed",
          "value": true
        }
      ],
      "next": "E_031"
    },
    {
      "id": "E_028_AGILITY_FAIL",
      "actions": [
        {
          "type": "dialogue",
          "text": "你没能冲过去，仍然可以退回阴影，投掷瓶子制造声响。"
        },
        {
          "type": "choice",
          "prompt": "是否投掷瓶子？",
          "options": [
            {
              "label": "投掷瓶子",
              "next": "E_028_THROW_AFTER_FAIL"
            }
          ]
        }
      ]
    },
    {
      "id": "E_028_THROW_FIRST",
      "actions": [
        {
          "type": "dialogue",
          "text": "你把空瓶用力掷向远处的车厢壁，脆响吸引了Clicker的注意。"
        },
        {
          "type": "dialogue",
          "text": "Clicker扑向声响方向，你趁机通过并关上了身后的门。"
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
      ],
      "next": "E_031"
    },
    {
      "id": "E_028_THROW_AFTER_FAIL",
      "actions": [
        {
          "type": "check",
          "dice": "ev028_luck_half_01",
          "outcomes": [
            "E_028_THROW_AFTER_SUCCESS",
            "E_029"
          ]
        }
      ]
    },
    {
      "id": "E_028_THROW_AFTER_SUCCESS",
      "actions": [
        {
          "type": "dialogue",
          "text": "瓶子的声响成功引开了Clicker，你抓紧机会脱身并通过。"
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
      ],
      "next": "E_031"
    },
    {
      "id": "E_029",
      "actions": [
        {
          "type": "check",
          "dice": "ev029_agility_01",
          "outcomes": [
            "E_029_CARD_EASY",
            "E_029_CARD_HARD"
          ]
        }
      ]
    },
    {
      "id": "E_029_CARD_EASY",
      "actions": [
        {
          "type": "dialogue",
          "text": "你抓住空隙冲向Clicker，战斗轮进入简单模式。"
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
          "text": "你的动作惊动了Clicker，战斗轮进入困难模式。"
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
      "id": "E_030_TUG",
      "actions": [
        {
          "type": "dialogue",
          "text": "控制权被夺走。列车又一次冲向黑暗。"
        }
      ],
      "next": "E_030"
    },
    {
      "id": "E_030",
      "actions": [
        {
          "type": "dialogue",
          "text": "拉杆减速，列车停下的瞬间，四周陷入漆黑。"
        },
        {
          "type": "dialogue",
          "text": "嘎吱嘎吱的咀嚼声接近，脚下流过粘稠血水与残骸。"
        },
        {
          "type": "dialogue",
          "text": "意识与身体一同消失……"
        },
        {
          "type": "dialogue",
          "text": "在座位上醒来，分不清梦境与现实。啃食声挥之不去，从此恐惧度日。"
        },
        {
          "type": "dialogue",
          "text": "你发现背包里多了一个背带切断的黑色包。"
        },
        {
          "type": "dialogue",
          "text": "（SAN 减少 1d4/1d10）"
        },
        {
          "type": "check",
          "dice": "ev030_san_01"
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
      "id": "E_ITEM_KEYS_INSPECT",
      "actions": [
        {
          "type": "inspect",
          "item": "crew_keys",
          "title": "驾驶室与操作面板钥匙",
          "text": "驾驶室钥匙和操作面板钥匙。"
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
      "id": "E_ITEM_EMERGENCY_CUTTER_INSPECT",
      "actions": [
        {
          "type": "inspect",
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
          "title": "撬杆",
          "text": "一根可以撬开箱体、清理行李的工具。"
        }
      ]
    },
    {
      "id": "E_DOOR_04",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_03"
        },
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "carriage_03_bag_interacted",
              "equals": true
            }
          },
          "next": "E_018"
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
          "type": "setFlag",
          "key": "carriage_06_entry_route_a",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "carriage_06_entry_route_b",
          "value": false
        },
        {
          "type": "changeScene",
          "scene": "carriage_06"
        },
        {
          "type": "dialogue",
          "text": "你穿过门，返回6号车厢。"
        }
      ]
    },
    {
      "id": "E_GO_04_05",
      "actions": [
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
          "type": "changeScene",
          "scene": "carriage_03"
        },
        {
          "type": "conditionalJump",
          "when": {
            "not": {
              "flag": "carriage_03_bag_interacted",
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
      "id": "E_05_SEARCH_NEWS",
      "actions": [],
      "next": "E_011"
    },
    {
      "id": "E_05_SEARCH_TOOLS",
      "actions": [
        {
          "type": "dialogue",
          "text": "你决定仔细翻找这只倒下的背包。"
        },
        {
          "type": "check",
          "dice": "skill_scouting",
          "outcomes": [
            "E_05_TOOLS_SUCCESS",
            "E_05_TOOLS_FAIL"
          ]
        }
      ]
    },
    {
      "id": "E_05_TOOLS_SUCCESS",
      "actions": [
        {
          "type": "dialogue",
          "text": "背包里有一部手机和一支还能发光的手电筒。"
        },
        {
          "type": "dialogue",
          "text": "（获得手机和手电筒）"
        },
        {
          "type": "addItem",
          "item": "phone"
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
        }
      ]
    },
    {
      "id": "E_05_TOOLS_FAIL",
      "actions": [
        {
          "type": "dialogue",
          "text": "背包里只有一些旧衣物，没有能用来照明的东西。"
        }
      ]
    },
    {
      "id": "E_05_JUNK_A",
      "actions": [
        {
          "type": "dialogue",
          "text": "你伸手翻动散落的行李和衣物。"
        },
        {
          "type": "check",
          "dice": "skill_scouting"
        },
        {
          "type": "dialogue",
          "text": "你仔细翻过，仍然只是一堆普通杂物。"
        }
      ]
    },
    {
      "id": "E_05_JUNK_C",
      "actions": [
        {
          "type": "dialogue",
          "text": "你拨开堆叠的杂物开始寻找。"
        },
        {
          "type": "check",
          "dice": "skill_scouting"
        },
        {
          "type": "dialogue",
          "text": "这里没有夹着报纸之类的线索。"
        }
      ]
    },
    {
      "id": "E_031",
      "actions": [
        {
          "type": "changeScene",
          "scene": "front_carriage"
        },
        {
          "type": "dialogue",
          "text": "到达先头车厢，这里昏暗安静，前方是驾驶室门。"
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
                "hasItem": "crew_keys"
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
        },
        {
          "type": "check",
          "dice": "ev031_scouting_02",
          "outcomes": [
            "E_031_NO_KEY_S",
            "E_031_NO_KEY_F"
          ]
        }
      ]
    },
    {
      "id": "E_031_PLAYER_KEY",
      "actions": [
        {
          "type": "dialogue",
          "text": "你摸出钥匙，插进锁孔。金属咬合的声音在安静中格外清晰。"
        }
      ],
      "next": "E_032"
    },
    {
      "id": "E_031_CREW_KEY",
      "actions": [
        {
          "type": "dialogue",
          "text": "她颤抖着摸出钥匙，替你打开门。"
        },
        {
          "type": "dialogue",
          "text": "你注意到，她看向驾驶室的目光里，有一种近乎执念的光。"
        }
      ],
      "next": "E_032"
    },
    {
      "id": "E_031_NO_KEY_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你在门边的消防柜夹层里摸到了两把钥匙，也许是另一位乘务员留下的。"
        },
        {
          "type": "dialogue",
          "text": "你用它打开了驾驶室的门。"
        },
        {
          "type": "addItem",
          "item": "crew_keys"
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
      "next": "E_032"
    },
    {
      "id": "E_031_NO_KEY_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你找不到任何能打开门的东西。身后的黑暗越来越近。"
        }
      ],
      "next": "E_036"
    },
    {
      "id": "E_032",
      "actions": [
        {
          "type": "dialogue",
          "text": "你打开操作面板，面板上积着一层薄灰。"
        },
        {
          "type": "dialogue",
          "text": "两根拉杆并排立在你面前：左杆是刹车/起步装置，右杆是油门。右杆下拉加速，上拉减速。"
        },
        {
          "type": "dialogue",
          "text": "操作台边缘的灰尘里，有人用手指写了一行字：\n\n**MOVE FORWARD**"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_032_WITH_CREW"
        },
        {
          "type": "choice",
          "prompt": "你要怎么操作拉杆？",
          "options": [
            {
              "label": "右杆下拉——加速，继续前进",
              "next": "E_034"
            },
            {
              "label": "右杆上拉——减速，停车",
              "next": "E_035"
            }
          ]
        }
      ]
    },
    {
      "id": "E_032_WITH_CREW",
      "actions": [
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "拉它！停车！我们逃出去！"
        },
        {
          "type": "choice",
          "prompt": "你要怎么操作拉杆？",
          "options": [
            {
              "label": "右杆下拉——加速，继续前进",
              "next": "E_033"
            },
            {
              "label": "右杆上拉——减速，停车",
              "next": "E_035"
            }
          ]
        }
      ]
    },
    {
      "id": "E_033",
      "actions": [
        {
          "type": "dialogue",
          "text": "你的手刚碰到右杆，乘务员就扑了上来，死死抓住你的手腕。"
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
      "id": "E_033_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你稳住她，一字一句地说：\n\n“你仔细想想——那些便签、那些反复出现的话……它们全都叫我们前进。停车，才是死路。”"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "……你确定吗？"
        },
        {
          "type": "dialogue",
          "text": "你没有回答，只是用力将右杆下拉到底。"
        }
      ],
      "next": "E_034"
    },
    {
      "id": "E_033_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你没能拦住她。她不知哪来的力气，用肩膀将你撞开，把右杆推回减速的位置。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "对不起……对不起……我只是想活……"
        },
        {
          "type": "dialogue",
          "text": "电车开始减速。"
        }
      ],
      "next": "E_035"
    },
    {
      "id": "E_034",
      "actions": [
        {
          "type": "dialogue",
          "text": "电车加速到极致，视野被刺眼白光覆盖。"
        },
        {
          "type": "dialogue",
          "text": "你睁开眼，发现自己仍坐在6号车厢。广播声响起：终点站已到。"
        },
        {
          "type": "dialogue",
          "text": "车厢里的人们陆续醒来，揉着眼睛下车。你翻看背包：便签、报纸、手机、手电筒——全都不在了。"
        },
        {
          "type": "dialogue",
          "text": "那是一场共同的噩梦。恐怖的记忆慢慢淡忘。你跟在人群后面走出站台。"
        },
        {
          "type": "dialogue",
          "text": "身后，末班电车的车门缓缓关闭。抬头，你看见站台的指引牌上，写着熟悉字迹的——\n\n「MOVE FORWARD」"
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
      "id": "E_035",
      "actions": [
        {
          "type": "dialogue",
          "text": "拉杆减速，列车停下的瞬间，四周陷入漆黑。"
        },
        {
          "type": "dialogue",
          "text": "嘎吱嘎吱的咀嚼声接近，脚下流过粘稠血水与残骸。"
        },
        {
          "type": "dialogue",
          "text": "你想起一路上那些字：\n\n「MOVE FORWARD」\n\n你停下的那一刻，就已经输了。"
        },
        {
          "type": "dialogue",
          "text": "意识与身体一同消失……在座位上醒来，分不清梦境与现实。啃食声挥之不去，从此恐惧度日。"
        },
        {
          "type": "dialogue",
          "text": "你发现背包里多了一个背带被切断的黑色包。"
        },
        {
          "type": "check",
          "dice": "ev030_san_01"
        }
      ]
    },
    {
      "id": "E_036",
      "actions": [
        {
          "type": "dialogue",
          "text": "在隔离室中醒来，你蜷缩在墙角。"
        },
        {
          "type": "dialogue",
          "text": "医生对警察摇了摇头：每天都要镇定剂，你因在梦中经历了无法承受的恐怖，醒来后歇斯底里，被送进精神病院。"
        },
        {
          "type": "dialogue",
          "text": "无人知晓你们在逃避什么。"
        },
        {
          "type": "custom",
          "name": "endGame",
          "params": {
            "reason": "trauma"
          }
        }
      ]
    },
    {
      "id": "E_MG3D_DEMO",
      "actions": [
        {
          "type": "dialogue",
          "text": "你注意到驾驶台上一个不显眼的球形陀螺仪校准装置（WebGL 3D 小游戏演示）。"
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
      "id": "E_023_CHOICE",
      "actions": [
        {
          "type": "choice",
          "prompt": "你要怎么通过或引开Clicker？",
          "options": [
            {
              "label": "直接冲过去",
              "next": "E_023_AGILITY_CHECK"
            },
            {
              "label": "投掷瓶子",
              "next": "E_023_THROW_FIRST"
            }
          ]
        }
      ]
    },
    {
      "id": "E_501",
      "actions": [
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
          "type": "setFlag",
          "key": "carriage_06_eaten",
          "value": true
        },
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
          "text": "你迈了进去。车厢的噪音突然减弱，"
        },
        {
          "type": "dialogue",
          "text": "安静得像是整个世界都睡着了。"
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
      "actions": []
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
          "type": "dialogue",
          "text": "门被关死，打不开。"
        }
      ]
    },
    {
      "id": "E_502_CARRIAGE03",
      "actions": [
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
        }
      ]
    },
    {
      "id": "E_503",
      "actions": [
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
          "text": "握住瓶身的一瞬间，你听到像是歌声的东西……又或者像哭声或祈祷？"
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
          "type": "dialogue",
          "text": "你看向窗外。"
        },
        {
          "type": "dialogue",
          "text": "雾蒙蒙的，远方的一切都看不清。"
        },
        {
          "type": "check",
          "dice": "skill_scouting",
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
          "text": "你发现窗外并不完全黑，似乎有隐隐约约的微光。"
        },
        {
          "type": "dialogue",
          "text": "你把耳朵贴着窗户，听到窸窸窣窣的声响。"
        },
        {
          "type": "setFlag",
          "key": "ev504_scouting_ok",
          "value": true
        }
      ]
    },
    {
      "id": "E_504_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "雾气浓重，远方一片模糊。你贴着玻璃看了很久，什么也没有看见。"
        },
        {
          "type": "setFlag",
          "key": "ev504_scouting_ok",
          "value": false
        }
      ]
    },
    {
      "id": "E_505",
      "actions": [
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
          "type": "conditionalJump",
          "when": {
            "flag": "crew_met",
            "equals": true
          },
          "next": "E_508"
        }
      ],
      "next": "E_507"
    },
    {
      "id": "E_507",
      "actions": [
        {
          "type": "dialogue",
          "text": "车厢深处响起低语。那是一个陌生的声音，却又像是从你自己喉咙里漏出来的。"
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
          "type": "dialogue",
          "text": "你推开那扇门。"
        },
        {
          "type": "changeScene",
          "scene": "flower_sea"
        },
        {
          "type": "dialogue",
          "text": "车门外就是花海。无边无际的花漫过车轨，铺到天尽头。这里真的还是现实世界吗？"
        },
        {
          "type": "dialogue",
          "text": "……那些东西，"
        },
        {
          "type": "dialogue",
          "text": "在那一瞬间就已经看到你了。"
        },
        {
          "type": "dialogue",
          "text": "当你看到他们的时候，其实是他们看到并抓住了你。"
        },
        {
          "type": "dialogue",
          "text": "你感到一种不合时宜的快感，你开始干呕。不安慢慢渗进你的心口和指缝。"
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
          "text": "现在过去了多久？"
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
          "text": "你退出花海，向来路折返。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_fake_04"
        },
        {
          "type": "dialogue",
          "text": "穿过一扇门，是另一节车厢。门上的编号写着：4。"
        },
        {
          "type": "dialogue",
          "text": "你总感觉这里怪怪的，或许是刚刚的精神冲击太大，眼前的一切反而显得不真实。"
        }
      ]
    },
    {
      "id": "E_515",
      "actions": [
        {
          "type": "dialogue",
          "text": "细节已经淡忘，或者不愿回忆。"
        },
        {
          "type": "dialogue",
          "text": "唯一确定的是，你无法再像一个正常人那样看待世界了。"
        },
        {
          "type": "dialogue",
          "text": "在你平凡的余生中，你常常想起它们的低语，或许那确实是你想要的。"
        },
        {
          "type": "custom",
          "name": "endGame",
          "params": {
            "reason": "trauma"
          }
        }
      ]
    },
    {
      "id": "E_516",
      "actions": [
        {
          "type": "dialogue",
          "text": "你走向车窗。就在指尖将要碰到玻璃的一刻，一个声音在身后响起——"
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
            "hasItem": "crew_keys"
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
          "speaker": "乘务员",
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
              "hasItem": "crew_keys"
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
          "item": "crew_keys"
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
          "text": "你没有把它拿出来。"
        },
        {
          "type": "dialogue",
          "text": "她看着你，没有伸手，也没有追问。"
        }
      ],
      "next": "E_520"
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
          "text": "角落里又长着花草。你认得这里。"
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
          "type": "dialogue",
          "text": "你推开门——"
        },
        {
          "type": "changeScene",
          "scene": "carriage_02"
        },
        {
          "type": "dialogue",
          "text": "这一次，门后是真正的2号车厢。你听见明显的喘息声。"
        },
        {
          "type": "dialogue",
          "text": "那不是人类的喘息。"
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
          "type": "dialogue",
          "text": "角落里散落着几支彩色的空玻璃瓶，在昏暗中泛着不真实的颜色。"
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
          "item": "crew_keys"
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
            "flag": "carried_crew",
            "equals": true
          },
          "next": "E_524_CREW"
        }
      ]
    },
    {
      "id": "E_524_CREW",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员似乎并不知道这一切。"
        }
      ]
    }
  ],
  "items": [
    {
      "id": "note_06_item",
      "name": "便签",
      "image": "assets/note.png",
      "description": "从 6 号车厢门上取下来的便签。",
      "inspectEvent": "E_NOTE_06_ITEM"
    },
    {
      "id": "old_ticket",
      "name": "旧车票",
      "image": "assets/note.svg",
      "description": "一张已经褪色的车票，背面写着无法辨认的日期。",
      "inspectEvent": "E_903"
    },
    {
      "id": "bottle",
      "name": "瓶子",
      "image": "assets/bottle-inner.png",
      "description": "从诡异的花草车厢里捡到的空瓶子，瓶身是粉红色的普通玻璃。",
      "inspectEvent": "E_023_BOTTLE"
    },
    {
      "id": "newspaper",
      "name": "报纸",
      "image": "assets/newspaper-icon.png",
      "description": "标题：昨晚1号线电车的末班车遭遇大规模恐怖事件，幸存者精神异常被送医，警方调查困难。",
      "inspectEvent": "E_ITEM_NEWSPAPER_INSPECT"
    },
    {
      "id": "crew_keys",
      "name": "驾驶室与操作面板钥匙",
      "image": "assets/placeholder-key.svg",
      "description": "驾驶室钥匙和操作面板钥匙。",
      "inspectEvent": "E_ITEM_KEYS_INSPECT"
    },
    {
      "id": "phone",
      "name": "手机",
      "image": "assets/phone.png",
      "description": "一部手机。",
      "inspectEvent": "E_ITEM_PHONE_INSPECT"
    },
    {
      "id": "flashlight",
      "name": "手电筒",
      "image": "assets/flashlight.png",
      "description": "一支还能发光的手电筒。",
      "inspectEvent": "E_ITEM_FLASHLIGHT_INSPECT"
    },
    {
      "id": "emergency_cutter",
      "name": "应急割带器",
      "image": "assets/placeholder-key.svg",
      "description": "可以割断黑色背包背带的应急工具。",
      "inspectEvent": "E_ITEM_EMERGENCY_CUTTER_INSPECT"
    },
    {
      "id": "pry_bar",
      "name": "撬杆",
      "image": "assets/placeholder-key.svg",
      "description": "可以撬开被行李压住的箱体。",
      "inspectEvent": "E_ITEM_PRY_BAR_INSPECT"
    }
  ],
  "attributes": {
    "totalPoints": 30,
    "attributes": [
      {
        "id": "strength",
        "name": "力量",
        "description": "衡量肌肉力量、负重和近身对抗能力。",
        "initial": 3,
        "min": 3,
        "max": 10
      },
      {
        "id": "agility",
        "name": "敏捷",
        "description": "衡量移动速度、反应和身体协调能力。",
        "initial": 3,
        "min": 3,
        "max": 10
      },
      {
        "id": "education",
        "name": "教育",
        "description": "衡量知识储备、专业训练和学习能力。",
        "initial": 3,
        "min": 3,
        "max": 10
      },
      {
        "id": "insight",
        "name": "灵感",
        "description": "衡量观察异常、联想线索和理解现象的能力。",
        "initial": 3,
        "min": 3,
        "max": 10
      },
      {
        "id": "will",
        "name": "意志",
        "description": "衡量坚持行动、抵抗压力和控制恐惧的能力。",
        "initial": 3,
        "min": 3,
        "max": 10
      },
      {
        "id": "luck",
        "name": "幸运",
        "description": "衡量偶然事件对角色有利的程度。",
        "initial": 3,
        "min": 3,
        "max": 10
      },
      {
        "id": "constitution",
        "name": "体质",
        "description": "衡量耐力、健康程度和承受伤害的能力。",
        "initial": 3,
        "min": 3,
        "max": 10
      },
      {
        "id": "san",
        "name": "SAN",
        "description": "衡量角色承受精神冲击的能力，游戏过程中可降低至0。",
        "initial": 5,
        "min": 0,
        "max": 10
      }
    ]
  },
  "skills": [
    {
      "id": "talk",
      "name": "话术",
      "description": "通过表达、劝说和交涉影响他人的判断。",
      "initial": false,
      "autoTrigger": {
        "sum": [
          "education",
          "insight"
        ],
        "operator": "gte",
        "value": 14
      }
    },
    {
      "id": "stealth",
      "name": "潜行",
      "description": "降低行动时产生的声响，避免被敌人发现。",
      "initial": false,
      "autoTrigger": {
        "sum": [
          "agility",
          "strength"
        ],
        "operator": "gte",
        "value": 14
      }
    },
    {
      "id": "throwing",
      "name": "投掷",
      "description": "将物品准确投向目标位置或利用声响转移敌人注意。",
      "initial": false
    },
    {
      "id": "medicine",
      "name": "医学",
      "description": "运用医学知识判断伤势、死因和死亡时间。",
      "initial": false,
      "autoTrigger": {
        "attribute": "education",
        "operator": "gt",
        "value": 5
      }
    },
    {
      "id": "scouting",
      "name": "侦查",
      "description": "搜索环境、发现隐藏线索并判断潜在危险。",
      "initial": false
    }
  ]
};
