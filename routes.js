const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  //console.log(req.url, req.method, req.headers);
  // process.exit(); // hard exit event loop

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><h1>Hello!</h1></head>');
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></input></form></body>')
    return res.end();  // exit out of if function
  }

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<ul><li>User 1</li></ul>');
    res.write('<ul><li>User 2</li></ul>');
    res.write('<ul><li>User 3</li></ul>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      //console.log(chunk);
      body.push(chunk);
    }); //event listener
    return req.on('end', () => { // add return here to execute first
      const parsedBody = Buffer.concat(body).toString(); // collect parsed data and convert to string
      //console.log(parsedBody);
      const message = parsedBody.split('=')[1]; //split on = sign and take element with index 1
      console.log(message);
      res.writeHead(302, {  // 302 means redirect
        'Location': '/'
      });
      return res.end();
    });
  };
};

module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: 'some hard coded text'
// };

// exports.handler = requestHandler;
// exports.someText = 'some hard coded text';