const http= require('http');
const requestHandler= require('./chat');

const server=http.createServer(requestHandler)


const PORT = 3011;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});