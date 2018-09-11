const HDWalletProvider = require('truffle-hdwallet-provider');//npm install
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory');

const provider = new HDWalletProvider(
    'federal cage evoke bulk fatal reason board caught crash crane dance disease',//newmonic that we got when creating metamask account
    'https://rinkeby.infura.io/v3/b62d59dc3cf343d1b3e9daa40897acae'//infura account address
);

const web3 = new Web3(provider);

const deploy = async ()=>{//we cannot have await without a  function
    const accounts = await web3.eth.getAccounts();//get all accounts

    console.log('Attempting to deploy from account', accounts[0] );//just a print to say this is the account that deploying

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);//to see where the contract have been deployed.
};//interface is abi

deploy();