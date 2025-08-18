import { InstanceOfAxios } from '@/lib/axios';
import type { Album, Song, Stats } from '@/types';
import toast from 'react-hot-toast';
import {create} from 'zustand';

interface MusicStore{
    songs:Song[];
    albums:Album[];
    isLoading:boolean;
    error:String | null;
    currentAlbum: Album | null;
    madeForYouSongs:Song[];
    trendingSongs:Song[];
    featuredSongs:Song[];
    stats:Stats;

    fetchAlbums:()=>Promise<void>;
    fetchAlbumById:(id:String) => Promise<void>;
    fetchFeaturedSongs:()=>Promise<void>;
    fetchMadeForYouSongs:()=>Promise<void>;
    fetchTrendingSongs:()=>Promise<void>;
    fetchStats:()=>Promise<void>;
    fetchSongs:()=>Promise<void>
    deleteSongs:(id:string)=> Promise<void>;
    deleteAlbum:(id:string)=>Promise<void>;

    isFetchAlbumLoading : boolean,
    isFetchAlbumByIdLoading : boolean,
    isFeaturedSongsLoading : boolean,
    isFetchMadeforYouLoading : boolean,
    isFetchTrendingLoading : boolean,
    isFetchSongsLoading : boolean,
    isFetchStatsLoading : boolean,
    isDeleteSongsLoading:boolean,
}

export const useMusicStore = create<MusicStore>((set)=>({
    albums:[],
    songs:[],
    isLoading:false,
    error:null,
    currentAlbum:null,
    madeForYouSongs:[],
    trendingSongs:[],
    featuredSongs:[],
    stats:{totalAlbums:0,totalArtists:0,totalSongs:0,totalUsers:0},

    isFetchAlbumLoading : false,
    isFetchAlbumByIdLoading : false,
    isFeaturedSongsLoading : false,
    isFetchMadeforYouLoading : false,
    isFetchTrendingLoading : false,
    isFetchSongsLoading : false,
    isFetchStatsLoading : false,
    isDeleteSongsLoading:false,

    fetchAlbums : async ()=>{
        set({isLoading:true,error:null,isFetchAlbumLoading:true});
        try {
            const response = await InstanceOfAxios.get('/albums');
            set({albums:response.data});
        } catch (error:any) {
            set({error:error.message});
        }finally{
            set({isLoading:false,isFetchAlbumLoading:false});
        }
    },
    fetchAlbumById : async(id:String)=>{
        set({isLoading:true,error:null,isFetchAlbumByIdLoading:true});
        try {
            const response = await InstanceOfAxios.get(`/albums/${id}`);
            set({currentAlbum:response.data});
        } catch (error:any) {
            set({error:error.message});
        }finally{
            set({isLoading:false,isFetchAlbumByIdLoading:false});
        }
    },
    fetchFeaturedSongs : async ()=>{
         set({isLoading:true,error:null,isFeaturedSongsLoading:true});
        try {
            const response = await InstanceOfAxios.get('/songs/featured');
            set({featuredSongs:response.data});
        } catch (error:any) {
            set({error:error.message});
        }finally{
            set({isLoading:false,isFeaturedSongsLoading:false});
        }
    },

    fetchMadeForYouSongs : async ()=>{
         set({isLoading:true,error:null,isFetchMadeforYouLoading:true});
        try {
            const response = await InstanceOfAxios.get('/songs/for-you');
            set({madeForYouSongs:response.data});
        } catch (error:any) {
            set({error:error.message});
        }finally{
            set({isLoading:false,isFetchMadeforYouLoading:false});
        }
    },

    fetchTrendingSongs : async ()=>{
        /*
         * The error "GET http://localhost:5000/api/songs/trending 404 (Not Found)" means the backend route `/api/songs/trending` does not exist or is misspelled.
         * To resolve:
         * 1. Check your backend API for the correct endpoint for trending songs.
         * 2. Update the frontend URL to match the backend route.
         * For example, if your backend exposes `/api/trending-songs`, update the axios call:
         *    const response = await InstanceOfAxios.get('/trending-songs');
         * Or, if the correct route is `/songs/trending`, ensure your backend implements it.
         * 
         * If the backend route is missing, you need to add it to your backend code.
         */
         set({isLoading:true,error:null,isFetchTrendingLoading:true});
        try {
            const response = await InstanceOfAxios.get('/songs/trending');
            set({trendingSongs:response.data});
        } catch (error:any) {
            set({error:error.message});
        }finally{
            set({isLoading:false,isFetchTrendingLoading:false});
        }
    },

    fetchSongs:async()=>{
         set({isLoading:true,error:null,isFetchSongsLoading:true});
        try {
            const response = await InstanceOfAxios.get('/songs');
            set({songs:response.data});
            console.log(response.data)
        } catch (error:any) {
            set({error:error.message});
        }finally{
            set({isLoading:false,isFetchSongsLoading:false});
        }
    },


    fetchStats:async()=>{
         set({isLoading:true,error:null,isFetchStatsLoading:true});
        try {
            const response = await InstanceOfAxios.get('/stats');
            set({stats:response.data});
        } catch (error:any) {
            set({error:error.message});
        }finally{
            set({isLoading:false,isFetchStatsLoading:false});
        }
    },

    deleteSongs:async(id:string)=>{
        set({isLoading:true,error:null,isDeleteSongsLoading:true});
        try {
            await InstanceOfAxios.delete(`/admin/songs/${id}`);
            set(state=>({
                songs:state.songs.filter(song => song._id !== id)
            }));
            toast.success("Song Deleted Successfully");
        } catch (error:any) {
            toast.error("Error Deleting Song "+error.message);
        }finally{
            set({isLoading:false,isDeleteSongsLoading:false});
        }
    },

    deleteAlbum:async(id:string)=>{
        set({isLoading:true,error:null});
        try {
            await InstanceOfAxios.delete(`/admin/albums/${id}`);
            set((state)=>({
                albums:state.albums.filter((Album)=>Album._id !== id),
                songs:state.songs.map((song)=>song.albumId === state.albums.find((a)=>a._id === id)?.title ? {...song,album:null} : song)
            }));
            toast.success("Album Deleted Successfully");
        } catch (error:any) {
            toast.error("error in Deleting Album" + error.message);
        }finally{
            set({isLoading:false});
        }
    }
}))