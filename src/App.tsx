import React from 'react'
import { useMemo } from 'react'
import data from './data/transactions.json'
import { Heatmap } from './Heatmap'
import { TransactionSource, Transaction } from './models'
import { sortTransactions } from './utils/data.utils'

function App() {
  console.log(Object.keys(sortTransactions(data as TransactionSource[])).length)

  const sortedTransaction = useMemo(() => sortTransactions(data as TransactionSource[]), [])
  return (
    <div className="App">
      <Heatmap transactions={sortedTransaction} />
    </div>
  )
}

export default App
