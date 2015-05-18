// reference: http://kentor.me/posts/testing-react-and-flux-applications-with-karma-and-webpack/

require('core-js/es5');

var context = require.context('./lib/js', true, /-spec\.jsx?$/);
context.keys().forEach(context);