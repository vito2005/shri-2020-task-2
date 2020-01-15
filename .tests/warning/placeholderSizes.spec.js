import linter from '../..'
import { expect } from 'chai'
const valid = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" }}
    ]
}`

const invalid = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "xl" }}
    ]
}`
describe('warningPlasehoderSizes tests', () => {
    it("Return empty Array if it's has no errors", () => {
        expect(lint(valid)).to.be.empty
      })
    it("Return Array with Error", () => {
        expect(lint(invalid)).to.have.deep.members([{
            "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
            "error": "Допустимые размеры для блока placeholder в блоке warning: s, m, l",
            "location": {
                "start": { "column": 20, "line": 4 },
                "end": { "column": 33, "line": 4 }
            }
        }])
      })
})
