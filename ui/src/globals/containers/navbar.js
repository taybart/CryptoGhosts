import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAccount } from 'redux/actions';
import Navbar from 'globals/components/navbar';

const mapStateToProps = state => ({
  account: state.account,
});
const mapDispatchToProps = dispatch => ({
  setAccount: (account) => {
    dispatch(setAccount(account));
  },
});

const NavCon = withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
export default NavCon;

