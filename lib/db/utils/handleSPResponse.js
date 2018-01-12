'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = handleSPResponse;
function handleSPResponse(values, req, res) {
    if (req.headers.origin) {
        values ? res.status(200).json(values) : res.status(404).json({ err: 'No values returned' });
    } else {
        values ? res.status(200).json({ value: values }) : res.status(404).json({ values: { err: 'No values returned' } });
    }
}