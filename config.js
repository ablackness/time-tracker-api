// process.env.DB_NAME, 
// process.env.DB_USER, 
// process.env.DB_PASSWORD, {
//     host: process.env.DB_SERVER,
const prodFlag = false;
var DB_CONFIG = {};

if (prodFlag) {
    DB_CONFIG = {
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_SERVER: process.env.DB_SERVER
    }
} else {
    DB_CONFIG = {
        DB_NAME: 'TimeTracker',
        DB_USER: 'ttAdmin',
        DB_PASSWORD: 'MLPzaq!@#098',
        DB_SERVER: '184.168.194.78'
    }
}
//user: ttDev
// PW: kP16jYX5Ia7S
//cac.matteblackdesigns.com
module.exports = DB_CONFIG;