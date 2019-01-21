import Web3 from "web3";

const web3Provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/a40f331b1e204073b73e27628a5cb308"
);
const web3 = new Web3(web3Provider);

const getLatestBlockNumber = () => web3.eth.getBlockNumber();

const getBlockRange = (start, end, callback) => {
  const batch = new web3.eth.BatchRequest();

  for (let i = 0; i <= end - start; i++) {
    batch.add(
      web3.eth.getBlock.request(start + i, true, (err, block) =>
        callback(block)
      )
    );
  }

  batch.execute();
};

const filterByContracts = (addresses, callback) => {
  const batch = new web3.eth.BatchRequest();
  const NON_CONTRACT_ADDRESS_CODES = ["0x", "0x0"];

  addresses.forEach(address => {
    batch.add(
      web3.eth.getCode.request(address, (err, code) => {
        if (!NON_CONTRACT_ADDRESS_CODES.includes(code)) callback(address);
      })
    );
  });

  batch.execute();
};

const weiToEther = wei => web3.utils.fromWei(wei.toString(), "ether");

export default {
  getLatestBlockNumber,
  getBlockRange,
  weiToEther,
  filterByContracts,
};
