const express = require('express');
const moment = require('moment');
const server = express();

/**
 * config
 */
const PORT = 3000;

const tableRouter = require('./Router/GroupTableRouter.js');
const shopEnteringRouter = require('./Router/ShopEnteringTableRouter.js');

/**
 * apply routers
 */
server.use(tableRouter);
server.use(shopEnteringRouter);

server.listen(PORT, () => {
    console.log(`listening ${PORT}`)
});
