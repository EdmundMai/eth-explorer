import ethereumActions from "../actions/ethereum-actions";
import BigNumber from "bignumber.js";

global.BigNumber = BigNumber;
const initState = {
  totalUncles: 0,
  totalGasCostWei: new BigNumber(0),
  totalSentWei: new BigNumber(0),
  totalReceivedWei: new BigNumber(0),
  receivingAddresses: [],
  sendingAddresses: [],
  contractAddresses: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ethereumActions.ADD_BLOCK:
      const { uncles, transactions } = action.payload;
      const totalReceivedWei = transactions.reduce(
        (sum, t) => sum.plus(new BigNumber(t.value)),
        new BigNumber(0)
      );
      const totalGasCostWei = transactions.reduce((sum, t) => {
        const { gas, gasPrice } = t;
        const g = new BigNumber(gas);
        const gp = new BigNumber(gasPrice);
        const cost = g.times(gp);
        return sum.plus(cost);
      }, new BigNumber(0));
      return {
        ...state,
        totalUncles: state.totalUncles + uncles.length,
        totalGasCostWei: state.totalGasCostWei.plus(totalGasCostWei),
        totalReceivedWei: state.totalReceivedWei.plus(
          new BigNumber(totalReceivedWei)
        ),
        receivingAddresses: [
          ...new Set([
            ...state.receivingAddresses,
            ...transactions.map(t => t.to),
          ]),
        ],
        sendingAddresses: [
          ...new Set([
            ...state.sendingAddresses,
            ...transactions.map(t => t.from),
          ]),
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
