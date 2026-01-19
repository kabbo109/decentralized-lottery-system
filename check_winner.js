const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./lottery_config.json");

async function main() {
    const lottery = await ethers.getContractAt("Lottery", config.contractAddress);
    
    const winner = await lottery.recentWinner();
    const balance = await ethers.provider.getBalance(config.contractAddress);

    console.log("--- Lottery Status ---");
    console.log(`Recent Winner: ${winner}`);
    console.log(`Current Pool Balance: ${ethers.formatEther(balance)} ETH`);
    
    if (winner === ethers.ZeroAddress) {
        console.log("Status: No winner picked yet.");
    } else {
        console.log("Status: Winner has been paid.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
