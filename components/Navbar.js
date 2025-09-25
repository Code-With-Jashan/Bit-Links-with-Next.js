"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from "lucide-react"


const Navbar = () => {

     const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className='h-16 bg-purple-700 flex justify-between px-3 items-center text-white'>
            <div className='logo font-bold text-2xl'>
                 <Link href="/">BitLinks</Link>
            </div>
            <ul className='hidden md:flex justify-center gap-4 items-center'>
                <Link href="/"><li>Home</li></Link>
                <Link href="#"><li>About</li></Link>
                <Link href="/shorten"><li>Shorten</li></Link>
                <Link href="#"><li>Contact Us</li></Link>
                <li className='flex gap-3'>
                    <Link href="/shorten"><button className='bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold'>Try Now</button></Link>
                    <Link href="/github"><button className='bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold'>GitHub</button></Link>
                </li>
            </ul>



            
      {/* Mobile Hamburger Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-purple-800 md:hidden shadow-lg z-50">
          <ul className="flex flex-col items-center justify-center gap-4 py-6">
            <Link href="/" onClick={() => setIsOpen(false)}><li>Home</li></Link>
            <Link href="#" onClick={() => setIsOpen(false)}><li>About</li></Link>
            <Link href="/shorten" onClick={() => setIsOpen(false)}><li>Shorten</li></Link>
            <Link href="#" onClick={() => setIsOpen(false)}><li>Contact Us</li></Link>
            <li className="flex flex-col gap-3 justify-center items-center">
              <Link href="/shorten" onClick={() => setIsOpen(false)}>
                <button className="bg-purple-500 rounded-lg shadow-lg px-4 py-1 font-bold">
                  Try Now
                </button>
              </Link>
              <Link href="/github" onClick={() => setIsOpen(false)}>
                <button className="bg-purple-500 rounded-lg shadow-lg px-4 py-1 font-bold">
                  GitHub
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
        </nav>
    )
}

export default Navbar
