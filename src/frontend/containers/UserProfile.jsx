import React from 'react'
import UserHeader from '../components/UserHeader';
import BlogListItem from '../components/BlogListItem';
import '../assets/styles/Moleculas/UserHeader.scss'
import {connect} from 'react-redux';
import Header from '../components/Header';

const UserProfile = (props) =>{

    return (
        <>
        <Header/>
        <div className="userProfile__container">
            <UserHeader Name={props.state.user.name} Image={props.state.user.photo}/>
            <div className="blogLitsItem__container">
            {props.state.articles.map(item => {
                return <BlogListItem key={item._id} {...item} />})
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

export default connect(mapStateToProps, null)(UserProfile);