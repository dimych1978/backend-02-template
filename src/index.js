const http = require('http');
const getUsers = require('./modules/getUsers');

const address = 'http://127.0.0.1';
const port = 3003;
const server = http.createServer((request, response) => {
  const url = new URL(request.url, address);
  const isHello = url.searchParams.has('hello');
  const hello = url.searchParams.get('hello');
  const users = url.searchParams.has('users');

  if (isHello) {
    if (hello === '') {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
      response.header = 'Content-Type: text/plain';
      response.write('Enter a name');
      response.end();
      return;
    }
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.header = 'Content-Type: text/plain';
    response.write(`Hello, ${hello}`);
    response.end();
  }
  if (users) {
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.header = 'Content-Type: application/json';
    response.write(getUsers());
    response.end();
    return;
  }
  if (url.searchParams.size > 0) {
    response.statusCode = 500;
    response.statusMessage = '';
    response.header = 'Content-Type: text/plain';
    response.end('Server error (empty answer)');
    return;
  }
  response.statusCode = 200;
  response.statusMessage = 'OK';
  response.header = 'Content-Type: text/plain';
  response.write('Hello, world');
  response.end();
  return;
});

server.listen(port, () => {
  console.log(`Сервер запущен на адресе ${address}:${port}, (порт ${[port]})`);
});
