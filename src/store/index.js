import { 
    createStore, 
    applyMiddleware, 
    combineReducers 
} from 'redux'
import Thunk from 'redux-thunk'

import { fileDataReducer } from './reducers/fileData'
import { itemArrangementReducer } from './reducers/itemArrangement'


const reducer = combineReducers({
    fileData : fileDataReducer,
    itemArrangement : itemArrangementReducer,
})


export const store = createStore(
    reducer,
    applyMiddleware(Thunk)
)