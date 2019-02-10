import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './reducers/user'
import chatSidebarReducer from './reducers/chatSidebar'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
// import reduxLogger from 'redux-logger'

export default createStore(
    combineReducers({
        user: userReducer,
        chatSidebar: chatSidebarReducer
    }),
    {},
    applyMiddleware(thunk, promise())
)