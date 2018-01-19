import React from 'react';

// * 页面样式
import styles from './JsonSchemaCreator.less';

// * 表单创建-组件
import JsonObjectType from '@components/JsonSchemaTypes/JsonObjectType';

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
    showSchemaCreator: false,
    JSONSchema: {
      definitions: {},
      type: 'object',
      title: 'outer-object-title',
      description: 'outer-object-desc',
      required: [],
      properties: {}
    },
    UISchema: {
    },
    FormData: {

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

  closeSchemaCreator = () => {
    this.setState({
      showSchemaCreator: false
    });
  }

  setNewProperty = (newProperty) => {
    console.log('newProperty', newProperty);
    // let tmpList = Object.keys(newProperty);
    // if (this.state.JSONSchema.properties[tmpList[0]]) {
      // this.messageError({
      //   message: '已经存在相同的key值，请重新创建',
      //   duration: 3
      // });
      // return;
    // }
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
    // this.setFormData(this.state.JSONSchema.properties);
  }

  setNewPropertyNested = (newProperty) => {

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

  setFormData = (formData) => {
    this.setState((prevState, props) => {
      return {
        FormData: {
          ...prevState.FormData,
          ...formData
        }
      };
    });
  }

  // setFormData = (properties) => {
    // let tmpFormData = {};
    // let tmpPropertiesEntries = Object.entries(properties);
    // for (let itemList of tmpPropertiesEntries) {
    //   if (itemList[1].type === 'string') {
    //     tmpFormData[itemList[0]] === undefined && (tmpFormData[itemList[0]] = '');
    //   } else if (itemList[1].type === 'object' && itemList[1].properties) {
    //     let resData = this.setFormDataNested({
    //       key: itemList[0],
    //       properties: itemList[1].properties
    //     });
    //     tmpFormData[resData.key] = resData.formData;
    //   }
    // }
    // this.setState({
    //   FormData: tmpFormData
    // });
  // }

  // setFormDataNested = (param) => {
  //   let tmpKey = param.key;
  //   let tmpFormData = {};
  //   let tmpPropertiesEntries = Object.entries(param.properties);
  //   for (let itemList of tmpPropertiesEntries) {
  //     if (itemList[1].type === 'string') {
  //       tmpFormData[itemList[0]] = '';
  //     } else if (itemList[1].type === 'object' && itemList[1].properties) {
  //       this.setFormDataNested(itemList[1].properties);
  //     }
  //   }
  //   return {
  //     key: tmpKey,
  //     formData: tmpFormData
  //   };
  // }

  // * ------------



  // * ------------

  // * 渲染
  render () {
    return (
      <div className={ styles.mainWrapper } id="main-wrapper">
        <div className={ styles.creator }>
          <Tabs defaultActiveKey="1" onChange={this.tabsChange}>
            <TabPane tab="Schema" key="1">
              <div className={ styles.tabPaneInnerContainer }>
                <JsonObjectType
                  deleteProperty={
                  this.deleteProperty
                } schema={
                  this.state.JSONSchema
                } setNewProperty={
                  this.setNewProperty
                } formData={
                  this.state.FormData
                } outerObject={
                  true
                } setFormData={
                  this.setFormData
                }></JsonObjectType>
              </div>
            </TabPane>
            <TabPane tab="UISchema" key="2"></TabPane>
            <TabPane tab="FormData" key="3"></TabPane>
          </Tabs>
        </div>
        <div className={ styles.previewer }></div>
      </div>
    );
  }
}

export default JsonSchemaCreator;
