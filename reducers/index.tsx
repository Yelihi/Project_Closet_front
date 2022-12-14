import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';

import user from './user';
import post from './post';

const rootReducer = combineReducers({
  index: (state: Object = {}, action: AnyAction) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export type ReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
