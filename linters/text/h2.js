import { getMod, mergeData, mergeError, getLoc } from '../../methods.js'

const error = {
  code: 'TEXT.INVALID_H2_POSITION',
  error: 'Заголовок второго уровня не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности'
}

export default ({ log, node, mods, ast }) => {
  if (log.nodeName === 'h2') {
    if (node && node.value.value === 'text') {
      const type = getMod(mods, 'type')
      if (type && type.value.value === 'h2') {
        return mergeData(log, { h2: ast })
      }
      if (type && type.value.value === 'h1' && log.data.h2) {
        return mergeError(log, { ...error, location: getLoc(log.data.h2) })
      }
    }
  }
  return log
}
