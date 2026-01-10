import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../../domain/entities/user.entity';
import { AuthActions } from './auth.actions';

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

export const initialAuthState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialAuthState,
        on(AuthActions.login, (state) => ({ ...state, isLoading: true, error: null })),
        on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, isLoading: false, user, error: null })),
        on(AuthActions.loginFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
        on(AuthActions.logout, (state) => ({ ...state, user: null })),
    ),
});

export const {
    selectUser: selectAuthUser,
    selectIsLoading: selectAuthIsLoading,
    selectError: selectAuthError,
    selectAuthState
} = authFeature;
