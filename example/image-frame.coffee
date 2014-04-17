b = require('../src/generator').block;

b('imageFrame',
  'position': 'relative'
  'display': 'block'
  'border': '1px solid #d8d8d8'
  'height': '0'
  'padding-top': '100%'
  'overflow': 'hidden'
  'border-radius': '4px')
  .expose('imgFrm')

  .e('image',
    'position': 'absolute'
    'max-width': '100%'
    'max-height': '100%'
    'margin': 'auto'
    'border-radius': '4px')
    .expose()

    .m('placeholder',
      'width': '100%'
      'height': '100%')
      .expose('&.lazyLoad')
