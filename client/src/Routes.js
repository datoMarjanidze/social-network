import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IsUserAuthorised from './router-middleware/IsUserAuthorised'
import NewsFeedPage from './components/pages/NewsFeed'
import SearchPage from './components/pages/search/Search'
import NotFoundPage from './components/pages/NotFound'
import ProfilePage from './components/pages/profile/Profile'

const Routes = () => (
    <Switch>
        <Route path="/" exact render={() => <IsUserAuthorised requestedPage={NewsFeedPage} />} />
        <Route path="/search" exact render={() => <IsUserAuthorised requestedPage={SearchPage} />} />
        <Route path="/profile/:userID" exact render={(props) => <IsUserAuthorised requestedPage={ProfilePage} {...props} />} />
        <Route path="/*" component={NotFoundPage} />
    </Switch>
)

export default Routes