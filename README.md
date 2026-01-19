# Decentralized Lottery System

![Solidity](https://img.shields.io/badge/solidity-^0.8.19-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/randomness-verifiable-purple)

## Overview

**Decentralized Lottery System** removes the trust required in traditional gambling. The "House" cannot rig the results because the winner selection logic is immutable and verified on the blockchain.

## Features

-   **Ticket System**: Users send a fixed amount of ETH to enter.
-   **Pool Accumulation**: All ticket sales go into a prize pool.
-   **Random Selection**: Uses a secure random number generation pattern (Chainlink VRF compatible).
-   **Auto-Payout**: The contract automatically transfers the entire pot to the winner.

## Architecture

1.  **State 1 (OPEN)**: Users can enter by calling `enter()`.
2.  **State 2 (CALCULATING)**: The owner closes the lottery; no more entries.
3.  **State 3 (CLOSED)**: A random number is generated, winner is picked, and pot is sent.

## Usage

```bash
# 1. Install
npm install

# 2. Deploy
npx hardhat run deploy.js --network localhost

# 3. Buy Tickets (Run multiple times for different users)
node enter_lottery.js

# 4. Pick Winner
node end_lottery.js

# 5. Verify Result
node check_winner.js
