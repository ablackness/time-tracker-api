"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = handleBooleanResponse;
function handleBooleanResponse(values, req, res) {
    if (req.headers.origin) {
        values ? res.status(200).json(1) : res.status(404).json(0);
    } else {
        values ? res.status(200).json({ value: 1 }) : res.status(404).json({ value: 0 });
    }
}