(async () => {
    const fs = require('graceful-fs');
    const PNG = require('pngjs').PNG;
    const pixelmatch = require('pixelmatch');
    const getDirName = require('path').dirname;
    const icons = await import('./icons.mjs');

    Object.entries(icons.default).forEach(async (icon) => {
        if (!fs.existsSync(`icons/${icon[0]}`)) {
            console.log("Creating: ", `icons/${icon[0]}`);
            let buff = Buffer.from(icon[1].replace('data:image/png;base64,', ''), 'base64');
            await fs.mkdir(getDirName(`icons/${icon[0]}`), { recursive: true }, async (res) => {
                await fs.writeFile(`icons/${icon[0]}`, buff, function (err) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                })
            })
        }
        else {
            let buff = Buffer.from(icon[1].replace('data:image/png;base64,', ''), 'base64');
            await fs.mkdir(getDirName(`icons/temp/${icon[0]}`), { recursive: true }, async (res) => {
                await fs.writeFile(`icons/temp/${icon[0]}`, buff, function (err) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                })
            })
            
            try {
                const img = PNG.sync.read(fs.readFileSync(`icons/${icon[0]}`));
                const img2 = PNG.sync.read(fs.readFileSync(`icons/temp/${icon[0]}`));
                const {width, height} = img;
    
                const res = pixelmatch(img.data, img2.data, null, width, height)
                if (res != 0) {
                    fs.copyFileSync(`icons/temp/${icon[0]}`, `icons/${icon[0]}`)
                }
            }
            catch (e) {
                if (e.message && e.message.includes("Image sizes do not match")) {
                    fs.copyFileSync(`icons/temp/${icon[0]}`, `icons/${icon[0]}`)
                }
                else {
                    console.log(`New Icon: ${icon[0]}`)
                    await fs.writeFile(`icons/${icon[0]}`, buff, function (err) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    })
                }
            }
        }
    })
})();