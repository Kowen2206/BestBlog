import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../containers/Home'
import BlogPost from '../containers/BlogPost'
import Blog from '../containers/Blog'
import Login from '../containers/Login'
import NotFound from '../containers/NotFound'
import Editor from '../containers/Editor'

const App = ({isLogged}) =>{

    return (
    <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Blog} />
        <Route exact path="/Blogs" component={Blog} />
        <Route exact path="/Blog/:id" component={BlogPost} />
        <Route exact path="/Login" component={isLogged? Home : Login} />
        <Route exact path="/Register" component={isLogged? Home : Login} />
        <Route exact path="/Editor" component={isLogged? Editor : Login} />
        <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>);
}

export default App;