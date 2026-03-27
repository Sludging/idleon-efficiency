---
name: sync-game-assets
description: Sync new/changed game image assets from Android device to S3 CDN. Use after a game version update when new images may have been added.
disable-model-invocation: true
user-invocable: true
---

# Sync Game Assets

Syncs new/changed image assets from the Legends of Idleon Android APK to the S3 CDN. This requires the user's Android device and interactive input at several steps.

## Step 1: Ensure game is updated on Android

Ask the user to confirm they have updated Legends of Idleon to the latest version on their Android device and that wireless debugging is enabled.

## Step 2: ADB pairing and connection

Ask the user for the pairing IP:port and code from their Android device's wireless debugging screen.

```bash
adb pair <ip>:<pairing_port> <pairing_code>
```

Then ask for the connection IP:port (this is different from the pairing port - it's shown on the main wireless debugging screen):

```bash
adb connect <ip>:<connect_port>
```

Verify connection:

```bash
adb devices
```

If connection fails, troubleshoot:
- Ensure device and computer are on the same network
- Wireless debugging may need to be re-enabled
- Pairing codes expire quickly, ask for a fresh one

After connecting, `adb devices` may show two entries for the same device (one IP-based, one mDNS-based). If so, use `-s <ip>:<connect_port>` on all subsequent `adb` commands to avoid the "more than one device/emulator" error.

## Step 3: Find the game APK path

```bash
adb shell pm path com.lavaflame.MMO
```

This returns one or more lines like `package:/data/app/.../base.apk`. The base APK path is what we need.

## Step 4: Pull the APK

```bash
adb pull <path_from_step_3> /home/sludge/Development/idleon-efficiency/game.apk
```

## Step 5: Extract the APK

```bash
cd /home/sludge/Development/idleon-efficiency
rm -rf apk
mkdir -p apk
cd apk && unzip ../game.apk
```

Verify: `apk/assets/assets/data/` should contain many `.png` files.

Clean up the apk file:

```bash
rm /home/sludge/Development/idleon-efficiency/game.apk
```

## Step 6: Run image-manipulator to detect new/changed images

```bash
cd /home/sludge/Development/idleon-efficiency/data
node image-manipulator.js
```

This compares images from `apk/assets/assets/data/` against `data/icons/assets/data/` and:
- Copies new images (not found in existing icons)
- Copies changed images (pixel diff detected)
- Copies images with size differences
- Skips files starting with "Plat", containing "bg.png", or "menuserver"

Report the output to the user - if no new/changed images are found, the remaining steps can be skipped.

## Step 7: AWS SSO login

Tell the user to run the login command. This opens a browser for SSO authentication:

```bash
aws sso login --profile idleon
```

Ask the user to confirm when login is complete.

## Step 8: Sync to S3

```bash
cd /home/sludge/Development/idleon-efficiency/data/icons/assets/data
aws --profile idleon s3 sync . s3://idleon-efficiency-images/images/ --acl bucket-owner-full-control --cache-control max-age=2592000,public --expires 2044-01-01T00:00:00Z --content-type image/png
```

## Step 9: Clean up

```bash
rm -rf /home/sludge/Development/idleon-efficiency/apk
```

## Step 10: Summary

Report to the user:
- Number of new/changed images detected
- Whether S3 sync completed successfully
- Any errors encountered
