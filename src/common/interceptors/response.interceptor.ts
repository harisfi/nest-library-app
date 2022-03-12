import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(map((data) => {
      let ret: any;

      if (data instanceof Array) {
        ret = data.map((e) => {
          return this.camelToSnake(e);
        });
      } else {
        ret = this.camelToSnake(data);
      }

      return ret;
    }));
  }

  camelToSnake(data: Object) {
    Object.keys(data).map((e) => {
      const snake = e.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

      if (snake !== e) {
        delete Object.assign(data, {[snake]: data[e]})[e];
      }
    });

    return data;
  }
}
