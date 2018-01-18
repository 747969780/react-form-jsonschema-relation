import React from 'react';

// * antd 组件
import {
  Form,
  Button
} from 'antd';

import SchemaCreator from '@components/SchemaCreator';
import ActionButtons from '@components/ActionButtons';

import JsonTypeCompList from '@components/JsonSchemaTypes/JsonTypeCompList';

// * 工具库
import { cloneDeep } from 'lodash';

class JsonObjectType extends React.Component {
  state = {
    foldingStatus: false,
    showSchemaCreator: false,
    borderColor: '',
    propertiesList: [],
    objectProp: []
  };

  objectTypeProperty = [
    'key',
    'title',
    'type',
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
    let newState = {};
    if (nextProps.typeProperty[1].properties) {
      newState.propertiesList = Object.entries(nextProps.typeProperty[1].properties);
    }
    this.setState(newState);
  }

  componentDidMount () {
    let newState = {
      borderColor: this.getRandomColor()
    };
    console.log('nested object typeProperty[1]', this.props.typeProperty[1]);
    if (this.props.typeProperty[1].properties) {
      newState.propertiesList = Object.entries(this.props.typeProperty[1].properties);
    }
    this.setState(newState);
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
    console.log('newProperty', newProperty);
    let np = cloneDeep(this.props.typeProperty[1]);
    np.properties = {
      ...np.properties,
      ...newProperty
    };
    console.log('np', np);
    this.props.setNewProperty({
      [this.props.typeProperty[0]]: np
    });
  }

  deleteSelf = (keyPath = '') => {
    if (!keyPath) {
      return;
    }
    console.log('deleteself keyPath', keyPath);
    let np = cloneDeep(this.props.typeProperty[1]);
    delete np.properties[keyPath];
    console.log('np', np);
    this.props.setNewProperty({
      [this.props.typeProperty[0]]: np
    });
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

  getRandomColor () {
    let rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16);
    if (rand.length === 6) {
      return rand;
    } else {
      return this.getRandomColor();
    }
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

  moveSelfUp = () => {

  }

  moveSelfDown = () => {

  }

  // * ------------

  render () {
    // * 属性的信息列表
    console.log('typeProperty[1]', this.props.typeProperty[1]);
    const propertiesListComp = ['key'].concat(Object.keys(this.props.typeProperty[1])).map((name) => {
      if (this.objectTypeProperty.indexOf(name) === -1) {
        return '';
      }
      let nameValue = (this.props.typeProperty[1])[name] !== undefined ? (this.props.typeProperty[1])[name] : this.props.typeProperty[0];
      return <p className="init-p" key={ `${ name }` }>{ `${ name }: ${ nameValue }`  }</p>
    });

    return (
      <div className="form-spe-border middle-padding" style={ {
        borderColor: '#' + this.state.borderColor
      } }>
        <ActionButtons {
          ...this.methodsToProp
        } buttonTypes={
          this.objectTypeProperty
        } currentParentSchemaName={
          this.props.typeProperty[0]
        }></ActionButtons>
        <div className="formItemContentLayer">
          <div className="formItemLayerContentBtns">
            <Button type="danger" icon="close" onClick={
              () => {
                this.props.deleteProperty(this.props.typeProperty[0]);
              }
            }/>
            <Button type="primary" icon={ this.state.foldingStatus ? 'arrows-alt' : 'shrink' } onClick={ this.setFoldingStatus }/>
            {/* <Button type="primary" icon="arrow-up" onClick={ this.moveSelfUp }/>
            <Button type="primary" icon="arrow-down" onClick={ this.moveSelfDown }/> */}
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
              this.deleteSelf
            } setNewProperty={
              this.setNewProperty
            } formDataObj={
              this.props.formData
            } setFormData={
              this.setFormData
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
