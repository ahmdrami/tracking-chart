import { TransactionSource, Transaction, GroupedTransaction, TransactionStatus } from '../models'

export const SUCCESS_LEVELS = ['#EF9A9A', '#EF5350', '#E53935', '#C62828']
export const FAILED_LEVELS = ['#4DB6AC', '#009688', '#00897B', '#00695C']
export const BLANK_COLOR = '#BDBDBD'

/**
 * sort items by date
 * group by date
 * store total failures and success for each date
 * determine level
 *
 */
export const sortTransactions = (transactions: TransactionSource[]): GroupedTransaction => {
  const data = [...transactions]
  let prevDate: string
  const groupedTransactions = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((groupedByDateTransac: GroupedTransaction, transc) => {
      // set previous date to current transaction if undefined, this is used at later stage to determine either the success or fialure level
      if (!prevDate) {
        prevDate = transc.date
      }
      if (!groupedByDateTransac[transc.date]) {
        groupedByDateTransac[transc.date] = { failed: 0, success: 0, date: transc.date, day: new Date(transc.date).getDay() }
      }
      if (transc.transactionType === 'failed') {
        groupedByDateTransac[transc.date].failed = groupedByDateTransac[transc.date].failed + 1
      }

      if (transc.transactionType === 'success') {
        groupedByDateTransac[transc.date].success = groupedByDateTransac[transc.date].success + 1
      }

      // update prev transaction level only when the next transaction date is different to avoid updating in every iteration
      // set prevDate to the current transaction date after the update
      if (prevDate !== transc.date) {
        groupedByDateTransac[prevDate].level = setTransactionLevel(groupedByDateTransac[prevDate])
        prevDate = transc.date
      }

      return groupedByDateTransac
    }, {})

  // Object.keys(groupedTransactions).forEach((key) => console.log(key, groupedTransactions[key].failed, groupedTransactions[key].success))
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
  return type === 'success' ? SUCCESS_LEVELS[3] : FAILED_LEVELS[3]
}
