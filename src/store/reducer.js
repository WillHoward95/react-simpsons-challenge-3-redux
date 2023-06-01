import { initialState } from "./initialState";
import { NEW_API_DATA, SET_SEARCH_INPUT, SET_SORT_TYPE } from "./types";

export function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_API_DATA:
      return { ...state, simpsons: action.payload };
    case SET_SEARCH_INPUT:
      return { ...state, search: action.payload };
    case SET_SORT_TYPE:
      return { ...state, sort: action.payload };
    default:
      console.log("Reducer started");
      return initialState;
  }
}
