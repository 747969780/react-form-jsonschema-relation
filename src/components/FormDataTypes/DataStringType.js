import React from 'react';

// * 样式
import styles from '@less/FormDataTypes/data-string-type.less';

// * antd 组件
import {
  Button,
  Form,
  Input
} from 'antd';

const FormItem = Form.Item;

class StringType extends React.Component {

  state = {

  }

  componentDidMount = () => {

  }

  // * ------------

  deleteSelf = () => {
    this.props.deleteProperty(this.props.typeProperty[0]);
  }

  // * ------------

  render () {
    return (
      <FormItem label={ this.props.typeProperty[1].title }>
        <div className="formItemContentLayer">
          <Input></Input>
          <Button type="danger" icon="close" onClick={ this.deleteSelf }/>
        </div>
      </FormItem>
    );
  }
}

export default StringType;
