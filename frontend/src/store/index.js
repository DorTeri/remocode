import { thunk } from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { codeBlocksReducer } from './reducers/codeBlocks.reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    codeBlocksModule: codeBlocksReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.gStore = store