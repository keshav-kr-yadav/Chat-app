const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
module.exports = (id) => {
    const token = jwt.sign({ _id: id }, JWT_SECRET);
    return token;
}