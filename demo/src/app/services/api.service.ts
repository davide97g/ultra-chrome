import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  host: string = 'https://ultra-chrome.herokuapp.com/';
  constructor(private http: HttpClient) {}

  async getResults(model: string, separated: boolean) {
    // this.utils.asyncOperation.next(true);
    let res = await this.http
      .get(
        this.host +
          'results?model=' +
          model +
          '&sep=' +
          (separated ? 'True' : 'False')
      )
      .toPromise()
      .then((res: any) => res.portfolio)
      .catch((err) => {
        // this.utils.openSnackBar('Portfolio download failed', 'Please, try again.');
        console.error(err);
        return null;
      });
    // this.utils.asyncOperation.next(false);
    return res;
  }
}
