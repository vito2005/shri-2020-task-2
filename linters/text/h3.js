import { getMod, mergeData, mergeError, getLoc } from '../../methods.js'

const error = {
  code: 'TEXT.INVALID_H3_POSITION',
  error: 'Заголовок третьего уровня не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности'
}

export default ({ log, node, mods, ast }) => {
  if (log.nodeName === 'h3') {
    if (node && node.value.value === 'text') {
      const type = getMod(mods, 'type')
      if (type && type.value.value === 'h3') {
        return mergeData(log, { h3: ast })
      }
      if (type && type.value.value === 'h2' && log.data.h3) {
        return mergeError(log, { ...error, location: getLoc(log.data.h3) })
      }
      if (type && type.value.value === 'h1' && log.data.h3) {
        return mergeError(log, { ...error, location: getLoc(log.data.h3) })
      }
    }
  }
  return log
}
