import React from 'react';
import TodoList from 'containers/TodoList';
import Composition from 'containers/Composition';

function List() {
	return (
		<div>
          <Composition />
          <TodoList />
        </div>
	)
}

export default List;