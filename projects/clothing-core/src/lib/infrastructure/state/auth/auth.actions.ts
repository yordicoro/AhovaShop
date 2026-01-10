import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../domain/entities/user.entity';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login': props<{ username: string; password: string }>(),
        'Login Success': props<{ user: User }>(),
        'Login Failure': props<{ error: string }>(),
        'Logout': emptyProps(),
        'Init Authentication': emptyProps(),
    }
});
