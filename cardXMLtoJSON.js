var fs = require('fs'),
 	parseString = require('xml2js').parseString,
 	xml = fs.readFileSync('./files/xml/CardType.xml'),
 	msgBundle = JSON.parse(fs.readFileSync('./files/output/msgBundle.json')),
 	skillMap = JSON.parse(fs.readFileSync('./files/output/skills.json')),
 	raceLookup = {
 		0: "Human",
 		1: "Faen",
 		2: "Neander",
 		3: "Mortii"
 	},
 	skillLookup = function(skillId){
 		var skillObj = {
 			id: "",
 			skill: "",
 			level: "",
 			displayName: ""
 		}

 		if (skillId > 0 && skillId <= 10){
 			skillObj.id = 17; //Tempest is Weird!
 		} else if (skillId <= 170){
			skillObj.id = Math.floor(skillId / 10);
 		} else if (skillId > 170 && skillId <= 999){
 			skillObj.id = Math.floor(skillId / 10) + 1;
 		} else {
 			skillObj.id = skillId;
 		}

 		skillObj.level = (skillId % 10) !== 0 ? skillId % 10 : "",	
 		skillObj.skill = skillMap[skillObj.id] ? skillMap[skillObj.id]["displayName"] : "";
 		skillObj.displayName = (skillObj.skill + " " + skillObj.level).trim();

 		return skillObj;
 	};

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
			description: msgBundle[rawResults[card]["m_sDesc"][0]],
			skill: {
				skill1: (rawResults[card]["m_iSkill0"][0] != -1) ? skillLookup(rawResults[card]["m_iSkill0"][0]) : "None",
				skill2: (rawResults[card]["m_iSkill5"][0] != -1) ? skillLookup(rawResults[card]["m_iSkill5"][0]) : "None",
				skill3: (rawResults[card]["m_iSkill10"][0] != -1) ? skillLookup(rawResults[card]["m_iSkill10"][0]) : "None"
			}
		}
	}

	fs.writeFile('./files/output/cards.json', JSON.stringify(formattedResults, null, 4), function(err){
		if(err) return console.log("Error writing cards.json")
		console.log("Created file cards.json");
	});
});


