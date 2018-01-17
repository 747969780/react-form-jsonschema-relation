import React from 'react';

import styles from '@less/action-buttons.less';

// * antd 组件
import {
  Button
} from 'antd';

class ActionButtons extends React.Component {

  state = {
    buttonsIns: []
  };

  // * ------------

  componentDidMount () {
    console.log('props', this.props);
    this.setState({
      buttonsIns: this.props.buttonTypes.map((type) => {
        let key = type + (this.props.currentParentSchemaName ? this.props.currentParentSchemaName : '');
        return <Button key={ `${key}` } type="primary" onClick={
          () => {
            this.actionClick(type);
          }
        }>{ `设置${ type }` }</Button>
      })
    })
  }

  // * ------------

  actionClick = (type) => {
    console.log('type', type);
    switch (type) {
      case 'title':
        break;
      case 'description':
        break;
      case 'properties':
        this.actionAddProperty();
        break;
      case 'definitions':
        break;
      case 'required':
        break;
      default:
        return;
    }
  }

  actionAddProperty = () => {
    console.log('props', this.props);
    this.props.actionAddProperty && this.props.actionAddProperty();
  }

  actionSetTitle = () => {
    this.props.actionSetTitle && this.props.actionSetTitle();
  }

  actionSetDescription = () => {
    this.props.actionSetDescription && this.props.actionSetDescription();
  }

  actionSetDefinitions = () => {
    this.props.actionSetDefinitions && this.props.actionSetDefinitions();
  }

  actionSetRequired = () => {
    this.props.actionSetRequired && this.props.actionSetRequired();
  }

  // * ------------

  render () {
    return (
      <div className={ styles.propertyController }>
        {
          this.state.buttonsIns
        }
      </div>
    )
  }
}

export default ActionButtons;
