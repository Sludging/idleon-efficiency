To get AWS creds:
```
aws sso login --profile idleon
```
To sync images:
```
1. cd data/icons/assets/data
2. aws --profile idleon s3 sync . s3://idleon-efficiency-images/images/ --acl bucket-owner-full-control --cache-control max-age=84600,public
```

To copy models from the Wikibot:
```
cp -r ../IdleonWikiBot/exported/ts/* data/domain/
```

New Process for new patches:
```
1. Update the app on your android device
2. use adb to connect to your device, something like: `adb connect 192.168.1.111:39323`
3. use adb to find the location of the apk: `adb shell pm path com.lavaflame.MMO`
4. use adb to download the apk to your device: `adb pull <path_from_3> assets`
5. unzip apk `unzip base.apk -d apk`
6. profit.

When new patch comes out:
```
1. asar extract "/mnt/d/Program Files/Steam/steamapps/common/Legends of Idleon/resources/app.asar" assets
2. js-beautify assets/distBuild/static/game/N.js > N_clean.js
4. Go to https://unminify.com/, upload it and download the unminified version.

OPTIONAL ALTERNATIVE: 
1. Download Z.js from web: curl -O https://www.legendsofidleon.com/ytGl5oc/Z.js
```
