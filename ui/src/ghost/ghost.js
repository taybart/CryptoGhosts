import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAccount, setGhost } from 'redux/actions';
import Ghost from 'ghost/view';

const mapStateToProps = state => ({
  account: state.account,
  selectedGhost: state.selectedGhost,
});
const mapDispatchToProps = dispatch => ({
  setAccount: (account) => {
    dispatch(setAccount(account));
  },
  setGhost: (selectedGhost) => {
    dispatch(setGhost(selectedGhost));
  },
});

const GhostCon = withRouter(connect(mapStateToProps, mapDispatchToProps)(Ghost));
export default GhostCon;
