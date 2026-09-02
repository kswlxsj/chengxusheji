window.GAME_DATA = {
  "meta": {
    "formatVersion": 1,
    "title": "末班列车框架演示",
    "startEvent": "E_START",
    "initialScene": "carriage_06",
    "initialState": {
      "sceneId": "carriage_06",
      "currentEventId": null,
      "attributes": {
        "insight": 65,
        "san": 80
      },
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
          "clickEvent": "E_NOTE",
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
          "clickEvent": "E_DOOR"
        }
      ]
    },
    {
      "id": "carriage_07",
      "name": "7 号车厢",
      "background": "assets/carriage-07.svg",
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
          "clickEvent": "E_RADIO"
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
          "clickEvent": "E_RETURN"
        }
      ]
    }
  ],
  "events": [
    {
      "id": "E_START",
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
      "id": "E_NOTE",
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
      "id": "E_DOOR",
      "actions": [
        {
          "type": "dialogue",
          "text": "门后传来一声短促的敲击。你努力判断声音的来源。"
        },
        {
          "type": "check",
          "checkId": "door_insight_001",
          "label": "灵感",
          "attribute": "insight",
          "modifier": 0,
          "success": "E_DOOR_SUCCESS",
          "fail": "E_DOOR_FAIL"
        }
      ]
    },
    {
      "id": "E_DOOR_SUCCESS",
      "actions": [
        {
          "type": "dialogue",
          "text": "敲击并非来自门后，而像是从车厢顶上传来的。门本身应该安全。"
        },
        {
          "type": "choice",
          "prompt": "要进入下一节车厢吗？",
          "options": [
            {
              "label": "推门进入 7 号车厢",
              "next": "E_ENTER_07"
            },
            {
              "label": "暂时留下继续调查",
              "next": "E_STAY"
            }
          ]
        }
      ]
    },
    {
      "id": "E_DOOR_FAIL",
      "actions": [
        {
          "type": "modifyAttribute",
          "attribute": "san",
          "amount": -3
        },
        {
          "type": "dialogue",
          "text": "你无法确认那是什么。越是倾听，敲击声越像来自自己的颅骨。SAN -3。"
        }
      ]
    },
    {
      "id": "E_ENTER_07",
      "actions": [
        {
          "type": "changeScene",
          "scene": "carriage_07"
        },
        {
          "type": "custom",
          "name": "flashScreen",
          "params": {
            "duration": 450
          }
        },
        {
          "type": "dialogue",
          "text": "灯光闪烁了一下。7 号车厢比刚才那节更加陈旧。"
        }
      ]
    },
    {
      "id": "E_STAY",
      "actions": [
        {
          "type": "dialogue",
          "text": "你松开门把手。车厢重新安静下来。"
        }
      ]
    },
    {
      "id": "E_RADIO",
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
      "id": "E_RETURN",
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
      "description": "一张已经褪色的车票，背面写着无法辨认的日期。"
    }
  ]
};
