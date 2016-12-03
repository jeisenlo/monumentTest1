'use strict';

const monument = require('monument')
    , defaultPort = 3000
    , http2 = require('http2')
    , fs = require('fs');


require('dotenv').config();
require('./data/team');


monument.server({
    routePath: './routes'
    , templatePath: './templates'
    , publicPath: './public'
    , port: process.env.PORT || defaultPort
    , security: {
        contentSecurity: false
    }

    , server: http2
    , serverOptions: {
        key: fs.readFileSync('./server.key')
        , cert: fs.readFileSync('./server.crt')
    }
});