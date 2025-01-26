import Image from 'next/image'; 
import Link from 'next/link';
import { auth, signIn, signOut } from '@/auth';
import { Badge, BadgePlus, LogOut } from 'lucide-react';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';


const Navbar = async () => {

    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/venturely.png" alt="logo" width={144} height={30} />
                </Link>

                <div className='flex items-center gap-5 text-black'>
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className='max-sm:hidden'> Pitch </span>
                                <BadgePlus className='size-6 sm:hidden'/>
                                
                            </Link>
                            <form action={ async () => { 
                                "use server";
                                await signOut();
                                
                                 } 
                                }>
                                <button type='submit'>
                                    <span className='max-sm:hidden'> Logout </span>
                                    <LogOut className='size-6 sm:hidden text-red-500' />
                                </button>

                            </form>

                            <Link href={`/users/${session?.id}`}>
                                <Avatar className='size-10'>
                                    <AvatarImage src={session?.user?.image!} alt={session?.user?.name!} />
                                    <AvatarFallback>AV</AvatarFallback>
                                
                                </Avatar> 
                                    
                            
                            </Link>
                        </>
                    ) : (

                        <form action={ async () => {
                            "use server";
                            
                            await signIn('github')

                            }
                        }>
                            <button type='submit'>
                                Login

                            </button>
                        </form>
                    )
                    
                } 
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
