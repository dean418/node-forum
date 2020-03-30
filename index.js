const loaders = require('./loaders/init');
const express = require('express');

require('dotenv').config();

const startServer = async () => {
    const app = express();

    await loaders.init(app);

    app.listen(process.env.PORT, (err) => {
        console.log(`server listening on port: ${process.env.PORT}`);
    });
}

startServer();