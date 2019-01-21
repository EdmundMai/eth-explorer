import ethereumActions from "../actions/ethereum-actions";

const initState = {
  totalGasWei: 0,
  totalSentWei: 0,
  totalReceivedWei: 0,
  receivingAddresses: [],
  sendingAddresses: [],
  receivedTotalWei: 0,
  sentTotalWei: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ethereumActions.ADD_BLOCK:
      const { gasUsed } = action.payload;
      return {
        ...state,
        totalGasWei: state.totalGasWei + gasUsed,
      };
    case ethereumActions.ADD_TRANSACTION:
      const { value, sendingAddress, receivingAddress } = action.payload;
      return {
        ...state,
        totalSentWei: state.totalSentWei + value,
        totalReceivedWei: state.totalReceivedWei + value,
        receivingAddresses: [
          ...new Set([...state.receivingAddresses, receivingAddress]),
        ],
        sendingAddresses: [
          ...new Set([...state.sendingAddresses, sendingAddress]),
        ],
      };

    case ethereumActions.FETCH_BLOCK_RANGE:
      return initState;
    default:
      return state;
  }
};
