import { connect } from 'react-redux';
import { setAccount, setGhost } from 'redux/actions';
import App from 'main/view';

const mapStateToProps = state => ({
  account: state.account,
});
const mapDispatchToProps = dispatch => ({
  setAccount: (account) => {
    dispatch(setAccount(account));
  },
  setGhost: (selectedGhost) => {
    dispatch(setGhost(selectedGhost));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
