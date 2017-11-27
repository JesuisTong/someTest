import { Route } from 'react-router-dom';

export default function({ component: Component, path, ...props }) {
	return (
		<Route
			path={path}
			render={props => (
				<Component {...props} />
			)}
		/>
	);
}