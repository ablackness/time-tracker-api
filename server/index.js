const server = require('./app');

const port = process.env.PORT || 8080

server.listen(port, () => console.log('Server is listening on', port));