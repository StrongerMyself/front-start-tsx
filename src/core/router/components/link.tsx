import React, { FunctionComponent } from 'react'
import { location } from '../'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Link: FunctionComponent<Props> = ({
	onClick: _onClick, ...props
}) => {

	const onClick = (e) => {
		e.preventDefault()
		location.push(props.href)
		_onClick && _onClick(e)
	}

	return (
		<a {...props} onClick={onClick}/>
	)
}

Link.displayName = 'Link'