import {BsShieldFillCheck} from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'
import { RiHeart2Fill } from 'react-icons/ri'
const ServiceCard = ({ color, title, icons, subtitle }) => (
  <div
    className="
  flex flex-row justify-start items-center
  white-glassmorphism
  p-3 m-2
  cursor-pointer hover:shadow-xl"
  >
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icons}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className='mt-2 text-lg'>{title}</h1>
      <p className='mt-2 text-sm md:9/12'>{subtitle}</p>
    </div>
  </div>
)
const Services = () => {
  return (
    <div className="text-white flex w-full items-center justify-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between mf:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col items-start justify-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we
            <br />
            continue to improve
          </h1>
        </div>
        <div className="flex-1 flex flex-col justify-start items-start">
          <ServiceCard
            color="bg-[#2952e3]"
            title="Security Guaranteed"
            icons={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Security is guaranteed we always mainting privacy and mainting the quality of our product ."
          />
          <ServiceCard
            color="bg-[#8945f8]"
            title="Best Exchange rate"
            icons={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Security is guaranteed we always mainting privacy and mainting the quality of our product ."
          />
          <ServiceCard
            color="bg-[#f84550]"
            title="Fastest transactions"
            icons={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Security is guaranteed we always mainting privacy and mainting the quality of our product ."
          />
        </div>
      </div>
    </div>
  )
}

export default Services