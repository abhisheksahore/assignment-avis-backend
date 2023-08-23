import joinImages from "join-images";
import mergeImg from 'merge-img';
import fs from 'fs';
import path from "path";

export const mergeImageController = (res, files, next) => {
        const url = files.map(e => {
            return e.path;
        })
        const combinedImageName = Date.now() + '.png';
        mergeImg(url).then(image => {
            image.write(path.join(path.resolve(), combinedImageName), () => {
                fs.readFile(combinedImageName, (err, data) => {
                    if (err) {
                      console.error(err);
                      return res.status(500).send('Error reading file');
                    }
                
                    const base64Data = Buffer.from(data).toString('base64');
                    const base64File = `data:image/png;base64,${base64Data}`;
                    
                    res.send(base64File);
                    next(combinedImageName)
                  });
                files.forEach(e => {
                    fs.unlinkSync(e.path);
                });
            });
        })
        console.log(path.join(path.resolve(), combinedImageName));
        return combinedImageName;
}