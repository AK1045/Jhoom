import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"


const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);
    const {isPlaying, playNext,currentSong,} = usePlayerStore();

    //to play and pause

    useEffect(()=>{
        if(isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    },[isPlaying]);

    //to handle when song is ended
    useEffect(()=>{
        const audio = audioRef.current;
        audio?.addEventListener("ended",playNext);

        return ()=> audio?.removeEventListener("ended",playNext);
    },[playNext]);

    //handle song changes
    useEffect(()=>{
        if(!audioRef.current || !currentSong) return;
        const audio = audioRef.current;

        //checking if the song is changed
        const songChanged = prevSongRef.current !== currentSong?.audioUrl;
        if(songChanged){
            audio.src = currentSong?.audioUrl;
            audio.currentTime = 0; // playing song from start

            prevSongRef.current = currentSong?.audioUrl;
            if(isPlaying) audio.play();
        }
    },[isPlaying,currentSong])
  return <audio ref={audioRef} src={currentSong?.audioUrl} />
  
}

export default AudioPlayer