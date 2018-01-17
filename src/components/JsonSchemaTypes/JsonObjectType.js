import React from 'react';

// * 样式
import styles from '@less/JsonSchemaTypes/json-object-type.less';

// * antd 组件
import {
  Form
} from 'antd';

import SchemaCreator from '@components/SchemaCreator';
import ActionButtons from '@components/ActionButtons';
import JsonStringType from '@components/JsonSchemaTypes/JsonStringType'
import DataStringType from '@components/FormDataTypes/DataStringType';

class JsonObjectType extends React.Component {
  state = {
    showSchemaCreator: false,
    propertiesList: []
  };

  constructor () {
    super();
    this.methodsToProp = {
      actionAddProperty: this.actionAddProperty,
      actionSetRequired: this.actionSetRequired,
      actionSetTitle: this.actionSetTitle,
      actionSetDescription: this.actionSetDescription,
      actionSetDefinitions: this.actionSetDefinitions,
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('nextProps', nextProps);
    this.setState({
      propertiesList: Object.entries(nextProps.properties)
    });
  }

  componentDidMount () {
  }

  // * ------------

  closeSchemaCreator = () => {
    this.setState({
      showSchemaCreator: false
    });
  }

  // * ------------

  actionAddProperty = () => {
    this.setState({
      showSchemaCreator: true
    });
  }

  actionSetRequired = () => {
  }

  actionSetTitle = () => {
  }

  actionSetDescription = () => {
  }

  actionSetDefinitions = () => {
  }

  // * ------------

  render () {
    const propertiesCompList = this.state.propertiesList.map((item, index, arr) => {
      console.log('item', item);
      switch (item[1].type) {
        case 'string':
          return <JsonStringType deleteProperty={ this.props.deleteProperty } key={ item[0] } typeProperty={ item }></JsonStringType>;
        default:
          return '';
      }
    });
    return (
      <div className="form-spe-border middle-padding">
        <ActionButtons {
          ...this.methodsToProp
        }></ActionButtons>
        <Form>
          { propertiesCompList }
        </Form>
        {
          this.state.showSchemaCreator &&
          <SchemaCreator closeSchemaCreator={ this.closeSchemaCreator } setNewProperty={ this.props.setNewProperty }></SchemaCreator>
        }
      </div>
    );
  }
}

export default JsonObjectType;
