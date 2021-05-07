import fs from 'fs';

const getManifest = () =>{
    try {
        try {
            return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
     } catch (error) {
         console.log(error);
     }
    } catch (error) {
        console.log("ERROR EN GETMANIFEST");
        console.log(error);
    }
}

export default getManifest;