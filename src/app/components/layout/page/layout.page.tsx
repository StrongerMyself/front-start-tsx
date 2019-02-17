import * as React from 'react'

interface Props {
	className?: string
}

class LayoutPage extends React.Component<Props, {}> {
	render() {
		let { children, className } = this.props
		return (
			<div className={`page ${className ? className : ''}`}>
				<div className="page__body">
					{children}
				</div>
			</div>
		)
	}
}

export default LayoutPage