import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  getResults(model: string, separated: boolean) {
    this.api
      .getResults(model, separated)
      .then((value) => console.info(value))
      .catch((err) => console.error(err));
  }
}
