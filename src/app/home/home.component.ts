// home.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from '.../book.service';  // Import BookService
import { Book } from '.../book.model';  // Import Book model

@Component({
  selector: 'app-home',
  template: `
    <section>
      <h1>Book List</h1>
      <form>
        <input type="text" placeholder="Search by title or author" #filter />
        <button type="button" (click)="filterBooks(filter.value)">Search</button>
      </form>
    </section>

    <section class="results">
      <app-book
        *ngFor="let book of filteredBooks"
        [book]="book"
      ></app-book>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.filteredBooks = books;  // Display all books initially
    });
  }

  filterBooks(filterText: string): void {
    this.filteredBooks = this.bookService.filterBooks(this.books, filterText);
  }
}
