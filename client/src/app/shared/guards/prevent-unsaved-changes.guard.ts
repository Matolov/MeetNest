import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ConfirmService } from '../helpers/confirm.service';
import { MemberEditComponent } from '../../pages/members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  const confirmService = inject(ConfirmService);

  if (component.editForm?.dirty) {
    return confirmService.confirm() ?? false;
  }
  return true;
};
