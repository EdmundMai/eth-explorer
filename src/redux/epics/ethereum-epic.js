import { from, of, Observable } from "rxjs";
import {
  filter,
  map,
  flatMap,
  mergeMap,
  switchMap,
  catchError,
} from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";
import EthereumApi from "../../services/ethereum-api";

import ethereumActions from "../actions/ethereum-actions";

const fetchBlockRangeEpic = action$ =>
  action$.pipe(
    ofType(ethereumActions.FETCH_BLOCK_RANGE),
    switchMap(action =>
      Observable.create(observer => {
        const { startingBlockNumber, endingBlockNumber } = action.payload;

        EthereumApi.getBlockRange(
          startingBlockNumber,
          endingBlockNumber,
          block => {
            const { transactions, gasUsed, uncles } = block;
            console.log("block!!!: ", block);
            observer.next(
              ethereumActions.addBlock({
                transactions,
                gasUsed,
                uncles,
              })
            );
          }
        );
      })
    )
  );

const addBlockEpic = action$ =>
  action$.pipe(
    ofType(ethereumActions.ADD_BLOCK),
    switchMap(action =>
      Observable.create(observer => {
        const { transactions: transactionHashes } = action.payload;

        EthereumApi.getTransactions(transactionHashes, transaction => {
          const { value, from, to, gas, gasPrice } = transaction;
          // console.log("transaction!!!: ", transaction);
          observer.next(
            ethereumActions.addTransaction({
              value,
              sendingAddress: from,
              receivingAddress: to,
            })
          );
        });
      })
    )
  );

const addTransactionEpic = action$ =>
  action$.pipe(
    ofType(ethereumActions.ADD_TRANSACTION),
    flatMap(action => {
      const { sendingAddress, receivingAddress } = action.payload;
      return [
        ethereumActions.checkAddressType(sendingAddress),
        ethereumActions.checkAddressType(receivingAddress),
      ];
    })
  );

const checkAddressTypeEpic = action$ =>
  action$.pipe(
    ofType(ethereumActions.CHECK_ADDRESS_TYPE),
    filter(action => !!action.payload),
    mergeMap(action => {
      const address = action.payload;
      return from(EthereumApi.isContractAddress(address)).pipe(
        filter(isContractAddress => !!isContractAddress),
        map(() => ethereumActions.addContract(address))
      );
    })
  );

export default combineEpics(
  fetchBlockRangeEpic,
  addBlockEpic,
  addTransactionEpic,
  checkAddressTypeEpic
);
