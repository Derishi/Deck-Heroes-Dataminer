# Deck-Heroes-Dataminer
Download Dependencies from NPM:
- gettext-parser
- protobufjs (Maybe)
- xml2js

npm install {module}

Will also need to download the latest APK for Deck Heroes (should be here for US):
http://apkpure.com/store/apps/details?id=com.igg.bzbee.deckheroes

This should be extracted with 7zip or something.  Most of the dataminer is using asset configs to massage data into something usable.

KNOWN BUGS:
- Skills can't handle "On Play" and "On Destroy" modifiers, still need to figure out how these are determined
- Some skills are reading as Runes/Buffs/etc due to the above issue