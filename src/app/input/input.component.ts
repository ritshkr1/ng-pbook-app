import { Component, OnInit } from '@angular/core';
// Services
import { SearchService } from '../_services/search.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  keyUpTypingMiliseconds = 400;
  searchText: string;
  keyUpTimeout: any = null;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  keyUp(event: any) {
    this.searchText = event.target.value;
    clearTimeout(this.keyUpTimeout);

    this.keyUpTimeout = setTimeout(() => {
      this.searchService.changeMessage(this.searchText);
    }, this.keyUpTypingMiliseconds);
  }

  keyPress(event: any) {
    // Verify that input is numeric.
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
