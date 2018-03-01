import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAccount, setGhost, setEquippedItems } from 'redux/actions';
import Battle from 'battle/view';

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Battle));
