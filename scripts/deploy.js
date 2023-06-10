const hre = require("hardhat");

async function main() {
  const FunksNFT = await hre.ethers.getContractFactory("FunksNFT");
  const funksNFT = await FunksNFT.deploy();

  await funksNFT.deployed();

  console.log("FunksNFT deployed to:", funksNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
 