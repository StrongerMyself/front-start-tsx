export default [
	{
		id: 1,
		title: 'Warm up',
		timer: null,
		active: false,
		rounds: [
			{ id: 1, parent: 1, title: '', dur: 30, rest: 30, durPass: 30, restPass: 30, active: false },
			{ id: 2, parent: 1, title: '', dur: 30, rest: 30, durPass: 30, restPass: 30, active: false },
			{ id: 3, parent: 1, title: '', dur: 30, rest: 30, durPass: 30, restPass: 30, active: false },
		],
	},
	{
		id: 2,
		title: 'Boxing',
		timer: null,
		active: false,
		rounds: [
			{ id: 3, parent: 2, title: '', dur: 5, rest: 5, durPass: 5, restPass: 5, active: false },
			{ id: 4, parent: 2, title: '', dur: 5, rest: 5, durPass: 5, restPass: 5, active: false },
			{ id: 5, parent: 2, title: '', dur: 5, rest: 5, durPass: 5, restPass: 5, active: false },
		],
	},
	{
		id: 3,
		title: 'Wrestling',
		timer: null,
		active: false,
		rounds: [
			{ id: 4, parent: 3, title: '', dur: 2, rest: 2, durPass: 2, restPass: 2, active: false },
			{ id: 5, parent: 3, title: '', dur: 2, rest: 2, durPass: 2, restPass: 2, active: false },
			{ id: 6, parent: 3, title: '', dur: 2, rest: 2, durPass: 2, restPass: 2, active: false },
		],
	},
]
