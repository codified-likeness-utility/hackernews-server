const { ApolloServer } = require('apollo-server');

const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!
    }

    type Mutation {
        post(url: String!, description: String!): Link!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`;

let links = [{
    id: 'link-o',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
	Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server
	.listen()
	.then(({ url }: any) => console.log(`Server is running on ${url} 🚀🐱‍🚀`));
