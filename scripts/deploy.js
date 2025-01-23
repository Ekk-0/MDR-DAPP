import hre from "hardhat";

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    const MediumRareToken = await hre.ethers.getContractFactory('MediumRareToken');
    const mediumRareToken = await MediumRareToken.deploy();
    console.log(`Contract deployed to: ${await mediumRareToken.getAddress()}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });