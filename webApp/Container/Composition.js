import React from 'react';
import { connect } from 'react-redux';
import ADD from 'components/addBanner';
import SHOW from 'components/showBanner';
import { add, showAll } from 'Redx/action';


const mapDispatchToProps = (dispatch) => ({
	onTodoAdd: () => {
		dispatch(add())
	},
	onTodoShowAll: () => {
		dispatch(showAll())
	}
});

const Compose = ({ onTodoAdd, onTodoShowAll }) => (
	<div>
		<ADD onClick={onTodoAdd} />
		<SHOW onClick={onTodoShowAll} />
	</div>

)

export default connect(null, mapDispatchToProps)(Compose);
