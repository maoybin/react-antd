const {override,addLessLoader,fixBabelImports,addDecoratorsLegacy} = require('customize-cra')

const modifyVars = require('./lessVars')

module.exports = override(

    fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
         }),

    addLessLoader({
        javascriptEnabled: true,
        modifyVars,
    }),
    
    addDecoratorsLegacy()
)