const { ethers } = require("ethers");

/**
 * Helper to convert ETH to Wei
 */
function toWei(amount) {
    return ethers.parseEther(amount);
}

/**
 * Helper to validate address
 */
function isValidAddress(addr) {
    return ethers.isAddress(addr);
}

module.exports = { toWei, isValidAddress };
