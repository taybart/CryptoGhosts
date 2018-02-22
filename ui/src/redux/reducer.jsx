import { SET_THING } from 'redux/actions';
/**
 * Base reducers
 */
const defaultState = {
  thing: 'asdf',
};

const base = (state = defaultState, action) => {
  switch (action.type) {
    case SET_THING:
      return {
        ...state,
        thing: action.thing,
      };
    default:
      return state;
  }
};

export default base;
