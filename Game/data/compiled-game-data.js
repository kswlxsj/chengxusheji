window.GAME_DATA = {
  "meta": {
    "formatVersion": 3,
    "title": "末班列车框架演示",
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
      "background": "assets/carriage-06.svg",
      "objects": [
        {
          "id": "note_06",
          "name": "门上的便签",
          "image": "assets/note.svg",
          "position": {
            "x": 71,
            "y": 32,
            "width": 7,
            "height": 11
          },
          "zIndex": 12,
          "clickEvent": "E_002",
          "visibleWhen": {
            "not": {
              "objectState": {
                "objectId": "note_06",
                "property": "hidden",
                "equals": true
              }
            }
          }
        },
        {
          "id": "door_06",
          "name": "通往7号车厢的门",
          "image": "assets/door.svg",
          "position": {
            "x": 4,
            "y": 21,
            "width": 20,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_005"
        },
        {
          "id": "door_06_to_05",
          "name": "通往5号车厢的门",
          "image": "assets/door.svg",
          "position": {
            "x": 76,
            "y": 21,
            "width": 20,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_009"
        },
        {
          "id": "note_back_06",
          "name": "便签背面",
          "image": "assets/note.svg",
          "position": {
            "x": 71,
            "y": 32,
            "width": 7,
            "height": 11
          },
          "zIndex": 13,
          "clickEvent": "E_003",
          "visibleWhen": {
            "all": [
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
          "position": {
            "x": 54,
            "y": 38,
            "width": 14,
            "height": 18
          },
          "zIndex": 12,
          "clickEvent": "E_004",
          "visibleWhen": {
            "not": {
              "objectState": {
                "objectId": "map_06",
                "property": "hidden",
                "equals": true
              }
            }
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
          "image": "assets/radio.svg",
          "position": {
            "x": 50,
            "y": 54,
            "width": 13,
            "height": 18
          },
          "zIndex": 12,
          "clickEvent": "E_904"
        },
        {
          "id": "return_door_07",
          "name": "返回 6 号车厢",
          "image": "assets/door.svg",
          "position": {
            "x": 3,
            "y": 21,
            "width": 14,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_905"
        },
        {
          "id": "corpse_07",
          "name": "尸体",
          "image": "assets/corpse-07.svg",
          "position": {
            "x": 20,
            "y": 55,
            "width": 25,
            "height": 20
          },
          "clickEvent": "E_007"
        },
        {
          "id": "deep_07",
          "name": "通往8号方向的门",
          "image": "assets/door.svg",
          "position": {
            "x": 76,
            "y": 21,
            "width": 20,
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
      "background": "assets/carriage-05-03.png",
      "objects": [
        {
          "id": "door_05_to_06",
          "name": "通往6号车厢的门",
          "image": "assets/door.svg",
          "position": {
            "x": 3,
            "y": 21,
            "width": 18,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_05_06"
        },
        {
          "id": "door_05",
          "name": "通往4号车厢",
          "image": "assets/door.svg",
          "position": {
            "x": 70,
            "y": 21,
            "width": 22,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_012"
        },
        {
          "id": "clutter_05_a",
          "name": "散落的行李",
          "image": "assets/clutter-05.svg",
          "position": {
            "x": 13,
            "y": 57,
            "width": 16,
            "height": 20
          },
          "zIndex": 12,
          "clickEvent": "E_05_JUNK_A"
        },
        {
          "id": "tool_clutter_05",
          "name": "倒下的背包",
          "image": "assets/clutter-05.svg",
          "position": {
            "x": 31,
            "y": 43,
            "width": 15,
            "height": 18
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
          "image": "assets/clutter-05.svg",
          "position": {
            "x": 47,
            "y": 46,
            "width": 16,
            "height": 19
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
          "image": "assets/clutter-05.svg",
          "position": {
            "x": 59,
            "y": 59,
            "width": 14,
            "height": 17
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
            "x": 3,
            "y": 21,
            "width": 20,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_04_05"
        },
        {
          "id": "door_04",
          "name": "通往3号车厢的门",
          "image": "assets/door.svg",
          "position": {
            "x": 70,
            "y": 21,
            "width": 22,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_DOOR_04"
        },
        {
          "id": "crew_04",
          "name": "重伤的乘务员",
          "image": "assets/crew-04.png",
          "position": {
            "x": 31,
            "y": 51,
            "width": 18,
            "height": 20
          },
          "zIndex": 12,
          "clickEvent": "E_013"
        }
      ]
    },
    {
      "id": "carriage_03",
      "name": "3 号车厢",
      "background": "assets/carriage-05-03.png",
      "objects": [
        {
          "id": "door_03_to_04",
          "name": "通往4号车厢的门",
          "image": "assets/door.svg",
          "position": {
            "x": 3,
            "y": 21,
            "width": 20,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_03_04"
        },
        {
          "id": "door_03",
          "name": "通往2号车厢的门",
          "image": "assets/door.svg",
          "position": {
            "x": 70,
            "y": 21,
            "width": 22,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_DOOR_03"
        },
        {
          "id": "black_bag_03",
          "name": "黑色背包",
          "image": "assets/black-bag-03.png",
          "position": {
            "x": 43,
            "y": 48,
            "width": 17,
            "height": 15
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
          "id": "door_02",
          "name": "通往先头车厢的门",
          "image": "assets/door.svg",
          "position": {
            "x": 4,
            "y": 21,
            "width": 20,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_02_FRONT_DOOR"
        },
        {
          "id": "clicker_02",
          "name": "Clicker",
          "image": "assets/clicker-02.png",
          "position": {
            "x": 70,
            "y": 44,
            "width": 18,
            "height": 25
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
            "x": 70,
            "y": 21,
            "width": 22,
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
            "x": 3,
            "y": 21,
            "width": 20,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_GO_FRONT_02"
        },
        {
          "id": "control_27",
          "name": "前进与停车把手",
          "image": "assets/control-lever.png",
          "position": {
            "x": 42,
            "y": 38,
            "width": 18,
            "height": 25
          },
          "zIndex": 12,
          "clickEvent": "E_027",
          "visibleWhen": {
            "hasItem": "crew_keys"
          }
        }
      ]
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
          "text": "试着调查门上的便签，或者直接触碰车厢门。"
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
          "outcomes": [
            "E_005_S",
            "E_005_F"
          ]
        }
      ]
    },
    {
      "id": "E_005_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "你闻到一股浓重的血腥味，你觉得你不应该再前进了。"
        },
        {
          "type": "choice",
          "prompt": "",
          "options": [
            {
              "label": "继续前进",
              "next": "E_006A"
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
          "text": "你闻到一股浓重的血腥味，但在好奇心的驱使下，你还是决定继续前进。"
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
          "text": "你颤抖着望向车厢深处"
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
          "type": "changeScene",
          "scene": "carriage_05"
        },
        {
          "type": "dialogue",
          "text": "5号车厢仍是正常车厢的模样，四周散落着各种各样的物品。"
        },
        {
          "type": "dialogue",
          "text": "呼...呼...太好了。"
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
          "text": "你回到了 6 号车厢。已经拿走的便签不会重新出现。"
        }
      ]
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
          "type": "dialogue",
          "text": "门扉上贴着便签，写着："
        },
        {
          "type": "dialogue",
          "text": "「只管前进吧 已经没有退路了」"
        },
        {
          "type": "dialogue",
          "text": "这是......什么意思？"
        },
        {
          "type": "setFlag",
          "key": "note_front_seen",
          "value": true
        },
        {
          "type": "setObjectState",
          "object": "note_06",
          "patch": {
            "hidden": true
          }
        }
      ]
    },
    {
      "id": "E_003",
      "actions": [
        {
          "type": "dialogue",
          "text": "撕下便签查看背面，上面写着："
        },
        {
          "type": "dialogue",
          "text": "「第三个箱子里有藏着钥匙」"
        },
        {
          "type": "dialogue",
          "text": "箱子？这里哪有箱子。"
        },
        {
          "type": "setFlag",
          "key": "note_back_seen",
          "value": true
        },
        {
          "type": "setObjectState",
          "object": "note_back_06",
          "patch": {
            "hidden": true
          }
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
          "type": "dialogue",
          "text": "你仔细查看这张地图，忽然发觉哪里不对————"
        },
        {
          "type": "dialogue",
          "text": "7号车厢以后的地图是被人蓄意涂掉的。"
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
        }
      ]
    },
    {
      "id": "E_004_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "你努力查看这张地图，只能看出7号车厢以后的部分看不清楚。"
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
          "type": "setFlag",
          "key": "visited_carriage_07",
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
          "type": "setFlag",
          "key": "visited_carriage_07",
          "value": true
        }
      ]
    },
    {
      "id": "E_008_S",
      "actions": [
        {
          "type": "dialogue",
          "text": "眼前的景象让你动弹不得。"
        },
        {
          "type": "dialogue",
          "text": "车厢深处有巨大类似嘴巴的东西正在啃蚀车厢——那是某个比电车还要巨大的存在。"
        },
        {
          "type": "dialogue",
          "text": "（主角表情：惊恐）这，这是什么！"
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
      ]
    },
    {
      "id": "E_008_F",
      "actions": [
        {
          "type": "dialogue",
          "text": "原本应有8号车厢门的地方只剩一片漆黑，你感到莫名的不适。"
        },
        {
          "type": "dialogue",
          "text": "这是什么情况？"
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
      ]
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
          "dice": "skill_first_aid",
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
      "next": "E_014"
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
          "type": "check",
          "dice": "skill_talk",
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
          "type": "dialogue",
          "text": "你在附近的杂物里捡起一个空瓶子。"
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
      "id": "E_023_AGILITY_CHECK",
      "actions": [
        {
          "type": "check",
          "dice": "ev023_agility_01",
          "outcomes": [
            "E_023_AGILITY_SUCCESS",
            "E_023_AGILITY_FAIL"
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
      "id": "E_023_AGILITY_FAIL",
      "actions": [
        {
          "type": "choice",
          "prompt": "敏捷冲刺失败了，你要改用投掷吗？",
          "options": [
            {
              "label": "投掷瓶子",
              "next": "E_023_THROW_AFTER_AGILITY_FAIL"
            }
          ]
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
    }
  ],
  "items": [
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
      "image": "assets/placeholder-bottle.svg",
      "description": "一个可以用来制造声响、转移 Clicker 注意的瓶子。",
      "inspectEvent": "E_023_BOTTLE"
    },
    {
      "id": "newspaper",
      "name": "报纸",
      "image": "assets/newspaper-05.png",
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
      "image": "assets/flashlight.svg",
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
      "id": "firstAid",
      "name": "急救",
      "description": "对伤者进行紧急处理并稳定其当前状态。",
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
