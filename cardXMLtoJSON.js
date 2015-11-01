var fs = require('fs'),
 	parseString = require('xml2js').parseString,
 	xml = fs.readFileSync('./files/CardType.xml'),
 	msgBundle = JSON.parse(fs.readFileSync('./files/en_us_JSON.json')),
 	raceLookup = {
 		0: "Human",
 		1: "Faen",
 		2: "Neander",
 		3: "Mortii"
 	}

parseString(xml, function(err, result) {
	if(err) return console.log("Error parsing XML");

	//format results to something more readable
	var rawResults = result["Datas"]["Data"],
		formattedResults = {};

	for(var card in rawResults){
		formattedResults[rawResults[card]["m_iID"][0]] = {
			id: rawResults[card]["m_iID"][0],
			displayName: msgBundle[rawResults[card]["m_sDisplayName"][0]],
			cost: rawResults[card]["m_iCost"][0],
			faction: raceLookup[rawResults[card]["m_eRace"][0]],
			star: rawResults[card]["m_iStar"][0],
			description: msgBundle[rawResults[card]["m_sDesc"][0]]
		}
	}

	fs.writeFile('./files/cardType.json', JSON.stringify(formattedResults, null, 4), function(err){
		if(err) return console.log("Error writing cardType.json")
		console.log("Created file cardType.json");
	});
});


