var f4cry = require("F4st_Crypt");

var ncryptxt = f4cry.encrypt("A foo and a bar", "My Password", null, null);
console.log(ncryptxt);

var f4cry = require("F4st_Crypt");

var dcryptxt = f4cry.decrypt(ncryptxt.text, ncryptxt.password, ncryptxt.algorithm, ncryptxt.iv)
console.log(dcryptxt);
