var fs = require('fs'),
	gettextParser = require("gettext-parser"),
	moFile = fs.readFileSync('./files/en_us.mo'),
	moParse = gettextParser.mo.parse(moFile, 'utf8'),
	messages = moParse.translations[""],
	messageBundle = {};

for(var message in messages){
	messageBundle[message] = messages[message]["msgstr"][0];
}

fs.writeFile('./files/output/msgBundle.json', JSON.stringify(messageBundle, null, 4), function(err){
	if(err) return console.log(err);
	console.log("Created file msgBundle.json");
});