import {create} from 'zustand';
import type { Song } from '@/types';
import { useChatStore } from './useChatStore';

interface PlayerStore{
    currentSong:Song | null;
    isPlaying:boolean;
    queue:Song[];
    currentIndex:number;

    initializeQueue:(songs:Song[])=> void;
    playAlbum:(songs:Song[],startIndex?:number)=> void;
    setCurrentSong:(song:Song | null)=> void;
    togglePlay:()=>void;
    playNext:()=> void;
    playPrevious:()=> void;
}

export const usePlayerStore = create<PlayerStore>((set,get)=>({
    currentIndex:-1,
    currentSong:null,
    isPlaying:false,
    queue:[],

    initializeQueue:(songs:Song[])=> {
        set({queue:songs,
            currentSong:get().currentSong || songs[0],
            currentIndex:get().currentIndex === -1 ? 0 : get().currentIndex,

        })
    },
    playAlbum:(songs:Song[],startIndex=0)=> {
        if(songs.length === 0) return;
        const Song=songs[startIndex];

        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity",{
                userId:socket.auth.userId,
                activity:`Playing ${Song.title} by ${Song.artist }`
            })
        }

        set({
            queue:songs,
            isPlaying:true,
            currentIndex:startIndex,
            currentSong:Song,
        })
    },

    setCurrentSong:(song:Song | null)=> {
        if(!song) return;
        const songIndex = get().queue.findIndex(s => s._id === song._id);
         const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity",{
                userId:socket.auth.userId,
                activity:`Playing ${song.title} by ${song.artist }`
            })
        }
        set({
            currentSong:song,
            isPlaying:true,
            currentIndex:songIndex === -1 ? get().currentIndex : songIndex,
        })
    },
    togglePlay:()=>{
        const toggle = !get().isPlaying;
        const currentSong = get().currentSong;
        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity",{
                userId:socket.auth.userId,
                activity:toggle && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : "Idle",
            })
        }

        set({isPlaying : toggle,})
    },

    playNext:()=> {
        const {currentIndex, queue} = get();
        const nextIndex = currentIndex + 1;

        if (queue.length === 0) {
            set({ isPlaying: false });
            return;
        }

        

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
             const socket = useChatStore.getState().socket;
            if(socket.auth){
                socket.emit("update_activity",{
                    userId:socket.auth.userId,
                    activity:`Playing ${nextSong.title} by ${nextSong.artist }`
                })
            }
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            });
        } else {
            // Loop back to the start of the queue
            const nextSong = queue[0];
             const socket = useChatStore.getState().socket;
                if(socket.auth){
                    socket.emit("update_activity",{
                        userId:socket.auth.userId,
                        activity:"Idle",
                    })
                }
            set({
                currentSong: nextSong,
                currentIndex: 0,
                isPlaying: true,
            });
        }
    },

    playPrevious:()=> {
        const { currentIndex, queue } = get();
        const prevIndex = currentIndex - 1;

        if (queue.length === 0) {
            set({ isPlaying: false });
            return;
        }

        if (prevIndex >= 0) {
            const prevSong = queue[prevIndex];
             const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity",{
                userId:socket.auth.userId,
                activity:`Playing ${prevSong.title} by ${prevSong.artist }`
            })
        }
            set({
                currentIndex: prevIndex,
                currentSong: prevSong,
                isPlaying: true,
            });
        } else {
            // Optionally, do nothing or stop playing when at the start of the queue
             const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity",{
                userId:socket.auth.userId,
                activity:"Idle"
            })
        }
            set({ isPlaying: false });
        }
    },
}))