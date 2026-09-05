window.GAME_DATA = {
  "meta": {
    "formatVersion": 3,
    "title": "末班列车框架演示",
    "coverImage": "assets/cover-placeholder.svg",
    "startEvent": "E_901",
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
          "clickEvent": "E_902",
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
          "name": "通往前车厢的门",
          "image": "assets/door.svg",
          "position": {
            "x": 39,
            "y": 21,
            "width": 22,
            "height": 63
          },
          "zIndex": 11,
          "clickEvent": "E_005"
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
            "x": 18,
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
            "x": 70,
            "y": 21,
            "width": 22,
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
          "name": "车厢深处",
          "image": "assets/deep-07.svg",
          "position": {
            "x": 78,
            "y": 25,
            "width": 20,
            "height": 45
          },
          "clickEvent": "E_008"
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
              "label": "放弃前进",
              "next": "E_009"
            }
          ]
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
          "type": "dialogue",
          "text": "（检定：医学）"
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
          "type": "dialogue",
          "text": "（检定：侦查）"
        },
        {
          "type": "dialogue",
          "text": "在不安的驱使下，你来到五号车厢。"
        }
      ]
    },
    {
      "id": "E_009",
      "actions": []
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
    }
  ],
  "items": [
    {
      "id": "old_ticket",
      "name": "旧车票",
      "image": "assets/note.svg",
      "description": "一张已经褪色的车票，背面写着无法辨认的日期。",
      "inspectEvent": "E_903"
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
        "operator": "gte",
        "value": 7
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
