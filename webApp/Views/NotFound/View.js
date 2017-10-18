import s from './index.less';

export default function () {
	return (
		<div className={s['not-found']}>
			<i className={`material-icons material-icons.md-48 ${s.icon}`}>warning</i>
			<div className={s.dialog}>你可能进入了未知的领域</div>
		</div>
	);
}