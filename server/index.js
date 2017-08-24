exports.register = function(server, options, next) {
  server.route([
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
