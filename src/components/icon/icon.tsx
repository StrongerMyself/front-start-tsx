import React, { FunctionComponent } from 'react'
import iconActionsData from './data'

const data = {
	...iconActionsData,
}

export type IconList = keyof typeof data

export interface IconProps {
	className?: string
	onClick?: (e) => void
	icon: IconList
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
