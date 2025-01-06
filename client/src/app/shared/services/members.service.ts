import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject, model, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Member } from '../interfaces/member';
import { of, tap } from 'rxjs';
import { Photo } from '../interfaces/photo';
import { PaginatedResult } from '../interfaces/pagination';
import { UserParams } from '../interfaces/userParams';
import { AccountService } from './account.service';
import { setPaginatedResponse, setPaginationHeaders } from '../helpers/paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);
  memberCache = new Map();
  user = this.accountService.currentUser();
  userParams = model<UserParams>(new UserParams(this.user));

  resetUserParams() {
    this.userParams.set(new UserParams(this.user));
  }

  getMembers() {
    const response = this.memberCache.get(Object.values(this.userParams()).join('-'));

    if (response) return setPaginatedResponse(response, this.paginatedResult);

    let params = setPaginationHeaders(this.userParams().pageNumber, this.userParams().pageSize);

    params = params.append('minAge', this.userParams().minAge);
    params = params.append('maxAge', this.userParams().maxAge);
    params = params.append('gender', this.userParams().gender);
    params = params.append('orderBy', this.userParams().orderBy);

    return this.http.get<Member[]>(environment.backendUrls.API + 'users', {observe: 'response', params}).subscribe({
      next: response => {
        setPaginatedResponse(response, this.paginatedResult);
        this.memberCache.set(Object.values(this.userParams()).join('-'), response);
      }
    })
  }

  getMember(username: string) {
    const member: Member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.body), [])
      .find((m: Member) => m.username === username);

    if (member) return of(member);

    return this.http.get<Member>(environment.backendUrls.API + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(environment.backendUrls.API + 'users', member).pipe()
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(environment.backendUrls.API + 'users/set-main-photo/' + photo.id, {}).pipe()
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(environment.backendUrls.API + 'users/delete-photo/' + photo.id).pipe()
  }
}
