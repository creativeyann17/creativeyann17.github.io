import { State } from '../index';

export const isReady = (state: State) => state.awsServiceReducer.isReady;
export const getError = (state: State) => state.awsServiceReducer.error;
