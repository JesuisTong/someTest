import createHistory from 'history/createBrowserHistory';

const history = createHistory({
	basename: '',             // The base URL of the app (see below)
	forceRefresh: false,      // Set true to force full page refreshes
	keyLength: 5,             // The length of location.key
	// A function to use to confirm navigation with the user (see below)
	// getUserConfirmation: (message, callback) => callback(window.confirm(message))
});
const unlisten = history.listen((location, action) => {
	console.log(location, action);
});

export default history;