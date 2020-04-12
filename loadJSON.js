var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var rawFile = new XMLHttpRequest();
rawFile.open("GET", "./../testdata/ecoli/e_coli_glycolysis_gluconeogenesis.json", false);
// const json = '{"result":true, "count":42}';
const obj = JSON.parse(rawFile);

console.log(obj.);