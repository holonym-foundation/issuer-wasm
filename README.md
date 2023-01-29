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
  credentials: {
    addr: 1800252790190408162496944851144659187813457198890711068413419637171073980819n,
    secret: 7685103797350963801244420581131224381121394507603043516822949820628699138110n,
    customFields: [
      15554206969n,
      2603784193916030667265976259156130949263115346292859097693709746006196410223n
    ],
    iat: 3883998765n,
    scope: 0n
  },
  leaf: 1807997992800582709617866862780234819029182976175025130860074107789961096501n,
  pubkey: {
    x: 13620449171284869818860687899896152941890489758759740138015166671971279862663n,
    y: 16427782134925018302906992742718507215945455572464721042072940320474808580392n
  },
  signature: {
    R8: {
      x: 18317222422953029052613604296635046119159217070664495173005849499459489668358n,
      y: 417921675098374043916651608740489725899810399457885465350359662507433947803n
    },
    S: 403571639872669826774084985739216852744133718822265605075263978864519036472n
  }
}
issuer public key {
  x: 13620449171284869818860687899896152941890489758759740138015166671971279862663n,
  y: 16427782134925018302906992742718507215945455572464721042072940320474808580392n
}
and address 1800252790190408162496944851144659187813457198890711068413419637171073980819n
```