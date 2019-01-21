export const FETCH_BLOCK_RANGE = "eth-explorer/ethereum/fetch-block-range";
export const ADD_BLOCK = "eth-explorer/ethereum/add-block";
export const ADD_CONTRACT = "eth-explorer/ethereum/add-contract";

const ACTIONS = Object.freeze({
  FETCH_BLOCK_RANGE,
  ADD_BLOCK,
  ADD_CONTRACT,

  fetchBlockRange: (startingBlockNumber, endingBlockNumber) => ({
    type: FETCH_BLOCK_RANGE,
    payload: { startingBlockNumber, endingBlockNumber },
  }),
  addBlock: ({ transactions, uncles }) => ({
    type: ADD_BLOCK,
    payload: { transactions, uncles },
  }),
  addContract: address => ({
    type: ADD_CONTRACT,
    payload: address,
  }),
});

export default ACTIONS;
