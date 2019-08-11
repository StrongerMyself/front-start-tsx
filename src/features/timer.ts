type TimerDirec = ('forward' | 'backward')

export class Timer {
	ms = 1
	sec = 0
	min = 0
	hou = 0
	day = 0
	duration = 0
	timer
	sideLoop
	sideStart
	sideStop
	sideEndLoop

	constructor(loop?, start?, stop?, end?) {
		this.sideLoop = loop
		this.sideStart = start
		this.sideStop = stop
		this.sideEndLoop = end
	}

	private forwardLoop = () => {
		if (this.duration > 0 && this.duration <= this.sec ) {
			this.endLoop()
		} else {
			if (this.ms < 99) {
				this.ms++
			} else {
				this.ms = 0
				this.sec++
				if (this.sec >= 60) {
					this.sec = 0
					this.min++
					if (this.min >= 60) {
						this.min = 0
						this.hou++
						if (this.hou >= 24) {
							this.hou = 0
							this.day++
						}
					}
				}
			}
			if (this.sideLoop) this.sideLoop(this)
			// console.log(`loop: ${this.hou}:${this.min}:${this.sec}.${this.ms}`)
		}
	}

	private backwardLoop = () => {
		if (this.duration <= 0 && this.ms <= 0) {
			this.endLoop()
		} else {
			if (this.ms > 0) {
				this.ms--
			} else {
				this.ms = 99
				this.sec--
				this.duration--
				let _min = Math.floor(this.duration / 60) % 60
				if (this.sec <= 0 && _min > 0) {
					this.sec = 59
					this.min--
					let _hou = Math.floor(this.duration / 60 / 60)
					if (this.min <= 0 && _hou > 0) {
						this.min = 59
						this.hou--
						let _day = Math.floor(this.duration / 60 / 60 / 24)
						if (this.hou <= 0 && _day > 0) {
							this.hou = 23
							this.day--
						}
					}
				}
			}
			if (this.sideLoop) this.sideLoop(this)
			// console.log(`loop: ${this.hou}:${this.min}:${this.sec}.${this.ms}`)
		}
	}

	private forward = () => {
		this.duration = 0
		this.ms = 0
		this.sec = 0
		this.min = 0
		this.hou = 0
		this.day = 0
		this.timer = setInterval(this.forwardLoop, 10)
		if (this.sideStart) this.sideStart(this)
	}

	private backward = () => {
		this.day = Math.floor(this.duration / 60 / 60 / 24)
		this.hou = Math.floor(this.duration / 60 / 60)
		this.min = Math.floor(this.duration / 60) % 60
		this.sec = Math.floor(this.duration - this.min * 60)
		this.timer = setInterval(this.backwardLoop, 10)
		if (this.sideStart) this.sideStart(this)
	}

	start = (duration = this.duration, direct: TimerDirec = 'forward') => {
		this.duration = duration
		clearInterval(this.timer)
		if (direct === 'forward') {
			this.forward()
		} else if ('backward') {
			this.backward()
		}
	}

	stop = () => {
		clearInterval(this.timer)
		if (this.sideStop) this.sideStop(this)
		// console.log(`stop: ${this.hou}:${this.min}:${this.sec}.${this.ms}`)
	}

	endLoop = () => {
		clearInterval(this.timer)
		if (this.sideEndLoop) this.sideEndLoop(this)
		// console.log(`endLoop: ${this.hou}:${this.min}:${this.sec}.${this.ms}`)
	}
}

