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
            const { transactions, uncles } = block;
            observer.next(
              ethereumActions.addBlock({
                transactions,
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
        const { transactions } = action.payload;

        const addresses = [
          ...transactions.map(t => t.from),
          ...transactions.map(t => t.to),
        ];

        EthereumApi.filterByContracts(addresses, address => {
          observer.next(ethereumActions.addContract(address));
        });
      })
    )
  );

export default combineEpics(fetchBlockRangeEpic, addBlockEpic);
