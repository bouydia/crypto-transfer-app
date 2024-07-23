import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <div className="text-white w-full flex justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="log" className="w-32" />
        </div>
        <div className=" flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-base text-center cursor-pointer mx-2">Market</p>
          <p className="text-base text-center cursor-pointer mx-2">Exchange</p>
          <p className="text-base text-center cursor-pointer mx-2">Tutorials</p>
          <p className="text-base text-center cursor-pointer mx-2">Wallet</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <p className="text-small">Come Join us</p>
        <p className="text-small">info@kerypto.com</p>
      </div>
      <div className="sm:w-[90%] h-[0.25px] bg-gray-400 mt-5"></div>
      <div className="sm:w-[90%] flex justify-between items-center mt-3">
        <p className="text-small text-base">@kerypto 2022</p>
        <p className="text-base">All right reserved</p>
      </div>
    </div>
  )
}

export default Footer