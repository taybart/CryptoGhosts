function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SET_GHOST = 'SET_GHOST';
export const SET_ITEM_LUT = 'SET_ITEM_LUT';
export const SET_EQUIPPED_ITEMS = 'SET_EQUIPPED_ITEMS';
export const SET_BODY_IMG_URLS = 'SET_BODY_IMG_URLS';

export const setAccount = makeActionCreator(SET_ACCOUNT, 'account');
export const setGhost = makeActionCreator(SET_GHOST, 'selectedGhost');
export const setItemLut = makeActionCreator(SET_ITEM_LUT, 'itemLut');
export const setEquippedItems = makeActionCreator(SET_EQUIPPED_ITEMS, 'equippedItems');
export const setBodyImgUrls = makeActionCreator(SET_BODY_IMG_URLS, 'bodyImgUrls');
