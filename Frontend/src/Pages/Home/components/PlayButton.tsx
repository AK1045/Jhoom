import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore"
import type { Song } from "@/types"
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";


const PlayButton = ({song} : {song:Song}) => {
     const {isPlaying,currentSong,setCurrentSong,togglePlay}=usePlayerStore();
     const isCurrentSong = currentSong?._id === song._id;

     const handlePlay=()=>{
        if(isCurrentSong) togglePlay();
        else setCurrentSong(song);
     }
  return (
    <Button onClick={handlePlay} className={`absolute bottom-3 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0
        ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
            {isCurrentSong && isPlaying ? (
                <PauseCircleIcon size={5} className="text-black" />
            ) : (
                <PlayCircleIcon size={5} className="text-black" />
            )}
        </Button>
  )
}

export default PlayButton