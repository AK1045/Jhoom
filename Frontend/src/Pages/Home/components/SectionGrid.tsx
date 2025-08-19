import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import type { Song } from "@/types";
import PlayButton from "./PlayButton";
import { Link } from "react-router-dom";
// import SongsPage from "@/Pages/Song/SongsPage";

type SectionGrids={
  title:string;
  songs:Song[];
  isLoading:boolean;
}

const SectionGrid = ({title,songs,isLoading}:SectionGrids) => {
  if(isLoading) return <SectionGridSkeleton />
  return (
    <div className="mb-8 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Link to="/songs">
        <Button variant='link' className="text-sm text-zinc-400 hover:text-white">Show all</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
            <div>
              <div className="relative mb-4 ">
                <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <PlayButton song={song} />
              </div>
              <h3 className="font-medium mb-2 truncate">{song.title}</h3>
              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default SectionGrid