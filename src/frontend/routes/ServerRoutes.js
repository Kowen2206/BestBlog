import Home from '../containers/Home'
import BlogPost from '../containers/BlogPost'
import Blog from '../containers/Blog'
import Login from '../containers/Login'
import NotFound from '../containers/NotFound'
import Editor from '../containers/Editor'

const serverRoutes = (isLogged) =>{
    return [ 
        
         {
             exact: true,
             path: '/Home',
             component: Blog,
     
         },
        {
            exact: true,
            path: '/Blogs',
            component: Blog,
    
        },
        {
            exact: true,
            path: '/BlogPost',
            component: BlogPost,
    
        },
        {
            exact: true,
            path: '/Login',
            component: Login,
    
        },
        {
            exact: true,
            path: '/Editor',
            component: Editor,
    
        },
        {
            exact: true,
            path: '/',
            component: Home,
    
        },
        {
           
            name: 'NotFound',
            component: NotFound,
    
        }
    ]
}

export default serverRoutes;