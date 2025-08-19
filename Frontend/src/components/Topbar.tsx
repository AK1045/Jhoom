import { SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SignInButton from './SignInButton';
import { useAuthStore } from '@/stores/useAuthStore';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { Logo } from './Logo/Logo';
import { Input } from './ui/input';
import { useState } from 'react';
import { useMusicStore } from '@/stores/useMusicStore';

  const Topbar = () => {
      const {isAdmin} = useAuthStore();
      const [searchSong,setSearchSong]= useState("");
      const [, setFilteredSongs] = useState<typeof songs>([]);
      const {fetchSongs,songs,isLoading,}=useMusicStore();
      const navigate = useNavigate();


      const handleSearch = () => {
        if (!searchSong.trim()) {
          setFilteredSongs([]);
          navigate("/songs");
          return;
        }
        fetchSongs();
        const searchedSongs = songs.filter(song =>
          song.title.toLowerCase().includes(searchSong.toLowerCase().trim()) ||
          (song.artist && song.artist.toLowerCase().includes(searchSong.toLowerCase().trim()))
        );
        setFilteredSongs(searchedSongs);
        navigate("/songs", { state: { searchedSongs: searchedSongs, searchQuery: searchSong } });
      };

     if(isLoading) return;
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
        <div className='flex gap-2 items-center'>
           <Logo />
        </div>
        <div className="flex items-center gap-4">
            <div className="relative w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img
              src='/images/note.png'
              alt='logo'
              className='size-7 bg-emerald-400 rounded-full p-0.5 transition-colors duration-200 focus:bg-emerald-600'
              />
            </span>
            <Input
              placeholder="Search a Song"
              value={searchSong}
              onChange={(e) => setSearchSong(e.target.value)}
              className="bg-zinc-700 border-none pl-10 focus:bg-amber-100"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            </div>
        </div>
        <div className='flex items-center gap-4'>
           {isAdmin &&(
            <Link to={"/admin"} className={cn(buttonVariants({
              variant:"outline"
            }))}>
                <LayoutDashboardIcon className='size-4 mr-2' />  
                Admin DashBoard
            </Link>
           )}

           <SignedOut>
            <SignInButton />
           </SignedOut>
           <UserButton />
        </div>
    </div>
  )
}

export default Topbar