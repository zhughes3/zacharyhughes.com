'use strict';

const Inert = require('inert');
const Vision = require('vision');
const HapiAuthBasic = require('hapi-auth-basic');

let plugins = [];
plugins = plugins.concat([
    Inert,
    Vision,
    HapiAuthBasic
]);

module.exports = plugins;
