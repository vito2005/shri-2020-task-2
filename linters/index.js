import h1 from './text/h1'
import textSizes from './warning/textSizes'
import buttonSize from './warning/buttonSize'
import buttonPosition from './warning/buttonPosition'
import placeholderSizes from './warning/placeholderSizes'
import h2 from './text/h2'
import h3 from './text/h3'

export default [
  {
    nodeName: 'h1',
    validator: h1
  },
  {
    nodeName: 'h2',
    validator: h2
  },
  {
    nodeName: 'h3',
    validator: h3
  },
  {
    nodeName: 'warning',
    validator: textSizes
  },
  {
    nodeName: 'warning',
    validator: buttonSize
  },
  {
    nodeName: 'warning',
    validator: buttonPosition
  },
  {
    nodeName: 'warning',
    validator: placeholderSizes
  }
]
