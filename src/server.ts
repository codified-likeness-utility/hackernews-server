import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";

const main = async () => {
	const schema = await buildSchema({
		resolvers: [],
		emitSchemaFile: true,
		validate: false,
	});

	const mongoose = await connect("mongodb://localhost:27017/test", {
		useNewUrlParser: true,
	});
	await mongoose.connection;

	const server = new ApolloServer({ schema });
	const app = Express();
	server.applyMiddleware({ app });
	app.listen({ port: 3333 }, () => {
		console.log(
			`🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`
		);
	});
	main().catch((error) => {
		console.log("Error:", error);
	});
};
