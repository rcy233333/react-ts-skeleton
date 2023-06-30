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

```js
  rules: {
    '@typescript-eslint/no-var-requires': 'off', // 解决ts文件中的commonjs 规范报错
    'react/react-in-jsx-scope': 'off', // 解决 使用jsx 时必须导入React
    'react/jsx-uses-react': 'off', // 极倔 使用jsx 必须导入React
    'react/prop-types': 'off'  // react 默认使用prop-types 来做props 的类型检查，我们使用ts之后这个就需要关掉，否则会出现 prop-types的报错，与ts的限制重复，关掉就可以了
  }
```

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

### css in js 方案
1. styled-components 库实现 css预处理器一样的样式修改、函数定义、逻辑服用等功能
2. 组件单独抽取样式 并且可以传递数据，数据使用函数的形式传递
3. 样式继承 styled(baseButton) 来继承
4. 主题的样式 可以使用 props.theme.xxx 来使用

### react 动态添加class
1.简单的情况下可以使用 三元运算符
     - <div className={`aaa ${isbbb?'bbb}:''`}></div>
     - 或者使用数组
2.复杂的情况下推荐使用classnames 第三方库来实现
     - <div className={classNames('aaa', { bbb: true })}></div>

### git commit 规范

#### 代码提交风格

通常我们的 git commit 会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw17gaqjj30to0cj3zp.jpg)

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

- Commitizen 是一个帮助我们编写规范 commit message 的工具； 1.安装 Commitizen

```shell
npm install commitizen -D
```

2.安装 cz-conventional-changelog，并且初始化 cz-conventional-changelog：

```shell
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这个命令会帮助我们安装 cz-conventional-changelog：

![image-20210723145249096](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvz2odi4j30ek00zmx2.jpg)

并且在 package.json 中进行配置：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvzftay5j30iu04k74d.jpg)

这个时候我们提交代码需要使用 `npx cz`：

- 第一步是选择 type，本次更新的类型

| Type     | 作用                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| feat     | 新增特性 (feature)                                                                     |
| fix      | 修复 Bug(bug fix)                                                                      |
| docs     | 修改文档 (documentation)                                                               |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc)                        |
| refactor | 代码重构(refactor)                                                                     |
| perf     | 改善性能(A code change that improves performance)                                      |
| test     | 测试(when adding missing tests)                                                        |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）                           |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                                               |
| revert   | 代码回退                                                                               |

- 第二步选择本次修改的范围（作用域）

![image-20210723150147510](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8ca15oj30r600wmx4.jpg)

- 第三步选择提交的信息

![image-20210723150204780](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8mq3zlj60ni01hmx402.jpg)

- 第四步提交详细的描述信息

![image-20210723150223287](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8y05bjj30kt01fjrb.jpg)

- 第五步是否是一次重大的更改

![image-20210723150322122](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw9z5vbij30bm00q744.jpg)

- 第六步是否影响某个 open issue

![image-20210723150407822](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwar8xp1j30fq00ya9x.jpg)

我们也可以在 scripts 中构建一个命令来执行 cz：

![image-20210723150526211](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwc4gtkxj30e207174t.jpg)

### 配置路由

1. 安装 react-router-dom 
2. 使用 ```<Navigate to='/home' />```  // 进行重定向

具体配置看文档[react-router-dom](https://reactrouter.com/en/main)

**多级路由懒加载 使用<Outlet /> 占位的时候也加上<Suspense fallback="loading..."></Suspense>**


### 与TS的结合
1. 函数组件传递props 的时候 children 属性需要自己定义，不再自动添加，类型是ReactNode类型
   import type { ReactNode } from 'react'
**注意: 对于 当组件的输入props是不可变的（immutable）时，建议使用memo 进行性能优化**

2. 使用vscode 创建 组件模版「后续使用快捷键，直接创建类似vue中的 vb」
[生成代码片段](https://snippet-generator.app/)
```tsx
import type { FC, ReactNode } from 'react'
import { memo } from 'react'

interface IProps {
  children?: ReactNode
}
const Template: FC<IProps> = () => {
  return (
    <>
      <div>template</div>
    </>
  )
}
export default memo(Template)
```

### 配置redux redux-toolkit
1. npm i @reduxjs/toolkit react-redux  
     - react-redux:是将我们的react组件和redux联系起来，必须单独安装 「提供了Provider，使用store」
2. 创建store 
3. 通过Provider 引入store
4. 创建modules 进行store 模块化 （使用Slice 片段）

