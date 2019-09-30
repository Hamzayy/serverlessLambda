const pool = require("./db_connect");

module.exports.createPerson = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const query = {
    text: "INSERT INTO persons VALUES($1, $2, $3, $4)",
    values: Object.values(JSON.parse(event.body))
  };
  pool.query(query, (err, res) => {
    if (err) {
      const error = {
        statusCode: 404,
        body: JSON.stringify(err.stack)
      };
      callback(error);
      return err;
    } else {
      const response_success = {
        statusCode: 200,
        body: JSON.stringify("Person created successfully")
      };
      callback(null, response_success);
      return res;
    }
  });
};

module.exports.getPerson = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const query = {
    text: "Select * from persons"
  };
  pool.query(query, (err, res) => {
    if (err) {
      const error = {
        statusCode: 404,
        body: JSON.stringify(err)
      };
      callback(error);
      return err;
    } else {
      const response_success = {
        statusCode: 200,
        body: JSON.stringify(res.rows)
      };
      callback(null, response_success);
      return res;
    }
  });
};
