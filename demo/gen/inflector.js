
const pluralRules = [
  {regexp: /(s)tatus$/i, newString: '$1tatuses'},
  {regexp: /(quiz)$/i, newString: '$1zes'},
  {regexp: /^(ox)$/i, newString: '$1$2en'},
  {regexp: /([m|l])ouse$/i, newString: '$1ice'},
  {regexp: /(matr|vert|ind)(ix|ex)$/i, newString: '$1ices'},
  {regexp: /(x|ch|ss|sh)$/i, newString: '$1es'},
  {regexp: /([^aeiouy]|qu)y$/i, newString: '$1ies'},
  {regexp: /(hive)$/i, newString: '$1s'},
  {regexp: /(chef)$/i, newString: '$1s'},
  {regexp: /(?:([^f])fe|([lre])f)$/i, newString: '$1$2ves'},
  {regexp: /sis$/i, newString: 'ses'},
  {regexp: /([ti])um$/i, newString: '$1a'},
  {regexp: /(p)erson$/i, newString: '$1eople'},
  {regexp: /(\?<!u)(m)an$/i, newString: '$1en'},
  {regexp: /(c)hild$/i, newString: '$1hildren'},
  {regexp: /(buffal|tomat)o$/i, newString: '$1$2oes'},
  {regexp: /(alumn|bacill|cact|foc|fung|nucle|radi|stimul|syllab|termin)us$/i, newString: '$1i'},
  {regexp: /us$/i, newString: 'uses'},
  {regexp: /(alias)$/i, newString: '$1es'},
  {regexp: /(ax|cris|test)is$/i, newString: '$1es'},
  {regexp: /s$/, newString: 's'},
  {regexp: /^$/, newString: ''},
  {regexp: /$/, newString: 's'},
];

const singularRules = [
  {regexp: /(s)tatuses$/i, newString: '$1$2tatus'},
  {regexp: /^(.*)(menu)s$/i, newString: '$1$2'},
  {regexp: /(quiz)zes$/i, newString: '$$1'},
  {regexp: /(matr)ices$/i, newString: '$1ix'},
  {regexp: /(vert|ind)ices$/i, newString: '$1ex'},
  {regexp: /^(ox)en/i, newString: '$1'},
  {regexp: /(alias)(es)*$/i, newString: '$1'},
  {regexp: /(alumn|bacill|cact|foc|fung|nucle|radi|stimul|syllab|termin|viri?)i$/i, newString: '$1us'},
  {regexp: /([ftw]ax)es/i, newString: '$1'},
  {regexp: /(cris|ax|test)es$/i, newString: '$1is'},
  {regexp: /(shoe)s$/i, newString: '$1'},
  {regexp: /(o)es$/i, newString: '$1'},
  {regexp: /ouses$/, newString: 'ouse'},
  {regexp: /([^a])uses$/, newString: '$1us'},
  {regexp: /([m|l])ice$/i, newString: '$1ouse'},
  {regexp: /(x|ch|ss|sh)es$/i, newString: '$1'},
  {regexp: /(m)ovies$/i, newString: '$1$2ovie'},
  {regexp: /(s)eries$/i, newString: '$1$2eries'},
  {regexp: /([^aeiouy]|qu)ies$/i, newString: '$1y'},
  {regexp: /(tive)s$/i, newString: '$1'},
  {regexp: /(hive)s$/i, newString: '$1'},
  {regexp: /(drive)s$/i, newString: '$1'},
  {regexp: /([le])ves$/i, newString: '$1f'},
  {regexp: /([^rfoa])ves$/i, newString: '$1fe'},
  {regexp: /(^analy)ses$/i, newString: '$1sis'},
  {regexp: /(analy|diagno|^ba|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, newString: '$1$2sis'},
  {regexp: /([ti])a$/i, newString: '$1um'},
  {regexp: /(p)eople$/i, newString: '$1$2erson'},
  {regexp: /(m)en$/i, newString: '$1an'},
  {regexp: /(c)hildren$/i, newString: '$1$2hild'},
  {regexp: /(n)ews$/i, newString: '$1$2ews'},
  {regexp: /eaus$/, newString: 'eau'},
  {regexp: /^(.*us)$/, newString: '$$1'},
  {regexp: /s$/i, newString: ''},
];

const uninflected = [
  'deer', 'fish', 'measles', 'ois', 'pox', 'rice', 'sheep', 'Amoyese', 'bison',
  'bream', 'buffalo', 'cantus', 'carp', 'cod', 'coitus', 'corps', 'diabetes',
  'elk', 'equipment', 'flounder', 'gallows', 'Genevese', 'Gilbertese',
  'graffiti', 'headquarters', 'herpes', 'information', 'innings', 'Lucchese',
  'mackerel', 'mews', 'moose', 'mumps', 'news', 'nexus', 'Niasese', 'pekingese',
  'Portuguese', 'proceedings', 'rabies', 'salmon', 'scissors', 'series',
  'shears', 'siemens', 'species', 'testes', 'trousers', 'trout', 'tuna',
  'whiting', 'wildebeest', 'yengeese'
];

const irregularToPluralMap = {
  atlas: 'atlases',
  beef: 'beefs',
  brief: 'briefs',
  brother: 'brothers',
  cafe: 'cafes',
  child: 'children',
  cookie: 'cookies',
  corpus: 'corpuses',
  cow: 'cows',
  criterion: 'criteria',
  ganglion: 'ganglions',
  genie: 'genies',
  genus: 'genera',
  graffito: 'graffiti',
  hoof: 'hoofs',
  loaf: 'loaves',
  man: 'men',
  money: 'monies',
  mongoose: 'mongooses',
  move: 'moves',
  mythos: 'mythoi',
  niche: 'niches',
  numen: 'numina',
  occiput: 'occiputs',
  octopus: 'octopuses',
  opus: 'opuses',
  ox: 'oxen',
  penis: 'penises',
  person: 'people',
  sex: 'sexes',
  soliloquy: 'soliloquies',
  testis: 'testes',
  trilby: 'trilbys',
  turf: 'turfs',
  potato: 'potatoes',
  hero: 'heroes',
  tooth: 'teeth',
  goose: 'geese',
  foot: 'feet',
  foe: 'foes',
  sieve: 'sieves'
};

const irregularToSingularMap = {};
for (let key in irregularToPluralMap) {
  let value = irregularToPluralMap[key];
  irregularToSingularMap[value] = key;
}

class Inflector {
  pluralize(word) {
    if (!word) {
      return '';
    }
    if (uninflected.includes(word)) {
      return word;
    }
    let matched = irregularToPluralMap[word];
    if (matched) {
      return matched;
    }
    matched = pluralRules.find(rule => {
      return !!word.match(rule.regexp);
    });
    if (matched) {
      return word.replace(matched.regexp, matched.newString);
    }
    return '${word}s'; // TODO
  }

  singularize(word) {
    if (!word) {
      return '';
    }
    if (uninflected.includes(word)) {
      return word;
    }
    let matched = irregularToSingularMap[word];
    if (matched) {
      return matched;
    }
    matched = singularRules.find(rule => {
      return !!word.match(rule.regexp);
    });
    if (matched) {
      return word.replace(matched.regexp, matched.newString);
    }
    return word.replace(/s$/i, '');
  }
}

module.exports = new Inflector();
