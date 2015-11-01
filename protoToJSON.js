var ProtoBuf = require('protobufjs'),
	fs = require('fs'),
	util = require('util'),
	protoFile = fs.readFileSync('./files/proto/HeroCardDef.xml.proto');

var parser = new ProtoBuf.DotProto.Parser(protoFile);
var ast = parser.parse();
console.log(util.inspect(ast, false, null, true));