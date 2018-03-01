import { SET_ACCOUNT, SET_GHOST, SET_ITEM_LUT, SET_EQUIPPED_ITEMS, SET_BODY_IMG_URLS } from 'redux/actions';
import { addresses } from 'json/keys.json';

/**
 * Base reducers
 */
const defaultState = {
  account: Object.keys(addresses)[0],
  selectedGhost: '',
  itemLut: {},
  equippedItems: [],
  contract: null,
  bodyImgUrls: {},
};

const base = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.account,
        selectedGhost: defaultState.selectedGhost,
        equippedItems: defaultState.equippedItems,
        itemLut: defaultState.itemLut,
      };
    case SET_GHOST:
      return {
        ...state,
        selectedGhost: action.selectedGhost,
      };
    case SET_ITEM_LUT:
      return {
        ...state,
        itemLut: action.itemLut,
      };
    case SET_EQUIPPED_ITEMS:
      return {
        ...state,
        equippedItems: action.equippedItems,
      };
    case SET_BODY_IMG_URLS:
      return {
        ...state,
        bodyImgUrls: action.bodyImgUrls,
      };
    default:
      return state;
  }
};

export default base;
