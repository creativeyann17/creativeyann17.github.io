import * as actionTypes from './actionTypes';

interface InitRequestAction {
  type: typeof actionTypes.INIT_REQUEST;
}

interface InitSuccessAction {
  type: typeof actionTypes.INIT_SUCCESS;
}

interface InitFailureAction {
  type: typeof actionTypes.INIT_FAILURE;
  error: null | any;
}

export interface InitType {}

export interface Reducer {
  isReady: boolean;
  error: null | any;
}

export type InitServiceActionTypes =
  | InitRequestAction
  | InitSuccessAction
  | InitFailureAction;
