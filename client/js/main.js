
const MainController = (() => {
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
    const API_ENDPOINT = "64.227.176.240:3000";


    const DOMStrings = {
        CONNECT_WALLET_BTN: '#connectToMetaMask',
        ACCOUNT_DIV: '.account',

        REQUEST_MRT_BTN: '#requestMrtBtn',

        AVAIL_BALANCE: '#availableBalance',
        STAKED_BALANCE: '#stakedBalance',
        INTEREST_GAINED: '#interestGained',
        TOTAL_BALANCE: '#totalBalance',

        TOKEN_INPUT_FIELD: '#tokensToSend',

        STAKE_BTN: '#stakeBtn',
        UNSTAKE_BTN: '#unstakeBtn',

        WALLET_ADDRESS: '.wallet-address'
    }

    const local = {
        account: null,
        staked: 0,
        balance: 0
    };


    const init = () => {
        console.log('Inizializing...');

        // Listen for account change in MetaMask
        if (window.ethereum) {
            ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    handleAccountChange(accounts[0]);
                } else {
                    console.log('No account is selected.');
                }
            });
        }

        // Buttons
        $(DOMStrings.CONNECT_WALLET_BTN).on('click', connectWallet);
        $(DOMStrings.REQUEST_MRT_BTN).on('click', requestTokens);


        $(DOMStrings.STAKE_BTN).on('click', handleStake);
        $(DOMStrings.UNSTAKE_BTN).on('click', handleUnstake);

        if (window.ethereum) {
            setInterval(() => {
                getAvailableBalance();
                getStakedBalance();
                getInterestGainedBalance();
            }, 5000);
        }
    }

    // Function to handle account change
    const handleAccountChange = async (newAccount) => {
        try {
            // Update the local account
            local.account = newAccount;

            // Update UI with the new account
            $(DOMStrings.ACCOUNT_DIV).html(`<span class="wallet-address" title="Wallet Address">${newAccount.slice(0, 10)}...${newAccount.slice(-6)}</span>`);

            // Re-fetch balances and other data based on the new account
            getAvailableBalance();
            getStakedBalance();
            getInterestGainedBalance();

            // Optionally, you could update other parts of your app that are tied to the account
            console.log('Account changed to:', newAccount);
        } catch (err) {
            console.error('Error updating account:', err);
        }
    };

    // private
    const connectWallet = async () => {
        console.log('Attempting to connect to wallet...');
        if (window.ethereum) {
            const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            local.account = selectedAccount;
            $(DOMStrings.ACCOUNT_DIV).html(`<span class="wallet-address" title="Wallet Address">${selectedAccount.slice(0, 10)}...${selectedAccount.slice(-6)}</span>`);

            // Configure Web3 with a provider (e.g., Infura or a local node)
            local.web3 = new Web3(window.ethereum);
            // Create a contract instance
            local.contract = new local.web3.eth.Contract(contractABI, contractAddress);

            // getBalances
            getAvailableBalance();
            getStakedBalance();
            getInterestGainedBalance();
        } else {
            Swal.fire({
                title: 'MetaMask is not installed',
                html: '<p>Please install MetaMask to use this feature.</p><a href="https://metamask.io" target="_blank">Click here for more detail</a>',
                icon: 'warning'
            });
        }
    }

    const setAccountBalance = async () => {
        try {
            const total = parseFloat(local.balance) + parseFloat(local.staked);
            $(DOMStrings.TOTAL_BALANCE).text(total);
        } catch (err) {
            console.error('Error fetching balance:', err);
        }
    }

    const getAvailableBalance = async () => {
        try {
            if (local.account) {
                const response = await $.get(`http://${API_ENDPOINT}/api/v1/contract/balanceOf`, { address: local.account });
                local.balance = response.balance || 0;
                $(DOMStrings.AVAIL_BALANCE).text(response.balance);
                setAccountBalance();
            }
        } catch (err) {
            console.error('Error fetching balance:', err);
        }
    };

    const getStakedBalance = async () => {
        try {
            if (local.account) {
                const response = await $.get(`http://${API_ENDPOINT}/api/v1/contract/getStaked`, { address: local.account });
                local.staked = response.balance || 0;
                $(DOMStrings.STAKED_BALANCE).text(response.balance);
                setAccountBalance();
            }
        } catch (err) {
            console.error('Error fetching balance:', err);
        }
    }

    const getInterestGainedBalance = async () => {
        try {
            if (local.account) {
                const response = await $.get(`http://${API_ENDPOINT}/api/v1/contract/getStakedInterestGained`, { address: local.account });
                $(DOMStrings.INTEREST_GAINED).text(response.balance);
            }
        } catch (err) {
            console.error('Error fetching balance:', err);
        }
    }


    // public
    const handleStake = async () => {
        try {
            if (local.account) {
                const amount = $(DOMStrings.TOKEN_INPUT_FIELD).val() || 0;
                $(DOMStrings.TOKEN_INPUT_FIELD).val('');

                // Safety checks
                if (amount <= 0) {
                    Swal.fire({
                        title: 'Oops...',
                        text: 'Amount needs to be more than 0',
                        icon: 'warning'
                    });
                    return;
                }

                // Scale the amount to the smallest unit (assuming 18 decimals for ERC-20 tokens)
                const scaledAmount = local.web3.utils.toWei(amount.toString(), 'ether');

                // Prepare the transaction
                const transactionParameters = {
                    from: local.account,
                    to: local.contract.options.address,
                    data: local.contract.methods.stake(scaledAmount).encodeABI(),
                };

                // Estimate gas
                const estimatedGas = await ethereum.request({
                    method: 'eth_estimateGas',
                    params: [transactionParameters],
                });

                // Add 20% buffer to the gas estimate
                const gasWithBuffer = (BigInt(estimatedGas) * BigInt(120) / BigInt(100)).toString();
                transactionParameters.gas = gasWithBuffer;

                console.log("Transaction Parameters:", transactionParameters);

                // Send the transaction
                const txHash = await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });


                Swal.fire({
                    title: 'MRT Staked',
                    text: `Successfully staked ${amount} MRT.`,
                    icon: 'success'
                });

            } else {
                Swal.fire({
                    title: 'Connect MetaMask',
                    text: 'Please connect to metamask to receive your tokens.',
                    icon: 'warning'
                });
            }
        } catch (err) {
            handleErrors(err);
        }
    }

    const handleUnstake = async () => {
        try {
            if (local.account) {
                const amount = $(DOMStrings.TOKEN_INPUT_FIELD).val() || 0;
                $(DOMStrings.TOKEN_INPUT_FIELD).val('');

                // Safety checks
                if (amount <= 0) {
                    Swal.fire({
                        title: 'Oops...',
                        text: 'Amount needs to be more than 0',
                        icon: 'warning'
                    });
                    return;
                }

                // Scale the amount to the smallest unit (assuming 18 decimals for ERC-20 tokens)
                const scaledAmount = local.web3.utils.toWei(amount.toString(), 'ether');

                // Prepare the transaction
                const transactionParameters = {
                    from: local.account,
                    to: local.contract.options.address,
                    data: local.contract.methods.unstake(scaledAmount).encodeABI(),
                };

                // Estimate gas
                const estimatedGas = await ethereum.request({
                    method: 'eth_estimateGas',
                    params: [transactionParameters],
                });

                // Add 20% buffer to the gas estimate
                const gasWithBuffer = (BigInt(estimatedGas) * BigInt(120) / BigInt(100)).toString();
                transactionParameters.gas = gasWithBuffer;

                console.log("Transaction Parameters:", transactionParameters);

                // Send the transaction
                const txHash = await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });


                console.log("Transaction Hash:", txHash); // Log the transaction hash for debugging

                Swal.fire({
                    title: 'MRT Unstaked',
                    text: `Successfully unstaked ${amount} MRT.`,
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Connect MetaMask',
                    text: 'Please connect to metamask to receive your tokens.',
                    icon: 'warning'
                });
            }
        } catch (err) {
            handleErrors(err);
        }
    }

    const requestTokens = async () => {
        try {
            if (!local.account) {
                // Show warning if MetaMask is not connected
                Swal.fire({
                    title: 'Connect MetaMask',
                    text: 'Please connect to MetaMask to receive your tokens.',
                    icon: 'warning',
                });
                return; // Exit function if no account is connected
            }

            if (!local.contract) {
                // Handle case where contract is not initialized
                Swal.fire({
                    title: 'Contract Not Found',
                    text: 'Smart contract instance is not initialized. Please try again later.',
                    icon: 'error',
                });
                return;
            }

            // Prepare the transaction
            const transactionParameters = {
                from: local.account,
                to: local.contract.options.address,
                data: local.contract.methods.requestTokens().encodeABI(),
            };

            // Estimate gas
            const estimatedGas = await ethereum.request({
                method: 'eth_estimateGas',
                params: [transactionParameters],
            });

            // Add 20% buffer to the gas estimate
            const gasWithBuffer = (BigInt(estimatedGas) * BigInt(120) / BigInt(100)).toString();
            transactionParameters.gas = gasWithBuffer;

            console.log("Transaction Parameters:", transactionParameters);

            // Send the transaction
            const txHash = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            }).catch((error) => {
                console.log(error);
            });

            console.log("Transaction Hash:", txHash); // Log the transaction hash for debugging

            // Show success message
            Swal.fire({
                title: 'MRT Deposited',
                text: `Successfully transferred 10 MRT to account ${local.account.slice(0, 4)}...${local.account.slice(-6)}.`,
                icon: 'success',
            });
        } catch (err) {
            handleErrors(err);
        }
    };

    const handleErrors = async (err) => {
        console.error('Error:', err);

        // Default error message
        let title = 'Transaction Failed';
        let text = 'An error occurred while processing your transaction. Please try again.';

        // Extract details from the error object
        if (err && err.message) {
            if (err.message.includes('Returned error:')) {
                // Handle Internal JSON-RPC error
                title = 'RPC Error';
                text = err.message.replace('Returned error:', '').trim();
            } else if (err.code === 4001) {
                // User rejected the transaction
                title = 'Transaction Rejected';
                text = 'You rejected the transaction. Please confirm it in your wallet to proceed.';
            } else if (err.code === -32000) {
                // Insufficient gas or funds
                title = 'Transaction Error';
                text = 'Insufficient gas or funds to complete the transaction. Please check your balance.';
            } else if (err.code === -32603) {
                // Internal JSON-RPC error with possible additional details
                title = 'RPC Error';
                text = err.message || 'An internal error occurred. Please try again later.';
                if (err.data && err.data.message) {
                    text = `${text} Details: ${err.data.message}`;
                }
            } else {
                // Fallback for unhandled errors
                text = err.message || text;
            }
        }

        // Display the error using SweetAlert
        await Swal.fire({
            title,
            text,
            icon: 'error',
        });
    };

    return {
        init
    }
})();

window.addEventListener('DOMContentLoaded', MainController.init);
