import React from 'react';

// * 样式
import styles from '@less/set-form.less';

// * antd 组件
import {
  Form,
  Select,
  Button,
  Input
} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

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

class SetForm extends React.Component {
  state = {
    newProperty: {
      type: '',
      key: '',
      title: '',
      description: '',
      required: ''
    }
  };

  componentDidMount() {

  }

  // * ------------

  keyInput = (event) => {
    let newValue = event.target.value;
    this.setState((prevState, props) => {
      // console.log('oldState', prevState);
      return {
        newProperty: Object.assign(prevState.newProperty, {
          key: newValue
        })
      }
    });
  }

  titleInput = (event) => {
    let newValue = event.target.value;
    this.setState((prevState, props) => {
      // console.log('oldState', prevState);
      return {
        newProperty: Object.assign(prevState.newProperty, {
          title: newValue
        })
      }
    });
  }

  typeChange = (value) => {
    this.setState((prevState, props) => {
      // console.log('oldState', prevState);
      return {
        newProperty: Object.assign(prevState.newProperty, {
          type: value
        })
      }
    });
  }

  descriptionInput = (event) => {
    let newValue = event.target.value;
    this.setState((prevState, props) => {
      // console.log('oldState', prevState);
      return {
        newProperty: Object.assign(prevState.newProperty, {
          description: newValue
        })
      }
    });
  }

  // * ------------

  resetFormValue = () => {
    this.setState({
      newProperty: {
        type: '',
        key: '',
        title: '',
        description: '',
        required: ''
      }
    })
  }

  confirmNewPropery = () => {
    let newProperty = {
      [this.state.newProperty.key]: {
        ...this.state.newProperty
      }
    }
    delete newProperty[this.state.newProperty.key].key;
    this.resetFormValue();
    this.props.closeSetForm();
    this.props.setNewProperty(newProperty);
  }

  // * ------------

  render () {
    const selectOptions = types.map((ele, index, arr) => {
      return <Option key={ ele.value } value={ ele.value }>{ ele.typeName }</Option>;
    });
    return (
      <div className={ styles.setformContainer }>
        <Form className={ styles.formIns }>
          <FormItem label="key">
            <Input value={ this.state.newProperty.key } onInput={ this.keyInput }></Input>
          </FormItem>
          <FormItem label="type">
            <Select value={ this.state.newProperty.type } onChange={this.typeChange}>
              { selectOptions }
            </Select>
          </FormItem>
          <FormItem label="title">
            <Input value={ this.state.newProperty.title } onInput={ this.titleInput }></Input>
          </FormItem>
          <FormItem label="description">
            <Input value={ this.state.newProperty.description } onInput={ this.descriptionInput }></Input>
          </FormItem>
          { this.state.newProperty.type === 'object' &&
            <FormItem label="required">
              <TextArea></TextArea>
            </FormItem>
          }
          <FormItem>
            <Button className={ styles.btnMR } onClick={ this.props.closeSetForm }>取消</Button>
            <Button className={ styles.btnMR } type="danger" onClick={ this.resetFormValue }>重置</Button>
            <Button className={ styles.btnMR } type="primary" onClick={ this.confirmNewPropery }>确认</Button>
          </FormItem>
        </Form>
        <div className={ styles.closeBtn }>
          <Button shape="circle" icon="close" onClick={ this.props.closeSetForm }/>
        </div>
      </div>
    );
  }
}

export default SetForm;
