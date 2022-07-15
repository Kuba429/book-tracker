import { book } from "interfaces";
import { FC } from "react";
import { UseQueryResult } from "react-query";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { Success } from "./Success";

export const QueryStatusHandler: FC<{ query: UseQueryResult<book> }> = ({
	query,
}) => {
	// decide what to render here
	switch (query.status) {
		case "success":
			return <Success data={query.data} />;
		case "loading":
			return <Loading />;
		case "error":
			return <Error error={query.error} />;
	}
	return <h1>TODO FIX ME</h1>;
};
