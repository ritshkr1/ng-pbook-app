import { Component, OnInit } from '@angular/core';
// Services
import { PhonebookApiService, PostItem } from '../_services/phonebook-api.service';
import { SearchService } from '../_services/search.service';
import { LoaderService } from '../_services/loader.service';
// Entities
// import { CacheItem } from '../_entities/cacheItem';
import { CacheStore } from '../cache-store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  inputText: string;
  columns: string[];
  phonebook: PostItem[];
  showLoader: boolean;
  noResultsTextDefault = 'no data to display';
  noResultsText: string;

  private maxCachedItems = 5;  // Holds the max number of last results to cache
  private expirationSecondsForItem = 10; // Holds the number of seconds to expire a cached item.
  private cacheStore: CacheStore<PostItem[]>;

  constructor(private pbApiService: PhonebookApiService, private searchService: SearchService,
    private loaderService: LoaderService) {
      this.cacheStore = new CacheStore<PostItem[]>(this.maxCachedItems, this.expirationSecondsForItem);
  }

  ngOnInit() {
    this.noResultsText = this.noResultsTextDefault;
    this.columns = this.pbApiService.getColumns();
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });

    this.searchService.currentMessage.subscribe((message) => {
      this.inputText = message;
      if (!this.inputText) {
        // No input text.
        this.phonebook = [];
        this.noResultsText = this.noResultsTextDefault;
      } else {
        // Input text was entered.
        this.loaderService.display(true);

        const doneCallback = (data) => {
          this.phonebook = data;
          this.loaderService.display(false);
        };

        this.cacheStore.GetOrCache(message, (callback) => {
            this.pbApiService.getPhonebook(message).subscribe(data => {
              if (data.length === 0) { this.noResultsText = 'Sorry but there\'s ' + this.noResultsTextDefault + ' for:'; }
              doneCallback(data);
              callback(data);
            });
        }, doneCallback);
      }
    });
  }

  onSorted($event) {
    this.phonebook = this.pbApiService.sortPhonebook(this.phonebook, $event);
  }
}
