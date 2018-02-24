import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

const AppCon = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
export default AppCon;
