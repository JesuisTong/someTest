import React from 'react';
import Ripple from './ripple';

export default function (Comp) {
	return () => (
		<Ripple>
			{Comp}
		</Ripple>
	)
}

