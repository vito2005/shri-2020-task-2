import linter from '../../'
import { expect } from 'chai'
import indexData from './../../data/index.json'
const valid = `{
    "block": "warning",
    "content": [
        {
            "block": "placeholder",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "m" }
                },
                {
                    "block": "text",
                    "mods": { "size": "m" }
                }
            ]
        }
    ]
}`

const invalid = `{
    "block": "warning",
    "content": [
        {
            "block": "placeholder",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "m" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
                }
            ]
        }
    ]
}`



describe('warningTextSizes tests', () => {
    it("Return empty Array if it's has no errors", () => {
        expect(lint(valid)).to.be.empty
      })
    it("Return Array with Error", () => {        
        expect(lint(invalid)).to.have.deep.members([{
            "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
            "error": "Тексты в блоке warning должны быть одного размера",
            "location": {
                "start": { "column": 1, "line": 1 },
                "end": { "column": 2, "line": 22 }
            }
        }])
      })
      it("Return empty Array if it's has no errors", () => {
        console.log('lint', lint(JSON.stringify(indexData)))
        expect(lint(JSON.stringify(indexData))).to.be.empty
      })
})
