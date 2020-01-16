import linter from '../..'
import assert from 'assert'
import { expect } from 'chai'

const valid = `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
 }`

const invalid = `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
 }`


describe('blocks tests', () => {
    it("Return empty Array if it's has no errors", () => {
      expect(lint(valid)).to.be.empty
    })
    it("Return Array with Error", () => {
      expect(lint(invalid)).to.have.deep.members([{
          "code": "GRID.TOO_MUCH_MARKETING_BLOCKS",
          "error": "Маркетинговые блоки занимают больше половины от всех колонок блока grid",
          "location": {
              "start": { "column": 9, "line": 19 },
              "end": { "column": 10, "line": 30 }
          }
      }])
    })
})
