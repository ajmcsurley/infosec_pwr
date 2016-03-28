function round(n, x) {
    return Math.round(n * Math.pow(10, x)) / Math.pow(10, x);
  }

function getResults() {
	//Grab password
	var pw = document.getElementById("pw-bar").value;
	if (pw.length == 0){
		document.getElementById("results").innerHTML = "";
	}
	else{

	var result = zxcvbn(pw);

	//Clear results container
	document.getElementById("results").innerHTML = "";

	//Round guesses
	result.guesses_log10 = round(result.guesses_log10, 3);

	//Populate results
	var resultsBox = document.getElementById("results");
	resultsBox.innerHTML = " <table> <tbody> <tr> <td>Password: </td> <td>" + pw + "</td> </tr> <tr> <td>Your Score Is: </td> <td>" + result.score + "</td> </tr> <tr> <td>Time to Crack: </td> <td>" + result.calc_time + "</td> </tr> <tr> <td>Guesses: </td> <td>" + result.guesses + "</td> </tr> <tr> <td>Guesses_log10: </td> <td>" + result.guesses_log10 + "</td> </tr> <tr> <td>Guess Times: </td> </tr> <tr> <td>Online Throttled Attack: </td> <td>" + result.crack_times_display.online_throttling_100_per_hour + "</td> </tr> <tr> <td>Online, No Throttle Atack: </td> <td>" + result.crack_times_display.online_no_throttling_10_per_second + "</td> </tr> <tr> <td>Offline, Slow Hashing: </td> <td>" + result.crack_times_display.offline_slow_hashing_1e4_per_second + "</td> </tr> <tr> <td>Offline, Fast Hashing: </td> <td>" + result.crack_times_display.offline_fast_hashing_1e10_per_second + "</td> </tr> <tr> <td>Warning for Future Use (Score <= 2): </td> <td>" + result.feedback.warning + "</td> </tr> <tr> <td>Suggestions: </td> <td>" + result.feedback.suggestions + "</td> </tr> </tbody> </table>"
	document.getElementById("results").innerHTML = resultsBox.innerHTML;
	}
}
