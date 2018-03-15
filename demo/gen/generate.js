
console.log('>>>>>>start');

const inflector = require('./inflector');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('valencia_local', 'user', 'password', {dialect: 'mysql'});

let tableSchema = 'valencia_local';
let tableName = 'channel_messages';
let query = `select TABLE_CATALOG, COLUMN_NAME, ORDINAL_POSITION,
 COLUMN_DEFAULT, IS_NULLABLE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH,
 CHARACTER_OCTET_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE, DATETIME_PRECISION,
 CHARACTER_SET_NAME, COLLATION_NAME, COLUMN_TYPE, COLUMN_KEY, EXTRA, PRIVILEGES,
 COLUMN_COMMENT
from INFORMATION_SCHEMA.COLUMNS
where TABLE_SCHEMA = '${tableSchema}'
and TABLE_NAME = '${tableName}'
order by TABLE_NAME, ORDINAL_POSITION`;

// index
query = `select TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, NON_UNIQUE, INDEX_SCHEMA,
INDEX_NAME, SEQ_IN_INDEX, COLUMN_NAME, COLLATION, CARDINALITY, SUB_PART, PACKED,
NULLABLE, INDEX_TYPE, COMMENT, INDEX_COMMENT,
CASE
  WHEN INDEX_NAME = "PRIMARY" THEN 1
  WHEN NON_UNIQUE= 0 THEN 2
  ELSE 3
END SORT_NUMBER
from information_schema.statistics
where TABLE_SCHEMA = '${tableSchema}'
and TABLE_NAME = '${tableName}'
order by SORT_NUMBER, INDEX_NAME, SEQ_IN_INDEX`;

// query = 'show tables';

sequelize.query(query).spread(results => {
  console.log('result-length:', results.length);
  results.forEach((element, i) => {
    // console.log(results[0]);
    // console.log(element.ORDINAL_POSITION, element.COLUMN_NAME);
    console.log(i, element);
    // element = element.Tables_in_valencia_local;
    // let items = element.split('_');
    // let single = inflector.singularize(items[items.length-1]);
    // console.log(element, items, single);
  });
  sequelize.close();
});

console.log('>>>>>>end');
