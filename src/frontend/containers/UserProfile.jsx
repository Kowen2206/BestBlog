import React, {useEffect, useState} from 'react'
import UserHeader from '../components/UserHeader';
import BlogListItem from '../components/BlogListItem';
import '../assets/styles/Moleculas/UserHeader.scss'
import {connect} from 'react-redux';
import Header from '../components/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = (props) =>{

    let { id } = useParams();

    let index = 0;
    const [userData, setUserData] = useState({id:"cargando", name:"cargando", articles: [], image: ""});

    useEffect(()=>{
        axios.post("/article/get-user-articles", {userId: id})
        .then(res => {
            const articles = res.data.data;
            axios.post("/user", {id})
            .then(res => {
                const data = res.data.data;
                index = articles.length;
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
            <UserHeader Id={props.user.id} IdParams={id} Name={userData.name} Image={userData.image}/>
            <div className="blogLitsItem__container">
                {userData.articles != false? userData.articles.map(item => {
                    if(item.UserId == userData.id ){
                        index -= 1;
                        return <BlogListItem orderIndex={index} key={item._id} {...item} />}  
                    }) : <div/>
                }
            </div>
        </div>
        </>
    );
}

const mapStateToProps = state =>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, null)(UserProfile);