import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import kmavenue from '../../public/kmavenue.png'
import Head from 'next/head'

export default function Navbar(){
      const [navbarOpen, setNavbarOpen] = useState(false);
      return (
        <>
        <Head>
          <title>KM Avenue</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-300 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full items-center relative flex justify-between lg:w-auto lg:static lg:block lg:justify-center">
                  <Link href="/">
                    <a
                    className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                    KM Avenue
                    </a>
                </Link>
                <button
                  className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  <Image src={kmavenue} width={75} height={50} />
                </button>
              </div>
              <div
                className={
                  "lg:flex items-center" +
                  (navbarOpen ? " flex" : " hidden")
                }
                id="example-navbar-danger"
              >
                <ul className="lg:flex lg:flex-row list-none lg:ml-auto">
                  <li className="nav-item">
                    <Link href='/'>
                        <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        >
                            <span className="ml-2">Home</span>
                        </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href='/products'>
                        <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        >
                            <span className="ml-2">Products</span>
                        </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href='/contact'>
                        <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        >
                            <span className="ml-2">Contact</span>
                        </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href='/admin/reports'>
                        <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        >
                            <span className="ml-2">Admin Reports</span>
                        </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="hidden lg:block">
                  <Image src={kmavenue} width={75} height={50} />
              </div>
            </div>
        </nav>
      </>
      );
}