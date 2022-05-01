import { Box, SxProps, Theme } from '@mui/material'
import { ReactNode, useMemo } from 'react'

export type Alignment = SxProps<Theme>

type Props = {
  align?: 'left' | 'middle' | 'right' | 'top' | 'bottom' |
  'top left' | 'top right' | 'bottom left' | 'bottom right' |
  'top center' | 'bottom center' | 'left middle' | 'right middle' | Alignment
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  children: ReactNode
}

export default function Page(props: Props): JSX.Element {
  const {
    align,
    textAlign,
    children
  } = props

  const alignment: Alignment = useMemo((): Alignment => {
    if (typeof align === 'object') return align as Alignment

    const alignStr = align?.toString() || ''

    const alignmentProps: Alignment = {
      alignItems:     'center',
      justifyContent: 'center',
    }
    
    if (alignStr.includes('left')) alignmentProps.justifyContent = 'flex-start'
    if (alignStr.includes('right')) alignmentProps.justifyContent = 'flex-end'

    if (alignStr.includes('top')) alignmentProps.alignItems = 'flex-start'
    if (alignStr.includes('bottom')) alignmentProps.alignItems = 'flex-end'

    return alignmentProps
  }, [align])

  return <Box
    sx={{
      height:    '100vh',
      display:   'flex',
      textAlign: textAlign,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(alignment as any),
    }}
  >
    <div>
      {children}
    </div>
  </Box>
}
