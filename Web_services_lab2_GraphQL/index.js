const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const port = 3000;
require('./dbConnection');
const {ArticleModel}=require('./models')

const schema = `
    type Comment {
        content: String
    }

    type Article {
        author: String!
        title: String!
        body: String
        comments: [Comment]
        }

    type Query {
        allArticles (last: Int): [Article]
        
    }

    type Mutation {
        deleteArticle (id: String): String
        createArticle( title: String,
        body:String,
        author:String): String
        }
`

const typeDefs = gql(schema);

const resolvers = {
    Query: {
        allArticles: async(_, { last }) => {
            let articles =[];
            if (!last) {
                articles = await ArticleModel.find({});   
            };
            if (last) {
                const len = await  ArticleModel.count();
                articles = await ArticleModel.find({}).skip(len-last);
            };
            return articles;
        },   
    },

    Mutation: {
        deleteArticle: async(_, { id }) => {
            await ArticleModel.findByIdAndDelete(id);
            return "SUCCESS..";
        },
        createArticle: async(_, {  title,
            body,
            author }) => {
            await ArticleModel.create({
                title,
                body,
                author
            })
            return "SUCCESS..";
        }
    }
}


const server = new ApolloServer({ typeDefs, resolvers });
server.listen(port).then(({ url }) => { 
    console.log('url: ', url) 
});


