import linter from '../../'
import { expect } from 'chai'
const valid = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "xl" } } 
    ]
}`

const invalid = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "s" } } 
    ]
}`



describe('warningButtonSize tests', () => {
    it("Return empty Array if it's has no errors", () => {
        expect(lint(valid)).to.be.empty
      })
    it("Return Array with Error", () => {
        expect(lint(invalid)).to.have.deep.members([{
            "code": "WARNING.INVALID_BUTTON_SIZE",
            "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
            "location": {
                "start": { "column": 9, "line": 5 },
                "end": { "column": 55, "line": 5 }
            }
        }])
      })
})
