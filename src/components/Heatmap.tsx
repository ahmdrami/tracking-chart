/** @jsxImportSource theme-ui */
import { FC } from 'react'
import { Flex } from 'theme-ui'
import { GroupedTransaction } from '../models'
import { Levels } from './Levels'
import { Weeks } from './Weeks'
import { Months } from './Months'

interface Props {
  transactions: GroupedTransaction
}

export const Heatmap: FC<Props> = ({ transactions }): JSX.Element => {
  return (
    <Flex sx={{ mx: 'auto', mt: 4, maxWidth: 800, flexDirection: 'column' }}>
      <Flex sx={{ ml: 'auto', width: '100%' }}>
        <Months />
      </Flex>
      <Flex sx={{ width: '100%' }}>
        <Weeks />
        <svg sx={{ width: '100%' }} viewBox="0 0 800 150">
          {Object.keys(transactions).map((week, weekIndex) => {
            return (
              <g key={week} transform={`translate(${16 * weekIndex}, 0)`}>
                {Object.values(transactions[week]).map(({ date, day, level, success, failed }, dayIndex) => {
                  return (
                    <rect key={date} x={14 - weekIndex} y={20 * day} height="14px" width="14px" ry="2" rx="2" fill={level}>
                      <title>
                        success: {success}, failures: {failed}
                      </title>
                    </rect>
                  )
                })}
              </g>
            )
          })}
        </svg>
      </Flex>
      <Levels />
    </Flex>
  )
}
