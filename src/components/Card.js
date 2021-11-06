import React, {useState} from 'react';
import './Card.css';
import like from './images/like.png';
import dislike from './images/dislike.png';
import like_bold from './images/like_bold.png';
import dislike_bold from './images/dislike_bold.png';
import bin from './images/bin.png'


function Card(props) {
    const [likes,setLikes]=useState(props.movie.likes);
    const [dislikes,setDislikes]=useState(props.movie.dislikes);
    const [dislikeoption,setDislikeoption]=useState(false);
    const [likeoption,setLikeoption]=useState(false);
    const [isdelete,setIsdelete]=useState(false);

    const islikeclick = () => {
        if (likeoption){
            return like_bold;
        } else {
            return like;
        }
    }
    const isdislikeclick = () => {
        if (dislikeoption){
            return dislike_bold;
        } else {
            return dislike;
        }
    }

    const clickLike = () => {
        setLikes(likes+1);
        setLikeoption(true);
        if (dislikeoption){
            setDislikes(dislikes-1);
            setDislikeoption(false);
        }
    }
    const clickDislike = () => {
        setDislikes(dislikes+1);
        setDislikeoption(true);
        if (likeoption){
            setLikes(likes-1);
            setLikeoption(false);
        }
    }

    const delete_card = () => {
        setIsdelete(true)
    }

    const img_address = (id) => {
        const fs = require("fs");

        const path = "./images/"+id+".jpg";

        try {
            fs.accessSync(path);
            return(path);
        } catch (err) {
            return ("./images/default_img.jpg");
        }
    }
    if (isdelete){
        return null
    } else{
    return(
            <div className='inline_card'>
                <div className='inline_card_title'>
                    {props.movie.title}
                </div>
                <div className='inline_card_type'>
                    {props.movie.category}
                </div>
                <div>
                    <img src={img_address(props.movie.id)} alt={props.movie.title} className='card_img'/>
                </div>
                <div className='oppinions'>
                    <div className='oppinions'>
                        <div>
                            <img src={islikeclick()} alt='Like' className='option' onClick={clickLike}/>
                        </div>
                        <div>
                            {likes}
                        </div>
                        <div>
                            <img src={isdislikeclick()} alt='Dislike' className='option' onClick={clickDislike}/>
                        </div>
                        <div>
                            {dislikes}
                        </div>
                    </div>
                    <div>
                        <img src={bin} alt="delete" className='option' onClick={delete_card} id={props.movie.id}/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Card