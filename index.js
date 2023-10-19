//1. Load all the urls from redirects.yml
const YAML = require('yaml')
 const fs = require('fs') //this connect to file system to read file
 const path = require('path')

 const redirectsFile =fs.readFileSync(path.join(__dirname, 'redirects.yml'), 'utf-8')
 const redirects = YAML.parse(redirectsFile) //that gives out the js object, easy to read the object.

 console.log(redirects);

//2. generate an html page for each redirect url from template.html
const templateHTML = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8')

//loop through all url redirects, and generate an html page
//object.entries return an array of the arrays here. 
for( let [slug, url] of Object.entries(redirects)){
    // console.log('Generating HTML page for ', slug)
    // console.log('Url is', url) 

    const html = templateHTML.replaceAll('https://example.com', url);

    //create folder for each slug
    const folderPath = path.join(__dirname, 'out', slug);
    fs.mkdirSync(folderPath, {recursive: true});

    //create an index.html in each slug directory
    fs.writeFileSync(path.join(folderPath, 'index.html'), html)

}