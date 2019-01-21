export const FETCH_BLOCK_RANGE = "eth-explorer/ethereum/fetch-block-range";
export const ADD_BLOCK = "eth-explorer/ethereum/add-block";
export const ADD_TRANSACTION = "eth-explorer/ethereum/add-transaction";

const ACTIONS = Object.freeze({
  FETCH_BLOCK_RANGE,
  ADD_BLOCK,
  ADD_TRANSACTION,

  // actionCreators
  fetchBlockRange: (startingBlockNumber, endingBlockNumber) => ({
    type: FETCH_BLOCK_RANGE,
    payload: { startingBlockNumber, endingBlockNumber },
  }),
  addBlock: ({ transactions }) => ({
    type: ADD_BLOCK,
    payload: { transactions },
  }),
  addTransaction: ({ value }) => ({
    type: ADD_TRANSACTION,
    payload: { value },
  }),
});

export default ACTIONS;
