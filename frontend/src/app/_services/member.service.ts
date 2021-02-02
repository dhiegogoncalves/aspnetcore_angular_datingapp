import { Member } from '../_models/member';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}users`);
  }

  getMemberByUsername(username: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }
}
