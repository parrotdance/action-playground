const { writeFileSync } = require('fs')
const { join } = require('path')

const path = join(__dirname, 'index.html')
writeFileSync(path, `
<html><div>Hello world</div></html>
`)

console.log('build finish')
