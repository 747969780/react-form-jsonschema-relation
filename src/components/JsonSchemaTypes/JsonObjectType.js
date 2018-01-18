import React from 'react';

// * 样式
// import styles from '@less/JsonSchemaTypes/json-object-type.less';

// * antd 组件
import {
  Form,
  Button
} from 'antd';

import SchemaCreator from '@components/SchemaCreator';
import ActionButtons from '@components/ActionButtons';

// import JsonStringType from '@components/JsonSchemaTypes/JsonStringType';
// import JsonArrayType from '@components/JsonSchemaTypes/JsonArrayType';

import JsonTypeCompList from '@components/JsonSchemaTypes/JsonTypeCompList';

class JsonObjectType extends React.Component {
  state = {
    foldingStatus: false,
    showSchemaCreator: false,
    propertiesList: [],
    objectProp: []
  };

  objectTypeProperty = [
    'title',
    'description',
    'properties',
    'required',
    'type',
    'definitions'
  ]

  objectTypePropertySpec = [
    'key',
    'definitions',
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
    if (nextProps.schema.properties) {
      this.setState({
        propertiesList: Object.entries(nextProps.schema.properties),
        objectProp: Object.keys(nextProps.schema)
      });
    }
  }

  componentDidMount () {
    if (this.props.schema.properties) {
      this.setState({
        propertiesList: Object.entries(this.props.schema.properties),
        objectProp: Object.keys(this.props.schema)
      });
    }
  }

  // * ------------

  setFoldingStatus = () => {
    this.setState((prevState, props) => {
      return {
        foldingStatus: !prevState.foldingStatus
      };
    });
  }

  setNewProperty = (newProperty) => {
    this.props.setNewProperty(newProperty);
  }

  deleteProperty = (keyPath) => {
    this.props.deleteProperty(keyPath);
  }

  closeSchemaCreator = () => {
    this.setState({
      showSchemaCreator: false
    });
  }

  setFormData = (formData) => {
    let tmpFormData = {
      ...this.props.formDataObj,
      ...formData
    };
    this.props.setFormData({
      [this.props.typeProperty[0]]: tmpFormData
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
    // * 属性的信息列表
    const propertiesListComp = this.state.objectProp.map((name) => {
      if (this.objectTypeProperty.indexOf(name) === -1) {
        return '';
      }
      let nameValue = this.props.schema[name];
      return <p className="init-p" key={ `${ name }` }>{ `${ name }: ${ nameValue }`  }</p>
    });

    return (
      <div className="form-spe-border middle-padding">
        <ActionButtons {
          ...this.methodsToProp
        } buttonTypes={
          this.objectTypeProperty
        }></ActionButtons>
        <div className="formItemContentLayer">
          <div className="formItemLayerContentBtns">
            <Button type="primary" icon={ this.state.foldingStatus ? 'arrows-alt' : 'shrink' } onClick={ this.setFoldingStatus }/>
          </div>
          <div className="formItemLayerContentGrow">
            { propertiesListComp }
          </div>
        </div>
        { !this.state.foldingStatus &&
          <div className="ant-form ant-form-horizontal">
            <JsonTypeCompList propertiesList={
              this.state.propertiesList
            } deleteProperty={
              this.deleteProperty
            } setNewProperty={
              this.setNewProperty
            } formDataObj={
              this.props.formData
            } setFormData={
              this.props.setFormData
            }></JsonTypeCompList>
          </div>
        }
        {
          this.state.showSchemaCreator &&
          <SchemaCreator closeSchemaCreator={ this.closeSchemaCreator } setNewProperty={ this.setNewProperty }></SchemaCreator>
        }
      </div>
    );
  }
}

export default JsonObjectType;
