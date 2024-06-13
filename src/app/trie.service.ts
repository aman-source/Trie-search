import { Injectable } from '@angular/core';

class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEndOfWord: boolean = false;
}

@Injectable({
  providedIn: 'root'
})
export class TrieService {
  private root: TrieNode = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(prefix: string): string[] {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return this.collectAllWords(node, prefix);
  }

  private collectAllWords(node: TrieNode, prefix: string): string[] {
    let words: string[] = [];
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    for (let char in node.children) {
      words = words.concat(this.collectAllWords(node.children[char], prefix + char));
    }
    return words;
  }
}
