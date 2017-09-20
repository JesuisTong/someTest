const fs = require('fs')
const path = require('path')

module.exports = function rm(pathname) {
    if (!fs.existsSync(pathname)) {
        return
    }
    if (fs.statSync(pathname).isDirectory()) {
        fs.readdirSync(pathname).forEach((item) => {
            rm(path.resolve(pathname, item))
        })
        fs.rmdirSync(pathname)
    } else {
        fs.unlinkSync(pathname)
    }
}
