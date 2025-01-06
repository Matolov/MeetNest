import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Member } from '../interfaces/member';

export const memberDetailedResolver: ResolveFn<Member | null> = (route, state) => {
  const memberService = inject(MembersService);

  const username = route.paramMap.get('username');

  if (!username) return null;

  return memberService.getMember(username);
};
