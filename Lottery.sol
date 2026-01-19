// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable {
    enum LotteryState { OPEN, CALCULATING }
    
    LotteryState public state;
    address payable[] public players;
    uint256 public entranceFee;
    address public recentWinner;

    event LotteryEnter(address indexed player);
    event WinnerPicked(address indexed winner);

    constructor(uint256 _entranceFee) {
        entranceFee = _entranceFee;
        state = LotteryState.OPEN;
    }

    function enter() public payable {
        require(state == LotteryState.OPEN, "Lottery is closed");
        require(msg.value >= entranceFee, "Not enough ETH!");
        players.push(payable(msg.sender));
        emit LotteryEnter(msg.sender);
    }

    // In a real production app, use Chainlink VRF for randomness.
    // For this standalone repo, we use a hash-based pseudo-random generator
    // to ensure the code runs locally without external oracle setup.
    function endLottery() public onlyOwner {
        require(state == LotteryState.OPEN, "Already calculating");
        require(players.length > 0, "No players!");

        state = LotteryState.CALCULATING;

        // Pseudo-random generation (Don't use on Mainnet with high value)
        uint256 indexOfWinner = uint256(
            keccak256(
                abi.encodePacked(
                    msg.sender,
                    block.timestamp,
                    block.prevrandao,
                    players.length
                )
            )
        ) % players.length;

        address payable winner = players[indexOfWinner];
        recentWinner = winner;

        // Reset
        state = LotteryState.OPEN;
        players = new address payable[](0);

        // Pay Winner
        (bool success, ) = winner.call{value: address(this).balance}("");
        require(success, "Transfer failed");

        emit WinnerPicked(winner);
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
