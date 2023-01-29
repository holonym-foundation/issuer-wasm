const { issue } = require("./holonym_wasm_issuer.js");

function formatFr (frString) { return frString.replace("Fr(","").replace(")","") };
function frToBigInt (frString) { return BigInt(formatFr(frString)) };
function formatCreds (creds) { 
    const c = {
        addr: frToBigInt(creds.address),
        secret: frToBigInt(creds.secret),
        customFields: [
            frToBigInt(creds.custom_fields[0]), 
            frToBigInt(creds.custom_fields[1])
        ],
        iat: frToBigInt(creds.iat),
        scope: frToBigInt(creds.scope)
    }
    return c
}
function formatLeaf (leaf) { 
    return frToBigInt(leaf)
}
function formatPubkey (pk) {
    return {
        x: frToBigInt(pk[0]),
        y: frToBigInt(pk[1])
    }
}
function formatSignature (sig) {
    return {
        R8: { x: frToBigInt(sig.r_b8[0]), y: frToBigInt(sig.r_b8[1]) },
        S: BigInt(sig.s)
    }
}
function format (issuerResponse) {
    return {
        credentials: formatCreds(issuerResponse.credentials),
        leaf : formatLeaf(issuerResponse.leaf),
        pubkey: formatPubkey(issuerResponse.pubkey),
        signature: formatSignature(issuerResponse.signature),
    } 
}
// adapter for call to issue(private_key, field1, field2) which returns a nicely-formatted JSON object
function issueAdapter(privateKey, field1, field2) {
    return format(JSON.parse(issue(privateKey, field1, field2)));
}

// Returns pubKey from privKey (albeit not in most efficient way!)
function getPubkey(privKey) {
    return adapter(privateKey, "69", "69").pubkey
}

// Returns address from privKey (albeit not in most efficient way!)
function getAddress(privateKey) {
    return adapter(privateKey, "54321", "1234").credentials.addr
}

module.exports = {
    issue : issueAdapter,
    getPubkey : getPubkey,
    getAddress : getAddress
}