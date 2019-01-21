import { combineEpics } from "redux-observable";

import ethereumEpic from "./ethereum-epic";

export default combineEpics(ethereumEpic);
