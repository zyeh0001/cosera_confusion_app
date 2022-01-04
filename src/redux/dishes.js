import * as ActionTypes from './ActionType';

export const Dishes = (
  state = { isLoading: true, errMess: null, dishes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      }; //return the original state and the modified state

    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] }; //return the original state and the modified state

    case ActionTypes.DISHES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dishes: [],
      }; //return the original state and the modified state

    default:
      return state;
  }
};
