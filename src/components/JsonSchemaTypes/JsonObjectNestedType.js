import React from 'react';

// * antd 组件
import {
  Form
} from 'antd';

import SchemaCreator from '@components/SchemaCreator';
import ActionButtons from '@components/ActionButtons';

import JsonTypeCompList from '@components/JsonSchemaTypes/JsonTypeCompList';

class JsonObjectType extends React.Component {
  state = {
    showSchemaCreator: false,
    propertiesList: []
  };

  objectTypeProperty = [
    'key',
    'title',
    'description',
    'properties',
    'required',
  ]

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
    if (nextProps.typeProperty[1].properties) {
      this.setState({
        propertiesList: Object.entries(nextProps.typeProperty[1].properties)
      });
    }
  }

  componentDidMount () {
  }

  // * ------------

  setNewProperty = (newProperty) => {
    console.log('newProperty', newProperty);
    // this.props.setNewProperty(newProperty);
  }

  deleteProperty = (keyPath) => {
    this.props.deleteProperty(keyPath);
  }

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

  actionSetKey = () => {
  }

  // * ------------

  render () {
    return (
      <div className="form-spe-border middle-padding">
        <ActionButtons {
          ...this.methodsToProp
        } buttonTypes={
          this.objectTypeProperty
        } currentParentSchemaName={
          this.props.typeProperty[0]
        }></ActionButtons>
        <div className="ant-form ant-form-horizontal">
          <JsonTypeCompList propertiesList={
            this.state.propertiesList
          } deleteProperty={
            this.deleteProperty
          }></JsonTypeCompList>
        </div>
        {
          this.state.showSchemaCreator &&
          <SchemaCreator closeSchemaCreator={ this.closeSchemaCreator } setNewProperty={ this.setNewProperty }></SchemaCreator>
        }
      </div>
    );
  }
}

export default JsonObjectType;
