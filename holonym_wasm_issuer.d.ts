/* tslint:disable */
/* eslint-disable */
/**
* @param {string} private_key
* @param {string} field1
* @param {string} field2
* @returns {string}
*/
export function issue(private_key: string, field1: string, field2: string): string;
/**
* @param {string} private_key
* @param {string} msg
* @returns {string}
*/
export function sign(private_key: string, msg: string): string;
/**
* @param {string} private_key
* @returns {string}
*/
export function get_pubkey(private_key: string): string;
/**
* @param {string} private_key
* @returns {string}
*/
export function get_pubkey_times_8(private_key: string): string;
