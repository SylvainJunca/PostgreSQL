const argv = process.argv.slice(2);

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
const displayResult = (data) => {
  console.log('Searching...');
  console.log(`Found ${data.length} person(s) by the name '${argv[0]}' :`)
  data.forEach((element, index) => {
    console.log(`${index + 1} : ${element['first_name']} ${element['last_name']}, born ${element['birthday']}`)
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * from famous_people where first_name = '${argv[0]}'`, [], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    displayResult(result.rows);
    client.end();
  });
});
