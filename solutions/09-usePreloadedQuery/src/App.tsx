import React from "react";

import { Content } from "@workshop/ui";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Flex, Text } from "rebass";

import { useLoaderData } from "react-router-dom";
import Feed from "./Feed";

import type { AppQuery } from "./__generated__/AppQuery.graphql";

const App = () => {
	// get data preloaded in router v6
	const loadedData = useLoaderData();

	/**
	 * TODO
	 * use usePreloadedQuery instead of useLazyLoadQuery
	 */
	const query = useLazyLoadQuery<AppQuery>(
		graphql`
      query AppQuery {
        ...Feed_query
        me {
          id
        }
      }
    `,
		loadedData.appQuery,
	);

	return (
		<Content>
			<Flex flexDirection="column">
				<Text>Posts</Text>
				<Feed query={query} />
			</Flex>
		</Content>
	);
};

export default App;
