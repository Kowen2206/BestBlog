import React, {useEffect, useState} from 'react'
import UserHeader from '../components/UserHeader';
import BlogListItem from '../components/BlogListItem';
import '../assets/styles/Moleculas/UserHeader.scss'
import {connect} from 'react-redux';
import Header from '../components/Header';
import {getUserArticles} from '../actions'
import axios from 'axios';

const UserProfile = (props) =>{

    let index = props.state.articles.length;
    const [userData, setUserData] = useState({id:"cargando", name:"cargando", articles: [], image: ""});
    const getParams = () => window.location.href.substring(30, window.location.href.length);
    
    useEffect(()=>{

        let id = getParams();
        let data = {};
        axios.post("/api/articles-user", {tags: id})
        .then(res => {
            console.log(res)
            const articles = res.data.data;

            axios.post("/api/user", {id})
            .then(res => {
                const data = res.data.data;

                setUserData(
                    {
                        ...userData, 
                        name: data.name,
                        image: data.photo,
                        id: data._id,
                        articles
                    }
                    );
            });
        });
    },[]);

    return (
        <>
        <Header/>
        <div className="userProfile__container">
            <UserHeader Name={userData.name} Image={userData.image}/>
            <div className="blogLitsItem__container">
                {userData.articles != false? userData.articles.map(item => {
                    if(item.UserId == userData.id ){
                        index -= 1;
                        return <BlogListItem orderIndex={index} key={item._id} {...item} />}  
                    }) : <div> cargando </div>
                }
            </div>
        </div>
        </>
    );
}

const mapStateToProps = state =>{
    return{
        state: state
    }
}

const mapDispatchToProps =
{
    getUserArticles
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);