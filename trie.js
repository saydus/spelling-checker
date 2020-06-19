"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trie = void 0;
var trie_node = /** @class */ (function () {
    function trie_node() {
        this.terminal = false;
        this.children = new Map();
    }
    return trie_node;
}());
var trie = /** @class */ (function () {
    function trie() {
        this.root = new trie_node();
        this.elements = 0;
    }
    Object.defineProperty(trie.prototype, "length", {
        get: function () {
            return this.elements;
        },
        enumerable: false,
        configurable: true
    });
    trie.prototype.get = function (key) {
        var node = this.getNode(key);
        if (node) {
            return node.value;
        }
        return null;
    };
    trie.prototype.contains = function (key) {
        var node = this.getNode(key);
        return !!node;
    };
    trie.prototype.insert = function (key, value) {
        var node = this.root;
        var remaining = key;
        while (remaining.length > 0) {
            var child = null;
            for (var _i = 0, _a = node.children.keys(); _i < _a.length; _i++) {
                var childKey = _a[_i];
                var prefix = this.commonPrefix(remaining, childKey);
                if (!prefix.length) {
                    continue;
                }
                if (prefix.length === childKey.length) {
                    // enter child node
                    child = node.children.get(childKey);
                    remaining = remaining.slice(childKey.length);
                    break;
                }
                else {
                    // split the child
                    child = new trie_node();
                    child.children.set(childKey.slice(prefix.length), node.children.get(childKey));
                    node.children.delete(childKey);
                    node.children.set(prefix, child);
                    remaining = remaining.slice(prefix.length);
                    break;
                }
            }
            if (!child && remaining.length) {
                child = new trie_node();
                node.children.set(remaining, child);
                remaining = "";
            }
            node = child;
        }
        if (!node.terminal) {
            node.terminal = true;
            this.elements += 1;
        }
        node.value = value;
    };
    trie.prototype.remove = function (key) {
        var node = this.getNode(key);
        if (node) {
            node.terminal = false;
            this.elements -= 1;
        }
    };
    trie.prototype.map = function (prefix, func) {
        var mapped = [];
        var node = this.getNode(prefix);
        var stack = [];
        if (node) {
            stack.push([prefix, node]);
        }
        while (stack.length) {
            var _a = stack.pop(), key = _a[0], node_1 = _a[1];
            if (node_1.terminal) {
                mapped.push(func(key, node_1.value));
            }
            for (var _i = 0, _b = node_1.children.keys(); _i < _b.length; _i++) {
                var c = _b[_i];
                stack.push([key + c, node_1.children.get(c)]);
            }
        }
        return mapped;
    };
    trie.prototype.getNode = function (key) {
        var node = this.root;
        var remaining = key;
        while (node && remaining.length > 0) {
            var child = null;
            for (var i = 1; i <= remaining.length; i += 1) {
                child = node.children.get(remaining.slice(0, i));
                if (child) {
                    remaining = remaining.slice(i);
                    break;
                }
            }
            node = child;
        }
        return remaining.length === 0 && node && node.terminal ? node : null;
    };
    trie.prototype.commonPrefix = function (a, b) {
        var shortest = Math.min(a.length, b.length);
        var i = 0;
        for (; i < shortest; i += 1) {
            if (a[i] !== b[i]) {
                break;
            }
        }
        return a.slice(0, i);
    };
    return trie;
}());
exports.trie = trie;
