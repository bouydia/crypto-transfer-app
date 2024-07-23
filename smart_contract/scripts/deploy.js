const hre = require('hardhat')
// =>0x00e2Fe0d30085c7922EE64CEee20b83aCaDD3A40

async function main() {
  const transactionsFactory = await hre.ethers.getContractFactory(
    'Transactions'
  )
  const transactionContract = await transactionsFactory.deploy()
  await transactionContract.deployed()
  console.log(
    `Transactions Address ==> ${transactionContract.address}`
  )
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
runMain()
