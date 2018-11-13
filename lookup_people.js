const argv = process.argv.slice(2);
console.log(argv);

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
  data.forEach((element, index) => {
    console.log(`${index + 1} : ${element['first_name']} ${element['last_name']}, born ${element['birthday']}`)
  });
  console.log('')
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * from famous_people where first_name = '${argv[0]}'`, [], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(displayResult(result.rows)); //output: 1
    client.end();
  });
});
