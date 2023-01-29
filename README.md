# Holonym Issuer WASM Bindings
## Installation
`npm i holonym-wasm-issuer`
## Usage
supply a private key, and two custom fields in the credential you want to issue. The timestamp, issuer address, scope, and a random secret will automatically be included, so there is no need to worry about those.
example: 
```
const { issue, getPubkey, getAddress } = require("holonym-wasm-issuer");
require("dotenv").config();

// Private key should be a string of 32 hex characters (no 0x)
const privateKey = process.env.HOLONYM_ISSUER_PRIVKEY;

/* 
 * Field 1 and Field 2 are they two custom fields an issuer can set. 
 * They should be strings representing big numbers less than 
 * 21888242871839275222246405745257275088548364400416034343698204186575808495617
 * They can represent any attribute, such as phone number, city, name, 
 * or hash of many credentials.  Basically anything that represents attributes of the user
 * Later, these will be used to generate proofs of arbitrary properties
 */
const field1 = "15554206969" // A US phone number with 555 area code
const field2 = "2603784193916030667265976259156130949263115346292859097693709746006196410223" // A hash of multiple credentials we want to include

const response = issue(privateKey, field1, field2);
console.log("issuer gave the response: ", response);

console.log("issuer public key", getPubkey(privateKey));
console.log("and address", getAddress(privateKey));
```
*output*:
```
issuer gave the response:  {
  creds: {
    addr: '0x03fae82f38bf01d9799d57fdda64fad4ac44e4c2c2f16c5bf8e1873d0a3e1993',
    secret: '0x293a5fe1e99faba8b52f0c90bd8606ebdf7f162d505ec09d966d64ea79172e91',
    customFields: [
      '0x000000000000000000000000000000000000000000000000000000039f1a5cf9',
      '0x05c1b08b78ab11a57668a9e0cd4b6a6a1cd4715a3ab30c5776d0a7654b6ad76f'
    ],
    iat: '0x00000000000000000000000000000000000000000000000000000000e7812ff8',
    scope: '0x0000000000000000000000000000000000000000000000000000000000000000',
    serializedAsPreimage: [
      '0x03fae82f38bf01d9799d57fdda64fad4ac44e4c2c2f16c5bf8e1873d0a3e1993',
      '0x293a5fe1e99faba8b52f0c90bd8606ebdf7f162d505ec09d966d64ea79172e91',
      '0x000000000000000000000000000000000000000000000000000000039f1a5cf9',
      '0x05c1b08b78ab11a57668a9e0cd4b6a6a1cd4715a3ab30c5776d0a7654b6ad76f',
      '0x00000000000000000000000000000000000000000000000000000000e7812ff8',
      '0x0000000000000000000000000000000000000000000000000000000000000000'
    ]
  },
  leaf: '0x1d353310aa5aef648f2c2af3ad56119178d63a70c632d64e1e68209fea4e4e7c',
  pubkey: {
    x: '0x1e1ce6aa699d072533665a0e41c293f44fc355c2f47862350a86c3c3e7427b87',
    y: '0x2451cb915ec3574004f28a4da7a0eec4c594906180df4f10ff65aedeef5df928'
  },
  signature: {
    R8: {
      x: '0x2f2a3eb77c0acecba43382ae8730be001465f67b810c5a91ede36597115f47bf',
      y: '0x2a35be3bce3115738a77c22de12559ea617e1ffcf6dffdfc02bd1aa3bae52dd2'
    },
    S: '0x4c0834b78c775afa343d4af9f1355a5b5c9a730f0a49a075b330cfcf039a561'
  }
}
issuer public key {
  x: '0x1e1ce6aa699d072533665a0e41c293f44fc355c2f47862350a86c3c3e7427b87',
  y: '0x2451cb915ec3574004f28a4da7a0eec4c594906180df4f10ff65aedeef5df928'
}
and address 0x03fae82f38bf01d9799d57fdda64fad4ac44e4c2c2f16c5bf8e1873d0a3e1993
```