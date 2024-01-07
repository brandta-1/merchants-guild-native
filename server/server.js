const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/merch-guild');

const app = express();
const PORT = process.env.PORT || 4001;
const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware });


app.use(
    express.urlencoded({ extended: true }),
    express.json(),
);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

/*
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
*/

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    mongoose.connection.once('open', () => {
        app.listen(PORT, () => {
            console.log(`🌍 Now listening on localhost:${PORT}`)
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });

};

startApolloServer(typeDefs, resolvers);
