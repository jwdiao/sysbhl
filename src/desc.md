# 按需引入element-ui

1. yarn add babel-plugin-component -D
2. .babelrc和babel.config.js的相同配置不能合并，项目内部已经有了babel的配置文件babel.config.js
    module.exports = {
      presets: ["@vue/app"],
    };
    然后由于要按需引入element-ui，就使用了babel-plugin-component，并且配置了.babelrc文件，如下（当然其中涉及到babel7，大家要安装@babel/preset-env,旧的babel-perset-es2015在babel7已经不支持了）
    yarn add @babel/preset-env --dev
3. 删除另外一份文件（babel.config.js）只保留一个配置文件(.babelrc)。
  ```
  {
    "presets": ["@vue/app", ["@babel/preset-env", { "modules": false }]],
    "plugins": [
      [
        "component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]
    ]
  }
  ```
