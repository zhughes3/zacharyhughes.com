'use strict';

const uuidv1 = require('uuid/v1');
const fs = require('fs');
const Path = require('path');
const logger = require('../utils/logger');

function uploader(file, opts) {
    if (!file) {
        throw new Error('no file(s)');
    }

    return _fileHandler(file, opts);
}

function _fileHandler(file, opts) {
    if (!file) {
        throw new Error('no file');
    }

    const bufferData = file._data;
    const originalName = file.hapi.filename;
    const extension = Path.extname(originalName);
    const filename = uuidv1();
    const path = `${opts.dest}${filename}${extension}`;

    return new Promise((resolve, reject) => {
        fs.writeFile(path, bufferData, err => {
            if (err) { reject(err) };

            resolve({
                originalname: file.hapi.filename,
                filename: `${filename}${extension}`,
                mimetype: file.hapi.headers['content-type'],
                destination: `${opts.dest}`,
                path: path,
                size: fs.statSync(path).size
            });
        });
    });
}

module.exports = uploader;