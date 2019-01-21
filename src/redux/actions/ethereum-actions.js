export const FETCH_BLOCK_RANGE = "eth-explorer/ethereum/fetch-block-range";
export const ADD_BLOCK = "eth-explorer/ethereum/add-block";
export const ADD_TRANSACTION = "eth-explorer/ethereum/add-transaction";
export const CHECK_ADDRESS_TYPE = "eth-explorer/ethereum/check-address-type";
export const ADD_CONTRACT = "eth-explorer/ethereum/add-contract";

const ACTIONS = Object.freeze({
  FETCH_BLOCK_RANGE,
  ADD_BLOCK,
  ADD_TRANSACTION,
  CHECK_ADDRESS_TYPE,
  ADD_CONTRACT,

  // actionCreators
  fetchBlockRange: (startingBlockNumber, endingBlockNumber) => ({
    type: FETCH_BLOCK_RANGE,
    payload: { startingBlockNumber, endingBlockNumber },
  }),
  addBlock: ({ transactions, gasUsed, uncles }) => ({
    type: ADD_BLOCK,
    payload: { transactions, gasUsed, uncles },
  }),
  addTransaction: ({ value, sendingAddress, receivingAddress }) => ({
    type: ADD_TRANSACTION,
    payload: { value, sendingAddress, receivingAddress },
  }),
  checkAddressType: address => ({
    type: CHECK_ADDRESS_TYPE,
    payload: address,
  }),
  addContract: address => ({
    type: ADD_CONTRACT,
    payload: address,
  }),
});

export default ACTIONS;
