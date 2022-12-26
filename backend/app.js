const express = require('express');
const cors = require('cors');
const { userApi } = require('./api');


module.exports = async (app) => {

    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
    app.use(express.static(__dirname + '/public'));

    // Api
    userApi(app);
    

    //Error Handling
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || "Something went wrong!";
        return res.status(statusCode).json({
            message,
        });
    });
}