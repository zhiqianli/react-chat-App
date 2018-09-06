import React from "react"
import ReactDOM from "react-dom"
import Login from "./container/login/login"
import Register from "./container/register/register"
import Bossinfo from "./container/bossinfo/bossinfo"
import Geniusinfo from "./container/geniusifo/geniusinfo"
import Dashboard from "./container/dashboard/dashboard"
import Chat from "./container/chat/chat"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import Reducers from "./redux/reducers"
import "./config"
import "./index.css"
import AuthRouter from "./component/authRoute/authRoute"
import { BrowserRouter, Route, Switch } from "react-router-dom"
let store
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    store = createStore(Reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
} else {
    store = createStore(Reducers, compose(applyMiddleware(thunk)))
}
ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRouter></AuthRouter>
                    <Switch>
                        <Route exact path="/" component={()=>{return <div>123</div>}} />
                        <Route path="/login" component={Login} > </Route>
                        <Route path="/bossinfo" component={Bossinfo} > </Route>
                        <Route path="/geniusinfo" component={Geniusinfo}> </Route>
                        <Route path="/register" component={Register} > </Route>
                        <Route path="/chat/:userName" component={Chat} > </Route>
                        {/* <Route component={Dashboard}> </Route> */}
                        <Dashboard></Dashboard>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ), document.getElementById("root"))