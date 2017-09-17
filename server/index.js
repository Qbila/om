exports.register = function(server, options, next) {
  server.route([
    {
      method : 'GET',
      path : '/welcome',
      handler : function(request, reply){

        reply.view(
          'citizens/welcome.html',
          { title : 'Welcome to Qbila' }
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
