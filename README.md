# NgPbookApp | Angular 6 Search with data table POC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

<img src="https://image.ibb.co/mUrjy9/thumb_bigger_formation_angular_2.png" alt="Angular" width="130" height="130"/>

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

## Running the app

First, run `npm install` in the root folder (to install all it's dependencies).

Then, Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
Note: If this port is already taken, you can use `ng serve --port <port>` and configure another one instead.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
