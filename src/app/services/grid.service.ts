import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  items: Observable<any[]>;
  pageSize = 5;
  cursor: any;

  constructor(private db: AngularFireDatabase) {
    this.items = db.list('/patterns', ref => ref.limitToLast(this.pageSize)).valueChanges();
  }

  nextPage() {
    this.items = this.db.list('/patterns', ref => ref.startAt(this.cursor).limitToLast(this.pageSize + 1)).valueChanges();

    this.items.subscribe((items:any) => {
      this.cursor = items[0];
      this.items = items.slice(1);
    });
  }

  previousPage() {
    this.items = this.db.list('/patterns', ref => ref.endAt(this.cursor).limitToLast(this.pageSize + 1)).valueChanges();

    this.items.subscribe((items:any) => {
      this.cursor = items[items.length - 1];
      this.items = items.slice(0, -1);
    });
  }
}
