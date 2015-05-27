'use strict';

import React from 'react';
import CheckboxWithLabel from './CheckboxWithLabel';

class ListCheckboxWithLabel extends React.Component {

  render() {

    let checkboxes = this.props.choices.map((choice, n) => (
      <li key={n}>
        <CheckboxWithLabel labelOn={choice.yes} labelOff={choice.no} />
      </li>
    ));

    return (
      <ul>
        {checkboxes}
      </ul>
    )

  }

}

export default ListCheckboxWithLabel;
