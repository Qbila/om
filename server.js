/* globals SERVER: true */

/* eslint-disable no-console */

'use strict';

require('env2')('./config.env');
// const MongoClient = require('mongodb').MongoClient;
import Hapi from 'hapi';
import HapiSwagger from 'hapi-swagger';
import Inert from 'inert';
import Path from 'path';
// const Loggly = require('node-loggly-bulk');
const _ = require('lodash');
// const Useragent = require('useragent');


// TODO : how about having id for every server session. and give that id for logs?
global.SERVER = new Hapi.Server();
SERVER.rootDir = __dirname;

// CONNECT TO LOCAL OR PRODUCTION SERVER BASED ON NODE_ENV (development or production)
switch(process.env.NODE_ENV) {
  case 'development':
    global.DATASERVER = 'http://' + process.env.DATASERVER_LOCAL_HOST  + ':' + process.env.DATASERVER_LOCAL_PORT;
    SERVER.connection({
      host: '0.0.0.0',
      port: process.env.PORT||1337
    });
    break;

  case 'production':
    global.DATASERVER = 'http://' + process.env.DATASERVER_SERVER_HOST  + ':' + process.env.DATASERVER_SERVER_PORT;
    SERVER.connection({
      host: '0.0.0.0',
      port: process.env.PORT||1337
    });
    break;
}

// language for api and status messages. to be made configurable later
global.QBILA = {
  lang: 'en'
};

// // LOGGLY init
// global.LOGGLY = Loggly.createClient({
//   'token': process.env.LOGGLY_TOKEN,
// 	'subdomain': process.env.LOGGLY_SUBDOMAIN,
// 	'tags': [process.env.LOGGLY_TAG],
// 	'json' : true
// });


/**
 * Routing Static Pages [JS, Css, Images, etc]
 */
SERVER.register(Inert, function(err) {
  if (err) {
		throw err;
	}

	SERVER.route({
		method : 'GET',
    path : '/public/{path*}',
    config: { auth: false },
    handler : {
			directory : {
				path : Path.join(__dirname, './public'),
				listing : false,
				index : false
			}
		}
	});
});


let hapiSwaggerOptions = {
  'info': {
    'title': 'API Documentation',
    'version': '1.0.0',
    'contact': {
        'name': 'Ashish Rana',
        'email': 'ashishr@wayforward.io'
    },
  }
};

/**
 * Register all Modules as Plugins Here
 */
let plugins = [
	{ register : require('vision') },
  { register : require('./server/index.js') },
  { register : HapiSwagger, options: hapiSwaggerOptions }
  // { register: WebpackPlugin, options: './webpack.config.dev.js' }
  // { register : require('hapi-alive') }
];

/**
 * Routing Views
 */
SERVER.register(
  plugins,
  function (err) {
    if (err) {
      throw err;
    }

    SERVER.views({
      engines: { html: require('handlebars') },
      layout : true,
      path: Path.resolve(__dirname, 'client/views'),
      layoutPath : Path.resolve(__dirname, 'public/dist'), //setting Global Layout,
      partialsPath : Path.resolve(__dirname,'client/partials') //partial Views
    });
});


// Request life cycle Extension points : onRequest, onPreAuth, onPostAuth, onPreHandler, onPostHandler, onPreResponse
SERVER.ext('onPreAuth', function(request, reply) {
  // give control back to the SERVER and continue the request life cycle
  // if (request.route.path !== '/public/{path*}') {
  //
  // }
  reply.continue();
});


SERVER.ext('onPreResponse', function(request, reply){
  console.log(request.route.path);
  // if (request.route.path !== '/public/{path*}' && request.route.path !== '/{p*}') {
  //   // // get all the users role and posting data
  //   // LOGGLY.log({
  //   //   useragent: Useragent.parse(request.headers['user-agent']).toJSON(),
  //   //   requestInfo: request.info,
  //   //   level: 'info',
  //   //   requestedUrl: request.url.href,
  //   //   statuscode: request.response.statusCode
  //   // });
  // }

  if(request.response.output){
    // LOGGLY.log({
    //   useragent: Useragent.parse(request.headers['user-agent']).toJSON(),
    //   requestInfo: request.info,
    //   info: request.response.output.payload.error,
    //   level: 'error',
    //   requestedUrl: request.url,
    //   statuscode: request.response.output.statusCode
    // });

    if(request.response.output.statusCode === 404){
      return reply.redirect('/error/pagenotfound');
    }
  }

  reply.continue();
});


// // mongodb init. DB global reusabe database object
// global.MONGODB = process.env.MONGO_URL;
// global.DB = {};

// MongoClient.connect(MONGODB, function (err, db) {
//   if( !_.isNil( err ) ) {
//     LOGGLY.log({
//       info: 'mongodb connection failed',
//       systemMessage: err,
//       level: 'error'
//     });
//     if(SERVER.info.started){
//       stopServer();
//     }
//     throw err;
//   }
//   DB = db;
//   startServer();
// });

startServer();

// STARTING THE SERVER
function startServer() {
  SERVER.start(function(err) {
    if(!_.isNil( err )) {
      // LOGGLY.log({
      //   info: 'server failed to start',
      //   systemMessage: err,
      //   level: 'error'
      // });
      throw err;
    }

    console.log('SERVER running at ', SERVER.info.uri);

    // LOGGLY.log({
    //   info: 'SERVER successfully started',
    //   data: SERVER.info,
    //   level: 'info'
    // });
  });
}

function stopServer() { // eslint-disable-line no-unused-vars
  SERVER.stop({}, (err) => {
    if(!_.isNil( err )) {
      // LOGGLY.log({
      //   info: 'server stoping failed',
      //   systemMessage: err,
      //   level: 'error'
      // });
      throw err;
    }
    // LOGGLY.log({
    //   info: 'SERVER stopped successfully.',
    //   level: 'info'
    // });
    console.log('SERVER stopped');
  });
}
