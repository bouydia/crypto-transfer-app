import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import {TransactionContextProvider} from './context/TransactionsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TransactionContextProvider>
    <App />
    </TransactionContextProvider>
  </React.StrictMode>,
)
