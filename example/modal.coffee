b = require('../src/generator').block;

b('modal',
  'position': 'fixed'
  'z-index': '999997'
  'top': '0'
  'left': '0'
  'text-align': 'center'
  'white-space': 'nowrap'
  'width': '100%'
  'height': '100%')
  .extend(b('fade'))
  .expose()

  .e('background',
    'position': 'absolute'
    'top': '0'
    'left': '0'
    'width': '100%'
    'height': '100%'
    'background-color': 'black'
    'opacity': '0.5')
    .expose('bg').end()

  .m('visible', {})
    .extend(b('fade').m('in'))
    .expose()
