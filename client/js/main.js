
const MainController = (() => {
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
    }

    const local = {
        account: null,
        staked: 0,
        balance: 0
    };

    const init = () => {
        console.log('Inizializing...');

        // Buttons
        $(DOMStrings.CONNECT_WALLET_BTN).on('click', connectWallet);
        $(DOMStrings.REQUEST_MRT_BTN).on('click', requestTokens);


        $(DOMStrings.STAKE_BTN).on('click', handleStake);
        $(DOMStrings.UNSTAKE_BTN).on('click', handleUnstake);
    }

    // private
    const connectWallet = async () => {
        console.log('Attempting to connect to wallet...');
        if (window.ethereum) {
            const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            local.account = selectedAccount;
            $(DOMStrings.ACCOUNT_DIV).html(`<span class="wallet-address">${selectedAccount.slice(0, 10)}...${selectedAccount.slice(-6)}</span>`);
            // fire the stats functions

            // getBalances
            getAvailableBalance();
            getStakedBalance();
            getInterestGainedBalance();
        } else {
            swal({
                title: 'MetaMask is not installed',
                text: 'Please install MetaMask to use this feature.',
                icon: 'warning'
            });
        }
    }

    const updateBalances = () => {
        getAvailableBalance();
        getStakedBalance();
        getInterestGainedBalance();
    }

    const getAvailableBalance = async () => {
        try {
            const response = await $.get('http://localhost:3000/api/v1/contract/balanceOf', { address: local.account });
            local.balance = response.balance || 0;
            $(DOMStrings.AVAIL_BALANCE).text(response.balance);
            setAccountBalance();
        } catch (err) {
            console.error('Error fetching balance:', err);
        }
    };

    const getStakedBalance = async () => {
        try {
            const response = await $.get('http://localhost:3000/api/v1/contract/getStaked', { address: local.account });
            local.staked = response.balance || 0;
            $(DOMStrings.STAKED_BALANCE).text(response.balance);
            setAccountBalance();
        } catch (err) {
            console.error('Error fetching balance:', err);
        }
    }

    const getInterestGainedBalance = async () => {
        try {
            const response = await $.get('http://localhost:3000/api/v1/contract/getStakedInterestGained', { address: local.account });
            $(DOMStrings.INTEREST_GAINED).text(response.balance);
        } catch (err) {
            console.error('Error fetching balance:', err);
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


    // public

    const requestTokens = async () => {
        try {
            if (local.account) {
                await $.get('http://localhost:3000/api/v1/contract/requestTokens', { address: local.account });

                swal({
                    title: 'MRT Deposited',
                    text: `Successfully transfered 10MRT to account ${local.account.slice(0, 4)}...${local.account.slice(-6)}.`,
                    icon: 'success'
                });

                updateBalances();

            } else {
                swal({
                    title: 'Connect MetaMask',
                    text: 'Please connect to metamask to receive your tokens.',
                    icon: 'warning'
                });
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }

    const handleStake = async () => {
        try {
            if (local.account) {
                const amount = $(DOMStrings.TOKEN_INPUT_FIELD).val() || 0;
                $(DOMStrings.TOKEN_INPUT_FIELD).val('');
                // safety checks
                if (amount <= 0) {
                    swal({
                        title: 'Oops...',
                        text: 'Amount needs to be more than 0',
                        icon: 'warning'
                    });
                    return;
                }
                const response = await $.post('http://localhost:3000/api/v1/contract/stake', { address: local.account, amount });
                // check balance
                updateBalances();

                swal({
                    title: 'MRT Staked',
                    text: `Successfully staked ${amount}MRT.`,
                    icon: 'success'
                });

            } else {
                swal({
                    title: 'Connect MetaMask',
                    text: 'Please connect to metamask to receive your tokens.',
                    icon: 'warning'
                });
            }
        } catch (err) {
            console.error(err);
            swal({
                title: err.statusText,
                text: err.responseJSON.error,
                icon: 'error'
            });
        }
    }

    const handleUnstake = async () => {
        try {
            if (local.account) {
                const amount = $(DOMStrings.TOKEN_INPUT_FIELD).val() || 0;
                $(DOMStrings.TOKEN_INPUT_FIELD).val('');
                // safety checks
                if (amount <= 0) {
                    swal({
                        title: 'Oops...',
                        text: 'Amount needs to be more than 0',
                        icon: 'warning'
                    });
                    return;
                }
                const response = await $.post('http://localhost:3000/api/v1/contract/unstake', { address: local.account, amount });
                // check balance
                updateBalances();

                swal({
                    title: 'MRT Unstaked',
                    text: `Successfully unstaked ${amount}MRT.`,
                    icon: 'success'
                });
            } else {
                swal({
                    title: 'Connect MetaMask',
                    text: 'Please connect to metamask to receive your tokens.',
                    icon: 'warning'
                });
            }
        } catch (err) {
            console.error(err);
            swal({
                title: err.statusText,
                text: err.responseJSON.error,
                icon: 'error'
            });
        }
    }


    return {
        init
    }
})();

window.addEventListener('DOMContentLoaded', MainController.init);