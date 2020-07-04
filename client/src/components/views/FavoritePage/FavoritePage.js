import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './favorite.css';
import {Popover} from 'antd';
import {IMAGE_BASE_URL} from '../../Config';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoritedMovie();
    }, []);

    const fetchFavoritedMovie = () => {
        axios.post('/api/favorite/getFavoritedMovies', {userFrom:localStorage.getItem('userId')})
            .then(response => {
                if(response.data.success){
                    setFavorites(response.data.favorites);
                }else{
                    alert('favorite 리스트를 가져오는데 실패하였습니다.');
                }
            });
    }
    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId, userFrom
        }

        axios.post('/api/favorite/removeFromFavorites', variables)
            .then(response => {
                if(response.data.success){
                    fetchFavoritedMovie();
                }else{
                    alert('favorite를 삭제하는데 실패했습니다.');
                }
            })
    }
    const renderCards = Favorites.map((favorite, index)=>{
        const content = (
            <div>
                {favorite.moviePost?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}></img>:
                    "no Image"
                }
            </div>
        )
        return (
            <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover>
                <td>{favorite.movieRuntime} mins</td>
                <td><button onClick={()=>onClickDelete(favorite.movieId,favorite.userFrom)}>Remove</button></td>
            </tr>
        )
        
    })
    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Romove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {Favorites && renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
