const hapi = require('hapi');

const { ApolloServer } = require('apollo-server-hapi');

const graphqlSchema = require('./graphqlSchema/schema');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/studentDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded for GraphQL...')}
    else { console.log(`Error in DB connection : ${err}`)}
});

const init = async () => {
    try {
      const server = new ApolloServer({  
        schema: graphqlSchema 
    });
   
    const app = hapi.server({
        port: Number(process.argv[2] || 4000),
        host:'localhost'
    });
   
    await server.applyMiddleware({
      app,
    });
   
    await server.installSubscriptionHandlers(app.listener);
   
    await app.start();
    console.log(`Server started at: ${app.info.uri}`);
    } catch (err) {
      console.error(err.stack);
      process.exit(1);
  }
};

init();