import { connect } from 'react-redux';
import { setAccount, setItemLut, setEquippedItems } from 'redux/actions';
import ItemWallet from 'globals/components/item-wallet';

const mapStateToProps = state => ({
  account: state.account,
  selectedGhost: state.selectedGhost,
  itemLut: state.itemLut,
  equippedItems: state.equippedItems,
});
const mapDispatchToProps = dispatch => ({
  setAccount: (account) => {
    dispatch(setAccount(account));
  },
  setItemLut: (itemLut) => {
    dispatch(setItemLut(itemLut));
  },
  setEquippedItems: (equippedItems) => {
    dispatch(setEquippedItems(equippedItems));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemWallet);

