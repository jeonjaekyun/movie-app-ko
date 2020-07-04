import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {Button} from 'antd';
import MovieInfo from './MovieInfo';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRuntime = props.movieInfo.runtime;
    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    let variables = {
        userFrom, movieId, movieTitle, moviePost, movieRuntime
    }

    /* 위와 같은 코드
    let variables ={
        userFrom:userFrom,
        movieId:movieId,
        movieTitle:movieTitle,
        moviePost:moviePost,
        movieRuntime:movieRuntime
    }*/

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                console.log('favoriteNumber',response.data);
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('숫자 정보를 가져오는데 실패했습니다.');
                }
            });
        
        // Add to Favorite 후에 새로고침하면 실행이 안된다
        // 이유가 무엇 일까?
        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                console.log('favoried',response.data);
                if (response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert('정보를 가져오는데 실패 했습니다.');
                }
            });

    }, []);

    const onClickFavorite = ()=>{
        if(Favorited){
            axios.post('/api/favorite/removeFromFavorite',variables)
                .then(response => {
                    if(response.data.success){
                        setFavorited(false);
                        setFavoriteNumber(FavoriteNumber - 1);
                    }else{
                        alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
                    }
                })
        }else{
            axios.post('/api/favorite/addToFavorite',variables)
                .then(response => {
                    if(response.data.success){
                        setFavorited(true);
                        setFavoriteNumber(FavoriteNumber + 1);
                    }else{
                        alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
                    }
                })
        }
    }
    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited?"Not Favorite":"Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
