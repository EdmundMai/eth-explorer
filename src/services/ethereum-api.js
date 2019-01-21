import Web3 from "web3";

const web3Provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/a40f331b1e204073b73e27628a5cb308"
);
const web3 = new Web3(web3Provider);

const getLatestBlockNumber = () => web3.eth.getBlockNumber().then(res => res);

const getBlockRange = (start, end, callback) => {
  const batch = new web3.eth.BatchRequest();

  for (let i = 0; i <= end - start; i++) {
    batch.add(
      web3.eth.getBlock.request(start + i, (err, block) => callback(block))
    );
  }

  batch.execute();
};

const getTransactions = (transactionHashes, callback) => {
  const batch = new web3.eth.BatchRequest();

  transactionHashes.forEach(transactionHash => {
    batch.add(
      web3.eth.getTransaction.request(transactionHash, (err, transaction) =>
        callback(transaction)
      )
    );
  });

  batch.execute();
};

const weiToEther = wei => web3.utils.fromWei(wei, "ether");

export default {
  getLatestBlockNumber,
  getBlockRange,
  getTransactions,

  weiToEther,
};
