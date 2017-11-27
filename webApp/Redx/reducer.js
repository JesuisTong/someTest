import { combineReducers } from 'redux';
import { ADD_TODO, REMOVE, CHANGE, SHOW_ALL, HIDDEN, SELECT } from './action';


// not pure now 
const todos = (state = [], action) => {
	switch (action.type){
		case ADD_TODO:
			return [
				...state,
				{
					text: action.text,
					visible: true,
				}
			];
		case REMOVE:
			return state.filter((s, index) => {
				return index !== action.index
			});
		case CHANGE:
			return state.map((s, index) => {
				if (index === action.index) {
					return { ...s, text: action.text }
				}
				return s;
			});
		case HIDDEN:
			return state.map((s, index) => {
				if (index === action.index) {
					return { ...s, visible: false }
				}
				return s;
			})
		case SHOW_ALL:
			return state.map((s, index) => ({ ...s, visible: true }))
		default:
			return state;
	}
}
const todoMusicList = (state = [], action) => {
	switch (action.type) {
		case SELECT: 
			console.log(state);
			return state.filter((i) => (action.songName === i.songName))[0];
		default:
			return state;
	}
}

const todoApp = combineReducers({
	todos,
	todoMusicList
})

export default todoApp;
