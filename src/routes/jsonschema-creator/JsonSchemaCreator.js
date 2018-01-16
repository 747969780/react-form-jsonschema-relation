import React from 'react';

// * 页面样式
import styles from './JsonSchemaCreator.less';

import SetForm from '@components/SetForm';

// * 表单创建-组件
import FormCtrlCreator from '@components/FormCtrl/FormCtrlCreator';

// * antd tabs组件
import {
  Button,
  Tabs,
  Form,
  Select,
  message
} from 'antd';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

const types = [{
  value: 1,
  typeName: 'string'
}, {
  value: 2,
  typeName: 'array'
}, {
  value: 3,
  typeName: 'object'
}];

class JsonSchemaCreator extends React.Component {

  /**
   * @JSONSchema: schema的总合集
   * @UISchema: uischema的总合集
   * @formDataSchema: formData的总合集
   */
  state = {
    showSetForm: false,
    JSONSchema: {
      definitions: {},
      type: 'object',
      title: '',
      description: '',
      required: [],
      properties: {}
    }
  }

  tabsChange = () => {
    console.log('tabs change');
  }

  componentDidMount() {
  }

  // * ------------

  messageSuccess (option = {
    message: '成功',
    duration: 3
  }) {
    message.success(option.message, option.duration);
  }

  messageError (option = {
    message: '失败',
    duration: 3
  }) {
    message.error(option.message, option.duration);
  }

  closeSetForm = () => {
    this.setState({
      showSetForm: false
    });
  }

  setNewProperty = (newProperty) => {
    console.log('newProperty', newProperty);
    let tmpList = Object.keys(newProperty);
    if (this.state.JSONSchema.properties[tmpList[0]]) {
      this.messageError({
        message: '已经存在相同的key值，请重新创建',
        duration: 3
      });
      return;
    }
    let tmpProperties = Object.assign(this.state.JSONSchema.properties, {
      ...newProperty
    });
    let tmpJsonSchema = {
      ...this.state.JSONSchema,
      properties: tmpProperties
    }
    this.setState((prevState, props) => {
      return {
        JSONSchema: tmpJsonSchema
      }
    });
    this.messageSuccess({
      message: '添加成功',
      duration: 3
    });
  }

  deleteProperty = (keyPath) => {
    console.log('keyPath', keyPath);
    let tmpProperties = {
      ...this.state.JSONSchema.properties
    };
    delete tmpProperties[keyPath];
    let tmpJsonSchema = {
      ...this.state.JSONSchema,
      properties: tmpProperties
    }
    this.setState({
      JSONSchema: tmpJsonSchema
    });
    this.messageSuccess({
      message: '删除成功',
      duration: 3
    });
  }

  // * ------------

  actionAddProperty = () => {
    this.setState({
      showSetForm: true
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

  // * 渲染
  render () {
    return (
      <div className={ styles.mainWrapper }>
        <div className={ styles.creator }>
          <Tabs defaultActiveKey="1" onChange={this.tabsChange}>
            <TabPane tab="Schema" key="1">
              <div className={ styles.tabPaneInnerContainer }>
                <div className={ styles.propertyController }>
                  <Button type="primary" onClick={this.actionAddProperty}>添加property</Button>
                  <Button type="primary" onClick={this.actionSetRequired}>设置required</Button>
                  <Button type="primary" onClick={this.actionSetTitle}>设置title</Button>
                  <Button type="primary" onClick={this.actionSetDescription}>设置description</Button>
                  <Button type="primary" onClick={this.actionSetDefinitions}>设置definitions</Button>
                </div>
                <FormCtrlCreator deleteProperty={ this.deleteProperty } properties={
                  this.state.JSONSchema.properties
                }></FormCtrlCreator>
              </div>
            </TabPane>
            <TabPane tab="UISchema" key="2"></TabPane>
            <TabPane tab="FormData" key="3"></TabPane>
          </Tabs>
        </div>
        <div className={ styles.previewer }></div>
        {
          this.state.showSetForm &&
          <SetForm closeSetForm={ this.closeSetForm } setNewProperty={ this.setNewProperty }></SetForm>
        }
      </div>
    );
  }
}

export default JsonSchemaCreator;
