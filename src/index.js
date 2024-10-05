const http = require('http');
const getUsers = require('./modules/getUsers');

const address = 'http://127.0.0.1';
const port = 3003;
const server = http.createServer((request, response) => {
  const url = new URL(request.url, address);
  const name = url.searchParams.get('hello');

  switch (request.url) {
    case '/':
      response.statusCode = 200;
      response.statusMessage = 'OK';
      response.header = 'Content-Type: text/plain';
      response.write('Main server page');
      response.end();
      break;

    case '/users':
      response.statusCode = 200;
      response.statusMessage = 'OK';
      response.header = 'Content-Type: application/json';
      response.write(getUsers());
      response.end();
      break;

    case '/?hello=Dmitrii':
      response.statusCode = 200;
      response.statusMessage = 'OK';
      response.header = 'Content-Type: text/plain';
      response.write(`Hello, ${name}`);
      response.end();
      break;

    case '/?hello=':
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
      response.header = 'Content-Type: text/plain';
      response.write('Enter a name');
      response.end();
      break;

    case '/favicon.ico':
      response.statusCode === 204;
      response.end('Server favicon');
      return;

    default:
      response.statusCode = 500;
      response.statusMessage = '';
      response.header = 'Content-Type: text/plain';
      response.end('Server error (empty answer)');
      return;
  }
});
server.listen(port, () => {
  console.log(`Сервер запущен на адресе ${address}:${port}, (порт ${[port]})`);
});
