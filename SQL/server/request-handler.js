/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var mysql = require('mysql');
// var request = require('request'); // You might need to npm install the request module!
var url = require('url');
var qs = require('querystring');
var headers = {
  /* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/plain"

};

var connection = mysql.createConnection({
      user: "root",
    /* and password. */
      password: "plantlife",
      database: "chat"
    });

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var locationArray = request.url.split('/');
  locationArray = locationArray.slice(-2); // this gives [ 'classes', 'messages' ]

  var pathname = url.parse(request.url).pathname;
  console.log(pathname);

  if (locationArray[0] !== "classes" && (locationArray[1] !== "room1" || locationArray[1] !== "messages")) {
     requestMethods['ERROR'](response, response, headers);
  } else {
     requestMethods[request.method](request, response, headers);
  }
};


var requestMethods = {
  GET: function(request, response, headers) {
    console.log("Serving request type " + request.method);
    response.writeHead(200, headers); //okay
    var responseMessage;
    connection.query('SELECT * FROM messages', function(err, rows, fields) {
      if (err) throw err;
      // console.log(rows);
      responseMessage = rows[2];
      console.log(responseMessage);
    });
    // console.log(responseMessage);
    response.end();
  },

  POST:  function(request, response, headers) {
    var body = '';
    var queryParams;
    response.writeHead(201, headers); //created
    request.on('data', function(data) {

      body += data;
      var parsed = qs.parse(body);
      var user_id;
      connection.query('SELECT `user_id` FROM `users` WHERE name="Valjean";', function(err, results, fields){
        if (err){
          console.log("bupkiss");
        }
        if(results.length > 0){
          user_id = results[0]['user_id'];
          connection.query('INSERT INTO messages SET user_id=' + user_id + ', content=' + "'" + parsed.message + "'" + ';', function(err, rows, fields){
        });
        }
      });
    });

//     pairs = (params)-> ("#{key}=#{value}" for key, value of params).join(',')
// query("INSERT INTO  users   SET #{pairs data};")[0]


//    username=Valjean&message=In%20mercy's%20name%2C%20three%20days%20is%20all%20I%
    response.end();
  },
  ERROR: function(request, response, headers) {
    response.writeHead(404, headers); //ERROR NOT FOUND
    response.end();
  },
  OPTIONS: function (request, response, headers) {
    response.writeHead(200, headers); //OPTIONS
    response.end();
  }
};

exports.handleRequest = handleRequest;

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : 'secret'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

// SELECT messages.message_id,messages.content, users.name, users.user_id FROM users JOIN (messages) ON (users.user_id = messages.user_id);
