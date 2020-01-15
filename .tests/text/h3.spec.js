import linter from '../..'
import assert from 'assert'
import { expect } from 'chai'

const valid = `[
  {
      "block": "text",
      "mods": { "type": "h2" }
  },
  {
      "block": "text",
      "mods": { "type": "h3" }
  }
]`
const invalid = `[
  {
      "block": "text",
      "mods": { "type": "h3" }
  },
  {
      "block": "text",
      "mods": { "type": "h2" }
  }
]`
const invalid1 = `[
  {
      "block": "text",
      "mods": { "type": "h3" }
  },
  {
      "block": "text",
      "mods": { "type": "h1" }
  }
]`


describe('h3 tests', () => {
    it("Return empty Array if it's has no errors", () => {
      expect(lint(valid)).to.be.empty
    })
    it("Return Array with Error", () => {
      expect(lint(invalid)).to.have.deep.members([{
          "code": "TEXT.INVALID_H3_POSITION",
          "error": "Заголовок третьего уровня не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности",
          "location": {
              "start": { "column": 3, "line": 2 },
              "end": { "column": 4, "line": 5 }
          }
      }])
    })
    it("Return Array with Error", () => {
      expect(lint(invalid1)).to.have.deep.members([{
          "code": "TEXT.INVALID_H3_POSITION",
          "error": "Заголовок третьего уровня не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности",
          "location": {
              "start": { "column": 3, "line": 2 },
              "end": { "column": 4, "line": 5 }
          }
      }])
    })
})
