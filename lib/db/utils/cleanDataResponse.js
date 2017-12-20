'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cleanDataResponse;
function cleanDataResponse(response, req) {
    var results;
    if (Array.isArray(response)) {
        results = response.map(function (v) {
            return v.dataValues;
        });
    } else {
        results = response.dataValues;
    }

    if (req.headers.origin.toUpperCase() === 'WEB') {
        return results;
    } else {
        return { value: results };
    }
}