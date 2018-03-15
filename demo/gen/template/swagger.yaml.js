
const tmpl = require('./swagger_yaml_tmpl');
const stringer = require('../stringer');

class YamlGenerator {

  gen(tableName, columnInfos) {
    return {
      swagger: '2.0',
      definitions: this.genDefinitions(tableName, columnInfos),
      path: this.genPaths(tableName, columnInfos),
      tags: [stringer.snakeToSnakeSingular(tableName)]
    };
  }

  genDefinitions(tableName, columnInfos) {
    const name = stringer.snakeToPascalSingular(tableName);

    let properties = {};
    let required = [];
    columnInfos.forEach(col => {
      let name = col.COLUMN_NAME;
      if (col.IS_NULLABLE === 'NO') {
        required.push(name);
      }
      let property = {
        description: col.COLUMN_COMMENT || col.COLUMN_NAME.replace(/_/g, ' ')
      };
      switch (col.DATA_TYPE) {
        case 'int':
          property.type = 'number';
          property.example = '123';
          break;
        case 'char', 'varchar':
          property.type = 'string';
          property.example = 'abcde fghij';
          break;
        case 'date', 'datetime':
          property.type = 'string';
          property.format = 'date-time';
          property.example = '2018-12-31T00:00:00';
          break;
        default:
          property.type = 'string';
          property.format = '';
          property.example = 'none type';
          break;
      }
      properties[name] = property;
    });

    return {
      [`${name}Collection`]: {
        type: 'array',
        items: {$ref: `'#/definitions/${name}'`}
      },
      [name]: {
        type: 'object',
        properties: properties,
        required: required
      }
    };
  }

  genPaths(tableName, columnInfos) {
    let name = stringer.snakeToSnakeSingular(tableName);
    let jpname = name;
    let pascalName = stringer.snakeToPascalSingular(tableName);
    let parameters = [
      {
        description: '取得件数',
        in: 'query',
        name: 'limit',
        required: false,
        type: 'integer'
      },
      {
        description: '取得開始位置',
        in: 'query',
        name: 'offset',
        required: false,
        type: 'integer'
      }
    ];
    return {
      [`/${tableName}`]: {
        get: {
          'x-swagger-router-controller': name,
          description: `${jpname}一覧`,
          operationId: `${name}#list`,
          parameters: parameters,
          responses: this._response(pascalName, [200, 400, 500]),
          security: [{
            jwt: ['api:access']
          }],
          summary: `${jpname}一覧`,
          'x-submit-label': `${jpname}のリストを表示する`,
          tags: [name]
        },
        post: {
          'x-swagger-router-controller': name,
          description: `${jpname}新規登録`,
          operationId: `${name}#create`,
          parameters: parameters,
          // - in: body
          // name: payload
          // required: true
          // schema:
          //   $ref: '#/definitions/Message'
          responses: this._response(pascalName, [200, 400, 500]),
          security: [{
            jwt: ['api:access']
          }],
          summary: `${jpname}新規登録`,
          'x-submit-label': `${jpname}を新規登録する`,
          tags: [name]
        }
      },
      [`/${tableName}/{id}`]: {
        put: {
          'x-swagger-router-controller': name,
          description: `${jpname}更新`,
          operationId: `${name}#update`,
          parameters: parameters,
          responses: this._response(pascalName, [200, 400, 404, 500]),
          security: [{
            jwt: ['api:access']
          }],
          summary: `${jpname}更新`,
          'x-submit-label': `${jpname}を更新する`,
          tags: [name]
        },
        delete: {
          'x-swagger-router-controller': name,
          description: `${jpname}削除`,
          operationId: `${name}#remove`,
          parameters: parameters,
          responses: this._response(pascalName, [200, 400, 404, 500]),
          security: [{
            jwt: ['api:access']
          }],
          summary: `${jpname}削除`,
          'x-submit-label': `${jpname}を削除する`,
          tags: [name]
        }
      }
    };
  }

  _response(name, codes = []) {
    let resp = {};
    if (codes.includes(200)) {
      resp['200'] = {
        description: 'OK',
        schema: {$ref: `'#/definitions/${name}Collection'`},
      };
    }
    if (codes.includes(400)) {
      resp['400'] = {
        description: 'Bad Request',
        schema: {$ref: '#/definitions/Error'},
      };
    }
    if (codes.includes(404)) {
      resp['404'] = {
        description: 'Not Found',
        schema: {$ref: '#/definitions/Error'},
      };
    }
    if (codes.includes(500)) {
      resp['500'] = {
        description: 'Internal Server Error',
        schema: {$ref: '#/definitions/Error'},
      };
    }
    return resp;
  }

  genTags(tableName) {
    let name = stringer.snakeToSnakeSingular(tableName);
    return `  - name: ${name}`;
  }
}
