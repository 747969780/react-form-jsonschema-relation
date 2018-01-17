import React from 'react';

import JsonObjectNestedType from '@components/JsonSchemaTypes/JsonObjectNestedType';
import JsonStringType from '@components/JsonSchemaTypes/JsonStringType';
import JsonArrayType from '@components/JsonSchemaTypes/JsonArrayType';

class JsonTypeCompList  extends React.Component {

  setNewProperty = (newProperty) => {
    this.props.setNewProperty(newProperty);
  }

  render () {
    const propertiesCompList = this.props.propertiesList.map((item, index, arr) => {
      console.log('item', item);
      switch (item[1].type) {
        case 'string':
          return <JsonStringType key={ item[0] } typeProperty={ item } deleteProperty={ this.props.deleteProperty }></JsonStringType>;
        case 'array':
          return <JsonArrayType key= { item[0] } typeProperty={ item } deleteProperty={ this.props.deleteProperty }></JsonArrayType>
        case 'object':
          return <JsonObjectNestedType key= { item[0] } typeProperty={ item } deleteProperty={ this.props.deleteProperty } setNewProperty={ this.setNewProperty }></JsonObjectNestedType>;
        default:
          return '';
      }
    });
    return propertiesCompList;
  }
}

export default JsonTypeCompList;
