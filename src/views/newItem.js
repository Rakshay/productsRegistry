import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Panel, FormControl, Button } from 'react-bootstrap';
import * as actions from '../actions';
import '../css/new-item.css';

/**
 * React component taht provides an interface for a user to add a new item
 *
 * @class NewItem
 * @extends {Component}
 */
class NewItem extends Component {
  constructor () {
    super();
    this.state = {
      productName: '',
      productQuantity: '',
      productPrice: '',
      actionable: false
    };
    this.updateState = this.updateState.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  /**
   * Updates the state of the component based on the user's input
   *
   * @param {object} e The event object associated with a user updating an item property
   * @memberof NewItem
   */
  updateState (e) {
    let newState = Object.assign({}, this.state);

    newState[e.target.dataset.formlabel] = e.target.value;
    newState.actionable = (newState.productName !== '' && newState.productPrice !== '' && newState.productQuantity !== '');

    this.setState(newState);
  }

  /**
   * Adds the item to the store by invoking the appropriate redux action
   *
   * @memberof NewItem
   */
  addItem () {
    this.props.dispatch(actions.addItem(this.state.productName, this.state.productQuantity, this.state.productPrice));
    this.setState({
      productName: '',
      productQuantity: '',
      productPrice: '',
      actionable: false
    });
  }

  render() {
    return (
      <Panel>
        <Panel.Title>Add new item</Panel.Title>
        <Panel.Body>
          <div className="new-item-form">
            <FormControl componentClass="input"
                         type="text" value={this.state.productName}
                         data-formlabel="productName"
                         placeholder="Enter Product Name"
                         onChange={this.updateState} />
            <FormControl componentClass="input"
                         type="number"
                         value={this.state.productQuantity}
                         data-formlabel="productQuantity"
                         placeholder="Enter quantity"
                         onChange={this.updateState} />
            <FormControl componentClass="input"
                         type="number"
                         value={this.state.productPrice}
                         data-formlabel="productPrice"
                         placeholder="Enter price"
                         onChange={this.updateState} />
            <Button bsStyle="primary"
                    onClick={this.addItem}
                    disabled={!this.state.actionable}>Add</Button>
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

NewItem.displayName = 'NewItem';

NewItem.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(NewItem);
