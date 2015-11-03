var fs = require('fs'),
 	parseString = require('xml2js').parseString,
 	xml = fs.readFileSync('./files/xml/ReactorTypeDef.xml'),
 	msgBundle = JSON.parse(fs.readFileSync('./files/output/msgBundle.json'));

parseString(xml, function(err, result) {
	if(err) return console.log("Error parsing XML");


	//format results to something more readable
	var rawResults = result["Datas"]["Data"],
		formattedResults = {};


	for(var skill in rawResults){
		formattedResults[rawResults[skill]["m_iID"][0]] = {
			id: rawResults[skill]["m_iID"][0],
			displayName: msgBundle[rawResults[skill]["m_sDisplayName"][0]],
			maxLevel: rawResults[skill]["m_iMaxLvl"][0],
		}
	}
	
	fs.writeFile('./files/output/skills.json', JSON.stringify(formattedResults, null, 4), function(err){
		if(err) return console.log("Error writing skills.json")
		console.log("Created file skills.json");
	});
});


