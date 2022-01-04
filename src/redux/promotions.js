// import { PROMOTIONS } from '../shared/promotions';
import * as ActionTypes from './ActionType';

export const Promotions = (
  state = { isLoading: true, errMess: null, promotions: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        promotions: action.payload,
      }; //return the original state and the modified state

    case ActionTypes.PROMOS_LOADING:
      return { ...state, isLoading: true, errMess: null, promotions: [] }; //return the original state and the modified state

    case ActionTypes.PROMOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        promotions: [],
      }; //return the original state and the modified state

    default:
      return state;
  }
};
