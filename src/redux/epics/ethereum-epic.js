import { from, of, Observable } from "rxjs";
import { map, flatMap, mergeMap, switchMap, catchError } from "rxjs/operators";
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
            const { transactions, gasUsed } = block;
            // console.log("block!!!: ", block);
            observer.next(
              ethereumActions.addBlock({
                transactions,
                gasUsed: parseInt(gasUsed),
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
          console.log(transaction);
          observer.next(
            ethereumActions.addTransaction({
              value: parseInt(value),
              sendingAddress: from,
              receivingAddress: to,
            })
          );
        });
      })
    )
  );

export default combineEpics(fetchBlockRangeEpic, addBlockEpic);
