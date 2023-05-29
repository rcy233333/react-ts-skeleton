### react demo

### 安装 craco 配置内置的 webpack，不用 eject 出来

因为最新的脚手架创建出来的 react-script 版本是 5.x 所以 我们直接安装 npm i @craco/craco 它只支持 4 版本的 react-script 所以我们安装 @alpha 版本

```shell
npm i @craco/craco@alpha -D
```

1. 将我们执行的脚本 命令从 react-scripts 修改为 craco

## 配置 editorconfig、eslint、prettier

1. 配置 editorconfig

```.editorconfig
# https://editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

2. 配置 prettier

- 安装 npm i prettier -D
- 创建.prettierrc 文件
- 创建.prettierignore 忽略文件
  注意：即使项目中安装 prettier，vscode 插件也会读取 .prettierrc 文件；我们安装 prettier 主要是用来配置脚本
  "prettier":"prettier --write ." 「对所有文件进行格式化，可以配置忽略文件(.prettierignore)，忽略格式化,并且保存」

```.prettierrc
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

```.prettierignore
/build/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*

```

3. 配置 eslint

- 安装 eslint npm i eslint -D
- eslint 配置很多 我们使用命令 来配置 - npx eslint --init - 按照我们的需求进行选择
  我们可能会遇到 commonjs 规范的代码报错，需要我们在 eslint 的 env 配置中加上 node:true
  ts 文件中的 commonjs 规范报错我们在 eslint 中的 rules 配置
  "@typescript-eslint/no-var-requires": "off"

**需要把 eslint 和 prettier 代码风格保持一致**
解决 eslint 和 prettier 冲突的问题

1. npm i eslint-plugin-prettier eslint-config-prettier -D
2. 在 eslint 配置中添加

```eslintrc.js
  extends: [
    'plugin:prettier/recommended'
  ],
```

### 配置 css 样式重制

1. npm i normalize.css
2. 在 index.tsx 中 引入

### 配置 git 提交

使用 lint-staged 进行配置
npm i lint-staged yorkie -D

- yorkie 可以在 package.json 中配置 gitHooks:{pre-commit:'lint-staged'}
  在 package.json 文件中添加

```package.json
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "src*/**/*.ts": [
      "prettier --config .prettierrc --write",
      "eslint"
    ],
    "src*/**/*.json": [
      "prettier --config .prettierrc --write",
      "eslint"
    ],
     "src*/**/*.tsx": [
    "prettier --config .prettierrc --write",
    "eslint"
  ],
  }
```
