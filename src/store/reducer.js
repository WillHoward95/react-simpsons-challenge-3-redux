import { initialState } from "./initialState";
import {
  NEW_API_DATA,
  SET_SEARCH_INPUT,
  SET_SORT_TYPE,
  DELETE_ITEM,
  LIKE_TOGGLE,
} from "./types";

export function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_API_DATA:
      return { ...state, simpsons: action.payload };
    case SET_SEARCH_INPUT:
      return { ...state, search: action.payload };
    case SET_SORT_TYPE:
      return { ...state, sort: action.payload };
    case DELETE_ITEM: {
      let copy = [...state.simpsons];
      copy.splice(action.payload, 1);
      return { ...state, simpsons: copy };
    }
    case LIKE_TOGGLE: {
      let copy = [...state.simpsons];
      copy[action.payload].liked = !copy[action.payload].liked;
      return { ...state, liked: copy[action.payload].liked };
    }
    default:
      console.log("Reducer started");
      return initialState;
  }
}
