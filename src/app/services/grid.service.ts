import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  items: Observable<any[]>;
  pageSize = 15;
  cursor: any = 6;

  constructor(private db: AngularFireDatabase) {
    // this.items = db.list('/patterns', ref => ref).valueChanges();
  }
  loadItems(){
    this.items = this.db.list('/patterns', ref => ref).valueChanges();
  }

  nextPage() {
    console.log("Getting next")
    this.items = this.db.list('/patterns', ref => ref.startAt(this.cursor).limitToLast(this.pageSize + 1)).valueChanges();

    this.items.subscribe((items:any) => {
      console.log({items})
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
