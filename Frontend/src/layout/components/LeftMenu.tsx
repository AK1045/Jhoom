import PlayListEmpty from "@/components/skeletons/PlayListEmpty"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useMusicStore } from "@/stores/useMusicStore"
import { SignedIn } from "@clerk/clerk-react"
import { HomeIcon, Library, MessageCircleHeartIcon } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"


const LeftMenu = () => {
    const {isLoading,albums,fetchAlbums} = useMusicStore();

    useEffect(()=>{
        fetchAlbums();
    },[fetchAlbums])


  return (
    <div className="h-full flex flex-col gap-2">
        <div className="rounded-lg bg-zinc-900 p-4">
            <div className="space-y-2">
                <Link to={"/"} className={cn(buttonVariants({
                    variant:"ghost",
                    className:"w-full justify-start text-white hover:bg-zinc-800"
                }))}>
                <HomeIcon className="size-5 mr-2" />
                <span className="hidden md:inline">Home</span>
                </Link>

                <SignedIn>
                     <Link to={"/chat"} className={cn(buttonVariants({
                    variant:"ghost",
                    className:"w-full justify-start text-white hover:bg-zinc-800"
                }))}>
                <MessageCircleHeartIcon className="size-5 mr-2" />
                <span className="hidden md:inline">Messages</span>
                </Link>
                </SignedIn>
            </div>
        </div>
        <div className="rounded-lg flex-1 bg-zinc-900 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-white px-2">
                    <Library className="size-5 mr-2"/>
                    <span className="hidden md:inline">PlayLists</span>
                </div>
            </div>
            <ScrollArea className="h-[clac(100vh-300px)]">
               <div className="space-y-2">
                 {isLoading ? (<PlayListEmpty />) : (
                    albums.map((album)=>(
                        <Link to={`/albums/${album._id}`} key={album._id.toString()}
                        className="p-2 bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer hover:bg-zinc-600">
                            <img src={album.imageUrl.toString()} alt={album.title + "image"} className="size-12 rounded-md flex-shrink-0 object-cover"/>
                            <div className="fle-1 min-w-0 hidden md:block">
                                <p className="font-medium truncate">{album.title}</p>
                                <p className="text-sm text-zinc-300 truncate">{album.artist}</p>
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

export default LeftMenu