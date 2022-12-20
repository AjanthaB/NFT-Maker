
const path = require("path");
const fs = require("fs");
const Web3 = require("web3");
const HDWalletProvider = require('@truffle/hdwallet-provider');

const phrase = '';
const provider = new HDWalletProvider(
    {mnemonic: {
        phrase
    },
    // "http://localhost:7545"
    providerOrUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    chainId: 97,
    numberOfAddresses: 1
}
);

// Create an instance of Web3 and pass the
// provider as an argument.
const web3 = new Web3(provider);
const filePath = path.resolve(__dirname, "build", "contracts", "Hmt.json");
const source = fs.readFileSync(filePath, "utf-8");
const {abi, bytecode} = JSON.parse(source);

const updateContract = async () => {
    const address = '0x84890FE5D93231c1b38F2faFc66A89dB64b86A56';
    const contract = await new web3.eth.Contract(abi, address);
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    await contract.methods.updateData(200).send( {from: '0xA696458A77862E269c6d138c4F0D687982CB7307'});
    console.log(await contract.methods.readData().call());
    console.log(await contract.methods.grantRole(web3.utils.fromUtf8("MINTER_ROLE"), accounts[0]).call());
}

const createContract = async () => {
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: ["Sehas Nft", "nft", "https://my-json-server.typicode.com/AjanthaB/json-data/nft-images/"]})
        .send( {from: accounts[0]});
    console.log(accounts)
    console.log(result);
    // '0x5058dfA838aaD5084F7f68533aF263d9A79E8ED7'
    const b = await web3.eth.getBalance(accounts[0]);
    console.log(b);
}

const mintTheNft = async () => {
    const accounts = await web3.eth.getAccounts();
    const nft = await new web3.eth.Contract(abi, '0xfcF9F3D3AEe87790E6E6526632564c8bAC4Ba728', accounts[0]);
    // await nft.methods.myMint().call();
    const a = await nft.methods.mint(accounts[0]);
    console.log(nft.hash);
    // await nft.methods.grantRole(web3.utils.fromUtf8("MINTER_ROLE"), accounts[0]).call()
    // console.log(await nft.methods.hasRole(web3.utils.fromUtf8("MINTER_ROLE"), accounts[0]).call());
}

const getMoreDetails = async () => {
    const accounts = await web3.eth.getAccounts();
    const nft = await new web3.eth.Contract(abi, '0xD57f2C60b823f61f10C287eD4CB5c957D2A742C4');
    console.log(await nft.methods.tokenURI(0).call())
}

// updateContract();
// mintTheNft();
createContract();
// getMoreDetails();
