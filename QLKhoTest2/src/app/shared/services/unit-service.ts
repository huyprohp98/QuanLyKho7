import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Unit } from '../models/unit.model';
import { PaginatedResult } from '../models/pagination.model';
import { PagingParams } from '../params/paging-params.model'


@Injectable({
  providedIn: 'root'
})
export class UnitService {

  baseUrl = 'http://localhost:63395/api/Units/';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.baseUrl);
  }

  getDetail(id: any) {
    return this.http.get(this.baseUrl + id);
  }

  addNew(unit: Unit) {
    console.log(unit);
    return this.http.post(this.baseUrl, unit);
  }

  update(unit: Unit) {
    return this.http.put(this.baseUrl + unit.id, unit);
  }

  delete(id: any) {
    return this.http.delete(this.baseUrl + id);
  }
  getAllPaging(page?: any, itemsPerPage?: any, pagingParams?: PagingParams): Observable<PaginatedResult<Unit[]>> {
    const paginatedResult = new PaginatedResult<Unit[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (pagingParams != null) {
      params = params.append('keyword', pagingParams.keyword);
      params = params.append('sortKey', pagingParams.sortKey);
      params = params.append('sortValue', pagingParams.sortValue);
      params = params.append('searchKey', pagingParams.searchKey);
      params = params.append('searchValue', pagingParams.searchValue);
    }

    return this.http.get<Unit[]>(this.baseUrl + 'getAllPaging', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }
}