const fs = require('fs');
const path = require('path');

const locationsDirectory = path.join(process.cwd(), 'locations');
function getAllLocationIDs() {
    const fileNames = fs.readdirSync(locationsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}
console.dir(getAllLocationIDs());