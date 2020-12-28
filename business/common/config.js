// uEnvDev
if (process.env.NODE_ENV === 'development') {
    exports.baseUrl = 'http://47.96.37.228:3001'
}
// uEnvProd
if (process.env.NODE_ENV === 'production') {
    exports.baseUrl = 'http://47.96.37.228:3001'
}