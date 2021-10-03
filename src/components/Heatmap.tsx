/** @jsxImportSource theme-ui */
import { FC } from 'react'
import { Flex } from 'theme-ui'
import { GroupedTransaction } from '../models'
import { Levels } from './Levels'
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface Props {
  transactions: GroupedTransaction
}

export const Heatmap: FC<Props> = ({ transactions }): JSX.Element => {
  return (
    <Flex sx={{ mx: 'auto', mt: 4, maxWidth: 800, flexDirection: 'column' }}>
      <Flex sx={{ width: '100%' }}>
        <svg sx={{ maxWidth: 50, width: '100%' }} viewBox="0 0 50 150">
          {days.map((day, dayIndex) => (
            <text sx={{ fontSize: 1 }} key={day} x={15} y={18.75 * (dayIndex + 1)}>
              {day}
            </text>
          ))}
        </svg>

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
