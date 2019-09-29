import {
    // 이름 충돌이 일어나므로 별칭으로 임포트
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import elnewsAPIReducer from './utils/elnewsAPI/reducer';
import elnewsLoginReducer from './utils/elnewsLogin/reducer';
import HomeReducer from './containers/Home/reducer';


// export const socket_elnewsLogin = ':8183';


export default function createStore() {

    // for development setting
    let applying = applyMiddleware(thunk);
    if (process.env.EL_DEVELOPMENT) {
        applying = composeWithDevTools(applyMiddleware(logger, thunk))
    }

    return reduxCreateStore(

        combineReducers({
            elnewsAPIReducer,
            elnewsLoginReducer,
            // LoginPageReducer,
            HomeReducer,
        }),
        applying

    )
}

