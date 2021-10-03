import { TransactionSource, Transaction, GroupedTransaction, TransactionStatus } from '../models'
import { getWeek } from 'date-fns'

export const FAILED_LEVELS = ['#FFEBEE', '#EF9A9A', '#EF5350', '#E53935', '#B71C1C']
export const SUCCESS_LEVELS = ['#E0F2F1', '#80CBC4', '#26A69A', '#00897B', '#004D40']
export const BLANK_COLOR = '#BDBDBD'

/**
 * sort items by date
 * group by week and  date e.g. { [week-number][date] = { values } }
 * store total failures and success for each date then assign a level
 *
 */
export const sortTransactions = (transactions: TransactionSource[]): GroupedTransaction => {
  const data = [...transactions]
  let prevDate: string
  const groupedTransactions = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((groupedByDateTransac: GroupedTransaction, transc) => {
      const weekNumber = getWeek(new Date(transc.date))

      // create week if undefined
      if (!groupedByDateTransac[weekNumber]) {
        groupedByDateTransac[weekNumber] = {}
      }

      // create date under its week if undefined
      if (!groupedByDateTransac[weekNumber][transc.date]) {
        groupedByDateTransac[weekNumber][transc.date] = { failed: 0, success: 0, date: transc.date, day: new Date(transc.date).getDay() }
      }

      // set previous date to current transaction if undefined
      // this is used at later stage to determine the hex colour
      if (!prevDate) {
        prevDate = transc.date
      }

      // increment failures
      if (transc.transactionType === 'failed') {
        groupedByDateTransac[weekNumber][transc.date].failed += 1
      }

      // increment success
      if (transc.transactionType === 'success') {
        groupedByDateTransac[weekNumber][transc.date].success += 1
      }

      // update prev transaction level only when the next transaction date is different to avoid updating in every iteration
      // set prevDate to the current transaction date after the update
      if (prevDate !== transc.date) {
        const prevWeek = getWeek(new Date(prevDate))
        groupedByDateTransac[prevWeek][prevDate].level = setTransactionLevel(groupedByDateTransac[prevWeek][prevDate])
        prevDate = transc.date
      }

      return groupedByDateTransac
    }, {})

  return groupedTransactions
}

export const setTransactionLevel = (transaction: Transaction): string => {
  if (transaction.success > transaction.failed) {
    return getLevelColour(transaction.success, 'success')
  }
  if (transaction.success === transaction.failed) {
    return '#FF7043'
  }
  return getLevelColour(transaction.failed, 'failed')
}

export const getLevelColour = (rate: number, type: TransactionStatus): string => {
  if (rate <= 10) {
    return type === 'success' ? SUCCESS_LEVELS[0] : FAILED_LEVELS[0]
  }
  if (rate > 10 && rate <= 20) {
    return type === 'success' ? SUCCESS_LEVELS[1] : FAILED_LEVELS[1]
  }
  if (rate > 20 && rate <= 30) {
    return type === 'success' ? SUCCESS_LEVELS[2] : FAILED_LEVELS[2]
  }
  if (rate > 30 && rate <= 40) {
    return type === 'success' ? SUCCESS_LEVELS[3] : FAILED_LEVELS[3]
  }
  return type === 'success' ? SUCCESS_LEVELS[4] : FAILED_LEVELS[4]
}
