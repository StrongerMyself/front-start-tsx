import * as React from 'react'

export interface OutsideClickProps {
	hide?: boolean
	onToggle?: Function
}

export interface OutsideClickState {
	hide?: boolean
}

class OutsideClick<
	P extends OutsideClickProps,
	S extends OutsideClickState
> extends React.Component<P, S> {

	outsideRef: React.RefObject<HTMLDivElement> = React.createRef()

	componentDidMount() {
		document.addEventListener('mousedown', this.onClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.onClickOutside)
	}

	get hide(): boolean {
		return this.props.hide !== undefined ? this.props.hide : this.state.hide
	}

	checkContains = (e): boolean => {
		let outsideRef = this.outsideRef.current
		return !outsideRef.contains(e.target)
	}

	onToggle = () => {
		let { onToggle } = this.props
		if (onToggle) onToggle()
	}

	onClickOutside = (e) => {
		if (!this.hide && this.checkContains(e)) {
			this.onToggle()
		}
	}

}

export default OutsideClick
