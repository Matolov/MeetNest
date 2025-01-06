import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  getUserWithRoles() {
    return this.http.get<User[]>(environment.backendUrls.API + 'admin/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post<string[]>(environment.backendUrls.API + 'admin/edit-roles/'
      + username + '?roles=' + roles, {});
  }

  getPhotosForApproval() {
    return this.http.get<Photo[]>(environment.backendUrls.API + 'admin/photos-to-moderate');
  }

  approvePhoto(photoId: number) {
    return this.http.post(environment.backendUrls.API + 'admin/approve-photo/' + photoId, {});
  }

  rejectPhoto(photoId: number) {
    return this.http.post(environment.backendUrls.API + 'admin/reject-photo/' + photoId, {});
  }
}
