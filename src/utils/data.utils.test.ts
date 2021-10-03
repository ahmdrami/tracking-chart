import { Transaction, TransactionSource } from '../models'
import { FAILED_LEVELS, setTransactionLevel, sortTransactions, SUCCESS_LEVELS } from './data.utils'

describe('data.utils', () => {
  test('should verify transactions are sorted and grouped by week and date', () => {
    const transactions: TransactionSource[] = [
      { transactionType: 'success', date: '2019-10-02', amount: 349.99 },
      { transactionType: 'success', date: '2019-10-05', amount: 349.99 },
      { transactionType: 'success', date: '2019-10-04', amount: 349.99 },
      { transactionType: 'success', date: '2019-10-05', amount: 349.99 },
      { transactionType: 'success', date: '2019-10-01', amount: 349.99 },
      { transactionType: 'success', date: '2019-10-03', amount: 349.99 },
    ]
    const sortedTransactions = sortTransactions(transactions)

    Object.keys(sortedTransactions).forEach((key) =>
      Object.keys(sortedTransactions[key]).forEach((key, index) => expect(key).toEqual(`2019-10-0${index + 1}`))
    )
  })

  test('should verify all transactions taken on 2019-10-02 to have a total of 6 failures', () => {
    const transactions: TransactionSource[] = [
      { transactionType: 'failed', date: '2019-10-02', amount: 349.99 },
      { transactionType: 'failed', date: '2019-10-02', amount: 349.99 },
      { transactionType: 'failed', date: '2019-10-02', amount: 349.99 },
      { transactionType: 'failed', date: '2019-10-02', amount: 349.99 },
      { transactionType: 'failed', date: '2019-10-04', amount: 349.99 },
      { transactionType: 'failed', date: '2019-10-02', amount: 349.99 },
      { transactionType: 'failed', date: '2019-10-02', amount: 349.99 },
      { transactionType: 'success', date: '2019-10-02', amount: 349.99 },
      { transactionType: 'success', date: '2019-10-05', amount: 349.99 },
      { transactionType: 'failed', date: '2019-10-05', amount: 349.99 },
      { transactionType: 'success', date: '2019-10-01', amount: 349.99 },
      { transactionType: 'success', date: '2019-10-03', amount: 349.99 },
    ]
    const sortedTransactions = sortTransactions(transactions)

    expect(sortedTransactions[40]['2019-10-02'].failed).toEqual(6)
  })

  describe('setTransactionLevel', () => {
    test('should verify all success levels hex color', () => {
      const transactions: Transaction[] = [
        { success: 10, failed: 8, date: 'any', day: 0 },
        { success: 19, failed: 8, date: 'any', day: 0 },
        { success: 29, failed: 8, date: 'any', day: 0 },
        { success: 31, failed: 8, date: 'any', day: 0 },
        { success: 41, failed: 8, date: 'any', day: 0 },
      ]

      transactions.forEach((transaction, index) => expect(setTransactionLevel(transaction)).toEqual(SUCCESS_LEVELS[index]))
    })

    test('should verify all failure levels hex color', () => {
      const transactions: Transaction[] = [
        { success: 4, failed: 9, date: 'any', day: 0 },
        { success: 19, failed: 20, date: 'any', day: 0 },
        { success: 29, failed: 30, date: 'any', day: 0 },
        { success: 31, failed: 40, date: 'any', day: 0 },
        { success: 31, failed: 51, date: 'any', day: 0 },
      ]

      transactions.forEach((transaction, index) => expect(setTransactionLevel(transaction)).toEqual(FAILED_LEVELS[index]))
    })

    test('should return #FF7043 hex color when success and failures matches', () => {
      const transactions: Transaction[] = [{ success: 4, failed: 4, date: 'any', day: 0 }]

      transactions.forEach((transaction, index) => expect(setTransactionLevel(transaction)).toEqual('#FF7043'))
    })
  })
})
