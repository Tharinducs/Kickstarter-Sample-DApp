import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && window.web3 !== 'undefined'){
    //we are in the browser
    web3 = new Web3(window.web3.currentProvider);
}

else{
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/b62d59dc3cf343d1b3e9daa40897acae'
    );

    web3= new Web3(provider);
}

export default web3;

//window is a globle varible only inside the browser
//next js do the server side rndering while create-react app do everything inside the browser