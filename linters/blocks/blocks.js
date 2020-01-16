import { getMod, mergeData, mergeError, getLoc } from '../../methods'

const error = {
  code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
  error: 'Маркетинговые блоки занимают больше половины от всех колонок блока grid'
}
const marketingBlocks = ['commercial', 'offer']

export default ({ log, node, mods, content, elemMods, ast }) => {
  if (log.nodeName === 'grid' && node && node.value.value === 'fraction') {
    const size = getMod(log.mods, 'm-columns')
    const sizeValue = size && Number(size.value.value)
    const elemModsValue = getMod(elemMods, 'm-col')
    const mColValue = elemModsValue && Number(elemModsValue.value.value)
    const hasMarketingBlock = content.value.children.some(node =>
      node.children.some(node => node.value && marketingBlocks.includes(node.value.value))
    )

    let tooMuchMarketingBlocks

    if (tooMuchMarketingBlocks && log.data.blocks) {
      tooMuchMarketingBlocks = (mColValue + log.data.blocks) / sizeValue > 0.5
    } else if (hasMarketingBlock) {
      tooMuchMarketingBlocks = mColValue / sizeValue > 0.5
    } else {
      tooMuchMarketingBlocks = log.data.blocks / sizeValue > 0.5
    }

    if (tooMuchMarketingBlocks) {
      return mergeError(log, { ...error, location: getLoc(ast) })
    }

    if (hasMarketingBlock) {
      return mergeData(log, { blocks: mColValue })
    }
  }
  return log
}
