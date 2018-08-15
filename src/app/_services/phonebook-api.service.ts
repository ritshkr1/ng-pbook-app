import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PHONEBOOK } from './mock/mock-phonebook';

@Injectable({ providedIn: 'root' })
export class PhonebookApiService {
  private apiUrl = '//jsonplaceholder.typicode.com/comments?postId=';
  private useMock = false; // When flagged as true, will use mock instead of actual API calls.

  constructor(private http: HttpClient) {}

  getPhonebook(postId?: string): Observable<PostItem[]> {
    if (this.useMock) {
      console.log('PhonebookApiService: Using Mock');
      return of(PHONEBOOK);
    } else {
      console.log('PhonebookApiService: HTTP Request submitted for postId=' + postId);
      return this.http.get<PostItem[]>(this.apiUrl + postId)
        .pipe(map(res => res));
    }
  }

  sortPhonebook(posts: PostItem[], sortCriteria: PostSortCriteria): PostItem[] {
    return posts.sort((a, b) => {
      const sortTest = a[this.toCamelCase(sortCriteria.sortColumn)] < b[this.toCamelCase(sortCriteria.sortColumn)]
      if (sortCriteria.sortDirection === 'desc') {
        return sortTest ? 1 : -1;
      } else {
        return sortTest ? -1 : 1;
      }
    });
  }

  toCamelCase(str: String) {
    return str.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '').replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  }

  getColumns(): string[] {
    return ['Id', 'PostId', 'Name', 'Email', 'Body'];
  }
}

export class PostItem {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
}

export class PostSortCriteria {
  sortColumn: string;
  sortDirection: string;
}
