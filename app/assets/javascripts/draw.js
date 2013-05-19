draw = function (data) {
	barcolors = ["#e43724", "#f2cb05", "#734e81", "#8fbf26", "#02878f"];

	maximum = data[0].number + (data[0].number / 2);
	chartWidth = 400;
	chartHeight = 400;
	if (data.length > 12) {
		chartWidth = 400;
		chartHeight = 500;
	}
	else if (data.length < 6) {
		chartWidth = 400;
		chartHeight = 200;
	}

	//this function is that there are not 2 colors in one row
	var old = 0;

	var capitaliseFirstLetter = function (formatString) {
		formatString.toLowerCase();
		var string = formatString;
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function getRandomNumber() {
		do {
			neu = Math.floor(Math.random() * 4);
		} while (neu == old)
		old = neu;
		return neu;
	}

	function fin() {
		if (this.value < maximum) {
			//this.flag = r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
			this.bar.attr("stroke", "#000000");

		}
	}

	;
	//this function is for hover out
	function fout() {
		/*if (this.value < maximum) {
		 this.flag.animate({opacity:0}, 300, function () {
		 this.remove();
		 });
		 }*/
		this.bar.attr("stroke", "#ffffff");

	}

	;

	var info = function () {
		if (this.value < maximum) {
			$("#infoheader").text(this.bar.value + " Eltern nannten ihr Kind: " + this.name);
			$("#infoheader").append('<p id=wikipedia>Informationen aus Wikipedia:</p>');
			wiki(this.name.toLowerCase());
		}
	}

	wiki = function (name) {
		$('#infocontainer').empty();
		$('#infocontainer').append('<div id=info></div>');
		$.getJSON("http://de.wikipedia.org/w/api.php?action=parse&format=json&callback=?", {page:name, prop:"text"}, function (data) {
			$('#info').html(data.parse.text["*"]);
			$("#info").find("a:not(.references a)").attr("href", function () {
				return "http://www.de.wikipedia.org" + $(this).attr("href");
			});
			$("#info").find("a").attr("target", "_blank");
			$("#info table").remove();
			$("#info img").remove();
			$('.editsection').remove();
		});
	}

	var r = Raphael("chart", chartWidth, chartHeight);

	/* to get JSON Data into two arrays -> needed for the barchart function*/
	number = [];
	firstname = [];
	reset = [];
	for (key in data) {
		number[key] = data[key].number;
		firstname[key] = data[key].name;
		reset[key] = maximum / 100;
	}
	for (key in firstname) {
		firstname[key]= firstname[key].toLowerCase();
		firstname[key]=firstname[key].charAt(0).toUpperCase() + firstname[key].slice(1);
	}

	reset.unshift(maximum);
	number.unshift(maximum);
	firstname.unshift("");

	update = function (newData) {
		var i = firstname.length - 1;
		barChart = r.hbarchart(100, 20, chartWidth - 20, chartHeight - 20, [reset]).each(function () {
			$(this).attr('name', firstname[i]);
    		var d = r.text(90, this.bar.y, firstname[i]).attr({'text-anchor': 'end',"font-family": "Open Sans, sans-serif"});
			i--;
		}).hover(fin, fout).click(info);

		setTimeout(function () {
			animateBar(newData);
		}, 200);

		$("#chart svg path").each(function (index) {
			randomnumber = getRandomNumber();
			$(this).attr("fill", barcolors[randomnumber]);			
			i--;
		});
		barChart.bars[0][0].attr("fill", "#ffffff");
	}
	animateBar = function (array) {
		//First, create a new bar chart
		// i is for the names-> put them on the left side of the bars
		barChart2 = r.hbarchart(100, 20, chartWidth - 20, chartHeight - 20, [array]);
		//random color to each bar
		barChart2.bars[0][0].attr("fill", "#ffffff");
		//Then for each bar in our chart (c), animate to our new chart's path (c2)
		$.each(barChart.bars[0], function (k, v) {
			v.animate({ path:barChart2.bars[0][k].attr("path") }, 500);
			v.value = array[k];
		});
		barChart.bars[0][0].attr("fill", "#ffffff");

		//Now remove the new chart
		barChart2.remove();
	};
	update(number);
	$('rect').css('cursor','pointer');
};