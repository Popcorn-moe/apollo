import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import {
	InMemoryCache,
	IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "./fragmentTypes.json";


export default function createClient({
	useCache = true
} = {}) {
	const fragmentMatcher = new IntrospectionFragmentMatcher({
		introspectionQueryResultData
	});

	let cache

	if (useCache)
		cache = new InMemoryCache({
			addTypename: true,
			dataIdFromObject: ({ id }) => id,
			fragmentMatcher
		});

	const link = createUploadLink({
		uri: `${process.env.API_URL}/graphql`,
		credentials: "include"
	});

	return new ApolloClient({
		link,
		cache
	});
}