# form2jsonschema(temporary)

> ## 一个简单的 [React](http://facebook.github.io/react/) 组件，利用Form表单的形式来构造[JSON schema](http://jsonschema.net/)，UI使用 [Ant Design](https://ant.design/index-cn)。

## TODOS(temporary)

### Schema(temporary)

- 最外层是一个唯一的object
  - 可以建立properties
  - 设置required
  - 设置title
  - 设置description
  - 设置definitions
- 暂时可提供的property为string和array类型
  - string类型
    - 设置title
    - 设置description
    - 输入数据
    - 上下移动
  - array类型
    - 设置title
    - 设置description
    - 可选的数组成员（additional,items为对象）
      - 输入数据
      - 上下移动
    - 固定成员（items为数组）
      - 输入数据
      - 上下移动
    - 设置items，一个对象，成员都按照对象内的描述来创建
      - items可设置一下key
        - default-默认值
        - enum-枚举
          - 枚举时可设置uniqueItems(成员是否唯一)

### Update Log

#### 2018-01-18

- 完善添加properties功能（包括嵌套对象内的添加）
- 完善删除property功能（包括嵌套对象内的删除）
- 增加object类型的property下的折叠功能
- 调整property区域的样式
- 引入lodash
