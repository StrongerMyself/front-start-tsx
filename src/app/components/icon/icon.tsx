import React, { FunctionComponent } from 'react'
import iconObjectData from './icon-object.data'
import iconActionsData from './icon-actions.data'

const data = {
	...iconObjectData,
	...iconActionsData,
}

export interface IconProps {
	className?: string
	onClick?: (e) => void
	icon: keyof typeof data
	width?: string
	height?: string
	stroke?: string
	fill?: string
	style?: object
}

export const Icon: FunctionComponent<IconProps> = ({
	className, onClick, icon = '', width, height, stroke, fill, style
}) => {

	const getProps = (item) => {
		width = width || item.width || '0px'
		height = height || item.height || '0px'

		stroke = stroke || item.stroke || 'none'
		fill = fill || item.fill || 'none'
		style = style || item.style || {}

		return {
			svgProp: { width, height },
			pathProp: { style, fill, stroke },
		}
	}

	const item = data[icon] || {}
	const { viewBox, paths } = item
	const { svgProp, pathProp } = getProps(item)

	return (
		<div className={className} onClick={onClick}>
			<svg viewBox={viewBox} {...svgProp}>
				{ paths && (paths.map((el: string, i: number) =>
					<path key={i} d={el} {...pathProp} />
				))}
			</svg>
		</div>
	)
}
