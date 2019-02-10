import React from 'react'
import { PrimaryMiddleware } from './app-component-middleware'
import LoggerSrv from './services/api/logger'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout'
import { GlobalHistory } from './components/history'
import Routes from './Routes'
import 'semantic-ui-css/semantic.min.css'

PrimaryMiddleware()
LoggerSrv()

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <GlobalHistory />
                <Routes />
            </Layout>
        </Router>
    </Provider>
)

export default App