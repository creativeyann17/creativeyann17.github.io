import * as actionTypes from './actionTypes';
import { InitServiceActionTypes } from './types';

export const initRequest = (): InitServiceActionTypes => {
  return {
    type: actionTypes.INIT_REQUEST,
  };
};

export const initSuccess = (): InitServiceActionTypes => {
  return {
    type: actionTypes.INIT_SUCCESS,
  };
};

export const initFailure = (error: any): InitServiceActionTypes => {
  return {
    type: actionTypes.INIT_FAILURE,
    error,
  };
};
