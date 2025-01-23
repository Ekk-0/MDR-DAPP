require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.28",
    networks: {
        "localhost": {
            url: "http://127.0.0.1:7545"
        },
        zkEVM: {
            url: `https://rpc.cardona.zkevm-rpc.com`,
            accounts: [process.env.ACCOUNT_PRIVATE_KEY],
        },
    },
};
