import {Song} from '../models/songModel.js'
import {Album} from '../models/albumModel.js'
import cloudinary from '../lib/cloudinary.js'

//cloudinary upload function
const uploadToCloudinary = async (file)=>{
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath,{
        resource_type:"auto"
    })
    return result.secure_url
  } catch (error) {
    console.log("error in upload to cloudinary",error);
    throw new Error("error in upload to cloudinary");
  }
}

export const createSong = async (req,res,next)=>{
  try {
     if(!req.files || !req.files.audioFile || !req.files.imageFile){
    return res.status(400).json({message : "Please upload all files"});
   }

   const {title,artist,albumId,duration} = req.body;
   const audioFile = req.files.audioFile;
   const imageFile = req.files.imageFile;

   const audioUrl = await uploadToCloudinary(audioFile);
   const imageUrl = await uploadToCloudinary(imageFile);


   const song = new Song({
    title,
    artist,
    audioUrl,
    imageUrl,
    duration,
    albumId:albumId || null,
   });

   await song.save();

   if(albumId){
    await Album.findByIdAndUpdate(albumId,{
        $push:{songs:song._id},
    }) 
   }
   res.status(201).json(song);
  } catch (error) {
    console.log("Error in Creating song",error);
    next(error);
  }
}

export const deleteSong = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const song = await Song.findById(id);

        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull:{songs:song._id},
            })
        }
        await Song.findByIdAndDelete(id);

        res.status(200).json({message:"song deleted successfully"});
    } catch (error) {
        console.log("error in deleting song",error);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
	try {
		const { title, artist, releaseYear } = req.body;
		const { imageFile } = req.files;

		const imageUrl = await uploadToCloudinary(imageFile);

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};

export const deleteAlbum = async(req,res,next)=>{
    try {
        const {id} = req.params;
        // const album = await Album.findByIdAndUpdate(id);
        await Song.deleteMany({albumId:id})
        await Album.findByIdAndDelete(id);
        res.status(200).json({message:"album deleted successfully"});
    } catch (error) {
        console.log("failed to delete album",error);
        next(error);
    }
}

export const verifyAdmin = async(req,res,next)=>{
    res.status(200).json({admin:true});
}

