import { useState } from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const NavItem = ({ title, classprops }) => {
  return <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <nav className="w-full flex  justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link>
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </Link>
      </div>
      <div>
        <ul className=" text-white md:flex hidden list-none  flex-row justify-between items-center ">
          {['Swap', 'Exchange', 'Transactions', 'Wallets'].map((item, i) => (
            <NavItem key={item + i} title={item} />
          ))}
          <li className="mx-4 text-center bg-[#2952e3] rounded-full cursor-pointer hover:bg[#2546bd] p-2">
            Login
          </li>
        </ul>
      </div>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            onClick={() => setToggleMenu(false)}
            className="text-white cursor-pointer md:hidden"
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            onClick={() => setToggleMenu(true)}
            className="text-white cursor-pointer md:hidden"
          />
        )}
        {toggleMenu && (
          <ul className="z-10 fixed top-0 right-0 h-screen p-2 w-[70vw] md:hidden shadow-2xl flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
            <li className="text-xl w-full my-2 cursor-pointer">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {['Swap', 'Exchange', 'Transactions', 'Wallets'].map((item, i) => (
              <NavItem key={item + i} title={item} classprops="my-2 text-lg" />
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar