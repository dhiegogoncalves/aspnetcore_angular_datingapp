import { UserParams } from './../_models/userParams';
import { PaginatedResult } from './../_models/pagination';
import { map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  getUserParams(): UserParams {
    return this.userParams;
  }

  setUserParams(userParams: UserParams): void {
    this.userParams = userParams;
  }

  resetUserParams(): UserParams {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(): Observable<PaginatedResult<Member[]>> {
    const response: PaginatedResult<Member[]> = this.memberCache.get(
      Object.values(this.userParams).join('-')
    );
    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(
      this.userParams.pageNumber,
      this.userParams.pageSize
    );

    params = params.append('minAge', this.userParams.minAge.toString());
    params = params.append('maxAge', this.userParams.maxAge.toString());
    params = params.append('gender', this.userParams.gender);
    params = params.append('orderBy', this.userParams.orderBy);

    return this.getPaginatedResult<Member[]>(
      `${this.baseUrl}users`,
      params
    ).pipe(
      map((result: PaginatedResult<Member[]>) => {
        this.memberCache.set(Object.values(this.userParams).join('-'), result);
        return result;
      })
    );
  }

  private getPaginatedResult<T>(
    url: string,
    params: HttpParams
  ): Observable<PaginatedResult<T>> {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http
      .get<T>(url, { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  private getPaginationHeaders(
    pageNumber: number,
    pageSize: number
  ): HttpParams {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }

  getMemberByUsername(username: string): Observable<Member> {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((m: Member) => m.username === username);

    if (member) {
      return of(member);
    }

    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  updateMember(member: Member): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}users/set-main-photo/${photoId}`,
      {}
    );
  }

  deletePhoto(photoId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}users/delete-photo/${photoId}`
    );
  }
}
