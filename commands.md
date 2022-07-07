To get AWS creds:
```
aws sso login --profile idleon
```
To sync images:
```
1. cd data/icons/assets/data
2. aws --profile idleon s3 sync . s3://idleon-efficiency-images/images/ --acl bucket-owner-full-control
```

To copy models from the Wikibot:
```
cp -r ../IdleonWikiBot/exported/ts/* data/domain/
```

When new patch comes out:
```
1. asar extract "/mnt/d/Program Files/Steam/steamapps/common/Legends of Idleon/resources/app.asar" assets
2. js-beautify assets/distBuild/static/game/Z.js > Z_clean.js
3. python -m regex_Z
4. js-beautify Z_clean_parsed.js > Z_clean.js
5. Go to https://unminify.com/, upload it and download the unminified version.

OPTIONAL ALTERNATIVE: 
1. Download Z.js from web: curl -O https://www.legendsofidleon.com/ytGl5oc/Z.js
```
