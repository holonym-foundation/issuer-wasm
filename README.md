# Holonym Issuer WASM Bindings
usage:
supply a private key, and two custom fields in the credential you want to issue. The timestamp, issuer address, scope, and a random secret will automatically be included, so there is no need to worry about those.
example: 
```
const { issue } = require("holonym-wasm-issuer");
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
```

