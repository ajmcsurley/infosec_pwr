//Rounds guess times
function round(n, x) {
    return Math.round(n * Math.pow(10, x)) / Math.pow(10, x);
  }

//Gets results for a specified password
function getResults() {
	//Grab password
	var pw = document.getElementById("pw-bar").value;

	//Checks if password has been given
	if (pw.length == 0){
		document.getElementById("results").innerHTML = "";

		document.getElementById("chart-btn").disabled = true;
	}
	else{

	//Make chart button clickable
	document.getElementById("chart-btn").disabled = false;

	//Get result obj
	var result = zxcvbn(pw);

	//Clear results container
	document.getElementById("results").innerHTML = "";

	//Round guesses
	result.guesses_log10 = round(result.guesses_log10, 3);
	result.guesses = round(result.guesses, 3);

	//Populate results
	var resultsBox = document.getElementById("results");
	resultsBox.innerHTML = " <table align=\"center\"> <tbody> <tr> <td>Password: </td> <td>" + pw + "</td> </tr> <tr> <td>Your Score Is: </td> <td>" + result.score + "</td> </tr> <tr> <td>Time to Crack: </td> <td>" + result.calc_time + "</td> </tr> <tr> <td>Guesses: </td> <td>" + result.guesses + "</td> </tr> <tr> <td>Guesses_log10: </td> <td>" + result.guesses_log10 + "</td> </tr> <tr> <td>Guess Times: </td> </tr> <tr> <td>Online Throttled Attack: </td> <td>" + result.crack_times_display.online_throttling_100_per_hour + "</td> </tr> <tr> <td>Online, No Throttle Atack: </td> <td>" + result.crack_times_display.online_no_throttling_10_per_second + "</td> </tr> <tr> <td>Offline, Slow Hashing: </td> <td>" + result.crack_times_display.offline_slow_hashing_1e4_per_second + "</td> </tr> <tr> <td>Offline, Fast Hashing: </td> <td>" + result.crack_times_display.offline_fast_hashing_1e10_per_second + "</td> </tr> <tr> <td>Warning for Future Use (Score <= 2): </td> <td>" + result.feedback.warning + "</td> </tr> <tr> <td>Suggestions: </td> <td>" + result.feedback.suggestions + "</td> </tr> <tr> <td>Pattern Matches: </td> </tr> </tbody> </table>"
	
	//Add button to chart
	//resultsBox.innerHTML = resultsBox.innerHTML + "<input id=\"chart-btn\" type=\"button\" value=\"Chart It\">";

	document.getElementById("results").innerHTML = resultsBox.innerHTML;

	//Populate pattern matches
	var patternsBox = document.getElementById("patterns");
	console.log(result.sequence);
	for (var i = 0; i < result.sequence.length; i++){
		if(patterns.sequence[i]){
			console.log(patterns.sequence[i].token);
		}
	}
	//patternsBox.innerHTML = " <table align=\"center\"> <tbody> <tr> <td>"
	}
}

//Override so empty chart will work
/*
Chart.Scale = Chart.Scale.extend({
    calculateX: function (index) {
        //check to ensure data is in chart otherwise we will get inifinity
        if (!(this.valuesCount - (this.offsetGridLines ? 0 : 1))) {
            return 0;
        }
        var isRotated = (this.xLabelRotation > 0),
            // innerWidth = (this.offsetGridLines) ? this.width - offsetLeft - this.padding : this.width - (offsetLeft + halfLabelWidth * 2) - this.padding,
            innerWidth = this.width - (this.xScalePaddingLeft + this.xScalePaddingRight),
            valueWidth = this.valuesCount === 0 ? 0 : innerWidth / (this.valuesCount - ((this.offsetGridLines) ? 0 : 1)),
            valueOffset = (valueWidth * index) + this.xScalePaddingLeft;

        if (this.offsetGridLines) {
            valueOffset += (valueWidth / 2);
        }

        return Math.round(valueOffset);
    },
});*/

//Add Y-Axis
Chart.types.Bar.extend({
    name: "BarAlt",
    draw: function () {
        Chart.types.Bar.prototype.draw.apply(this, arguments);

        var ctx = this.chart.ctx;
        ctx.save();
        // text alignment and color
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = this.options.scaleFontColor;
        // position
        var x = this.scale.xScalePaddingLeft * 0.4;
        var y = this.chart.height / 2;
        // change origin
        ctx.translate(x, y)
        // rotate text
        ctx.rotate(-90 * Math.PI / 180);
        ctx.fillText(this.datasets[0].label, 0, 0);
        ctx.restore();
    }
});


//Set up contexts for charts
var guessesCtx = document.getElementById("guessesChart").getContext("2d");
var attacksCtx = document.getElementById("fastHashChart").getContext("2d");

//Graphs start empty
var data = {
	labels: ["Password"],
  	datasets: [
    // invisible dataset
    {
        label: "# Guesses",
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        data: [10]
    }
	]
};

//Create bar charts
var guessesChart = new Chart(guessesCtx).BarAlt(data, {
	scalelabel: "          <%=value%>"
});

data = {
	labels: ["Password"],
  	datasets: [
    // invisible dataset
    {
        label: "Time (seconds)",
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        data: [10]
    }
	]
};
var attacksChart = new Chart(attacksCtx).BarAlt(data, {
	scalelabel: "          <%=value%>"
});

//Add click event for chart button
var chartBtn = document.getElementById("chart-btn");
chartBtn.onclick = function() {
	//Get result and password values in obj
	var pw = document.getElementById("pw-bar").value;
	var result = zxcvbn(pw);
	console.log(pw);

	//Add bars for guesses and times
	var c1 = result.crack_times_display.online_throttling_100_per_hour;
	var c2 = result.crack_times_display.online_no_throttling_10_per_second;
	var c2 = result.crack_times_display.offline_slow_hashing_1e4_per_second;
	var c4 = result.crack_times_seconds.offline_fast_hashing_1e10_per_second;
	guessesChart.addData([round(result.guesses_log10, 3)], pw.toString());
	attacksChart.addData([round(c4, 3)], pw.toString());

	//Re-renders the charts w/ updated values
	guessesChart.update();
	attacksChart.update();
};
