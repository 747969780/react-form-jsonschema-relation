import React from 'react';

// * 样式

// * antd 组件
import {
  Button,
  Form
} from 'antd';

const FormItem = Form.Item;

class JsonStringType extends React.Component {

  state = {
    propertiesList: []
  };

  componentDidMount () {
    this.setState({
      propertiesList: Object.keys(this.props.typeProperty[1])
    });
    console.log('propertiesList', this.state.propertiesList);
  }

  // * ------------

  deleteSelf = () => {
    this.props.deleteProperty(this.props.typeProperty[0]);
  }

  // * ------------

  render () {
    const propertiesListComp = this.state.propertiesList.map((name) => {
      return <p className="init-p" key={ `${name}` }>{ `${ name }: ${ (this.props.typeProperty[1])[name] }` }</p>
    });
    return (
      <FormItem>
        <div className="formItemContentLayer">
          <Button type="danger" icon="close" onClick={ this.deleteSelf }/>
          <div className="formItemLayerContentGrow">
            { propertiesListComp }
          </div>
        </div>
      </FormItem>
    );
  }

}

export default JsonStringType;
