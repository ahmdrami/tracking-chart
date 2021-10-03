/** @jsxImportSource theme-ui */
import { FC } from 'react'

interface Props {}
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const Weeks: FC<Props> = (props: Props): JSX.Element => {
  return (
    <svg sx={{ maxWidth: 50, width: '100%' }} viewBox="0 0 50 150">
      {days.map((day, dayIndex) => (
        <text sx={{ fontSize: 1 }} key={day} x={15} y={18.75 * (dayIndex + 1)}>
          {day}
        </text>
      ))}
    </svg>
  )
}
