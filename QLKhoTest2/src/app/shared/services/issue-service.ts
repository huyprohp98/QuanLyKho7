import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Issue } from '../models/issue.model'

import { PaginatedResult } from '../models/pagination.model';
import { PagingParams } from '../params/paging-params.model'

@Injectable({
    providedIn: 'root'
  })
export class IssueService {

    baseUrl = 'http://localhost:63395/api/Issues/';

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get(this.baseUrl);
    }
    getAllPaging(page?: any, itemsPerPage?: any, pagingParams?: PagingParams): Observable<PaginatedResult<Issue[]>> {
        const paginatedResult = new PaginatedResult<Issue[]>();
    
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
    
        return this.http.get<Issue[]>(this.baseUrl + 'getAllPaging', { observe: 'response', params })
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

    getDetail(id: any) {
        return this.http.get(this.baseUrl + id);
    }

    addNew(issue: Issue) {
        return this.http.post(this.baseUrl, issue);
    }

    update(issue: Issue) {
        return this.http.put(this.baseUrl+ issue.id, issue);
    }

    delete(id: any) {
        return this.http.delete(this.baseUrl + id);
    }
}
