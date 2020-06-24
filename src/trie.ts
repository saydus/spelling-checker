class TrieNode {
  public isEnding: boolean;
  public character: string;
  public children: Map<string, TrieNode>;

  constructor(key?: string) {
      this.isEnding = false;
      this.character = key;
      this.children = new Map<string, TrieNode>();
  }
}
 
class Trie {
    private root: TrieNode;
    private numWords: number;
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
    public insert(word: string): void {
        let children = this.root.children;
        let level = 0;

        for (const char of word) {
            let node;
            if (children.get(char)) {
                node = children.get(char);
            } else {
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
    public getNumWords(): number {
      return this.numWords;
    }


    

    /**
     * Check if word is in the Trie.
     *
     * @param {string} word
     * @returns {boolean}
     * @memberof Trie
     */
    public search(word: string): boolean {
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
    public getNode(word: string): TrieNode {
        let node = null;
        let currentNode = this.root.children;

        for (const char of word) {
            if (currentNode.get(char)) {
                node = currentNode.get(char);
                currentNode = node.children;
            } else {
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
    public startsWith(prefix: string): boolean {
        return this.getNode(prefix) ? true : false;
    }
}

export { Trie };