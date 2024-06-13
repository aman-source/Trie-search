import { Component, OnInit } from '@angular/core';
import { TrieService } from '../trie.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  query: string = '';
  suggestions: string[] = [];

  constructor(private trieService: TrieService) { }

  ngOnInit(): void {
    const words = [
      'apple', 'app', 'apricot', 'banana', 'bapp', 'berry', 'blueberry',
      'blackberry', 'cherry', 'cranberry', 'date', 'dragonfruit',
      'fig', 'grape', 'kiwi', 'lemon', 'lime', 'mango', 'nectarine',
      'orange', 'papaya'
    ];

    words.forEach(word => this.trieService.insert(word));
  }

  onSearch(): void {
    if (this.query.length > 0) {
      this.suggestions = this.trieService.search(this.query);
    } else {
      this.suggestions = [];
    }
  }

  onSuggestionClick(suggestion: string): void {
    this.query = suggestion;
    this.suggestions = [];
  }

  onTabPress(event: KeyboardEvent): void {
    if (this.suggestions.length > 0) {
      this.query = this.suggestions[0];
      this.suggestions = [];
      event.preventDefault();
    }
  }


}
