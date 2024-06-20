import { tokens } from '../../tokens/tokens'
import { SegmentedControlOption } from '@uniformdev/design-system'

type TokensControlOption = SegmentedControlOption<string>[]
type TokensControl = () => TokensControlOption

const noneValue = { label: 'None', value: '' };

export const getGapTokens: TokensControl = () => ([
  noneValue,
  ...tokens
    .filter((t, i, s) => s.indexOf(t) === i && t?.attributes?.category === 'gap')
    .map(t => ({
      label: t.attributes?.type?.toUpperCase(),
      value: t.name
    }))
    .reduce((acc: SegmentedControlOption<string>[], current: SegmentedControlOption<string>) => {
      const x = acc.find(item => item.value === current.value)
      if (!x) {
        acc.push(current)
      }
      return acc
    }, [])
])

export const getBorderRadiusTokens: TokensControl = () => ([
  noneValue,
  ...tokens
    .filter(t => t.type === 'borderRadius' && t.filePath.includes('wireframe'))
    .map(t => ({
      label: t.attributes.type || 'None',
      value: t.name,
    }))
])