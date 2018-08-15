# NgPbookApp | Angular 6 Search with data table POC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

![Angular](https://image.ibb.co/mUrjy9/thumb_bigger_formation_angular_2.png)

## Example

 
## Features

- Search box input 
  - Retrieves data via external API.
  - Input numeric validation
  - Keyup debouncing (for performance improvement) by 'keyUpTypingMiliseconds' parameter.
- Data table
  - Columns can sort data (Ascending/Descending order)
  - Local caching by both 'maxCachedItems' and 'expirationSecondsForItem' parameters.
  - Loading behavior.
  
private maxCachedItems = 5;  // Holds the max number of last results to cache
  private expirationSecondsForItem = 10; // Holds the number of seconds to expire a cached item.
  private cacheStore: CacheStore<PostItem[]>;

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
