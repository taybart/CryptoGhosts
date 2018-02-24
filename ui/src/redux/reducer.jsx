import { SET_ACCOUNT, SET_GHOST } from 'redux/actions';
import { addresses } from 'json/keys.json';

/**
 * Base reducers
 */
const defaultState = {
  account: Object.keys(addresses)[0],
  selectedGhost: '',
};

const base = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.account,
        selectedGhost: '',
      };
    case SET_GHOST:
      return {
        ...state,
        selectedGhost: action.selectedGhost,
      };
    default:
      return state;
  }
};

export default base;
