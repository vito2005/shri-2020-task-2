import { getMod, mergeError, getLoc } from '../../methods.js'
const error = {
  code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
  error: 'Допустимые размеры для блока placeholder в блоке warning: s, m, l'
}

export default ({ log, node, mods }) => {
  if (log.nodeName === 'warning') {
    if (node.value.value === 'placeholder') {
      const size = getMod(mods, 'size')
      if (size && !['s', 'm', 'l'].includes(size.value.value)) {
        return mergeError(log, { ...error, location: getLoc(node.value) })
      }
    }
  }
  return log
}
