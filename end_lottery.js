const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./lottery_config.json");

async function main() {
    const [owner] = await ethers.getSigners();
    const lottery = await ethers.getContractAt("Lottery", config.contractAddress, owner);

    console.log("Ending Lottery and picking winner...");
    
    try {
        const tx = await lottery.endLottery();
        const receipt = await tx.wait();
        
        console.log("Winner has been picked!");
        console.log(`Tx Hash: ${receipt.hash}`);
    } catch (e) {
        console.error("Failed to end lottery (Maybe no players?):", e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
