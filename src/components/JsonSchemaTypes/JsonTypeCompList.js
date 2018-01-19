import React from 'react';

import JsonObjectNestedType from '@components/JsonSchemaTypes/JsonObjectNestedType';
import JsonStringType from '@components/JsonSchemaTypes/JsonStringType';
import JsonArrayType from '@components/JsonSchemaTypes/JsonArrayType';

class JsonTypeCompList extends React.Component {

  setNewProperty = (newProperty) => {
    this.props.setNewProperty(newProperty);
  }

  render () {
    const propertiesCompList = this.props.propertiesList.map((item, index, arr) => {
      console.log('item', item);
      switch (item[1].type) {
        case 'string':
          return <JsonStringType key={ item[0] } typeProperty={ item } deleteProperty={ this.props.deleteProperty } formDataValue={ this.props.formDataObj[item[0]] } setFormData={ this.props.setFormData }></JsonStringType>;
        case 'array':
          return <JsonArrayType key= { item[0] } typeProperty={ item } deleteProperty={ this.props.deleteProperty } setFormData={ this.props.setFormData }></JsonArrayType>
        case 'object':
          return <JsonObjectNestedType key= { item[0] } typeProperty={ item } deleteProperty={ this.props.deleteProperty } setNewProperty={ this.setNewProperty } formData={ this.props.formDataObj[item[0]] ? this.props.formDataObj[item[0]] : {} } setFormData={ this.props.setFormData }></JsonObjectNestedType>;
        default:
          return '';
      }
    });
    return propertiesCompList;
  }
}

export default JsonTypeCompList;
