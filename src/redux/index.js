import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducers from "./reducers/index";

import { createEpicMiddleware } from "redux-observable";
import epics from "./epics";

const epicMiddleware = createEpicMiddleware();

const middleware = [createLogger(), epicMiddleware];

const storeEnhancers = [applyMiddleware(...middleware)];

const store = createStore(reducers, compose(...storeEnhancers));

epicMiddleware.run(epics);

export default store;
