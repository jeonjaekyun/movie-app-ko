const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    
    //mongodb에서 favorite 숫자 가져오기
    Favorite.find({'movieId':req.body.movieId})
    .exec((err,info)=>{
        if(err) return res.status(400).send(400);

        //프론트엔드에 숫자 정보를 보내기
        res.status(200).json({success:true,favoriteNumber:info.length});
    })

});

router.post('/favorited', (req, res) => {
    
    Favorite.find({'userFrom':req.body.userFrom, 'movieId':req.body.movieId})
    .exec((err,info)=>{
        if(err) return res.status(400).send(400);

        let result = false;

        if(info.length !== 0){
            return true;
        }

        //프론트엔드에 정보 보내기
        res.status(200).json({success:true, favorited:result});
    })

});

router.post('/removeFromFavorite', (req, res) => {
    
    Favorite.findOneAndDelete({'movieId':req.body.movieId,'userFrom':req.body.userFrom})
    .exec((err,info)=>{
        if(err) return res.status(400).send(err);

        res.status(200).json({success:true});
    })

});

router.post('/addToFavorite', (req, res) => {
    
    const favorite = new Favorite(req.body);

    favorite.save((err,info)=>{
        if(err) return res.status(400).send(400);
        
        res.status(200).json({success:true});
    });

});

router.post('/getFavoritedMovies', (req, res) => {

    Favorite.find({'userFrom':req.body.userFrom})
    .exec((err,favorites)=>{
        if(err) return res.status(400).send(err);

        res.status(200).json({success:true, favorites});
    });

});

router.post('/removeFromFavorites', (req, res) => {
    
    Favorite.findOneAndDelete({'movieId':req.body.movieId,'userFrom':req.body.userFrom})
    .exec((err,info)=>{
        if(err) return res.status(400).send(err);

        res.status(200).json({success:true});
    })

});

module.exports = router;
