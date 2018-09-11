import web3 from './web3'
import CampaignFactory from './build/CampaignFactory';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xb735b5c4f823A3008Cd8Be7Ef9b58F598449F476'
);

export default instance;

//configure to access the deployed contract