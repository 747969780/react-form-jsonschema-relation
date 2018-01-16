import React from 'react';

// * 样式
import styles from '@less/form-ctrl-controller.less';

// * antd 组件
import {
  Button,
  Form
} from 'antd';

import StringType from '@components/JsonSchemaTypes/StringType';

class FormCtrlCreator extends React.Component {
  state = {
    propertiesList: []
  };

  componentWillReceiveProps (nextProps) {
    console.log('nextProps', nextProps);
    this.setState({
      propertiesList: Object.entries(nextProps.properties)
    });
  }

  componentDidMount () {
  }

  render () {
    const propertiesCompList = this.state.propertiesList.map((item, index, arr) => {
      console.log('item', item);
      switch (item[1].type) {
        case 1:
          return <StringType deleteProperty={ this.props.deleteProperty } key={ item[0] } typeProperty={ item }></StringType>;
        default:
          return '';
      }
    });
    return (
      <Form>
        { propertiesCompList }
      </Form>
    );
  }
}

export default FormCtrlCreator;
