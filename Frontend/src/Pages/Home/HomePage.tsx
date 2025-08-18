import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react';
import FeaturedSection from './components/FeaturedSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionGrid from './components/SectionGrid.tsx';
import { usePlayerStore } from '@/stores/usePlayerStore.ts';

const HomePage = () => {
    const {isLoading,trendingSongs,madeForYouSongs,featuredSongs,fetchFeaturedSongs,fetchMadeForYouSongs,fetchTrendingSongs}=useMusicStore();

    const {initializeQueue} = usePlayerStore();

    useEffect(()=>{
       fetchFeaturedSongs();
       fetchMadeForYouSongs();
       fetchTrendingSongs();
    },[fetchFeaturedSongs,fetchMadeForYouSongs,fetchTrendingSongs]);

    useEffect(()=>{
      if(featuredSongs.length > 0 && trendingSongs.length > 0 && madeForYouSongs.length > 0){
        const songs = [...featuredSongs,...madeForYouSongs,...trendingSongs];
        initializeQueue(songs);
      }
    },[featuredSongs,madeForYouSongs,trendingSongs,initializeQueue]);

  return (
    <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-600 to bg-zinc-900'>
         <Topbar />
         <ScrollArea className='h-[calc(100vh-180px)]'>
           <div className='p-4 sm:p-6'>
            <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good Morning</h1>
            <FeaturedSection />
          
              <div className='space-y-8 '>
                <SectionGrid title="Made-for-you" songs={madeForYouSongs} isLoading={isLoading}/>
                <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>
              </div>
           </div>
         </ScrollArea>
         
    </main>
  )
}

export default HomePage