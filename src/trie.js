"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = void 0;
class TrieNode {
    constructor(key) {
        this.isEnding = false; // flag for if the node is enging a word
        this.character = key; // character that this node is associated with
        this.children = new Map(); // its children nodes
    }
}
class Trie {
    constructor() {
        this.numWords = 0;
        this.root = new TrieNode();
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
                node = new TrieNode(char);
                children.set(char, node);
            }
            children = node.children;
            if (level++ === word.length - 1) {
                node.isEnding = true;
            }
        }
        this.numWords++;
    }
    /**
     * Get number of words in the Trie
     *
     * @returns {number}
     * @memberof Trie
     */
    getNumWords() {
        return this.numWords;
    }
    /**
     * Check if word is in the Trie.
     *
     * @param {string} word
     * @returns {boolean}
     * @memberof Trie
     */
    search(word) {
        const node = this.getNode(word);
        // if (node && node.isEnding) {
        //     return true;
        // } else {
        //     return false;
        // }
        return !!node && node.isEnding;
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
            if (currentNode.get(char)) {
                node = currentNode.get(char);
                if (node) {
                    currentNode = node.children;
                }
                else {
                    return null;
                }
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
