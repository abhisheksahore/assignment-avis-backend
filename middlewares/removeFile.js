import fs from "fs";
import path from "path";

export const removeFile = (n, g, y, u) => {
    fs.unlinkSync(path.join(path.resolve(), n));
    u();
}