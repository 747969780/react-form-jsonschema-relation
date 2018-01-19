import React from 'react';

// * 样式

// * antd 组件
import {
  Button,
  Form,
  Input
} from 'antd';

import ActionButtons from '@components/ActionButtons';

const FormItem = Form.Item;

class JsonStringType extends React.Component {

  state = {
    borderColor: '',
    propertiesList: []
  };

  stringTypeProperty = [
    'key',
    'type',
    'title',
    'description'
  ]

  constructor () {
    super();
    this.methodsToProp = {
      actionSetTitle: this.actionSetTitle,
      actionSetDescription: this.actionSetDescription,
      actionSetKey: this.actionSetKey
    }
  }

  componentDidMount () {
    this.setState({
      propertiesList: ['key'].concat(Object.keys(this.props.typeProperty[1])),
      borderColor: this.getRandomColor()
    });
    console.log('propertiesList', this.state.propertiesList);
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


  actionSetTitle = () => {
    console.log('json-string-type actionSetTitle');
  }

  actionSetDescription = () => {
    console.log('json-string-type actionSetDescription');
  }

  actionSetKey = () => {
    console.log('json-string-type actionSetKey');
  }

  // * ------------

  formDataValueInput = (event) => {
    let value = event.target.value;
    console.log('formDataValueInput value:', value);
    this.props.setFormData({
      [this.props.typeProperty[0]]: value
    });
  }

  deleteSelf = () => {
    this.props.deleteProperty(this.props.typeProperty[0]);
  }

  moveSelfUp = () => {

  }

  moveSelfDown = () => {

  }

  // * ------------

  render () {
    // * 属性的信息列表
    const propertiesListComp = this.state.propertiesList.map((name) => {
      if (this.stringTypeProperty.indexOf(name) === -1) {
        return '';
      }
      let nameValue = (this.props.typeProperty[1])[name] !== undefined ? (this.props.typeProperty[1])[name] : this.props.typeProperty[0];
      return <p className="init-p" key={ `${ name }` }>{ `${ name }: ${ nameValue }`  }</p>
    });
    return (
      <FormItem className="form-spe-border middle-padding" style={ {
        borderColor: '#' + this.state.borderColor
      } }>
        <ActionButtons {
          ...this.methodsToProp
        } buttonTypes={
          this.stringTypeProperty
        }></ActionButtons>
        <div className="formItemContentLayer">
          <div className="formItemLayerContentBtns">
            <Button type="danger" icon="close" onClick={ this.deleteSelf }/>
            {/* <Button type="primary" icon="arrow-up" onClick={ this.moveSelfUp }/>
            <Button type="primary" icon="arrow-down" onClick={ this.moveSelfDown }/> */}
          </div>
          <div className="formItemLayerContentGrow">
            { propertiesListComp }
            <Input defaultValue={ this.props.formDataValue } onInput={ this.formDataValueInput }></Input>
          </div>
        </div>
      </FormItem>
    );
  }

}

export default JsonStringType;
