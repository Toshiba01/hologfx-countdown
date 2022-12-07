// Receives the widget, widgetModule and entries as props.
export default {
	data() {
		return {
			counter: "",
			teamAname:"",
			scoreA: 0,
			scoreB: 0,
			teamBname:"",
			secondsRemaining: "",
			bgColor: "",
			colorA:"",
			colorB:"",
			target: moment()
		}
	},
	computed: {
		running() {
			return this.widget.props.running
		},
		cssVars() {
			return {
			  'background': this.bgColor, 
			}
		  },
		teamAcolor() {  								//HERE IS THE CODE TO EXCHANGE THE PROPS FROM INDEX TO COMPONENT
			return {
				'background': this.widget.props.colorA,
			}
		},
		teamBcolor() {  								//HERE IS THE CODE TO EXCHANGE THE PROPS FROM INDEX TO COMPONENT
			return {
				'background': this.widget.props.colorB,
			}
		}
	},
	watch: {
		running: function(isRunning, wasRunning) {
			if (wasRunning && !isRunning) {
				this.secondsRemaining = this.target.diff(moment(), "seconds")
			}
			if (!wasRunning && isRunning) {
				this.setTarget()
				this.setCounter()
			}
		}
	},
	mounted() {
		var msIn = this.widget.props.seconds.toString() 
		this.secondsRemaining = Number(- + msIn.split(':').reduce((acc,time) => (60 * acc) + +time)) //this.widget.props.seconds
		this.setTarget()
		this.setCounter()
		this.setTeam()
		this.setScore()
		this.setRedBg()
		this.setTeamColor() 								// ADD THIS FOR TEAM COLOURS
		
	},
	sockets: {
		state() {
			this.$nextTick(() => {
				if (this.running) this.setCounter()
				
			})
		}
	},
	methods: {
		setTeamColor: function() { 							//HERE IS THE FUNCTION TO SET THE TEAMS COLOURS 
			this.colorA = this.widget.props.colorA
			this.colorB = this.widget.props.colorB
			//console.log(this.colorA)
			
		},
		setRedBg: function() {
			if (this.widget.props.redbtn !== false) {
				this.bgColor = "red"
			} else {
				this.bgColor = ""
			}
			setTimeout(this.setRedBg, 500)
		},
		setScore: function() {
			if (this.widget.props.scoreA !== "") {
				this.scoreA = this.widget.props.scoreA
				this.scoreB = this.widget.props.scoreB
			} 
			setTimeout(this.setScore, 500)
		},
		setTeam: function() {
			if (this.widget.props.teamAname !== "") {
				this.teamAname = this.widget.props.teamAname
				this.teamBname = this.widget.props.teamBname
			} 
			setTimeout(this.setTeam, 500)
		},
		setTarget: function() {
			if (this.widget.props.type === "timer") {
				//var msIn = this.widget.props.seconds.toString() // OLD DO NOT USE
				//this.target = moment().add(- + msIn.split(':').reduce((acc,time) => (60 * acc) + +time),"s")//OLD DO NOT USE //this.widget.props.seconds == input of time in seconds
				this.target = moment().add(this.secondsRemaining, "s")
				console.log("Left in seconds:", this.secondsRemaining)
			} else {
				var msIn = this.widget.props.seconds.toString()
				this.target = moment().add(msIn.split(':').reduce((acc,time) => (60 * acc) + +time),"s")
			}
		},
		setCounter: function() {
			// Get the time between now and the target time
			var now = moment()

			if (now.isAfter(this.target) && this.widget.props.count_up) {
				var duration = moment.duration(now.diff(this.target))
			} else if (now.isAfter(this.target) && !this.widget.props.count_up) {
				var duration = moment.duration(0)
			} else {
				var duration = moment.duration(this.target.diff(now))
			}

			// Calculate parts
			var S = Math.floor((duration / 1000) % 60)
			var M = Math.floor((duration / 1000 / 60) % 60)
			var H = Math.floor((duration / (1000 * 60 * 60)) % 24)
			var D = Math.floor(duration / (1000 * 60 * 60 * 24))

			// Add leading zeroes
			var SS = S.toString().padStart(2, "0")
			var MM = M.toString().padStart(2, "0")
			var HH = H.toString().padStart(2, "0")
			var DD = D.toString().padStart(2, "0")

			function applyFormat(string) {
				string = string.replace("$DD", DD)
				string = string.replace("$HH", HH)
				string = string.replace("$MM", MM)
				string = string.replace("$SS", SS)
				string = string.replace("$D", D)
				string = string.replace("$H", H)
				string = string.replace("$M", M)
				string = string.replace("$S", S)
				return string
			}

			if (this.widget.props.format === "custom") {
				this.counter = applyFormat(this.widget.props.customformat)
			} else if (this.widget.props.format === "humanize") {
				if (now.isAfter(this.target) && !this.widget.props.count_up)
					this.counter = "now"
				else if (now.isAfter(this.target) && this.widget.props.count_up)
					this.counter = moment.duration(-duration).humanize(true)
				else this.counter = duration.humanize(true)
			} else {
				this.counter = applyFormat(this.widget.props.format)
			}

			if (!this.running) return
			setTimeout(this.setCounter, 100)
		}
	}
}
