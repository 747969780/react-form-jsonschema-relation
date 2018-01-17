import React from 'react';

import styles from '@less/action-buttons.less';

// * antd 组件
import {
  Button
} from 'antd';

class ActionButtons extends React.Component {

  state = {

  };

  // * ------------

  componentDidMount () {
    console.log('props', this.props);
  }

  // * ------------

  actionAddProperty = () => {
    console.log('props', this.props);
    this.props.actionAddProperty();
  }

  actionSetRequired = () => {
    this.props.actionSetRequired();
  }

  actionSetTitle = () => {
    this.props.actionSetTitle();
  }

  actionSetDescription = () => {
    this.props.actionSetDescription();
  }

  actionSetDefinitions = () => {
    this.props.actionSetDefinitions();
  }

  // * ------------

  render () {
    return (
      <div className={ styles.propertyController }>
        <Button type="primary" onClick={this.actionSetTitle}>设置title</Button>
        <Button type="primary" onClick={this.actionSetDescription}>设置description</Button>
        <Button type="primary" onClick={this.actionSetDefinitions}>设置definitions</Button>
        <Button type="primary" onClick={this.actionAddProperty}>添加property</Button>
        <Button type="primary" onClick={this.actionSetRequired}>设置required</Button>
      </div>
    )
  }
}

export default ActionButtons;
