
document.getElementById("progressBar").style.visibility = "hidden";

//Rounds guess times
function round(n, x) {
    return Math.round(n * Math.pow(10, x)) / Math.pow(10, x);
  }

//Test for special characters
function checkSpecial(s){
	var specialChars = new RegExp(/[~_-`\(\)\@\!#$%\^&*+=\-\[\]\\';,./{}|\\":<>\?]/);
	if(specialChars.test(s)){
		return true;
	}
	return false;
}
var passwordLength = 6;
var doubleCount = 256;
var consecCount = 256;

var socMedia = 0;
var email = 0;
var bank = 0;

function passDefault(){
	passwordLength = 6;
	socMedia = 0;
	email = 0;
	bank = 0;
	doubleCount = 2;
	consecCount = 2;
	document.getElementById("pw-bar").value = "";
	document.getElementById("progressBar").style.width = "0%";
	$("#myCarousel").carousel(0);
	$("#myCarousel").carousel("pause");
}
function eight (){
	passwordLength = 8;
	consecCount = 4;
	socMedia = 1;
	email = 0;
	bank = 0;
	document.getElementById("pw-bar").value = "";
	document.getElementById("progressBar").style.width = "0%";
	$("#myCarousel").carousel(1);
	$("#myCarousel").carousel("pause"); 
}
function twelve (){
	passwordLength = 12;
	doubleCount = 4;
	consecCount = 2;
	socMedia = 0;
	email = 1;
	bank = 0;
	document.getElementById("pw-bar").value = "";
	document.getElementById("progressBar").style.width = "0%";
	$("#myCarousel").carousel(2);
	$("#myCarousel").carousel("pause"); 
}
function twentyFour (){
	passwordLength = 24;
	doubleCount = 2;
	consecCount = 0;
	socMedia = 0;
	email = 0;
	bank = 1;
	document.getElementById("pw-bar").value = "";
	document.getElementById("progressBar").style.width = "0%";
	$("#myCarousel").carousel(3);
	$("#myCarousel").carousel("pause"); 

}
function thirtyTwo (){
	passwordLength = 32;
	doubleCount = 0;
	consecCount = 0;
	socMedia = 0;
	email = 0;
	bank = 0;	
	document.getElementById("pw-bar").value = "";
	document.getElementById("progressBar").style.width = "0%";
	$("#myCarousel").carousel(4);
	$("#myCarousel").carousel("pause"); 

}

//Gets results for a specified password
function getResults() {
	//Grab password
	var pw = document.getElementById("pw-bar").value;

	//Checks if password has been given
	if (pw.length == 0){
		document.getElementById("results").innerHTML = "";
		document.getElementById("ourResults").innerHTML = "";

		document.getElementById("chart-btn").disabled = true;
		
		document.getElementById("progressBar").style.visibility = "hidden";

	}
	else{

	document.getElementById("progressBar").style.visibility = "visible";
	
	//Make chart button clickable
	document.getElementById("chart-btn").disabled = false;

	//parse string
	var num = 0;
	var lowerCase = 0;
	var upperCase = 0;
	var specialChars = 0; 
	
	var length = pw.length;
	for (i = 0; i < length; i++){
		if(!isNaN(pw[i])){
			num += 1;
		} else if (checkSpecial(pw[i])){
			specialChars += 1;
		} else if (pw[i] == pw[i].toUpperCase()){
			upperCase += 1;
		} else if (pw[i] == pw[i].toLowerCase()){
			lowerCase += 1;
		}
	}
	
	// default minum requirements: length of 6. 
	// ranges from: very weak, weak, okay, good, very good, strong, very strong
	// very weak: < 3 out of the 4 types
	// weak: only 3 out of the 4 types
	// okay: 4 out of the 4 types
	// good: 4 out of the 4 types with > 1 of the type for 3 of the 4
	// very good: 4 out of the 4 types with > 1 for all types
	// strong: > 2 for all types and  <= 2 double characters
	// very strong: > 3 for all types, <= 2 double characters and <= 2 consecutive characters
	
	var consec = 0;
	var consecutiveChars = new RegExp(/ZX|XC|CV|VB|BN|NM|AS|SD|DF|FG|GH|HJ|JK|KL|QW|WE|ER|RT|TY|YU|UI|IO|OP|zx|xc|cv|bn|nm|as|sd|df|fg|gh|hj|jk|kl|qw|we|er|rt|ty|yu|ui|io|op|12|23|34|45|56|67|78|89|90|01/);
	for(k=0; k < length-1; k++){
		var check = pw[k] + pw[k+1];
		if(consecutiveChars.test(check)){
			consec += 1;
		}
	}
	
	var doubleChar = 0;
	for(i=0; i < length-1; i++){
		for(j=i+1; j < length; j++){
			if(pw[i] == pw[j]){
				doubleChar += 1;
			}
		}
	}
	
	var score = 'Too Short';
	
	document.getElementById("progressBar").innerHTML = "0%";
	document.getElementById("progressBar").style.width = "0%";
	
	if(length >= passwordLength){
		score = 'very weak'
		document.getElementById("progressBar").innerHTML = "very weak";
		document.getElementById("progressBar").style.width = "20%";
		document.getElementById("progressBar").style.backgroundColor = "red";

		if((num > 0 && upperCase > 0 && lowerCase > 0) || (num > 0 && upperCase > 0 && specialChars > 0) || (specialChars > 0 && upperCase > 0 && lowerCase > 0) || (num > 0 && specialChars > 0 && lowerCase > 0)) {
			
			if(socMedia != 1) {
				score = 'weak';
				document.getElementById("progressBar").innerHTML = "weak";
				document.getElementById("progressBar").style.width = "28.56%";
				document.getElementById("progressBar").style.backgroundColor = "#FC8888";
				if(num >= 1 && upperCase >= 1 && specialChars >= 1 && lowerCase >= 1){
					score = 'okay';
					document.getElementById("progressBar").innerHTML = "okay";
					document.getElementById("progressBar").style.width = "42.84%";
					document.getElementById("progressBar").style.backgroundColor = "orange";
					if((num > 1 && upperCase > 1 && lowerCase > 1) || (num > 1 && upperCase > 1 && specialChars > 1) || (specialChars > 1 && upperCase > 1 && lowerCase > 1) || (num > 1 && specialChars > 1 && lowerCase > 1)) {
						if(email != 1) {
							score = 'good';
							document.getElementById("progressBar").innerHTML = "good";
							document.getElementById("progressBar").style.width = "57.12%";
							document.getElementById("progressBar").style.backgroundColor = "yellow";
							if(num > 1 && upperCase > 1 && specialChars > 1 && lowerCase > 1){
								score = 'very good';
								document.getElementById("progressBar").innerHTML = "very good";
								document.getElementById("progressBar").style.width = "71.4";
								document.getElementById("progressBar").style.backgroundColor = "blue";
								if(num > 2 && upperCase > 2 && specialChars > 2 && lowerCase > 2 && doubleChar <= doubleCount){
									
									if(bank != 1) {
										score = 'strong'
										document.getElementById("progressBar").innerHTML = "strong";
										document.getElementById("progressBar").style.width = "85.68%";
										document.getElementById("progressBar").style.backgroundColor = "#88CCFC";
										if(num > 3 && upperCase > 3 && specialChars > 3 && lowerCase > 3 && consec <= consecCount){
											score = 'very strong'
											document.getElementById("progressBar").innerHTML = "very strong";
											document.getElementById("progressBar").style.width = "100%";
											document.getElementById("progressBar").style.backgroundColor = "green";
										}
									} else {
										
										score = 'very strong'
										document.getElementById("progressBar").innerHTML = "very strong";
										document.getElementById("progressBar").style.width = "100%";
										document.getElementById("progressBar").style.backgroundColor = "green";
									
									}
				
								}
							}
						} else {
						score = 'very strong'
						document.getElementById("progressBar").innerHTML = "very strong";
						document.getElementById("progressBar").style.width = "100%";
						document.getElementById("progressBar").style.backgroundColor = "green";
						}
					} 
				}
			} else {
				
				score = 'very strong'
				document.getElementById("progressBar").innerHTML = "very strong";
				document.getElementById("progressBar").style.width = "100%";
				document.getElementById("progressBar").style.backgroundColor = "green";
				}
		}
	}
	
	document.getElementById("ourResults").innerHTML = "";
	ourResultContent = "<table class=\"well\" align=\"center\"> <tbody> <tr><h4>Results from our password rating system </h4></tr>";
	ourResultContent += "<tr> <td> Password Length: </td> <td>" + length + "</td> </tr>";
	ourResultContent += "<tr> <td> Numbers: </td> <td>" + num + "</td> </tr>";
	ourResultContent += "<tr> <td> Special Characters: </td> <td>" + specialChars + "</td> </tr>";
	ourResultContent += "<tr> <td> Upper Case Letters: </td> <td>" + upperCase + "</td> </tr>";
	ourResultContent += "<tr> <td> Lower Case Letters: </td> <td>" + lowerCase + "</td> </tr>";
	ourResultContent += "<tr> <td> Repeated Characters: </td> <td>" + doubleChar + "</td> </tr>";
	ourResultContent += "<tr> <td> Consectutive Characters: </td> <td>" + consec + "</td> </tr>";
	ourResultContent += "<tr> <td><b> Score: </td> <td>" + score + "</b></td> </tr>";
	ourResultContent += "<tr> <td>  </tbody> </table>";
	document.getElementById("ourResults").innerHTML = ourResultContent;
	
	//Get result obj
	var result = zxcvbn(pw);

	//Clear results container
	document.getElementById("results").innerHTML = "";

	//Round guesses
	result.guesses_log10 = round(result.guesses_log10, 3);
	result.guesses = round(result.guesses, 3);

	//Populate results
	var resultsBox = document.getElementById("results");
	var resultContent = " <table class=\"well\" align=\"center\"> <tbody> <tr><h4>Results from the zxcvbn dropbox database</h4></tr>";
	resultContent += "<tr> <td>Password: </td> <td>" + pw + "</td> </tr>";
	resultContent += "<tr> <td>Your Score Is: </td> <td>" + result.score + "</td> </tr>";
	resultContent += "<tr> <td>Time to Crack: </td> <td>" + result.calc_time + "  (seconds)</td> </tr>";
	resultContent += "<tr> <td>Guesses: </td> <td>" + result.guesses + "</td> </tr>";
	resultContent += "<tr> <td>Guesses_log10: </td> <td>" + result.guesses_log10 + "</td> </tr>";
	resultContent += "<tr> <td>Guess Times: </td> </tr>";
	resultContent += "<tr> <td>Online Throttled Attack: </td> <td>" + result.crack_times_display.online_throttling_100_per_hour + "</td> </tr>";
	resultContent += "<tr> <td>Online, No Throttle Atack: </td> <td>" + result.crack_times_display.online_no_throttling_10_per_second + "</td> </tr>";
	resultContent += "<tr> <td>Offline, Slow Hashing: </td> <td>" + result.crack_times_display.offline_slow_hashing_1e4_per_second + "</td> </tr>";
	resultContent += "<tr> <td>Offline, Fast Hashing: </td> <td>" + result.crack_times_display.offline_fast_hashing_1e10_per_second + "</td> </tr>";
	resultContent += "<tr> <td>Warning for Future Use (Score <= 2): </td> <td>" + result.feedback.warning + "</td> </tr> <tr>";
	resultContent += "<td>Suggestions: </td> <td>" + result.feedback.suggestions + "</td> </tr>";

	resultContent += "</tbody> </table>";
	resultContent += "<h4  align=\"center\">Pattern Matches:</h4>";
	for(i = 0; i < result.sequence.length; i++) {
		resultContent += "<span>";
		resultContent += "<table class=\"well\" align=\"center\"> <tbody>";
		if (result.sequence[i].token){
			resultContent += "<tr> <td> pattern: </td> <td>" + result.sequence[i].token + "</td> </tr>";
		}
		if (result.sequence[i].pattern){
			resultContent += "<tr> <td> type: </td> <td>" + result.sequence[i].pattern + "</td> </tr>";
		}
		if (result.sequence[i].guesses_log10){
			resultContent += "<tr> <td> Guesses_log10: </td> <td>" + round(result.sequence[i].guesses_log10, 3) + "</td> </tr>";
		}
		if (result.sequence[i].dictionary_name){
			resultContent += "<tr> <td> Dictionary Name: </td> <td>" + result.sequence[i].dictionary_name + "</td> </tr>";
		}
		if (result.sequence[i].rank){
			resultContent += "<tr> <td> Rank: </td> <td>" + result.sequence[i].rank + "</td> </tr>";
		}
		if (result.sequence[i].reversed){
			resultContent += "<tr> <td> Reversed: </td> <td>" + result.sequence[i].reversed + "</td> </tr>";
		}
		if (result.sequence[i].base_guesses){
			resultContent += "<tr> <td> Base Guesses: </td> <td>" + result.sequence[i].base_guesses + "</td> </tr>";
		}
		if (result.sequence[i].uppercase_variations){
			resultContent += "<tr> <td> Uppercase variations: </td> <td>" + (result.sequence[i].uppercase_variations - 1) + "</td> </tr>";
		}
		if (result.sequence[i].l33t_variations){
			resultContent += "<tr> <td> \"l33t\" variations: </td> <td>" + (result.sequence[i].l33t_variations - 1) + "</td> </tr>";
		}
		if (result.sequence[i].sub_display){
			resultContent += "<tr> <td> \"l33t\" substituion: </td> <td>" + result.sequence[i].sub_display + "</td> </tr>";

		}
		if (result.sequence[i].matched_word){
			resultContent += "<tr> <td> un-\"l33t\" matched word: </td> <td>" + result.sequence[i].matched_word + "</td> </tr>";

		}
		if (result.sequence[i].turns){
			resultContent += "<tr> <td> turns: </td> <td>" + result.sequence[i].turns + "</td> </tr>";
		}
		if (result.sequence[i].month){
			resultContent += "<tr> <td> Month: </td> <td>" + result.sequence[i].month + "</td> </tr>";

		}
		if (result.sequence[i].day){
			resultContent += "<tr> <td> Day: </td> <td>" + result.sequence[i].day + "</td> </tr>";

		}
		if (result.sequence[i].year){
			resultContent += "<tr> <td> Year: </td> <td>" + result.sequence[i].year + "</td> </tr>";

		}

		if (result.sequence[i].regex_name){
			resultContent += "<tr> <td> regex: </td> <td>" + result.sequence[i].regex_name + "</td> </tr>";
		}
		resultContent += "</tbody> </table>";
		resultContent += "</span>";
	}

	
	resultsBox.innerHTML = resultContent;
	//Add button to chart
	//resultsBox.innerHTML = resultsBox.innerHTML + "<input id=\"chart-btn\" type=\"button\" value=\"Chart It\">";

	document.getElementById("results").innerHTML = resultsBox.innerHTML;
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
        //ctx.fillText(this.datasets[0].label, 0, 0);
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
        data: [5]
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
        data: [0.5]
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
	guessesChart.addData([round(result.guesses_log10, 0)], pw.toString());
	attacksChart.addData([round(c4, 0)], pw.toString());

	//Re-renders the charts w/ updated values
	guessesChart.update();
	attacksChart.update();
};
