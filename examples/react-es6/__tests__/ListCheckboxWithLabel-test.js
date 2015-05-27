jest.dontMock('../ListCheckboxWithLabel');

import React from 'react/addons';
const ListCheckboxWithLabel = require('../ListCheckboxWithLabel');
var TestUtils = React.addons.TestUtils;

describe('ListCheckboxWithLabel', () => {

  let dummyProps = [
    {yes: 'Yes', no: 'No'},
    {yes: 'Oui', no: 'Non'},
    {yes: 'Ja', no: 'Nein'}
  ];

  it('displays checkboxes', () => {

    var list = TestUtils.renderIntoDocument(
      <ListCheckboxWithLabel choices={dummyProps} />
    );

    var listNode = React.findDOMNode(list);

    console.log(listNode.outerHTML);

    expect(listNode.tagName).toEqual('UL');
  });

});
