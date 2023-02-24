(async () => {
    const fs = require('graceful-fs');
    const PNG = require('pngjs').PNG;
    const path = require('path');
    const pixelmatch = require('pixelmatch');
    const getDirName = require('path').dirname;

    const assetFolder = "../apk/assets/assets/data/";
    await fs.readdir(assetFolder, {}, async (err, files) => {
        files.forEach(async file => {
                if (!file.includes(".png") || file.substring(0,4) == "Plat" || file.includes("bg.png") || file.includes("menuserver")) {
                    return;
                }

                try {
                    const img = PNG.sync.read(fs.readFileSync(`${assetFolder}/${file}`));
                    const img2 = PNG.sync.read(fs.readFileSync(`icons/assets/data/${file}`));
                    const { width, height } = img;

                    const res = pixelmatch(img.data, img2.data, null, width, height, { threshold: 0.1 })
                    if (res != 0) {
                        console.log(`Images didn't match for: ${file}`);
                        fs.copyFileSync(`${assetFolder}/${file}`, `icons/assets/data/${file}`)
                    }
                }
                catch (e) {
                    if (e.message && e.message.includes("Image sizes do not match")) {
                        console.log(`Images size didn't match for: ${file}`);
                        fs.copyFileSync(`${assetFolder}/${file}`, `icons/assets/data/${file}`)
                    }
                    else {
                        console.log(`New Icon: ${file}`)
                        const img = PNG.sync.read(fs.readFileSync(`${assetFolder}/${file}`));
                        var buffer = PNG.sync.write(img);
                        await fs.writeFile(`icons/assets/data/${file}`, buffer, function (err) {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                        })
                    }
                }
            })
        })
})();