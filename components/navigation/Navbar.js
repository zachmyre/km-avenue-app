import Image from 'next/image'
import vercel from '../../public/vercel.svg'

export default function Navbar(){
    return (
        <nav className="bg-red-500 border-black-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            <Image src={vercel} alt="Vercel Logo" width={72} height={72} />
        </nav>
    )
}