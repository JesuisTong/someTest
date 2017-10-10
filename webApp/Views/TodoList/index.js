import React from 'react';
import TodoList from 'containers/TodoList';
import Composition from 'containers/Composition';

export default function() {
	return (
		<div>
          <Composition />
          <TodoList />
        </div>
	)
}