/** @jsxImportSource theme-ui */

import { FC } from 'react'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface Props {}

export const Months: FC<Props> = (): JSX.Element => {
  return (
    <svg viewBox="0 0 800 25" sx={{ width: '100%' }}>
      {months.map((month, monthIndex) => (
        <g key={month} transform={`translate(${59 * (monthIndex + 1.05)}, 0)`}>
          <text sx={{ fontSize: 1 }} x={0} y={20}>
            {month}
          </text>
        </g>
      ))}
    </svg>
  )
}
