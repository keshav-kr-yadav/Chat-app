const express = require('express');
const { PORT } = require('./config');
const expressApp = require('./app');
const DBConnection = require('./database/DBConnection');
const app = express();
const StartServer = async() => {
    const app = express();
    
    await DBConnection();
    await expressApp(app)

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();