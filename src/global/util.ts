import {Injectable} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencyformat'
})

@Injectable()
export class Utils {
  private n: any;
  private len: any;

constructor() { }



  detectAmount(v): string {
    if (v) {
      this.n = v[v.length - 1];
      if (isNaN(this.n)) {
        v = v.substring(0, v.length - 1);
        return v;
      }
      v = this.fixAmount(v);
      return v;
    }
  }

  private fixAmount(a): string {
    let period = a.indexOf(".");
    if (period > -1) {
      a = a.substring(0, period) + a.substring(period + 1);
    }
    this.len = a.length;
    while (this.len < 3) {
      a = "0" + a;
      this.len = a.length;
    }
    a = a.substring(0, this.len - 2) + "." + a.substring(this.len - 2, this.len);
    while (a.length > 4 && (a[0] == '0')) {
      a = a.substring(1)
    }
    if (a[0] == ".") {
      a = "0" + a;
    }
    return (a);
  }

}
