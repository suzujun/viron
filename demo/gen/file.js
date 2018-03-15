const fs = require('fs');

class File {

  constructor(filepath) {
    this.path = filepath;
  }

  write(data) {
    fs.writeFileSync(this.path, data);
  }

  append(data) {
    fs.appendFileSync(this.path, data);
  }

  remove() {
    fs.unlinkSync(this.path);
  }

  existFile() {
    try {
      fs.statSync(this.path);
      return true;
    } catch (err) {
      if (err.code === 'ENOENT') return false;
    }
  }
}
module.exports = File;
