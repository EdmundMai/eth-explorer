import ethereumActions from "../actions/ethereum-actions";
import BigNumber from "bignumber.js";

global.BigNumber = BigNumber;
const initState = {
  totalUncles: 0,
  totalGasWei: new BigNumber(0),
  totalSentWei: new BigNumber(0),
  totalReceivedWei: new BigNumber(0),
  receivingAddresses: [],
  sendingAddresses: [],
  contractAddresses: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ethereumActions.ADD_BLOCK:
      const { gasUsed, uncles } = action.payload;
      return {
        ...state,
        totalUncles: state.totalUncles + uncles.length,
        totalGasWei: state.totalGasWei.plus(new BigNumber(gasUsed)),
      };
    case ethereumActions.ADD_TRANSACTION:
      const { value, sendingAddress, receivingAddress } = action.payload;
      return {
        ...state,
        totalSentWei: state.totalSentWei.plus(new BigNumber(value)),
        totalReceivedWei: state.totalReceivedWei.plus(new BigNumber(value)),
        receivingAddresses: [
          ...new Set([...state.receivingAddresses, receivingAddress]),
        ],
        sendingAddresses: [
          ...new Set([...state.sendingAddresses, sendingAddress]),
        ],
      };
    case ethereumActions.ADD_CONTRACT:
      return {
        ...state,
        contractAddresses: [
          ...new Set([...state.contractAddresses, action.payload]),
        ],
      };

    case ethereumActions.FETCH_BLOCK_RANGE:
      return initState;
    default:
      return state;
  }
};
