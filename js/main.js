//JavaScript - Erin J. LeFevre, 2020
//execute script when window is loaded

window.onload = function(){
	
	var dataArray = [10, 20, 30, 40, 50];
	var coordinateArray = [[0,1], [1,2], [2,1], [3,2], [5,3]];
	
	
	createSVG(); //this piece is not in the module

	function createSVG(){  //this is not in the module

		var w = 900, h = 500; //this is not in the module

		var container = d3.select("body") //Select the <body> element from the dom*/
			.append("svg") //put a new svg in the body. .append ("svg")put a new svg in the body
			.attr("width", w) //assign the width
			.attr("height", h) //assign the height
			.attr("class", "container") //assign a class name
			.style("background-color", "rgba(0,0,0,0.1)"); //only put a semicolon at the end of the block!

		//innerRectblock
		var innerRect = container.append("rect") //new rect within the container
			.datum(400) //a single value is a DATUM
			.attr("width", function(d){ //rectangle width
				return d * 2; //400 * 2 = 800
			})
			.attr("height", function(d){ //rectangle height
				return d; //400
			})
			.attr("class", "innerRect") //class name
			.attr("x", 50) //position from left on the x (horizontal) axis
			.attr("y", 50) //position from top on the y (vertical) axis
			.style("fill", "#ffffff"); //fill color

		var cityPop = [
	        { 
	            city: 'Denver',
	            population: 716492
	        },
	        {
	            city: 'Boulder',
	            population: 107353
	        },
	        {
	            city: 'Colorado Springs',
	            population: 472688
	        },
	        {
	            city: 'Aurora',
	            population: 374114
	        }
	    ];

		//scale for circles center x coordinate and position the circles
		var x = d3.scaleLinear() //This creates the scale
			.range([150, 750]) //output min and max - sets distance from axis
			.domain([0, 4]); //input min and max

		//find the minimum value of the array
		var minPop = d3.min(cityPop, function(d){
			return d.population;
		});

		//find the maximum value of the array
		var maxPop = d3.max(cityPop, function(d){
			return d.population;
		});

		//scale for circles center y coordinate
		var y = d3.scaleLinear()
			.range([450, 50]) //controls the "spread" of the circles across the inner rectangle
			.domain([0, 800000]); //was minPop, maxPop

		//color scale generator	
		var color = d3.scaleLinear() 
			.range([
				"#95cfe8", // color of the minimum value
				"#0e668c"  // color of the maximum value
				//colors being the min and max are intrepreted
			])
			.domain([
				minPop, 
				maxPop
			]);

		var circles = container.selectAll(".circles") //create an empty selection
			// .data(dataArray) //here we feed in an array
			.data(cityPop) //here we feed in an array
			.enter() //one of the great mysteries of the universe
			.append("circle") //inspect the HTML--holy crap, there's some circles there
			.attr("class", "circles")
			.attr("id", function(d){
				return d.city;
			})
			// .attr("r", function(d, i){ //circle radius
			// 	console.log("d:", d, "i:", i); //let's take a look at d and i
			// 	return d;
			// })
			.attr("r", function(d){ //circle radius
				var area = d.population * 0.0062;
				return Math.sqrt(area/Math.PI);
			})
			// .attr("cx", function(d, i){ //center x coordinate
			// 	return 90 + (i * 180);
			// })
			// .attr("cy", function(d){ //center y coordinate
			// 	return 450 - (d.population * 0.0005);
			// });
			.attr("cx", function(d, i){ //center x coordinate
				return x(i);
			})
			.attr("cy", function(d){ //center y coordinate
				return y(d.population);
			})
			.style("fill", function(d, i){ //add a fill based on the color scale generator  // This is an inline style
				return color(d.population);
			})
			.style("stroke", "#000"); //black circle stroke
			// This is an inline style

		//create y axis generator
		var yAxis = d3.axisLeft(y);

		//create axis g element and add axis
		var axis = container.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(50, 0)") //positions the axis - left/right
			.call(yAxis);

		//create a text element and add the title
		var title = container.append("text")
			.attr("class", "title")
			.attr("text-anchor", "middle")
			.attr("x", 450)
			.attr("y", 30)
			.text("Colorado Cities");

		//create circle labels
		var labels = container.selectAll("labels")
			.data(cityPop)
			.enter()
			.append("text")
			.attr("class", "labels")
			.attr("text-anchor", "left")
			.attr("y", function(d){
				//vertical position centered on each circle
				return y(d.population) - 2;
			});

		//first line of label
		var nameLine = labels.append("tspan")
			.attr("class", "nameLine")
			.attr("x", function(d,i){
				return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
			})
			.text(function(d){
				return d.city;
			});

		//create format generator
		var format = d3.format(",");

		//second line of label
		var popLine = labels.append("tspan")
			.attr("class", "popLine")
			.attr("x", function(d,i){
				return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
			})
			.attr("dy", "15") //vertical offset
			.text(function(d){
				return "Pop. " + format(d.population); //use format generator to format numbers
			});
	};
};





