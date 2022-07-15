import { FC } from "react";

export const Error: FC<{ error: unknown }> = ({ error }) => {
	console.log(error);
	return (
		<>
			<header className="page-header">
				<h1>error</h1>
			</header>
		</>
	);
};
