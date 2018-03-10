import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NewItem from './newItem';
import List from './list';
import '../css/app.css';

/**
 * React componengt that houses the new item and list components
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor () {
    super();
    this.state = {
      productName: '',
      productQuantity: null,
      productPrice: null
    };
  }

  componentDidMount () {
    this.props.dispatch(actions.fetchItems());
  }

  render() {
    return (
      <div className="App">
        <NewItem />
        <List />
      </div>
    );
  }
}

App.displayName = 'App';

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(App);
