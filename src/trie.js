"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = void 0;
const node_1 = require("./node");
class Trie {
    constructor() {
        this.root = new node_1.TrieNode();
    }
    /**
     * Insert word in the Trie.
     *
     * @param {string} word
     * @memberof Trie
     */
    insert(word) {
        let children = this.root.children;
        let level = 0;
        for (const char of word) {
            let node;
            if (children.get(char)) {
                node = children.get(char);
            }
            else {
                node = new node_1.TrieNode(char);
                children.set(char, node);
            }
            if (node) {
                children = node.children;
                if (level++ === word.length - 1) {
                    node.isLeaf = true;
                }
            }
        }
    }
    /**
     * Check if word exists in the Trie.
     *
     * @param {string} word
     * @returns {boolean}
     * @memberof Trie
     */
    search(word) {
        const node = this.getNode(word);
        if (node && node.isLeaf) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Get a node from the Trie.
     *
     * @param {string} word
     * @returns {TrieNode}
     * @memberof Trie
     */
    getNode(word) {
        let node = null;
        let currentNode = this.root.children;
        for (const char of word) {
            node = currentNode.get(char);
            if (node) {
                currentNode = node.children;
            }
            else {
                return null;
            }
        }
        return node;
    }
    /**
     * Check if any word in Trie matches given prefix
     *
     * @param {string} prefix
     * @returns {boolean}
     * @memberof Trie
     */
    startsWith(prefix) {
        return this.getNode(prefix) ? true : false;
    }
}
exports.Trie = Trie;
