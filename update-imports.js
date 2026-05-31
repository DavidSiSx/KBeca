const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
    const original = fs.readFileSync(file, 'utf8');
    const updated = original
        .replace(/\"@\/components/g, '\"@/frontend/components')
        .replace(/\'@\/components/g, '\'@/frontend/components')
        .replace(/\"@\/features/g, '\"@/frontend/features')
        .replace(/\'@\/features/g, '\'@/frontend/features')
        .replace(/\"@\/lib/g, '\"@/frontend/lib')
        .replace(/\'@\/lib/g, '\'@/frontend/lib')
        .replace(/\"@\/db/g, '\"@/backend/db')
        .replace(/\'@\/db/g, '\'@/backend/db');
    
    if (original !== updated) {
        fs.writeFileSync(file, updated, 'utf8');
        console.log('Updated:', file);
        changedCount++;
    }
});
console.log('Total files updated:', changedCount);
