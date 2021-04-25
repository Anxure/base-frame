/*
 * @Author: ykx
 * @Date: 2021-04-23 16:30:49
 * @LastEditTime: 2021-04-23 17:25:35
 * @LastEditors: your name
 * @Description:配置babel & 按需加载ant-desigin-vue
 * @FilePath: \zdww-base-frame\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }
    ]
  ]
}
