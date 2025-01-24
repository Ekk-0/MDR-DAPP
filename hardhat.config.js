require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.28",
    networks: {
        "localhost": {
            url: "http://127.0.0.1:7545"
        },
        polygonAmon: {
            url: `https://rpc-amoy.polygon.technology/`,
            accounts: [process.env.ACCOUNT_PRIVATE_KEY]
        },
    },
};
