import React, { FunctionComponent, useEffect, useState } from 'react'
import { location } from '../'
import { validPath } from '../services'

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	activeClass?: string
	exact?: boolean
}

export const NavLink: FunctionComponent<NavLinkProps> = ({
	className: _className,
	onClick: _onClick,
	activeClass = '',
	exact = false,
	...props
}) => {
	const checkActive = (_loc: string = location.store.getState()) => {
		let loc = validPath(_loc)
		let str = _className
		let { href } = props
		let isActive = exact ? loc === href : loc.indexOf(href) === 0
		str += (isActive && activeClass) ? ` ${activeClass}` : ''
		return str
	}

	const [className, setClassName] = useState(checkActive)

	useEffect(() => location.store.watch(onWatch), [])

	const onWatch = (loc: string) => {
		let str = checkActive(loc)
		setClassName(str)
	}

	const onClick = (e) => {
		e.preventDefault()
		location.push(props.href)
		_onClick && _onClick(e)
	}

	return (
		<a {...props} className={className} onClick={onClick}/>
	)
}

NavLink.displayName = 'NavLink'
