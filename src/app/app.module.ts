import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
// Components
import { AppComponent } from "./app.component";
import { TableComponent } from "./table/table.component";
import { InputComponent } from "./input/input.component";
import { PageComponent } from "./page/page.component";
import { SortableColumnComponent } from "./sortable-column/sortable-column.component";
// Directives
import { SortableTableDirective } from "./_directives/sortable-table.directive";
// Services
import { SearchService } from "./_services/search.service";
import { LoaderService } from "./_services/loader.service";
import { SortService } from "./_services/sort.service";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InputComponent,
    PageComponent,
    HttpClientModule,
    SortableColumnComponent,
    SortableTableDirective,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [SearchService, LoaderService, SortService],
  bootstrap: [AppComponent],
})
export class AppModule {}
