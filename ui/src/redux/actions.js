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

export const setAccount = makeActionCreator(SET_ACCOUNT, 'account');
export const setGhost = makeActionCreator(SET_GHOST, 'selectedGhost');
