var Sequelize = require("sequelize");
var sequelize = new Sequelize('startup1', 'root', 'bitnami');


if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}


var latitude = "39.987678";
var longitude = "-0.051298";
var km = "10";

var sql = "SELECT *, \
		  (SQRT(POW((lat - {0}), 2) + POW((lon - {1}), 2)) * 111.2) AS radius \
		  FROM \
		  places \
		  WHERE \
		  POW((lat - {0}), 2) + POW((lon - {1}), 2) < POW(({2} / 111.2), 2) \
		  ORDER BY radius ASC".format(latitude, longitude, km);


sequelize.query(sql).success(function(rows){
	console.log(rows);
});

