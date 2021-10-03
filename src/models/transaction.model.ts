export type TransactionStatus = 'success' | 'failed'

export type TransactionSource = {
  transactionType: TransactionStatus
  date: string
  amount: number
}

export type Transaction = {
  success: number
  failed: number
  date: string
  level?: string
  day: number
}

export type GroupedTransaction = Record<string, Transaction>
