import { useContext } from 'react'

import {TransactionContext} from '../context/TransactionsContext'
import { shortenAddress } from '../utils/shortenAddress'
import useFetch from '../hooks/useFetch'

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const gifUrl = useFetch(keyword)
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
  2xl:min-w-[450px]
  2xl:max-w-[500px]
  sm:min-w-[270px]
  sm:max-w-[300px]
  flex-col p-3 rounded-md hover:shadow-2xl
  "
    >
      <div className="flex flex-col items-center">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p>Amount :{amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">message:{message}</p>
            </>
          )}
        </div>
          <img src={gifUrl || url}
            alt="keyword"
          className='w-full h-64 2x:h96 rounded-md object-cover'/>
          <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
            <p className="text-[#37c7da]">{timestamp}</p>
          </div>
      </div>
    </div>
  )
}
  

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext)
  return (
    <div className="text-white flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h1 className="text-3xl my-2 text-center">Latest Transactions</h1>
        ) : (
          <h1 className="text-3xl my-2 text-center">
            Connect your account to see latest transactions
          </h1>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions?.reverse().map((tx, i) => (
            <TransactionCard key={i} {...tx} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions