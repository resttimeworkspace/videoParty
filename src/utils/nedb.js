const Datastore = require('nedb');
let data_db = new Datastore({
    filename: 'data.db',
    autoload: true
});

export default data_db;