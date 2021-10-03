import { useMemo } from 'react'
import data from './data/transactions.json'
import { Heatmap } from './components'
import { TransactionSource } from './models'
import { sortTransactions } from './utils'

const transaction = data as TransactionSource[]

function App() {
  const sortedTransaction = useMemo(() => sortTransactions(transaction), [])

  return (
    <div className="App">
      <Heatmap transactions={sortedTransaction} />
    </div>
  )
}

export default App
