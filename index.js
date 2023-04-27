module.exports = {
	name: "Countdown - ioan",
	description: "Shows a customizeable countdown to a target date / time",
	category: "Time",
	icon: "stopwatch",
	hasEntries: false,
	default: {
		style: {
			horizontal_position: "left",
			vertical_position: "top",
			width: "50"
		},
		props: {
			type: "timer",
			seconds: "00:00",
			count_up: true,
			running: false,
			format: "$MM:$SS",
			redbtn: false
		}
	},
	props: [
		{
			name: "teamAname",
			description: "Team A name",
			type: "String"
		},
		{
			name: "teamBname",
			description: "Team B name",
			type: "String"
		},
		{
			name: "colorA",  //COLOUR INPUT A
			description: "Team A Colour",
			type: "ColorPicker"
		},
		{
			name: "colorB",  //COLOUR INPUT B
			description: "Team B Colour",
			type: "ColorPicker"
		},
		{
			name: "scoreA",
			description: "Team A score",
			type: "Number"
		},
		{
			name: "scoreB",
			description: "Team B score",
			type: "Number"
		},
		{
			name: "running",
			description: "Timer is running",
			type: "Radio",
			options: [
				{
					name: "Running",
					value: true
				},
				{
					name: "Paused",
					value: false
				}
			]
		},
		{
			name: "redbtn",
			description: "Red Timer box",
			type: "Radio",
			options: [
				{
					name: "On",
					value: true
				},
				{
					name: "Off",
					value: false
				}
			]
		},
		{
			name: "type",
			description:
				"Timer type",
			type: "Radio",
			options: [
				{
					name: "Countdown",
					value: "countdown"
				},
				{
					name: "Timer",
					value: "timer"
				}
			]
		},
		{
			name: "seconds",
			description: "Start time",
			type: "String"
		},
		{
			name: "count_up",
			description: "Continue counting after reaching 0",
			type: "Radio",
			options: [
				{
					name: "Stop at zero",
					value: false
				},
				{
					name: "Continue",
					value: true
				}
			]
		},
		{
			name: "format",
			description: "Countdown format",
			type: "Select",
			options: [
				{
					name: "Time in words",
					value: "humanize"
				},
				{
					name: "D days HH hours MM minutes SS seconds",
					value: "$D days $HH hours $MM minutes $SS seconds"
				},
				{
					name: "D:HH:MM:SS",
					value: "$D:$HH:$MM:$SS"
				},
				{
					name: "HH:MM:SS",
					value: "$HH:$MM:$SS"
				},
				{
					name: "MM:SS",
					value: "$MM:$SS"
				},
				{
					name: "M:S",
					value: "$M:$S"
				},
				{
					name: "Custom format",
					value: "custom"
				}
			]
		}
	],
	// methods: {
	// 	pauseresume () {
	// 		this.props.running = !this.props.running
	// 		this.save()
	// 		return true
	// 	}
	// },
	// actions: [
	// 	{
	// 		name: "pauseresume",
	// 		title: "Pause / resume",
	// 		description: "Pause / resume the countdown clock (will not adjust target)",
	// 		type: "Button",
	// 		style: { type: "warning" },
	// 		method: "pauseresume"
	// 	}
	// ],

	//some random comment here
	vue_template: '<div class="countdown"><h2 style=" display: inline; font-size: 1em; padding-left: 135px;">{{teamAname}}</h2><h2 style="display: inline-block; font-size: 1em; margin-left: 20px">{{scoreA}}</h2><h2 style="display: inline-block; font-size: 1em; margin-left: 20px">{{scoreB}}</h2><h2 style=" display: inline; font-size: 1em; padding-left: 145px;">{{teamBname}}</h2><span :style="cssVars" class="counter">{{counter}}</span><div class="teamcolorA" :style="teamAcolor"></div><div class="teamcolorB" :style="teamBcolor"></div></div>',
	vue_component: getFile("component.js").toString(),
	css: ".countdown{font-variant-numeric: tabular-nums; background: url(/mediafiles/score_board.png); background-repeat:no-repeat; padding: 3px 29px!important;} .counter{display: inline-block; margin-left: 35px; width: 62px; height: 49px;} .teamcolorA{ display: inline-block; height: 5px; width: 35px;} .teamcolorB{ display: inline-block; height: 5px; width: 35px;} "
}