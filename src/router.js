import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// * 中文化
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
// * 主页
import IndexPage from './routes/index-page/IndexPage';
// * 创建jsonschema-form
import JsonSchemaCreator from './routes/jsonschema-creator/JsonSchemaCreator';

function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/create-jsonschema" exact component={ JsonSchemaCreator }></Route>
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
