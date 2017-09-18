exports.register = function(server, options, next) {
  server.route([
    {
      method : 'GET',
      path : '/',
      handler : function(request, reply){

        reply.view(
          'citizens/welcome.html',
          { title : 'Welcome to Qbila' }
        );
      }
    },
    {
      method : 'GET',
      path : '/error/pagenotfound',
      handler : function(request, reply){

        reply.view(
          'error/pagenotfound',
          { title : 'Page Not Found' }
        );
      }

    }
  ]);

  next();
};

exports.register.attributes = {
  name : 'assess',
  version : '1.0.0'
};
