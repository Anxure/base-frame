module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-eq-null': 2, // 不允许对null用==或者!=
    'no-var': 2,
    'no-dupe-keys': 2, // 对象中不允许出现重复的键
    'no-empty': 2, // 不允许出现空的代码块
    'no-irregular-whitespace': 2, // 不允许出现不规则的空格
    'no-unused-vars': [2, { 'vars': 'all', 'args': 'after-used' }], // 不允许有声明后未使用的变量或者参数
    'camelcase': [2, { 'properties': 'never' }], // 强制驼峰命名规则
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], // 对象字面量中冒号的前后空格
    'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }], // 构造函数名字首字母要大写
    'quotes': [2, 'single'], // 变量必须使用单引号
    'no-multiple-empty-lines': [2, { 'max': 1 }], // 空格最多不能超过两行
    'no-mixed-spaces-and-tabs': 2, // 禁止空格和 tab 的混合缩进
    'spaced-comment': 2, // 强制在注释中 // 或 /* 使用一致的空格
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }], // vue将标签渲染为原生html标签时，由于这些标签是自闭合的，所以有end标签会报错
    'no-extra-semi': 0,
    'eqeqeq': 2,
    'semi': 0,
    'no-extra-boolean-cast': 0,
    'no-mixed-operators': 0,
    "no-callback-literal": 0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
