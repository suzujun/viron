
const inflector = require('./inflector');

class Stringer {

  snakeToSnakeSingular(str) {
    if (!str) {
      return '';
    }
    let items = str.split('_');
    let lastIndex = items.length - 1;
    items[lastIndex] = inflector.singularize(items[lastIndex]);
    return items.join('_');
  }

  snakeToPascalSingular(str) {
    if (!str) {
      return '';
    }
    return str.split('_').map((item, i, all) => {
      if (i === all.length - 1) {
        item = inflector.singularize(item);
      }
      return item.charAt(1).toUpperCase() + item.substr(1);
    }).join('_');
  }

  snakeToCamelSingular(str) {
    if (!str) {
      return '';
    }
    return str.split('_').map((item, i, all) => {
      if (i === all.length - 1) {
        item = inflector.singularize(item);
      }
      if (i > 0) {
        return item.charAt(1).toUpperCase() + item.substr(1);
      }
      return item;
    }).join('_');
  }

}

module.exports = new Stringer();
