import React, { FunctionComponent } from 'react'

interface Props {
	className?: string
}

const LayoutPage: FunctionComponent<Props> = ({ children, className }) => {
	return (
		<div className={`page${className ? ` ${className}` : ''}`}>
			<div className="page__body">
				{children}
			</div>
		</div>
	)
}

export default LayoutPage