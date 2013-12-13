/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
    /* and password. */
      password: "plantlife",
      database: "chat"
    });
    dbConnection.connect();

    // var tablename = ""; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't sc,rew each other up: */
    dbConnection.query("TRUNCATE friends",
      // , delete from messages, delete from users, delete from users;
      done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
             uri: "http://127.0.0.1:8080/classes/room1",
             form: {username: "Valjean",
                    message: " name three days is all I need."}
            },
            function(error, response, body) {
              /* Now if we look in the database, we should find the
               * posted message there. */
              var queryArgs = ["Valjean", "farts's name, three days is all I need."];
              var queryString = "SELECT messages.message_id,messages.content, users.name, users.user_id FROM users JOIN (messages) ON (users.user_id = messages.user_id);";
              // var queryString = "SELECT from users WHERE user_id='"+  queryArgs[0]+ ");" +
               // "INSERT INTO messages (content) VALUES ("+ queryArgs[1]+ ");" ;
              /* TDO: Change the above queryString & queryArgs to match your schema design
               * The exact query string and query args to use
               * here depend on the schema you design, so I'll leave
               * them up to you. */
              dbConnection.query(queryString, queryArgs, function(err, results, fields) {
                console.log(fields);
                  // Should have one result:
                expect(results.length).toEqual(1);
                expect(results[0].name).toEqual("Valjean");
                expect(results[0].content).toEqual("farts's name, three days is all I need.");
                  /* TODO: You will need to change these tests if the
                   * column names in your schema are different from
                   * mine! */

                done();
                });
            });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var queryString = "INSERT INTO messages (user_id, content) VALUES (2, 'Men like you can never change!');";
    var queryArgs = ["Javert", "Men like you can never change!"];
    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query(queryString, queryArgs, function(err, results, fields) {
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request({
          method: "GET",
          uri: "http://127.0.0.1:8080/classes/room1"},
          function(error, response, body) {
            response.on('end', function(body){
              var messageLog;
              messageLog = JSON.parse(body);
              expect(messageLog[1].user_id).toEqual("2");
              expect(messageLog[1].content).toEqual("Men like you can never change!");
              done();
            });
          });
      });
  });
});
