const csv = require('csv');
const moment = require('moment-timezone');

const shared = require('../shared');
const context = shared.context;

/**
 * Controller : List  ChannelMessage
 * HTTP Method : GET
 * PATH : /message
 *
 * @returns {Promise.<TResult>}
 */
const list = (req, res) => {
  const vironlib = context.getVironLib();
  const pager = vironlib.pager;
  const storeHelper = vironlib.stores.helper;
  const store = context.getStore('valencia');
  const ChannelMessages = store.models.ChannelMessages;
  const attributes = Object.keys(req.swagger.operation.responses['200'].schema.items.properties);
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  const options = {
    attributes,
    limit,
    offset,
  };
  const query = {};
  if (req.query.name) {
    query.name = {$like: `${req.query.name}%`};
  }
  return storeHelper.list(store, ChannelMessages, query, options)
    .then(data => {
      pager.setResHeader(res, limit, offset, data.count);
      res.json(data.list);
    })
  ;
};

/**
 * Controller : Create  ChannelMessage
 * HTTP Method : POST
 * PATH : /message
 *
 * @returns {Promise.<TResult>}
 */
const create = (req, res, next) => {
  const vironlib = context.getVironLib();
  const storeHelper = vironlib.stores.helper;
  const store = context.getStore('valencia');
  const ChannelMessages = store.models.ChannelMessages;
  const message = Object.assign({}, req.body);
  return storeHelper.create(store, ChannelMessages, message)
    .then(data => {
      res.json(data);
    })
    .catch(next)
  ;
};

/**
 * Controller : Delete  ChannelMessage
 * HTTP Method : DELETE
 * PATH : /message/:id
 *
 * @returns {Promise.<TResult>}
 */
const remove = (req, res, next) => {
  const vironlib = context.getVironLib();
  const storeHelper = vironlib.stores.helper;
  const store = context.getStore('valencia');
  const ChannelMessages = store.models.ChannelMessages;
  const query = {
    id: req.swagger.params.id.value,
  };
  const options = {
    force: true, // physical delete
  };
  return storeHelper.remove(store, ChannelMessages, query, options)
    .then(() => {
      res.status(204).end();
    })
    .catch(next)
  ;
};

/**
 * Controller : update  ChannelMessage
 * HTTP Method : PUT
 * PATH : /message/:id
 *
 * @returns {Promise.<TResult>}
 */
const update = (req, res, next) => {
  const vironlib = context.getVironLib();
  const storeHelper = vironlib.stores.helper;
  const store = context.getStore('valencia');
  const ChannelMessages = store.models.ChannelMessages;
  const query = {
    id: req.swagger.params.id.value,
  };
  const message = Object.assign({}, req.body);
  return storeHelper.update(store, ChannelMessages, query, message)
    .then(data => {
      res.json(data);
    })
    .catch(next)
  ;
};

/**
 * Controller : upload ChannelMessages
 * HTTP Method : PUT
 * PATH : /message/upload/csv
 *
 * @returns {Promise.<TResult>}
 */
const upload = (req, res) => {
  const file = req.files.image[0];
  if (file.mimetype !== 'text/csv') {
    console.warn(`invalid file format: ${file.originalname}`);
    return res.json({});
  }

  csv.parse(file.buffer.toString(), {columns: true}, (err, data) => {
    if (err) {
      console.error(err);
      return res.json({});
    }

    // あとはDBに入れるだけ
    console.log(data);
    res.json({});
  });
};

/**
 * Controller : download ChannelMessages
 * HTTP Method : GET
 * PATH : /message/download/csv
 *
 * @returns {Promsie.<TResult>}
 */
const download = (req, res, next) => {
  const vironlib = context.getVironLib();
  const storeHelper = vironlib.stores.helper;
  const store = context.getStore('valencia');
  const ChannelMessages = store.models.ChannelMessages;
  const attributes = ['id', 'title', 'channelId'];
  const options = {
    attributes,
    limit: 100000000,
    offset: 0,
  };
  const query = {};
  return storeHelper.list(store, ChannelMessages, query, options)
    .then(data => {
      return new Promise((resolve, reject) => {
        csv.stringify(data.list, {
          columns: attributes,
          delimiter: ',',
          escape: '\\',
          eof: false,
          header: true,
          quoted: true,
          quotedEmpty: true,
          quotedString: true,
        }, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    })
    .then(data => {
      const name = `message_${moment().tz('Asia/Tokyo').format('YYYYMMDDHHmmss')}.csv`;
      res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
      res.send(data);
    })
    .catch(next)
  ;
};

module.exports = {
  'message#list': list,
  'message#create': create,
  'message#remove': remove,
  'message#update': update,
  'message#upload': upload,
  'message#download': download,
};
