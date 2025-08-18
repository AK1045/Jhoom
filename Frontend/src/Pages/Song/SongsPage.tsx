
import PlayListEmpty from "@/components/skeletons/PlayListEmpty"
import Topbar from "@/components/Topbar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusicStore } from "@/stores/useMusicStore"
import {  ArrowLeftCircle, Library } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"


const SongsPage = () => {
    const {isLoading,songs,fetchSongs} = useMusicStore();

    useEffect(()=>{
        fetchSongs();
    },[fetchSongs])


  return (
    <div className="h-full flex flex-col gap-2">
        <div className="rounded-lg bg-zinc-900 p-4">
           <Topbar />
        </div>
        <div className="rounded-lg flex-1 bg-zinc-900 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-white px-2">
                    <Library className="size-5 mr-2"/>
                    <span className="hidden md:inline">Songs</span>
                </div>
                <div className="flex items-center text-white px-2">
                    <Link to="/"><ArrowLeftCircle className="hover:text-emerald-500"/></Link>
                </div>
            </div>
            <ScrollArea className="h-[clac(100vh-300px)]">
               <div className="space-y-2">
                 {isLoading ? (<PlayListEmpty />) : (
                    songs.map((song)=>(
                        <Link to={`/songs/${song._id}`} key={song._id.toString()}
                        className="p-2 bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer hover:bg-zinc-600">
                            <img src={song.imageUrl.toString()} alt={song.title + "image"} className="size-12 rounded-md flex-shrink-0 object-cover"/>
                            <div className="fle-1 min-w-0 hidden md:block">
                                <p className="font-medium truncate">{song.title}</p>
                                <p className="text-sm text-zinc-300 truncate">{song.artist}</p>
                            </div>
                        </Link>
                    ))
                 )}
               </div>
            </ScrollArea>
        </div>
    </div>
  )
}

export default SongsPage