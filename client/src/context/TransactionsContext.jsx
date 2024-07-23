import { useState, useEffect, createContext } from 'react'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constant'

export const TransactionContext = createContext()

//get metamask
const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )
  console.log(provider, signer)
  return transactionsContract
}

export const TransactionContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  })
  const [isLoading, setLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('count')
  )
  const [transactions, setTransactions] = useState(null)
  
  const handleChange = (e, name) => {
    setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
  }
  
  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert('Please install metamask')
      
      const transactionsContract = getEthereumContract()
      const availableTransactions =
        await transactionsContract.getAllTransactions()
      const structredTransactions = availableTransactions.map(tx => ({
        addressTo: tx.reciever,
        addressFrom: tx.sender,
        timestamp: new Date(tx.timestamp.toNumber() *1000).toLocaleString(),
        message: tx.message,
        keyword: tx.keyword,
        amount: parseInt(tx.amount._hex) / 10 ** 18,
      }))
      setTransactions(structredTransactions)
    } catch (error) {
      console.log(error)
      throw new Error('No Ethereum object.')
    }
  }

  
  //check if wallet connected
  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert('Please install metamask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length) {
        setCurrentAccount(accounts[0])
        
        getAllTransactions()
      } else {
        console.log('No Account Found.')
      }
    } catch (error) {
      console.log(error)
      throw new Error('No Ethereum object.')
    }
  }

  //check transactions exist
  const checkIfTransactionsExist = async () => { 
    try {
      const transactionsContract = getEthereumContract()
      const transactionCount = await transactionsContract.getTransactionCount()
      
      window.localStorage.setItem('count',transactionCount)
    } catch (error) {
      console.log(error)
      throw new Error('No Ethereum object')
    }
  }

  //connect wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask')
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
      throw new Error('No Ethereum object')
    }
  }
  //Send Transactions
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install metamask')
      const { addressTo, amount, keyword, message } = formData
      const transactionsContract = getEthereumContract()
      const parsedAmount = ethers.utils.parseEther(amount)
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', //21000 gwei
            value: parsedAmount._hex,
            data:'0x'
          },
        ],
      })
      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      )

      setLoading(true)
      console.log(`loading ${transactionHash.hash}`)
      await transactionHash.wait()
      setLoading(false)
      console.log(`Success Hash ${transactionHash.hash}`)
      const transactionCount = await transactionsContract.getTransactionCount()
      
      setTransactionCount(transactionCount.toNumber())
     window.reload()
    } catch (error) {
      console.log(error)
      throw new Error('No Ethereum object')
    }
  }
  useEffect(() => {
    checkIfWalletConnected()
    checkIfTransactionsExist()
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
