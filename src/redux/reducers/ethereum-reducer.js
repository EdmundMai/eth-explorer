import ethereumActions from "../actions/ethereum-actions";

const initState = {
  totalTransferredWei: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ethereumActions.ADD_TRANSACTION:
      const { value } = action.payload;
      return {
        ...state,
        totalTransferredWei: state.totalTransferredWei + value,
      };

    case ethereumActions.FETCH_BLOCK_RANGE:
      return initState;
    default:
      return state;
  }
};
