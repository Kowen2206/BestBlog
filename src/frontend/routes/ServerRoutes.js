import About from '../containers/About';
import Post from '../containers/Post';
import Home from '../containers/Home';
import Login from '../containers/Login';
import NotFound from '../containers/NotFound';
import Editor from '../containers/Editor';
import UserProfile from '../containers/UserProfile';

const serverRoutes = (isLogged) =>{
    return [ 
        {
            exact: true,
            path: '/',
            component: About,
        },
         {
             exact: true,
             path: '/About',
             component: About,
         },
         {
            exact: true,
            path: '/Home',
            component: Home,
        },
        {
            exact: true,
            path: '/Blogs',
            component: Home,
        },
        {
            exact: true,
            path: '/Blog/:id',
            component: Post,
        },
        {
            exact: true,
            path: '/Login',
            component: isLogged? Home : Login,
        },
        {
            exact: true,
            path: '/Editor/:id',
            component: isLogged? Editor : Login,
        },
        {
            exact: true,
            path: '/Profile/:id',
            component: UserProfile,
        },
        {
            name: 'NotFound',
            component: NotFound,
        }
    ]
}

export default serverRoutes;