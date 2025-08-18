import { useAuthStore } from "@/stores/useAuthStore"
import Header from "./components/Header";
import DashBoardStat from "./DashBoardStat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlbumIcon, Music2 } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";


const AdminPage = () => {
    const {isAdmin,isLoading} = useAuthStore();
    const {fetchAlbums,fetchSongs,fetchStats} = useMusicStore();
    useEffect(()=>{
      fetchAlbums();
      fetchSongs();
      fetchStats();
    },[fetchAlbums,fetchSongs,fetchStats])
    if(!isAdmin && !isLoading) return <div>Unauthorized User...</div>
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 via-zinc-600 to-black/18 text-zinc-100 p-8">
        <Header />
        <DashBoardStat />

        <Tabs defaultValue="songs" className="space-y-6">
            <TabsList className="p-1 bg-zinc-700">
                <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-500">
                    <Music2 className="mr-2 size-4" />
                    Songs
                </TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-500">
                    <AlbumIcon className="mr-2 size-4" />
                    Albums
                </TabsTrigger>
            </TabsList>
            <TabsContent value="songs">
               <SongsTabContent />
            </TabsContent>
             <TabsContent value="albums">
               <AlbumsTabContent />
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default AdminPage