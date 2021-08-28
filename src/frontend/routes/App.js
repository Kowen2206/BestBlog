import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import About from '../containers/About';
import Post from '../containers/Post';
import Home from '../containers/Home';
import Login from '../containers/Login';
import NotFound from '../containers/NotFound';
import Editor from '../containers/Editor';
import UserProfile from '../containers/UserProfile';
import Layout from '../containers/Layout';

const App = ({isLogged}) =>{
    return (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/" component={About} />
                <Route exact path="/About" component={About} /> 
                <Route exact path="/Home" component={Home} />
                <Route exact path="/Blogs" component={Home} />
                <Route exact path="/Blog/:id" component={Post} />
                <Route exact path="/Login" component={isLogged? Home : Login} />
                <Route exact path="/Register" component={isLogged? Home : Login} />
                <Route exact path="/Editor/:id" component={isLogged? Editor : Login } />
                <Route exact path="/Profile/:id" component={UserProfile} />
                <Route component={NotFound}/>
            </Switch>
        </Layout>
    </BrowserRouter>
    );
}

export default App;