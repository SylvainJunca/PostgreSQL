const argv = process.argv.slice(2);
const settings = require("./settings");

const knex = require('knex')({
  client:'pg',
  connection: settings
});

knex('famous_people').insert({'first_name': argv[0], 'last_name': argv[1], 'birthday': argv[2]})
.then(() => {
  console.log('Fini')
  process.exit(0);
})
.catch(
  (err) => {
    console.error(err);
    process.exit(1);
});
