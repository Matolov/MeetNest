import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../interfaces/member';
import { PaginatedResult } from '../interfaces/pagination';
import { setPaginatedResponse, setPaginationHeaders } from '../helpers/paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);

  toggleLike(targetId: number) {
    return this.http.post(`${environment.backendUrls.API}likes/${targetId}`, {})
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = setPaginationHeaders(pageNumber, pageSize);

    params = params.append('predicate', predicate);

    return this.http.get<Member[]>(`${environment.backendUrls.API}likes`,
      {observe: 'response', params}).subscribe({
        next: response => setPaginatedResponse(response, this.paginatedResult)
      })
  }

  getLikeIds() {
    return this.http.get<number[]>(`${environment.backendUrls.API}likes/list`).subscribe({
      next: ids => this.likeIds.set(ids)
    })
  }
}
