/** @jsxImportSource theme-ui */
import { Flex, Text } from 'theme-ui'
import { FAILED_LEVELS, SUCCESS_LEVELS } from '../utils'

export const Levels = () => {
  return (
    <Flex sx={{ flexDirection: 'column', justifyContent: 'flex-end', ml: 'auto', svg: { maxWidth: 100, width: '100%' } }}>
      <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text as="small" variant="small">
          Successful transactions
        </Text>
        <svg viewBox="0 0 110 14">
          {SUCCESS_LEVELS.map((color, colorIndex) => (
            <g key={color} transform={`translate(${16 * colorIndex}, 0)`}>
              <rect fill={color} x={14 - colorIndex} y={0} height="14px" width="14px" ry="2" rx="2" />
            </g>
          ))}
        </svg>
      </Flex>
      <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text as="small" variant="small">
          Failure transactions
        </Text>
        <svg viewBox="0 0 110 14">
          {FAILED_LEVELS.map((color, colorIndex) => (
            <g key={color} transform={`translate(${16 * colorIndex}, 0)`}>
              <rect fill={color} x={14 - colorIndex} y={0} height="14px" width="14px" ry="2" rx="2" />
            </g>
          ))}
        </svg>
      </Flex>
    </Flex>
  )
}
