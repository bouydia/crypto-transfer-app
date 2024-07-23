import { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Loader } from ".";
import { TransactionContext } from '../context/TransactionsContext'
import { shortenAddress } from "../utils/shortenAddress";

const Input = ({ placeholder, name, type, handleChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={e => handleChange(e,name)}
    className="w-full white-glassmorphism p-2 my-2 bg-transparent outline-none border-none text-white rounded-sm text-sm"
  />
)

const commonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    sendTransaction,
    formData,
    handleChange,
    isLoading,
  } = useContext(TransactionContext)
  
  
  
  const handleSubmit = e => {
    e.preventDefault()    
    const { addressTo, amount, keyword, message } = formData
    console.log(formData);
    console.log('send....');
    if (!addressTo || !amount || !keyword || !message) {
      return
    } else {
      sendTransaction()
    }
  }
  
  return (
    <div className=" text-white flex justify-center items-center ">
      <div className="flex mf:flex-row flex-col justify-between md:px-20 py-12 px-4">
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left font-light mt-5 md:w-9/12 w-11/12 text-base">
            Explore the crypto world Buy and Sell cryptocurrencies easily on
            KeyCrypt
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          <div className="grid grid-cols-3 mt-8">
            <div className={`${commonStyles} rounded-tl-lg`}>Reability</div>
            <div className={`${commonStyles} `}>Security</div>
            <div className={`${commonStyles} rounded-tr-lg`}>Etheruem</div>
            <div className={`${commonStyles} rounded-bl-lg`}>Web 3.0</div>
            <div className={`${commonStyles} `}>Low Fees</div>
            <div className={`${commonStyles} rounded-br-lg`}>Blockchain</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start  mf:mt-0 mt-10">
          <div className=" p-3 flex justify-between flex-col w-full  rounded-xl h-40 sm:w-72 my-5 eth-card white-glassmorphism ">
            <div className="flex justify-between mb-10 w-full">
              <div className="rounded-full border-2 border-white h-8 w-8 flex justify-center items-center">
                <SiEthereum fontSize={24} />
              </div>
              <BsInfoCircle fontSize={24} />
            </div>
            <p className="ml-1 font-light">
              {currentAccount && shortenAddress(currentAccount)}
            </p>
            <p className="ml-1 font-semibold text-2xl mt-1">Ethereum</p>
          </div>
          <div className=" blue-glassmorphism p-5 w-2/4">
            <Input
              placeholder="Address To"
              type="text"
              name="addressTo"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              type="number"
              name="amount"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              type="text"
              name="keyword"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter message"
              type="text"
              name="message"
              handleChange={handleChange}
            />
            <div className="w-full h-[1px] my-2 bg-slate-300" />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                className="w-full border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer mt-2"
                onClick={handleSubmit}
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome