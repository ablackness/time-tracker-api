'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = handleResponse;
function handleResponse(values, req, res) {
    if (!values) {
        res.status(404).send('No results found.');
    } else {
        res.status(httpStatus(req.method)).json(formatResponse(values, req));
    }
}

function formatResponse(values, req) {
    var results;
    if (Array.isArray(values)) {
        results = values.map(function (v) {
            return v.dataValues;
        });
    } else {
        if (req.method === 'POST') {
            results = values;
        } else {
            results = values.dataValues;
        }
    }

    if (req.headers.origin) {
        return results;
    } else {
        return { value: results };
    }
}

function httpStatus(method) {
    switch (method) {
        case 'PUT':
            return 204;
            break;

        case 'POST':
            return 201;
            break;

        default:
            return 200;
    }
}