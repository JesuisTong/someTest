
export const ADD_TODO = 'add_todo';
export const REMOVE = 'remove';
export const CHANGE = 'change';
export const SHOW_ALL = 'show_all';
export const HIDDEN = 'hidden';

export const add = (text) => ({
	type: ADD_TODO,
	text,
})

export const remove = (index) => ({
	type: REMOVE,
	index,
})

export const change = (text, index) => ({
	type: CHANGE,
	text,
	index,
})

export const showAll = () => ({
	type: SHOW_ALL,
})

export const hidden = (index) => ({
	type: HIDDEN,
	index,
})
