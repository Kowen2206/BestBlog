import React from 'react'
import "../assets/styles/Moleculas/BlogList.scss";
const imageURL = "https://scontent-qro1-1.xx.fbcdn.net/v/t1.6435-9/48379979_2024468410980028_1855760733292199936_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=174925&_nc_eui2=AeFaMXIWqOznEPjhgirxlv2lpLDRR1vtDGOksNFHW-0MYwxGIDQjgxiV4rbuwTFzjVQkaPg8XaTt6kUGi1tviUpw&_nc_ohc=_rhDjouV_DsAX8l2x2V&_nc_ht=scontent-qro1-1.xx&oh=6d46fcb1120dec664531b204a94b78a2&oe=60B359EF;" 

const BlogListItem = () =>{
    return(
        <>
    
    <article className="blogList__item">
                <a className="blogList__image__link"> 
                    <img src="https://i.ytimg.com/vi/YbL-rJv3BpI/maxresdefault.jpg" alt=""/>
                </a>
                <h1>Blog title</h1>
                <div className="blogList__content">
                    <a className="blogList__image__content">
                        Este es un contenido random pero en un futuro muy cercano (espero que es esta semana), sera real.
                        Este es un contenido random pero en un futuro muy cercano (espero que es esta semana), sera real.
                        Este es un contenido random pero en un futuro muy cercano...
                        

                    </a>
                </div>
                <footer className="userInfo">
                    <div className="userInfo__image">
                        <img src="https://i.ytimg.com/vi/YbL-rJv3BpI/maxresdefault.jpg" alt=""/>
                    </div>
                    <span>Rafa Anaya 22:12</span>
                </footer>
                
            </article>

            <article className="blogList__item">
                <a className="blogList__image__link"> 
                    <img src="https://unity.com/sites/default/files/styles/810_scale_width/public/2020-05/unity-input-system-verified-package-810x455%402x.jpg?itok=fSu2TTfe" alt=""/>
                </a>
                <h1>Blog title</h1>
                <div className="blogList__content">
                    <a className="blogList__image__content">
                        Este es un contenido random pero en un futuro muy cercano (espero que es esta semana), sera real.
                        Este es un contenido random pero en un futuro muy cercano (espero que es esta semana), sera real.
                        Este es un contenido random pero en un futuro muy cercano...
                        

                    </a>
                </div>
                
            </article>

            <article className="blogList__item">
                <a className="blogList__image__link"> 
                    <img src="https://i.ytimg.com/vi/YbL-rJv3BpI/maxresdefault.jpg" alt=""/>
                </a>
                <h1>Blog title</h1>
                <div className="blogList__content">
                    <a className="blogList__image__content">
                        Este es un contenido random pero en un futuro muy cercano (espero que es esta semana), sera real.
                        Este es un contenido random pero en un futuro muy cercano (espero que es esta semana), sera real.
                        Este es un contenido random pero en un futuro muy cercano...
                        

                    </a>
                </div>
                
            </article>
    
    </>
    )
}

export default BlogListItem;