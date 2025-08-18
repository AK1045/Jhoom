import { Song } from "../models/songModel.js"

export const findAllSongs = async(req,res,next)=>{
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        console.log("cant find songs",error)
        next(error);
    }
}

export const featuredSongs = async(req,res,next)=>{
    try {
        const songs = await Song.aggregate([
            {$sample:{size:4}},
            {$project:{id:1,artist:1,title:1,imageUrl:1,audioUrl:1}}
        ]);
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}

export const madeForYouSongs = async(req,res,next)=>{
    try {
        const songs = await Song.aggregate([
            {$sample:{size:6}},
            {$project:{id:1,artist:1,title:1,imageUrl:1,audioUrl:1}}
        ]);
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}

export const trendingSongs = async(req,res,next)=>{
    try {
       const songs = await Song.aggregate([
            {$sample:{size:4}},
            {$project:{id:1,artist:1,title:1,imageUrl:1,audioUrl:1}}
        ]);
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}