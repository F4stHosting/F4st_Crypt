# F4st_Crypt (or F4cry)
An NPM module (nodeJS) that uses crypto to encrypt/decrypt files and text in a robust way, that does not damage the file and also in small functions.

<p>
<a href="https://www.npmjs.com/package/f4st_crypt" rel="nofollow"><img src="https://img.shields.io/npm/dw/f4st_crypt.svg?logo=npm" alt="npm downloads" style="max-width:100%;"></a>
<a href="https://www.npmjs.com/package/f4st_crypt" rel="nofollow"><img src="https://img.shields.io/npm/v/f4st_crypt.svg?logo=npm" alt="npm version" style="max-width:100%;"></a>
<a href="https://github.com/F4stHosting/F4st_Crypt/blob/master/LICENSE" rel="nofollow"><img src="https://img.shields.io/npm/l/f4st_crypt.svg?logo=github" alt="NpmLicense"></a>
<a href="https://github.com/F4stHosting/F4st_Crypt/blob/master/" rel="nofollow"><img src="https://img.shields.io/badge/Accepting%20Commits-True-green.svg" alt="Conventional Commits"></a>
<a href="https://github.com/F4stHosting/F4st_Crypt/blob/master/" rel="nofollow"><img src="https://img.shields.io/github/package-json/v/f4sthosting/F4st_Crypt.svg" alt="Conventional Commits"></a>

</p>

How to Use?

You can easily use this module in some simple functions:

<br>
<br>

**Text**

<br>

> Text Encrypting

<br>

```js
var f4cry = require("F4st_Crypt");
var ncryptxt = f4cry.encrypt("A foo and a bar", "My Password", null, null);
console.log(ncryptxt);
```

"null, null" is telling to the program to auto-generate the algorithm and iv processor.

And it will return like:
```json
{
  type: 'encrypt',
  text: '9cbc314d4ebf883f581fa3e4192e2ed6',
  password: 'My Password',
  algorithm: 'aes-256-cbc',
  iv: 'e27294577aedb2b9ff62a84a9ed23ead'
}
```

<br>
<br>

> Text Decrypting

```js
var f4cry = require("F4st_Crypt");

var dcryptxt = f4cry.decrypt(ncryptxt.text, ncryptxt.password, ncryptxt.algorithm, ncryptxt.iv)
console.log(dcryptxt);
```

We are using encrypt text json response with "ncryptxt".

And it will return it like:
```A foo and a bar```

<br>
<br>
<br>
<br>

**Files**

<br>

> File Encrypting

<br>

Easily encrypt files with this function:

```js
var f4cry = require("F4st_Crypt");
var ncrypt = f4cry.encryptFile("./test/test_file.rar", "./test/test_file_crypted.rar", "password", algorithm, iv_processor, (progress) =>{console.log(progress)});
    console.log(ncrypt)
```

It will return a json string like(useful for saving/using auto-generated IV processors): 
```json
{
  type: 'encrypt',
  from: './test/test_file.rar',
  to: './test/test_file_crypted.rar',
  password: 'senha',
  algorithm: 'aes-256-cbc',
  iv: 'f1562b6de15f7a228799bb906355c2e0'
}
```

<br>
<br>

> File Decrypting

<br>

Easily decrypt files with this function:

```js
var f4cry = require("F4st_Crypt");
var dcrypt = f4cry.decryptFile( "./test/test_file_crypted.rar",  "./test/test_file_decrypted.rar", ncrypt.password, ncrypt.algorithm, ncrypt.iv,(progress) =>{console.log(progress)})
    console.log(dcrypt)
```

It will return a json string too:

```json
{
  type: 'decrypt',
  from: './test/test_file_crypted.rar',
  to: './test/test_file_decrypted.rar',
  password: 'senha',
  algorithm: 'aes-256-cbc',
  iv: 'f1562b6de15f7a228799bb906355c2e0'
}
```

<br>
<br>
<br>
<br>

# Note

**Supported Algorithms:**

AES-128-CBC, AES-128-CBC-HMAC-SHA1, AES-128-CBC-HMAC-SHA256, AES-128-CFB, AES-128-CFB1, AES-128-CFB8, AES-128-CTR, AES-128-ECB, AES-128-OFB, AES-128-XTS, AES-192-CBC, AES-192-CFB, AES-192-CFB1, AES-192-CFB8, AES-192-CTR, AES-192-ECB, AES-192-OFB, AES-256-CBC, AES-256-CBC-HMAC-SHA1, AES-256-CBC-HMAC-SHA256, AES-256-CFB, AES-256-CFB1, AES-256-CFB8, AES-256-CTR, AES-256-ECB, AES-256-OFB, AES-256-XTS, AES128 => AES-128-CBC, AES192 => AES-192-CBC, AES256 => AES-256-CBC.


(We're also accepting improvements, don't be afraid, even if it's simple, make your commit!)
