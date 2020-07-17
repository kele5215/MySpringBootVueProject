module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        //1 eui组件
        libraryName: 'element-ui',
        // 2 eui 样式
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
