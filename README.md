# CSE4471 - Info Security Password Rater

This tool is a password rater written in HTML, CSS, and JavaScript. We have implemented our own unique rating system. Furthermore, it makes use of the 'zxcvbn' script provided by DropBox for password metrics. Type in your test password to the box to view its many ratings. Below the metrics you can chart the performance of the password by clicking "Chart it".

##Project Files

- __/bootstrap__ - Directory where all necessary Bootstrap files are stored.  Used for styling of the password rater website.
- __all.js__ - Main scripting file written by our group.  Contains code for our password rating system, incorporation of the 'zxcvbn' rating system, and charting.
- __index.html__ - Where the layout of the website is constructed.  HTML tag elements are called upon here by their id's in the 'all.js' script to dynamically populate the site when entering a password.
- __stylesheet.css__ - Styling of elements is contained in this main stylesheet.
- __zxcvbn.js__ - Script for the Dropbox 'zxcvbn' function to use its rating system and output the results.

##Authors
- Andrew McSurley
- Trevor Stockert
- Joey Dye
- Kyle Gordon
- Sam Maddox

