import express from 'express';
import Web3 from 'web3';
import cors from 'cors';

const PORT = 3000;
const app = express();

// Enable CORS
app.use(cors(), express.urlencoded({ extended: true }));

// Configure Web3 with a provider (e.g., Infura or a local node)
const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');

// Replace with your smart contract's ABI and address
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "ANNUAL_REWARD_RATE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStaked",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStakedInterestGained",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "requestTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "staked",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "stakedInterestGained",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contractAddress = '0x1D4Ad2c5D7C28d1eE8b3864C74E302172bAE7430';

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Define routes
app.get('/api/v1/', (req, res) => {
    res.send('Welcome to the Smart Contract API!');
});

// Get Methods
app.get('/api/v1/contract/balanceOf', async (req, res) => {
    const { address } = req.query; // Extract the address from the query parameters

    if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
    }

    try {
        // Call the smart contract method with the address as an argument
        const rawBalance = await contract.methods.balanceOf(address).call();
        console.log(rawBalance);
        const balance = Web3.utils.fromWei(rawBalance, 'ether');
        // Convert BigInt to string
        res.json({ balance });
    } catch (error) {
        // General error
        res.status(500).json({ error: error.message || 'An unknown error occurred' });
    }
});

app.get('/api/v1/contract/requestTokens', async (req, res) => {
    const { address } = req.query; // Extract the address from the query parameters

    if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
    }

    try {
        // Call the smart contract method with the address as an argument
        const response = await contract.methods.requestTokens().send({ from: address });

        res.json({ message: 'Success' });
    } catch (error) {
        // General error
        res.status(500).json({ error: error.message || 'An unknown error occurred' });
    }
});

app.get('/api/v1/contract/getStaked', async (req, res) => {
    const { address } = req.query; // Extract the address from the query parameters

    if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
    }

    try {
        // Call the smart contract method with the address as an argument
        const rawBalance = await contract.methods.getStaked().call({ from: address });
        console.log(rawBalance);
        const balance = Web3.utils.fromWei(rawBalance, 'ether');

        res.json({ balance });
    } catch (error) {
        // General error
        res.status(500).json({ error: error.message || 'An unknown error occurred' });
    }
});

app.get('/api/v1/contract/getStakedInterestGained', async (req, res) => {
    const { address } = req.query; // Extract the address from the query parameters

    if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
    }

    try {
        // Call the smart contract method with the address as an argument
        const rawBalance = await contract.methods.getStakedInterestGained().call({ from: address });
        console.log(rawBalance);
        const balance = Web3.utils.fromWei(rawBalance, 'ether');

        res.json({ balance });
    } catch (error) {
        // General error
        res.status(500).json({ error: error.message || 'An unknown error occurred' });
    }
});

// Post Methods
app.post('/api/v1/contract/stake', async (req, res) => {
    console.log(req.body);
    const { address, amount } = req.body;

    // Validate input parameters
    if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
    }
    if (!amount || isNaN(amount)) {
        return res.status(400).json({ error: 'Amount parameter is required and must be a valid number' });
    }

    try {
        // Convert amount from Ether to Wei
        const stakeAmount = Web3.utils.toWei(amount, 'ether');

        // validate amount
        if (!await validateAccountBalance(address, stakeAmount)) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        // Estimate the gas for the transaction
        const gasEstimate = await contract.methods.stake(stakeAmount).estimateGas({ from: address });
        const gasLimit = BigInt(gasEstimate) * BigInt(120) / BigInt(100); // Adding a 20% buffer

        // Send the transaction after estimating gas
        const response = await contract.methods.stake(stakeAmount).send({
            from: address,
            gas: gasLimit // Set the gas estimate for the transaction
        });

        // Respond with transaction details
        res.json({
            message: 'Stake successful',
            transactionHash: response.transactionHash
        });
    } catch (error) {
        // General error
        res.status(500).json({ error: error.message || 'An unknown error occurred' });
    }
});

app.post('/api/v1/contract/unstake', async (req, res) => {
    console.log(req.body);
    const { address, amount } = req.body;

    // Validate input parameters
    if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
    }
    if (!amount || isNaN(amount)) {
        return res.status(400).json({ error: 'Amount parameter is required and must be a valid number' });
    }

    try {

        // Convert amount from Ether to Wei
        const stakeAmount = Web3.utils.toWei(amount, 'ether');

        // validate amount
        if (!await validateStakedBalance(address, stakeAmount)) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        // Estimate the gas for the transaction
        const gasEstimate = await contract.methods.unstake(stakeAmount).estimateGas({ from: address });
        const gasLimit = BigInt(gasEstimate) * BigInt(120) / BigInt(100); // Adding a 20% buffer

        // Send the transaction after estimating gas
        const response = await contract.methods.unstake(stakeAmount).send({
            from: address,
            gas: gasLimit // Set the gas estimate for the transaction
        });

        // Respond with transaction details
        res.json({ message: 'Unstake successful' });
    } catch (error) {
        // General error
        res.status(500).json({ error: error.message || 'An unknown error occurred' });
    }
});

const validateAccountBalance = async (address, amount) => {
    if (!address) {
        return false;
    }

    try {
        // Call the smart contract method with the address as an argument
        const balance = await contract.methods.balanceOf(address).call();
        if (amount <= balance) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const validateStakedBalance = async (address, amount) => {
    if (!address) {
        return false;
    }

    try {
        // Call the smart contract method with the address as an argument
        const balance = await contract.methods.getStaked().call({ from: address });
        if (amount <= balance) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }

}



app.listen(PORT, () => {
    console.log(`Example app listening on port ::${PORT}`);
});