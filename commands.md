To get AWS creds:
```
aws sso login --profile idleon
```
To sync images:
```
1. cd data/icons/assets/data
2. aws --profile idleon s3 sync . s3://idleon-efficiency-images/images/ --acl bucket-owner-full-control --metadata-directive REPLACE --cache-control max-age=2592000,public --expires 2044-01-01T00:00:00Z --content-type image/png
```

**Game version update (Steam → WikiBot → data/domain):** see [`docs/runbooks/update-game-version.md`](docs/runbooks/update-game-version.md)

**Game image sync (Android APK → S3):** see [`docs/runbooks/sync-game-assets.md`](docs/runbooks/sync-game-assets.md)

New Process for new patches (Android APK — see also sync-game-assets runbook):
```
1. Update the app on your android device
2. use adb to connect to your device, something like: `adb connect 192.168.1.111:39323`
3. use adb to find the location of the apk: `adb shell pm path com.lavaflame.MMO`
4. use adb to download the apk to your device: `adb pull <path_from_3> assets`
5. unzip apk `unzip base.apk -d apk`
6. profit.
```

When new Steam patch comes out: use [`docs/runbooks/update-game-version.md`](docs/runbooks/update-game-version.md).
