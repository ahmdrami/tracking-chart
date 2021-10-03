/** @jsxImportSource theme-ui */
import { FC } from 'react'
import { Flex, Box, Grid } from 'theme-ui'
import { Transaction } from './models'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * 
 * # Heatmap

  Days: [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
  Months: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Aug, Oct, Nov, Dec]

- Introduce levels based on success/failed rates 0, 4, 8, 12, 32+
- Success colours []
- Failure colours []
- Sort transactions by date
- Group by date then store the number of failures and success e.g. '2019-01-01': { success: 4, failed: 2 }


# The Chart

- Render days starting from Sun
- Get total days in a year e.g. 365 or 366
- Loop over and create boxes
- Get the first date day e.g. new Date('2019-01-01').getDay() will return 2 (Tuesday)
- Start from Tuesday and append boxes
- If day eq 0 then start a new col

  Sun    []
  Mon    []
  Tue [] []
  Wed [] []
  Thu [] []
  Fri [] []
  Sat [] []

 * do 2d loop by 52 x 7
 * check which day the starting date is e.g. Tuesday then x will be 14, y will be (day number times 13)
 * create a group of 7 tiles in it, group should have translate(0,0) then increment x-axis by 14 for every new group
 * tiles height and width should be 10px
 * starting tile x should be 14 and y 0, increment y for each group tile by 13
 * rect ry and rx always set to 2
 */

// const
interface HeatmapProps {
  transactions: Record<string, Transaction>
}

export const Heatmap: FC<HeatmapProps> = ({ transactions }): JSX.Element => {
  console.log(transactions)
  return (
    <Flex>
      <Flex sx={{ flexDirection: 'column' }}>
        {days.map((day) => (
          <Box key={day}>{day}</Box>
        ))}
      </Flex>

      <svg sx={{ width: 800 }}>
        {[...new Array(52)].map((_, weekIndex) => {
          return (
            <g key={`week-index=${weekIndex}`} transform={`translate(${16 * weekIndex}, 0)`}>
              {[...new Array(7)].map((_, dayIndex) => {
                return (
                  <rect
                    key={`day-index-${dayIndex}`}
                    x={14 - weekIndex}
                    y={20 * dayIndex}
                    height="14px"
                    width="14px"
                    ry="2"
                    rx="2"
                    fill="grey"
                  ></rect>
                )
              })}
            </g>
          )
        })}
      </svg>
    </Flex>
  )
}
