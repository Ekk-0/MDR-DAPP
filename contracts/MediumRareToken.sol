// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MediumRareToken is ERC20 {
    // Staked Functionality
    mapping(address => uint256) public staked; // Owners' staked amounts
    mapping(address => uint256) public stakedInterestGained;
    mapping(address => uint256) private stakedFromTimestamp; // Timestamp of last staking action

    uint256 public constant ANNUAL_REWARD_RATE = 11; // 11% APY

    // Constructor: Initial token mint
    constructor() ERC20("Medium Rare Token", "MRT") {
        _mint(msg.sender, 1000000000 * 10**decimals());
    }

    function getStakedInterestGained () public view returns (uint256) {
        return stakedInterestGained[msg.sender];
    }

    // View Staking function
    function getStaked() public view returns (uint256) {
        return staked[msg.sender];
    }

    // Staking function
    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");

        // Transfer tokens to the contract
        _transfer(msg.sender, address(this), amount);

        // Claim existing rewards if any
        if (staked[msg.sender] > 0) {
            claim();
        }

        // Update staking balance and timestamp
        staked[msg.sender] += amount;
        stakedFromTimestamp[msg.sender] = block.timestamp;
    }

    // Unstaking function
    function unstake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(staked[msg.sender] >= amount, "Amount exceeds staked balance");

        // Claim rewards before unstaking
        claim();

        // Update staking balance and transfer tokens back
        staked[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount);
    }

    // Claim rewards
    function claim() public {
        require(staked[msg.sender] > 0, "No staked balance");

        // Calculate rewards
        uint256 secondsStaked = block.timestamp -
            stakedFromTimestamp[msg.sender];
        uint256 rewards = (staked[msg.sender] *
            secondsStaked *
            ANNUAL_REWARD_RATE) / 86000;

        stakedInterestGained[msg.sender] += rewards;
        
        // Mint rewards and update timestamp
        _mint(msg.sender, rewards);
        stakedFromTimestamp[msg.sender] = block.timestamp;
    }

    // Request tokens from the faucet
    function requestTokens() external {
        _mint(msg.sender, 10 * 10**18);
    }
}
