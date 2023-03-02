const { sign, issue } = require("./holonym_wasm_issuer.js");

function formatFr (frString) { return frString.replace("Fr(","").replace(")","") };

// Note used anymore because JSON doesn't like BigInts, making it impractical to transmit over HTTP
// function frToBigInt (frString) { return BigInt(formatFr(frString)) };

function formatCreds (creds) { 
    const c = {
        issuerAddress: formatFr(creds.address),
        secret: formatFr(creds.secret),
        customFields: [
            formatFr(creds.custom_fields[0]), 
            formatFr(creds.custom_fields[1])
        ],
        iat: formatFr(creds.iat),
        scope: formatFr(creds.scope)
    }

    // For convenience, also give user creds as they appear serialized in the preimage to the leaf
    c.serializedAsPreimage = [c.issuerAddress, c.secret, c.customFields[0], c.customFields[1], c.iat, c.scope]; 
    return c;
}
function formatLeaf (leaf) { 
    return formatFr(leaf)
}
function formatPubkey (pk) {
    return {
        x: formatFr(pk[0]),
        y: formatFr(pk[1])
    }
}
function formatSignature (sig) {
    return {
        R8: { x: formatFr(sig.r_b8[0]), y: formatFr(sig.r_b8[1]) },
        S: "0x"+BigInt(sig.s).toString(16)
    }
}
function format (issuerResponse) {
    return {
        creds: formatCreds(issuerResponse.credentials),
        leaf : formatLeaf(issuerResponse.leaf),
        pubkey: formatPubkey(issuerResponse.pubkey),
        signature: formatSignature(issuerResponse.signature),

    } 
}
// adapter for call to issue(private_key, field1, field2) which returns a nicely-formatted JSON object
function issueAdapter(privateKey, field1, field2) {
    return format(JSON.parse(issue(privateKey, field1, field2)));
}

function signAdapter(privateKey, message) {
    return formatSignature(JSON.parse(sign(privateKey, message)));
}

// Returns pubKey from privKey (albeit not in most efficient way!)
function getPubkey(privKey) {
    return issueAdapter(privKey, "69", "69").pubkey
}

// Returns address from privKey (albeit not in most efficient way!)
function getAddress(privKey) {
    return issueAdapter(privKey, "54321", "1234").creds.issuerAddress
}

module.exports = {
    issue : issueAdapter,
    sign : signAdapter,
    getPubkey : getPubkey,
    getAddress : getAddress
}