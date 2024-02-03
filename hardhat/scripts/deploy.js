const hre = require("hardhat");

const main = async () => {
  const Contract = await hre.ethers.getContractFactory("SahyogCard");
  const deploy = await Contract.deploy();
  console.log(deploy);
  console.log("Deploying to Polygon...");
  await deploy.deployed();
  console.log("Polygon deployed to:", deploy.target);
};

runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();