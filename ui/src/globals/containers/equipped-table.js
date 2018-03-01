import { connect } from 'react-redux';
import { setAccount, setGhost, setEquippedItems } from 'redux/actions';
import EquippedTable from 'globals/components/equipped-table';

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
  setGhost: (selectedGhost) => {
    dispatch(setGhost(selectedGhost));
  },
  setEquippedItems: (equippedItems) => {
    dispatch(setEquippedItems(equippedItems));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EquippedTable);

