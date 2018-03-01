import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAccount, setBodyImgUrls } from 'redux/actions';
import GhostCard from 'globals/components/ghost-card';

const mapStateToProps = state => ({
  account: state.account,
  bodyImgUrls: state.bodyImgUrls,
  equippedItems: state.equippedItems,
  selectedGhost: state.selectedGhost,
});
const mapDispatchToProps = dispatch => ({
  setAccount: (account) => {
    dispatch(setAccount(account));
  },
  setBodyImgUrls: (bodyImgUrls) => {
    dispatch(setBodyImgUrls(bodyImgUrls));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GhostCard));

