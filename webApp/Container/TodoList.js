import React from 'react';
import { connect } from 'react-redux';
import Test from 'components/test';
import { change, remove, hidden } from 'Redx/action';


const mapStateToProps = (state) => (
	{
		todos: state.todos,
	}
)

const mapDispatchToProps = (dispatch) => {
	return {
		onTodoChange: (id) => (text) => {
			dispatch(change(text, id))
		},
		onTodoClick: (id) => () => {
			dispatch(remove(id))
		},
		onTodoHidden: (id) => () => {
			dispatch(hidden(id))
		}
	}
}

const TodoList = ({ todos, onTodoChange, onTodoClick, onTodoHidden, ...props }) => {
	return (
		<ul {...props}>
			{
				!!todos.length && todos.map((item, index) => (
					item.visible && <Test
						{...item}
						key={index}
						onClick={onTodoClick(index)}
						onChange={onTodoChange(index)}
						onHidden={onTodoHidden(index)}
					/>
				))
			}
		</ul>
	)
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)