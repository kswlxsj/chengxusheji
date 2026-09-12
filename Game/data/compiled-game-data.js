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
          "clickEvent": "E_012"
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
          "zIndex": 13,
          "clickEvent": "E_05_SEARCH_NEWS",
          "visibleWhen": {
            "not": {
              "objectState": {
                "objectId": "clue_clutter_05",
                "property": "hidden",
                "equals": true
              }
            }
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
          "zIndex": 12,
          "clickEvent": "E_017"
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
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_503"
        },
        {
          "id": "door_inner01_back",
          "name": "来路的车门",
          "image": "assets/door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
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
          "id": "door_inner02_to_02",
          "name": "来路的车门",
          "image": "assets/door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_503_BACK"
        },
        {
          "id": "door_inner02_to_inner03",
          "name": "通往深处的门",
          "image": "assets/door.svg",
          "position": {
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_505"
        }
      ]
    },
    {
      "id": "carriage_fake_04",
      "name": "里世界·伪4号车厢",
      "background": "assets/carriage-fake-04.png",
      "objects": [
        {
          "id": "door_fake04_back",
          "name": "原路返回的门",
          "image": "assets/door.svg",
          "invisible": true,
          "noHighlight": true,
          "position": {
            "x": 0,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_509_BACK"
        },
        {
          "id": "door_fake04_to_flower",
          "name": "车厢尽头的门",
          "image": "assets/door.svg",
          "position": {
            "x": 89,
            "y": 21,
            "width": 12,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_510"
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
            "flag": "ev504_scouting_ok",
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
              "flag": "ev504_scouting_ok",
              "equals": true
            }
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
          "type": "dialogue",
          "text": "你发现报纸的日期是第二天。"
        },
        {
          "type": "dialogue",
          "text": "它所报道的，正是你现在乘坐的这一班车。"
        },
        {
          "type": "dialogue",
          "text": "你顿时毛骨悚然，先前不祥的预感得到了验证。"
        },
        {
          "type": "check",
          "dice": "ev010_san_01"
        }
      ]
    },
    {
      "id": "E_010_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你没看出有什么异常，或许是今晚遇到的事情太多，让你有些晕字。"
        },
        {
          "type": "dialogue",
          "text": "装神弄鬼的，到底在说什么。"
        },
        {
          "type": "check",
          "dice": "ev010_san_01"
        }
      ]
    },
    {
      "id": "E_010_JOIN",
      "actions": [
        {
          "type": "check",
          "dice": "ev010_san_01"
        },
        {
          "type": "check",
          "dice": "ev010_join_route_01",
          "outcomes": [
            "E_011",
            "E_012"
          ]
        }
      ]
    },
    {
      "id": "E_011",
      "actions": [
        {
          "type": "dialogue",
          "text": "你忽然感觉背后有哪里不对，于是你转身看去。"
        },
        {
          "type": "check",
          "dice": "ev011_insight_01",
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
          "text": "（主角表情：惊恐）你不可置信地看着。"
        },
        {
          "type": "dialogue",
          "text": "你的眼前，6号车厢已消失近半。"
        },
        {
          "type": "dialogue",
          "text": "那个大嘴怪物，追上来了！"
        },
        {
          "type": "check",
          "dice": "ev011_san_01"
        }
      ],
      "next": "E_011_JOIN"
    },
    {
      "id": "E_011_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你没发现什么特别的东西，过量的恐惧与紧张已麻痹了你的神经。"
        }
      ],
      "next": "E_011_JOIN"
    },
    {
      "id": "E_011_JOIN",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_04"
        },
        {
          "type": "dialogue",
          "text": "当你回过神来，你发现5号车厢居然已经不见了大半，残缺的车厢不断摇晃，四周布满着令人绝望的黑暗。"
        },
        {
          "type": "dialogue",
          "text": "本能驱使着你向前跑去，你来到4号车厢。"
        }
      ],
      "next": "E_012"
    },
    {
      "id": "E_012",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_04"
        },
        {
          "type": "dialogue",
          "text": "一进入车厢，你就发现一名重伤昏迷的乘务员倒在地上。"
        }
      ]
    },
    {
      "id": "E_013",
      "actions": [
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
          "type": "check",
          "dice": "skill_medicine",
          "outcomes": [
            "E_014_S",
            "E_014_F"
          ]
        }
      ]
    },
    {
      "id": "E_014_S",
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
      "id": "E_014_F",
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
        },
        {
          "type": "check",
          "dice": "ev014_san_01"
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
          "text": "你把乘务员留在4号车厢，决定先去3号车厢寻找钥匙。"
        },
        {
          "type": "setFlag",
          "key": "carried_crew",
          "value": false
        }
      ]
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
        }
      ]
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
          "text": "在乘务员鼓励的眼神下，你强忍着泪光，独自向3号车厢走去。"
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
          "type": "dialogue",
          "text": "车厢内散落大量行李，你们的行动受阻。"
        },
        {
          "type": "dialogue",
          "text": "无奈之下，你拼尽全力瞪大双眼寻找。"
        },
        {
          "type": "dialogue",
          "text": "功夫不负有心人，你找到了那个黑色背包。"
        }
      ],
      "next": "E_018"
    },
    {
      "id": "E_018",
      "actions": [
        {
          "type": "check",
          "dice": "ev018_route_01",
          "outcomes": [
            "E_018_PASSENGER_TALK_S",
            "E_018_PASSENGER_TALK_F",
            "E_018_NO_PASSENGER_SCOUT_S",
            "E_018_NO_PASSENGER_SCOUT_F"
          ]
        }
      ]
    },
    {
      "id": "E_018_PASSENGER_TALK_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员一阵翻找，找到了那两个钥匙。"
        },
        {
          "type": "dialogue",
          "text": "不知怎的，你认为应该由你来保管它们。"
        },
        {
          "type": "dialogue",
          "text": "让我来保管钥匙吧，我现在还有体力，神智也算清晰。"
        },
        {
          "type": "dialogue",
          "text": "乘务员想了想，把钥匙递给你。"
        },
        {
          "type": "dialogue",
          "text": "（获得钥匙）"
        },
        {
          "type": "addItem",
          "item": "crew_keys"
        }
      ]
    },
    {
      "id": "E_018_PASSENGER_TALK_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "乘务员一阵翻找，找到了那两个钥匙。"
        },
        {
          "type": "dialogue",
          "text": "不知怎的，你认为应该由你来保管它们。"
        },
        {
          "type": "dialogue",
          "text": "让我来保管钥匙吧。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "没事，我来拿着吧。"
        }
      ]
    },
    {
      "id": "E_018_NO_PASSENGER_SCOUT_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你一阵翻找，终于找到钥匙。"
        },
        {
          "type": "dialogue",
          "text": "（获得钥匙）"
        },
        {
          "type": "addItem",
          "item": "crew_keys"
        }
      ]
    },
    {
      "id": "E_018_NO_PASSENGER_SCOUT_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你翻找了半天，最后还是没有找到钥匙。"
        },
        {
          "type": "dialogue",
          "text": "无奈之下，你只能暂时拿着黑色背包。"
        }
      ]
    },
    {
      "id": "E_019",
      "actions": [
        {
          "type": "dialogue",
          "text": "你向2号车厢看去，一片漆黑。"
        },
        {
          "type": "check",
          "dice": "skill_scouting",
          "outcomes": [
            "E_019_S",
            "E_019_F"
          ]
        }
      ]
    },
    {
      "id": "E_019_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你感觉黑暗中有人影行走，差不多有两三只。"
        },
        {
          "type": "dialogue",
          "text": "（获得手机）"
        },
        {
          "type": "addItem",
          "item": "phone"
        }
      ],
      "next": "E_020"
    },
    {
      "id": "E_019_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你觉得很黑，什么都看不清。"
        }
      ],
      "next": "E_020"
    },
    {
      "id": "E_020",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_02"
        },
        {
          "type": "dialogue",
          "text": "四周毫无光源。"
        },
        {
          "type": "dialogue",
          "text": "在一片漆黑中，你听到明显的喘息声。"
        }
      ],
      "next": "E_021"
    },
    {
      "id": "E_021",
      "actions": [
        {
          "type": "dialogue",
          "text": "你看到了，你看到了那个怪物—————那个无眼，头部异形的怪物。"
        },
        {
          "type": "check",
          "dice": "ev021_san_01"
        },
        {
          "type": "check",
          "dice": "ev021_extra_san_01"
        }
      ],
      "next": "E_02_DECIDE"
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
          "type": "check",
          "dice": "ev022_stealth_or_luck_01",
          "outcomes": [
            "E_022_S",
            "E_022_F"
          ]
        }
      ]
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
          "type": "learnSkill",
          "skill": "throwing"
        },
        {
          "type": "conditionalJump",
          "when": {
            "hasItem": "bottle"
          },
          "next": "E_023_CHOICE"
        },
        {
          "type": "dialogue",
          "text": "你在附近的杂物里捡起一个空瓶子。"
        },
        {
          "type": "addItem",
          "item": "bottle"
        }
      ],
      "next": "E_023_CHOICE"
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
          "dice": "ev024_agility_01",
          "outcomes": [
            "E_023_AGILITY_SUCCESS",
            "E_025"
          ]
        }
      ]
    },
    {
      "id": "E_025",
      "actions": [
        {
          "type": "check",
          "dice": "ev025_clicker_count_01",
          "outcomes": [
            "E_025_SINGLE",
            "E_025_MULTI"
          ]
        }
      ]
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
          "type": "dialogue",
          "text": "打开操作面板，有两根拉杆："
        },
        {
          "type": "dialogue",
          "text": "左杆（刹车/起步装置）——在下位"
        },
        {
          "type": "dialogue",
          "text": "右杆（油门）——在中间"
        },
        {
          "type": "dialogue",
          "text": "现在，你可以选择让列车继续前进，或者把它停下。"
        },
        {
          "type": "choice",
          "prompt": "你准备让列车前进还是停下？",
          "options": [
            {
              "label": "前进",
              "next": "E_028",
              "when": {
                "flag": "carried_crew",
                "equals": true
              }
            },
            {
              "label": "前进",
              "next": "E_029",
              "when": {
                "not": {
                  "flag": "carried_crew",
                  "equals": true
                }
              }
            },
            {
              "label": "停下",
              "next": "E_030"
            }
          ]
        }
      ]
    },
    {
      "id": "E_028",
      "actions": [
        {
          "type": "check",
          "dice": "ev028_talk_or_strength_01",
          "outcomes": [
            "E_029",
            "E_030"
          ]
        }
      ]
    },
    {
      "id": "E_029",
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
          "type": "dialogue",
          "text": "电车加速到极致，视野被刺眼白光覆盖。"
        },
        {
          "type": "dialogue",
          "text": "你睁开眼，发现自己仍坐在6号车厢，喇叭播报终点站已到。"
        },
        {
          "type": "dialogue",
          "text": "站务人员走来询问：你们脸色不好，没事吧？"
        },
        {
          "type": "dialogue",
          "text": "那是一场共同的噩梦。恐怖的记忆慢慢淡忘。"
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
      "id": "E_DOOR_04",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_03"
        },
        {
          "type": "dialogue",
          "text": "你推开门，走进3号车厢。车厢里到处是散落的行李。"
        }
      ]
    },
    {
      "id": "E_DOOR_03",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_02"
        },
        {
          "type": "dialogue",
          "text": "你推开门走进2号车厢。四周毫无光源，只能听见明显的喘息声。"
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
      "actions": [
        {
          "type": "dialogue",
          "text": "你决定仔细翻找这堆杂物。"
        },
        {
          "type": "check",
          "dice": "skill_scouting",
          "outcomes": [
            "E_009_S",
            "E_009_F"
          ]
        }
      ]
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
          "type": "dialogue",
          "text": "在隔离室中醒来，蜷缩在墙角。"
        },
        {
          "type": "dialogue",
          "text": "医生对警察摇了摇头，表情无奈：每天都要镇定剂，突然就疯掉了。"
        },
        {
          "type": "dialogue",
          "text": "你因在梦中经历了无法承受的恐怖，醒来后歇斯底里，被送进精神病院。"
        },
        {
          "type": "dialogue",
          "text": "无人知晓你们在逃避什么。"
        },
        {
          "type": "dialogue",
          "text": "（SAN 归零）"
        },
        {
          "type": "modifyAttribute",
          "attribute": "san",
          "amount": -10
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
          "type": "changeScene",
          "scene": "carriage_inner_01"
        },
        {
          "type": "dialogue",
          "text": "黑暗的尽头没有尽头。你深吸一口气，伸手推开了通往2号的车门。"
        },
        {
          "type": "dialogue",
          "text": "门后不是2号车厢——而是一节你从未见过的车厢。空荡荡的，连座椅也没有。"
        },
        {
          "type": "dialogue",
          "text": "你回头看了一眼来路。3号车厢还在那里。"
        },
        {
          "type": "dialogue",
          "text": "安静得像是整个世界都睡着了。"
        },
        {
          "type": "dialogue",
          "text": "你迈了进去。"
        },
        {
          "type": "setFlag",
          "key": "inner_world_entered",
          "value": true
        }
      ],
      "next": "E_502"
    },
    {
      "id": "E_502",
      "actions": [
        {
          "type": "dialogue",
          "text": "不知名的空车厢，甚至没有座椅。四面的墙壁光秃秃的，地板跟着车轮的震动轻轻发颤。"
        },
        {
          "type": "dialogue",
          "text": "车厢两头各有一扇门。你站在正中央，两侧都望不到尽头。"
        },
        {
          "type": "dialogue",
          "text": "（场景：昏暗，无光源）"
        }
      ]
    },
    {
      "id": "E_502_RETURN",
      "actions": [
        {
          "type": "dialogue",
          "text": "你折返向身后的车门，握住门把。"
        },
        {
          "type": "dialogue",
          "text": "（随机：10% —— 你推开门，回到的是6号车厢——此时的车厢已经被啃食（→ E-525）；60% —— 门被关死，打不开；30% —— 门正常地打开了，门外是3号车厢，如果从这里返回 6 号车厢，也会看到被啃食的场景）"
        },
        {
          "type": "dialogue",
          "text": "门被关死，打不开。"
        },
        {
          "type": "dialogue",
          "text": "（音效：沉闷的撞击声）"
        },
        {
          "type": "dialogue",
          "text": "你放弃了回头，转身向前。"
        },
        {
          "type": "setFlag",
          "key": "ev_inner_backtrack",
          "value": false
        }
      ],
      "next": "E_503"
    },
    {
      "id": "E_503",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_inner_02"
        },
        {
          "type": "dialogue",
          "text": "色调有些不同的空车厢。车厢角落破裂，长出杂草植物。"
        },
        {
          "type": "dialogue",
          "text": "角落里散落着几支彩色的空玻璃瓶，在昏暗中泛着不真实的颜色。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev_inner_backtrack",
            "equals": true
          },
          "next": "E_522"
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
          "type": "dialogue",
          "text": "（获得：彩色玻璃瓶）"
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
          "type": "dialogue",
          "text": "握住瓶身的一瞬间，你听到像是人声的低语，又或者像哭声或祈祷。"
        },
        {
          "type": "dialogue",
          "text": "（音效：远处人声低语）"
        },
        {
          "type": "dialogue",
          "text": "【情报·瓶子低语】像是人声的低语，又像哭声或祈祷。"
        },
        {
          "type": "dialogue",
          "text": "你抬起头，声音消失了。窗外，雾还在。"
        }
      ],
      "next": "E_503"
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
          "text": "雾蒙蒙的，远方的一切都看不真切。"
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
          "type": "changeScene",
          "scene": "carriage_inner_02"
        },
        {
          "type": "dialogue",
          "text": "并不完全黑，似乎有隐隐约约的微光。你把耳朵贴着窗户，听到窸窸窣窣的声响。"
        },
        {
          "type": "dialogue",
          "text": "【状态·已侦察窗外】此后若看向窗外，你将认出那一片微光与声响。"
        },
        {
          "type": "setFlag",
          "key": "ev504_scouting_ok",
          "value": true
        }
      ],
      "next": "E_503"
    },
    {
      "id": "E_504_F",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_inner_02"
        },
        {
          "type": "dialogue",
          "text": "雾气浓重，白茫茫一片。你贴着玻璃看了很久，什么也没有看见。"
        },
        {
          "type": "setFlag",
          "key": "ev504_scouting_ok",
          "value": false
        }
      ],
      "next": "E_503"
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
          "text": "不知从哪一刻起，身后的噪音逐渐减弱了。"
        },
        {
          "type": "dialogue",
          "text": "取而代之的，是隐隐约约的音乐声。"
        },
        {
          "type": "dialogue",
          "text": "（音效：隐约、遥远的音乐）"
        },
        {
          "type": "changeScene",
          "scene": "carriage_fake_04"
        }
      ],
      "next": "E_506"
    },
    {
      "id": "E_506",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_fake_04"
        },
        {
          "type": "dialogue",
          "text": "门上的编号写着：4。"
        },
        {
          "type": "dialogue",
          "text": "但这里不是4号车厢。座椅、车窗、天花板的灯——全都和你记忆里的4号对不上号。哪里都相似，哪里都不对。"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "crew_alive",
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
          "text": "车厢深处响起低语。那声音你认得，又陌生——像是她，又像是从你自己喉咙里漏出来的。"
        },
        {
          "type": "dialogue",
          "text": "（音效：断续低语）"
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
          "type": "dialogue",
          "text": "（演出：全屏 Jumpscare）"
        },
        {
          "type": "dialogue",
          "text": "（音效：惊悚尖啸）"
        },
        {
          "type": "dialogue",
          "text": "停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来停下来"
        },
        {
          "type": "dialogue",
          "text": "低语戛然而止。"
        },
        {
          "type": "dialogue",
          "text": "你站在原地，后颈全是冷汗。"
        },
        {
          "type": "setFlag",
          "key": "ev507_san_pending",
          "value": true
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
          "text": "平静，温和，像是一直在等你。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "已经没事了，很快就会获救了。"
        },
        {
          "type": "dialogue",
          "text": "你：「谁？」"
        },
        {
          "type": "dialogue",
          "text": "那个声音没有回答，只是低低地重复："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "善良的，伟大的，仁慈的……我呼唤了祂的名字，我交换了愿望，主已经回应我了……"
        },
        {
          "type": "dialogue",
          "text": "（音效：低回的人声）"
        },
        {
          "type": "dialogue",
          "text": "某种沉沉的东西落在你肩上——像是被应允，又像是被登记。"
        }
      ],
      "next": "E_509"
    },
    {
      "id": "E_509",
      "actions": [
        {
          "type": "dialogue",
          "text": "你站在原地。车厢尽头有一扇门通向更深处；来路那扇门还在原地；而车窗，不知何时起，雾气散开了些。"
        }
      ]
    },
    {
      "id": "E_510",
      "actions": [
        {
          "type": "changeScene",
          "scene": "flower_sea"
        },
        {
          "type": "dialogue",
          "text": "你推开那扇门——"
        },
        {
          "type": "dialogue",
          "text": "车门外就是花海。无边无际的花漫过车轨，铺到天尽头。这里真的还是现实世界吗？"
        },
        {
          "type": "dialogue",
          "text": "……在那一瞬间就已经看到你了。当你看到他们的时候，其实是他们看到并抓住了你。"
        },
        {
          "type": "dialogue",
          "text": "你感到一种不合时宜的快感，你开始干呕。不安慢慢渗进你的心口和指缝。"
        },
        {
          "type": "dialogue",
          "text": "还来得及吗？快点……"
        },
        {
          "type": "dialogue",
          "text": "【状态·涉足花海】看到花海的那一刻已获得——标记「伪结局线」：即使在此调头，也已无法返回 3 号及之前的车厢；接入主剧本2号时（E-514），真结局推进被 E-515 取代。"
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
          "type": "dialogue",
          "text": "（结局：迷失）"
        },
        {
          "type": "setFlag",
          "key": "ending_lost",
          "value": true
        }
      ],
      "next": "E_511_END"
    },
    {
      "id": "E_511_END",
      "actions": []
    },
    {
      "id": "E_513",
      "actions": [
        {
          "type": "dialogue",
          "text": "你退出花海，向来路折返。"
        },
        {
          "type": "dialogue",
          "text": "穿过一扇门，是另一节车厢。门上的编号写着：4。"
        },
        {
          "type": "dialogue",
          "text": "你总感觉这里怪怪的，或许是刚刚的精神冲击太大，现实世界反而显得不真实。"
        },
        {
          "type": "dialogue",
          "text": "你继续往回走。穿过一节车厢，又穿过一节车厢。"
        },
        {
          "type": "dialogue",
          "text": "4。4。3。4。——门上的编号不断出现，不断变化，又不断把你好端端地送回同一节车厢。"
        },
        {
          "type": "changeScene",
          "scene": "carriage_inner_02"
        },
        {
          "type": "setFlag",
          "key": "ev_fake04_from_sea",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "ev_inner_backtrack",
          "value": true
        }
      ],
      "next": "E_522"
    },
    {
      "id": "E_514",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_inner_02"
        }
      ],
      "next": "E_503"
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
          "type": "dialogue",
          "text": "（结局：Trauma）"
        },
        {
          "type": "setFlag",
          "key": "ending_trauma",
          "value": true
        }
      ],
      "next": "E_515_END"
    },
    {
      "id": "E_515_END",
      "actions": []
    },
    {
      "id": "E_516",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_fake_04"
        },
        {
          "type": "dialogue",
          "text": "你走向车窗。就在指尖将要碰到玻璃的一刻，一个声音在身后响起——"
        },
        {
          "type": "dialogue",
          "text": "（若乘务员仍在人世）是她的声音，平静得好像她本来就属于这里。"
        },
        {
          "type": "dialogue",
          "text": "（若乘务员已死）是她的声音。你认得出来——她不是已经死了吗？是谁在说话……？"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
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
      "id": "E_517",
      "actions": [
        {
          "type": "dialogue",
          "text": "窗外的雾气散开了。"
        },
        {
          "type": "dialogue",
          "text": "你看到一片花海，无边无际，在幽暗的光线下安静地起伏。"
        },
        {
          "type": "dialogue",
          "text": "她与你并肩站着，望着那片花海。过了很久，她开口了："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "有时候我觉得活着挺没劲的。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "忙不完的工作，交际，应付，假笑，点头，弯腰，灵魂被磨成胸前一张薄薄的工牌，晃啊，晃啊，晃到终点站。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "每天踏上同一班列车，同一节车厢，同一个靠门的位置。看同一张令人厌恶的脸映在玻璃上，碌碌无为。惶惶终日。像被什么无形的轨道钉死了，只能沿着既定的方向滑行，滑行，滑行。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "机器至少知道自己被造出来是为了什么。你呢？"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "你只知道闹钟响。起床。刷牙。出门。刷卡。进站。等车。上车。换乘。出站。打卡。开机。回邮件。开会。午休。开机。回邮件。开会。下班。打卡。进站。等车。上车。换乘。出站。回家。吃饭。洗澡。刷手机。睡觉。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "如果有谁能拯救我们就好了。如果有谁能改变这无聊的一切就好了。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "我们曾一直期待它会来。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "期待一场浪潮，一场盛大而危险的春天。不管它带来什么东西，总会好过……"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "你知道许愿柳的故事吗？或者猴爪。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "在你愿望的时候，你甚至其实不知道自己在愿望什么……"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "我们无数人的盼望下，降生的是什么？在它真的到来的一天，这里剩下的是什么？"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "个人的能力是多么的渺小啊，在大势所趋面前，所有的努力终如蚍蜉撼树。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "所以，停下来，求求你。然后我们逃离这里，再也不回来……"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "……只要我们活到明天，一切最终会好起来……不是吗？"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "虔诚地相信，置身事外，热爱生活。在那之后，我们就可以……"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "你找到钥匙了吗？我们去停下列车……"
        }
      ],
      "next": "E_519"
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
          "text": "白茫茫的，看不清。"
        },
        {
          "type": "dialogue",
          "text": "她站在你身边，嘴唇开合——一字一句地对你说："
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "有时候我觉得活着挺没劲的。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "忙不完的工作，交际，应付，假笑，点头，弯腰，灵魂被磨成胸前一张薄薄的工牌，晃啊，晃啊，晃到终点站。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "每天踏上同一班列车，同一节车厢，同一个靠门的位置。看同一张令人厌恶的脸映在玻璃上，碌碌无为。惶惶终日。像被什么无形的轨道钉死了，只能沿着既定的方向滑行，滑行，滑行。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "机器至少知道自己被造出来是为了什么。你呢？"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "你只知道闹钟响。起床。刷牙。出门。刷卡。进站。等车。上车。换乘。出站。打卡。开机。回邮件。开会。午休。开机。回邮件。开会。下班。打卡。进站。等车。上车。换乘。出站。回家。吃饭。洗澡。刷手机。睡觉。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "如果有谁能拯救我们就好了。如果有谁能改变这无聊的一切就好了。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "而祂现在来了，亲爱的。春天来了。你人生的美妙意义来了。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "崭新的，全新的，完美的，极乐的，新世界。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "让这花的洪流席卷一切，"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "大脑从耳朵里温热地流出来，从此不再为莫名其妙的东西发愁。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "我们一起改造这个世界，"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "把这无聊的一切全部撕碎。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "撕碎，撕碎……"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "碎片落进浪潮里，浪潮涌向新世界。"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "新世界里没有昨天，今天和明天，没有我，你和他……ONLY US"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
          "text": "永恒"
        },
        {
          "type": "dialogue",
          "speaker": "乘务员",
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
          "type": "dialogue",
          "text": "你把钥匙递出去。她接过去，指腹拂过齿纹，神情安静得可怕。"
        },
        {
          "type": "dialogue",
          "text": "【状态·钥匙交给了祂】钥匙被交了出去。逃出里世界（E-524）时钥匙会自行回到你身上；但在关键的把柄争夺时刻，你将处于劣势——丧失最终主动权（对应主剧本 E-033 一类的手柄/拉杆对抗场景，具体数值加成待定）。"
        },
        {
          "type": "setFlag",
          "key": "ev519_key_given",
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
          "text": "你站在原地。身后是无尽的花与白，身前是来时的路。"
        },
        {
          "type": "choice",
          "prompt": "",
          "options": [
            {
              "label": "原路返回",
              "next": "E_521"
            },
            {
              "label": "继续深入",
              "next": "E_510"
            }
          ]
        }
      ]
    },
    {
      "id": "E_521",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_inner_02"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev519_key_given",
            "equals": true
          },
          "next": "E_521B"
        }
      ],
      "next": "E_521A"
    },
    {
      "id": "E_521A",
      "actions": [
        {
          "type": "dialogue",
          "text": "你开始往回走。"
        },
        {
          "type": "dialogue",
          "text": "穿过一节车厢，又穿过一节车厢。"
        },
        {
          "type": "dialogue",
          "text": "4。4。3。4。——门上的编号不断出现，不断变化，又不断把你好端端地送回同一节车厢。"
        },
        {
          "type": "dialogue",
          "text": "窗外的景色没有任何变化。脚步声在空荡的车厢里来来回回。"
        },
        {
          "type": "dialogue",
          "text": "（音效：单调的脚步声）"
        }
      ],
      "next": "E_522"
    },
    {
      "id": "E_521B",
      "actions": [
        {
          "type": "dialogue",
          "text": "你开始往回走。"
        },
        {
          "type": "dialogue",
          "text": "穿过一节车厢，又穿过一节车厢。"
        },
        {
          "type": "dialogue",
          "text": "4。4。3。4。——门上的编号不断出现，不断变化，又不断把你好端端地送回同一节车厢。"
        },
        {
          "type": "dialogue",
          "text": "窗外的景色没有任何变化。脚步声在空荡的车厢里来来回回。"
        },
        {
          "type": "dialogue",
          "text": "（音效：单调的脚步声）"
        },
        {
          "type": "dialogue",
          "text": "（若【状态·钥匙交给了祂】）你下意识摸了摸口袋——钥匙不在。"
        }
      ],
      "next": "E_522"
    },
    {
      "id": "E_522",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_inner_02"
        },
        {
          "type": "setFlag",
          "key": "ev_fake04_from_sea",
          "value": false
        },
        {
          "type": "dialogue",
          "text": "不知走了多久，你踏进一节车厢——角落里又长着花草。你认得这里。"
        },
        {
          "type": "dialogue",
          "text": "（若持有玻璃瓶）你摸了摸口袋里的彩色玻璃瓶，瓶身冰凉。"
        },
        {
          "type": "dialogue",
          "text": "（若之前没有捡起玻璃瓶，此时也有机会再捡起）"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev503_bottle_taken",
            "equals": true
          },
          "next": "E_522_DONE"
        }
      ],
      "next": "E_522_PICK"
    },
    {
      "id": "E_522_PICK",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_inner_02"
        },
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
        }
      ]
    },
    {
      "id": "E_522_DONE",
      "actions": []
    },
    {
      "id": "E_523",
      "actions": [
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
          "text": "（音效：远处熟悉的噪音，逐渐清晰）"
        },
        {
          "type": "dialogue",
          "text": "你深吸一口气。"
        }
      ],
      "next": "E_524"
    },
    {
      "id": "E_524",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_02"
        },
        {
          "type": "dialogue",
          "text": "你推开门——这一次，门后是真正的2号车厢。四周毫无光源，你听见明显的喘息声。"
        },
        {
          "type": "dialogue",
          "text": "那不是人类的喘息。"
        },
        {
          "type": "dialogue",
          "text": "（音效：明显的喘息声）"
        },
        {
          "type": "dialogue",
          "text": "（若【状态·钥匙交给了祂】）你低头看去——那把钥匙不知何时回到了自己身上。"
        },
        {
          "type": "dialogue",
          "text": "【状态·钥匙交给了祂 → 清除】钥匙回到主角保管。"
        },
        {
          "type": "dialogue",
          "text": "乘务员似乎并不知道这一切。"
        },
        {
          "type": "setFlag",
          "key": "ev519_key_given",
          "value": false
        },
        {
          "type": "setFlag",
          "key": "inner_world_left",
          "value": true
        },
        {
          "type": "setFlag",
          "key": "ev_inner_backtrack",
          "value": false
        }
      ],
      "next": "E_025"
    },
    {
      "id": "E_525",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_06"
        },
        {
          "type": "dialogue",
          "text": "你推开那扇门——门外不是来路。"
        },
        {
          "type": "dialogue",
          "text": "你踏出去，这里是……6号车厢。"
        },
        {
          "type": "dialogue",
          "text": "此时的车厢已经被啃食。座椅东倒西歪，墙壁与地板布满撕咬的痕迹，空气中残留着潮湿的铁锈味。"
        },
        {
          "type": "dialogue",
          "text": "（场景：画面变红）"
        },
        {
          "type": "dialogue",
          "text": "（音效：低沉的轰鸣）"
        },
        {
          "type": "setFlag",
          "key": "carriage_06_eaten",
          "value": true
        }
      ],
      "next": "E_002"
    },
    {
      "id": "E_503_BACK",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev_inner_backtrack",
            "equals": true
          },
          "next": "E_523"
        },
        {
          "type": "changeScene",
          "scene": "carriage_inner_01"
        }
      ],
      "next": "E_502"
    },
    {
      "id": "E_509_BACK",
      "actions": [
        {
          "type": "conditionalJump",
          "when": {
            "all": [
              {
                "flag": "ev_fake04_from_sea",
                "equals": true
              },
              {
                "flag": "ev_inner_backtrack",
                "equals": true
              }
            ]
          },
          "next": "E_514"
        },
        {
          "type": "changeScene",
          "scene": "carriage_inner_02"
        },
        {
          "type": "conditionalJump",
          "when": {
            "flag": "ev_inner_backtrack",
            "equals": true
          },
          "next": "E_509"
        }
      ],
      "next": "E_503"
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
      "description": "一个可以用来制造声响、转移 Clicker 注意的瓶子。",
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
