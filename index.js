'use strict';
var fs = require('fs');
var crypto = require('crypto');
// Text

function encrypt(text, passwd, algorithm, ivt) {
 if (typeof ivt === 'undefined' || ivt === null || ivt == "" || ivt === '' || ivt === undefined) { ivt = crypto.randomBytes(16); console.log("You didn't add an iv processor, so we generated one for you!") };
 if (typeof algorithm === 'undefined' || algorithm === null || algorithm == "" || algorithm === '' || algorithm === undefined) { algorithm = 'aes-256-cbc'; console.log("You didn't put an algorithm, so we defined it as:" + algorithm + "for you!"); };
 let iv = Buffer.from(ivt, "hex");
 let key = crypto.createHash('sha256').update(passwd).digest('base64').substr(0, 32);
 let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { type: 'encrypt', text: encrypted.toString('hex'), password: passwd, algorithm: algorithm, iv: iv.toString('hex') };
}

function decrypt(text, passwd, algorithm, ivt) {
 if (typeof algorithm === 'undefined') { algorithm = 'aes-256-cbc'; }
 let iv = Buffer.from(ivt, "hex");
 let key = crypto.createHash('sha256').update(passwd).digest('base64').substr(0, 32);
 let encryptedText = Buffer.from(text, 'hex');
 let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

// Files

function encryptFile(from, to, passwd, algorithm, ivt, callback) {
 if (typeof ivt === 'undefined' || ivt === null || ivt == "" || ivt === '' || ivt === undefined) { ivt = crypto.randomBytes(16); console.log("You didn't add an iv processor, so we generated one for you!") };
 if (typeof algorithm === 'undefined' || algorithm === null || algorithm == "" || algorithm === '' || algorithm === undefined) { algorithm = 'aes-256-cbc'; console.log("You didn't put an algorithm, so we defined it as:" + algorithm + "for you!"); };
 let reader = fs.createReadStream(from, { highWaterMark: 665539 });
 let reader_size = fs.statSync(from).size;
 let writer = fs.createWriteStream(to, {});
 let iv = Buffer.from(ivt, "hex");
 let key = crypto.createHash('sha256').update(passwd).digest('base64').substr(0, 32);
 let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
 reader.on('data', function(data) {
	 var line_percentage = parseInt(reader.bytesRead) / parseInt(reader_size) * 100;
     var line_ciphering = cipher.update(data);
     writer.write(line_ciphering);
	 callback(line_percentage);
 });
 reader.on('close', function() {
     writer.write(cipher.final());
     writer.close();
	 callback(true);
 });
return { type: 'encrypt', from: from, to: to, password: passwd, algorithm: algorithm, iv: iv.toString('hex') };
}

function decryptFile(from, to, passwd, algorithm, ivt, callback) {
 if (typeof ivt === 'undefined' || ivt === null || ivt == "" || ivt === '' || ivt === undefined) { ivt = crypto.randomBytes(16); console.log("You didn't add an iv processor, so we generated one for you!") };
 if (typeof algorithm === 'undefined' || algorithm === null || algorithm == "" || algorithm === '' || algorithm === undefined) { algorithm = 'aes-256-cbc'; console.log("You didn't put an algorithm, so we defined it as:" + algorithm + "for you!"); };
 let reader = fs.createReadStream(from, { highWaterMark: 665539});
 let reader_size = fs.statSync(from).size;
 let writer = fs.createWriteStream(to, {});
 let iv = Buffer.from(ivt, "hex");
 let key = crypto.createHash('sha256').update(passwd).digest('base64').substr(0, 32);
 let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
 reader.on('data', function(data) {
	 var line_percentage = Math.round(parseInt(reader.bytesRead) / parseInt(reader_size) * 100);
      let decrypted = decipher.update(data, "hex");

     writer.write(decrypted);
	 callback(line_percentage);
 });
 reader.on('close', function() {
     writer.write(decipher.final());
     writer.close();
	 callback(true);
 });
return { type: 'decrypt', from: from, to: to, password: passwd, algorithm: algorithm, iv: iv.toString('hex') };
}


module.exports = { encrypt, decrypt, encryptFile, decryptFile };
