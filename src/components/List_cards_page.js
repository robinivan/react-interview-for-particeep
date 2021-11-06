import React, {useEffect, useState} from 'react';
import './List_cards_page.css';
import {movies$} from "../movies";
import Card from "./Card";
import $ from 'jquery';
import back from "./images/Back.png";
import next from "./images/Next.png";

function List_cards_page(props) {
    const [movies,setMovies] =useState([])
    const [categories,setCategories] =useState([])
    const [filt, setFilt]=useState([])
    const [bold, setBold]=useState([])
    const [pagenumber,setPagenumber]=useState(1)
    const clickNext = () => {
        setPagenumber(pagenumber+1)
    }
    const clickBack = () => {
        if (pagenumber>1){
            setPagenumber(pagenumber-1)
        }
    }
    const clickFilter = (a) =>{
        console.log(a)
        let c=false
        for(let j=0; j<bold.length; j++){
            if (bold[j]===a){
                c=true;
            }
        }
        console.log(c)
        if (c){
            console.log('bonjour')
            let b=bold;
            console.log(bold)
            for (let j=0; j<b.length;j++){
                if ( b[j] === a) {
                    b.splice(j, 1);
                    j--;
                }
            }
            setBold(b);
            console.log(bold)
        } else{
            console.log("yo")
            let b=bold
            console.log(bold)
            console.log(typeof b)

            b.push(a)
            console.log(b)
            setBold(b)
            console.log(bold)

        }
    }
    const isbold = (a) => {
        let c=false
        for(let j=0; j<bold.length; j++){
            if (bold[j]===a){
                c=true;
            }
        }
        if (c){
            return 'filters bold'
        }else {
            return 'filters'
        }
    }
    const filter = () => {
        return movies
            .filter(a => !filt.includes(a.id))
            .map(item=>item.category)
            .filter((x, i, a) => a.indexOf(x) === i)
            .map(item => <div className={isbold(item)} onClick={()=>clickFilter(item)}>{item}</div>)
    }
    const card = () => {
        if (bold.length===0){
            return movies
                .filter((element, index) => ((index<pagenumber*8)&(index>=(pagenumber-1)*8)))
                .map(item=><Card movie={item}/>)
        } else {
            return movies
                .filter(a=>bold.includes(a.category))
                .filter((element, index) => ((index<pagenumber*8)&(index>=(pagenumber-1)*8)))
                .map(item=><Card movie={item}/>)
        }
    }
    /*useEffect(() => {
        movies$.then(result => setMovies(result))
    })*/
    try{
        movies$.then(result => {
            setMovies(result)
        })
    }catch{
        console.log('hi')
    }
    document.addEventListener("click", function (M){
        setFilt(filt+[M.target.id])
    })
    return(
        <div className='main_box'>
            <div className='main_box_line1 header'>
                <img src='./favicon1.ico' alt='Logo' className='Logo'/>
                My Movie List
            </div>
            <div className='main_box_line'>
                {filter()}
            </div>
            <div className='main_box_line'>
               {
                   card()
               }
            </div>
            <div className='main_box_line'>
                <img src={back} alt='back' className='back_next' onClick={clickBack}/>
                <div className='pagenumber'>
                    {pagenumber}
                </div>
                <img src={next} alt='next' className='back_next' onClick={clickNext}/>
            </div>
        </div>
    )
}

export default List_cards_page