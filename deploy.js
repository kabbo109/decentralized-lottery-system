const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("Deploying Lottery Contract...");

    // Entrance fee: 0.01 ETH
    const fee = ethers.parseEther("0.01");
    
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy(fee);

    await lottery.waitForDeployment();
    const address = await lottery.getAddress();

    console.log(`Lottery deployed at: ${address}`);
    console.log(`Entrance Fee: 0.01 ETH`);

    // Save config
    const config = { 
        contractAddress: address,
        fee: "0.01"
    };
    fs.writeFileSync("lottery_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
