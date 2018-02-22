import { connect } from 'react-redux';
import { setThing } from 'redux/actions';
import App from 'main/view';

const mapStateToProps = state => ({
  thing: state.thing,
});
const mapDispatchToProps = dispatch => ({
  setThing: (thing) => {
    dispatch(setThing(thing));
  },
});

const AppCon = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppCon;
