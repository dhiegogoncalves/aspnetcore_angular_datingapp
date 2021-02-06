import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    if (this.members.length > 0) {
      return of(this.members);
    }

    return this.http.get<Member[]>(`${this.baseUrl}users`).pipe(
      map((members) => {
        this.members = members;
        return members;
      })
    );
  }

  getMemberByUsername(username: string): Observable<Member> {
    const member = this.members.find((x) => x.username === username);
    if (member !== undefined) {
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
