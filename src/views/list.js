import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import currencyConverter from 'currency-formatter';
import { Panel, Table, Label } from 'react-bootstrap';
import '../css/list.css';

/**
 * Stateless React component that displays the list of items and the grand total
 *
 * @param {object} props The props required by this component (specified in proptypes definition)
 * @returns
 */
const List = (props) => {
  return (
    <Panel>
      <Panel.Title>Items</Panel.Title>
      <Panel.Body>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              props.items.map((item, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{item.productName}</td>
                    <td>{item.productQuantity}</td>
                    <td>{item.formattedPrice}</td>
                    <td>{item.total}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
        <h4 className="grand-total">
          <span>Grand Total</span>
          <Label bsStyle="info">{props.grandTotal}</Label>
        </h4>
      </Panel.Body>
    </Panel>
  );
}
/**
 * Filters the redux store to fetch and transform the list to the required format and to calculate the grand total
 *
 * @param {object} state The redux state
 * @returns {object} The list and grandtotal
 */
const stateFilter = (state) => {
  let items = state.items.map((item) => {
        return {
          productName: item.productName,
          productQuantity: item.productQuantity,
          productPrice: item.productPrice,
          formattedPrice: currencyConverter.format(item.productPrice, { code: 'INR' }),
          total: currencyConverter.format(item.productQuantity * item.productPrice, { code: 'INR' })
        }
      }),
      grandTotal = items.reduce((accumulator, item) => {
        return accumulator + item.total
      }, 0);

  return {
    items,
    grandTotal: currencyConverter.format(grandTotal, { code: 'INR' })
  }
}

List.displayName = 'List';

List.propTypes = {
  items: PropTypes.array,
  grandTotal: PropTypes.string
};

export default connect(stateFilter)(List);
