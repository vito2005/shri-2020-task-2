import linter from '../..'
import { expect } from 'chai'
const valid = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } },
        { "block": "button", "mods": { "size": "m" } }
    ]
}`

const invalid = `{
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`



describe('warningButtonPosition tests', () => {
    it("Return empty Array if it's has no errors", () => {
        console.log('lint(valid)', lint(valid))
        expect(lint(valid)).to.be.empty
      })
    it("Return Array with Error", () => {
        expect(lint(invalid)).to.have.deep.members([{
            "code": "WARNING.INVALID_BUTTON_POSITION",
            "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
            "location": {
                "start": { "column": 20, "line": 4 },
                "end": { "column": 28, "line": 4 }
            }
        }])
      })
})
