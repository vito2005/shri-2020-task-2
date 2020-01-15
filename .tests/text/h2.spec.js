import linter from '../..'
import assert from 'assert'
import { expect } from 'chai'

const valid = `[
  {
      "block": "text",
      "mods": { "type": "h1" }
  },
  {
      "block": "text",
      "mods": { "type": "h2" }
  }
]`;
const invalid = `[
  {
      "block": "text",
      "mods": { "type": "h2" }
  },
  {
      "block": "text",
      "mods": { "type": "h1" }
  }
]`


describe('h2 tests', () => {
    it("Return empty Array if it's has no errors", () => {
      expect(lint(valid)).to.be.empty
    })
    it("Return Array with Error", () => {
      expect(lint(invalid)).to.have.deep.members([{
          "code": "TEXT.INVALID_H2_POSITION",
          "error": "Заголовок второго уровня не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности",
          "location": {
              "start": { "column": 3, "line": 2 },
              "end": { "column": 4, "line": 5 }
          }
      }])
    })
})
