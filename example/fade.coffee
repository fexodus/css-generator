b = require('../src/generator').block;

b('fade',
  'visibility': 'hidden'
  'opacity': '0'
  'transition': 'visibility 0s linear 0.5s, opacity 0.5s ease')
  .expose()

  .m('in',
    'visibility': 'visible'
    'opacity': '1'
    'transition-delay': '0s')
  .expose()
