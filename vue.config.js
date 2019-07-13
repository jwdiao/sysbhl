module.exports = {
  // // "build": "vue-cli-service build"
    // baseUrl从Vue CLI3.3起弃用，改为pubilcPath。部署应用包时的基本URL。默认'/'
    baseUrl: process.env.NODE_ENV === 'production' ? '/sanysbhlreport/' : '/sanysbhlreporttest/',
    // 生产环境构建文件的目录
    outputDir: process.env.NODE_ENV === 'production' ? 'sanysbhlreport' : 'sanysbhlreporttest',
    devServer: {

    }
}
