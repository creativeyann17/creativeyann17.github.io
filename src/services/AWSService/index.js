import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import { initSuccess, initFailure } from './actions';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { AWS} from '../../constants'; 

export function* watchInit(action) {
  try {
    if (AWS) {
      Amplify.configure(awsExports);
      yield put(initSuccess());
    }
  } catch (e) {
    yield put(initFailure(e.message));
  }
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.INIT_REQUEST, watchInit);
}
