"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrieNode = void 0;
class TrieNode {
    constructor(key) {
        this.isLeaf = false;
        this.character = key;
        this.children = new Map();
    }
}
exports.TrieNode = TrieNode;
