var serialport = require("serialport");

var port = new serialport("/dev/ttyACM1", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

var bootDate = new Date();


console.log(bootDate);

	port.on("data", function (data) {
		bootDate = new Date();
		console.log(
			bootDate.getFullYear() + "-" + 
			bootDate.getMonth() + "-" +  
			bootDate.getDate() + " " +
			data
			);
	});


