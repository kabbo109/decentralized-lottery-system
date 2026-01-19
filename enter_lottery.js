const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./lottery_config.json");

async function main() {
    // Get random signer to simulate different users
    const signers = await ethers.getSigners();
    const player = signers[Math.floor(Math.random() * signers.length)];
    
    const lottery = await ethers.getContractAt("Lottery", config.contractAddress, player);

    const feeWei = ethers.parseEther(config.fee);

    console.log(`Player ${player.address} entering lottery...`);

    const tx = await lottery.enter({ value: feeWei });
    await tx.wait();

    console.log("Ticket purchased successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
