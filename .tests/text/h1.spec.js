import linter from '../../'
import assert from 'assert'
import { expect } from 'chai'

const valid = `{
    "block": "warning",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]
}`;
const valid1 = `{
  "block": "grid",
  "elem": "fraction",
  "elemMods": {
      "m-col": 8
  },
  "content": [
      {
          "block": "text",
          "mods": {
              "size": "xxl",
              "view": "primary",
              "type": "h1"
          },
          "content": [
              {
                  "block": "text",
                  "elem": "word",
                  "elemMods": {
                      "width": "l"
                  }
              }
          ]
      }
  ]
}`
const valid2 =`[
  {
      "block": "text",
      "mods": { "type": "h1" }
  }
]`

const invalid = `{
    "block": "warning",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]
}`
const invalid1 = `{
  "block": "grid",
  "elem": "fraction",
  "elemMods": {
      "m-col": 8
  },
  "content": [
      {
          "block": "text",
          "mods": {
              "size": "xxl",
              "view": "primary",
              "type": "h1"
          },
          "content": [
              {
                  "block": "text",
                  "elem": "word",
                  "elemMods": {
                      "width": "l"
                  }
              }
          ]
      },
      {
        "block": "text",
        "mods": {
            "size": "xxl",
            "view": "primary",
            "type": "h1"
        },
        "content": [
            {
                "block": "text",
                "elem": "word",
                "elemMods": {
                    "width": "l"
                }
            }
        ]
      }
  ]
}`


describe('h1 tests', () => {
    it("Return empty Array if it's has no errors", () => {
      expect(lint(valid)).to.be.empty
    })
    it("Return empty Array if it's has no errors", () => {
      expect(lint(valid1)).to.be.empty
    })
    it("Return empty Array if it's has no errors", () => {
      expect(lint(valid2)).to.be.empty
    })
    it("Return Array with Error", () => {
      expect(lint(invalid)).to.have.deep.members([{
        "code": "TEXT.SEVERAL_H1",
        "error": "Заголовок первого уровня на странице должен быть единственным",
        "location":  {
          "start":  {
            "column": 9,
            "line": 8
          },
          "end":  {
            "column": 10,
            "line": 11
          }
        }
    }])
    })
    it("Return Array with Error", () => {
      expect(lint(invalid1)).to.have.deep.members([{
        "code": "TEXT.SEVERAL_H1",
        "error": "Заголовок первого уровня на странице должен быть единственным",
        "location":  {
          "start":  {
            "column": 7,
            "line": 25
          },
          "end":  {
            "column": 8,
            "line": 41
          }
        }
    }])
    })
})
