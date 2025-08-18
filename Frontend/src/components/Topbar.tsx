import { SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignInButton from './SignInButton';
import { useAuthStore } from '@/stores/useAuthStore';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { Logo } from './Logo/Logo';

const Topbar = () => {
    const {isAdmin} = useAuthStore();
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
        <div className='flex gap-2 items-center'>
           {/* <img src="/images/note.png" alt="logo" height={35} width={38} /> */}
           <Logo />
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