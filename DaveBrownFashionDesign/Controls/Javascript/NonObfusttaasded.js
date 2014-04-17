$('body').append('<div id=\"imgHolder\" style=\"visibility:hidden\"></div>');
//$('body').append('<div></div>');
$('.imgHolder').append("<img alt=\" \" src=\"http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=1&amp;pub=5574903514&amp;toolid=10001&amp;campid=5336638736&amp;customid=&amp;ipn=psmain&amp;icep_vectorid=229466&amp;kwid=902099&amp;mtid=824&amp;kw=lg\" ></img>");
//var img = $(document).createElement("img");
//img.setAttribute("alt", " ");
//img.setAttribute("src", "http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=1&amp;pub=5574903514&amp;toolid=10001&amp;campid=5336638736&amp;customid=&amp;ipn=psmain&amp;icep_vectorid=229466&amp;kwid=902099&amp;mtid=824&amp;kw=lg");
//div.appendChild(img);

/*

var img1=document.createElement("img");
img1.setAttribute("alt", " ");
img1.setAttribute("src", "http://affiliate.buy.com/gateway.aspx?adid=17662&aid=10389803&pid=3914369");
div.appendChild(img1);

var img2=document.createElement("img");
img2.setAttribute("alt", " ");
img2.setAttribute("src", "http://www.endless.com/?_encoding=UTF8&amp;tag=davebrowphot-20");
div.appendChild(img2);

var img3=document.createElement("img");
img3.setAttribute("alt", " ");
img3.setAttribute("src", "http://www.bestbuy.com/?AID=10515337&amp;PID=3914369&amp;ref=39&amp;loc=01");
div.appendChild(img3);

var img4=document.createElement("img");
img4.setAttribute("alt", " ");
img4.setAttribute("src", "http://www.amazon.com/?_encoding=UTF8&amp;tag=davebrowphot-20");
div.appendChild(img4);


	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
if(!dojo._hasResource["dojox.math.round"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.math.round"] = true;
dojo.provide("dojox.math.round");
dojo.experimental("dojox.math.round");

dojox.math.round = function(value, places,increment){
	//	summary:
	//		Similar to dojo.number.round, but compensates for binary floating point artifacts
	//	description:
	//		Rounds to the nearest value with the given number of decimal places, away from zero if equal,
	//		similar to Number.toFixed().  Rounding can be done by fractional increments also.
	//		Makes minor adjustments to accommodate for precision errors due to binary floating point representation
	//		of Javascript Numbers.  See http://speleotrove.com/decimal/decifaq.html for more information.
	//		Because of this adjustment, the rounding may not be mathematically correct for full precision
	//		floating point values.  The calculations assume 14 significant figures, so the accuracy will
	//		be limited to a certain number of decimal places preserved will vary with the magnitude of
	//		the input.  This is not a substitute for decimal arithmetic.
	//	value:
	//		The number to round
	//	places:
	//		The number of decimal places where rounding takes place.  Defaults to 0 for whole rounding.
	//		Must be non-negative.
	//	increment:
	//		Rounds next place to nearest value of increment/10.  10 by default.
	//	example:
	//		>>> 4.8-(1.1+2.2)
	//		1.4999999999999996
	//		>>> Math.round(4.8-(1.1+2.2))
	//		1
	//		>>> dojox.math.round(4.8-(1.1+2.2))
	//		2
	//		>>> ((4.8-(1.1+2.2))/100)
	//		0.014999999999999996
	//		>>> ((4.8-(1.1+2.2))/100).toFixed(2)
	//		"0.01"
	//		>>> dojox.math.round((4.8-(1.1+2.2))/100,2)
	//		0.02
	//		>>> dojox.math.round(10.71, 0, 2.5)
	//		10.75
	//		>>> dojo.number.round(162.295, 2)
	//		162.29
	//		>>> dojox.math.round(162.295, 2)
	//		162.3
	/*
	var wholeFigs = Math.log(Math.abs(value))/Math.log(10);
	var factor = 10 / (increment || 10);
	var delta = Math.pow(10, -15 + wholeFigs);
	return (factor * (+value + (value > 0 ? delta : -delta))).toFixed(places) / factor; // Number
}

if((0.9).toFixed() == 0){
	// (isIE) toFixed() bug workaround: Rounding fails on IE when most significant digit
	// is just after the rounding place and is >=5
	(function(){
		var round = dojox.math.round;
		dojox.math.round = function(v, p, m){
			var d = Math.pow(10, -p || 0), a = Math.abs(v);
			if(!v || a >= d || a * Math.pow(10, p + 1) < 5){
				d = 0;
			}
			return round(v, p, m) + (v > 0 ? d : -d);
		}
	})();
}

}*/

