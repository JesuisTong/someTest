// import createHistory from 'history/createBrowserHistory';
import history from './history';
import bundle from './LazyRouter';
import { os } from './global';
import './commons.css';


window.TZ = {
	history,
	bundle,
	os,
};
