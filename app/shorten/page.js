"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { useMemo } from 'react';
import { motion } from 'framer-motion';


const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setgenerated] = useState("")
     const [urlError, setUrlError] = useState("")
  const [shortUrlError, setShortUrlError] = useState("")

     // URL validation regex
  const urlPattern =  useMemo(() => /^https?:\/\/.+/, []);

  // Live validation
  useEffect(() => {
    if (url && !urlPattern.test(url)) {
      setUrlError("URL must start with http:// or https://")
    } else if (url && url.length < 13) {
      setUrlError("URL is too short")
    } else {
      setUrlError("")
    }

    if (shorturl && shorturl.length < 4) {
      setShortUrlError("Short URL must be at least 4 characters")
    } else {
      setShortUrlError("")
    }
  }, [url, shorturl, urlPattern])

  const isFormValid = url && shorturl && !urlError && !shortUrlError

    const generate = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setgenerated(`/${shorturl}`)
                seturl("")
                setshorturl("")
                //console.log(result)
               
               if (result.success) {
        // ✅ Success toast
        toast.success(result.message || "URL generated successfully!", {
            position: "top-right",
            className: "!top-16",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })
    } else {
        // ❌ Error toast
        toast.warning(result.message || "Something went wrong!", {
            position: "top-right",
            className: "!top-16",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })
    }

            })
            .catch((error) => console.error(error));
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className='mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-purple-100 my-10 md:my-16 p-6 md:p-10 rounded-lg flex flex-col gap-6'>
                <h1 className='font-bold text-2xl md:text-3xl text-center md:text-left'>Generate your short URLs</h1>
                <div className='flex flex-col gap-4 md:gap-6 w-full'>
                    <input type="url"
                        value={url}
                         pattern="https?://.+"
                        className='px-4 py-3 rounded-md w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition duration-300 hover:scale-105'
                        placeholder='Enter your URL'
                        name='url'
                        onChange={e => { seturl(e.target.value) }}  />

                         {urlError && <span className="text-red-600 text-xs md:text-sm">{urlError}</span>}

                    <input type="text"
                        value={shorturl}

                        className='px-4 py-3 rounded-md w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition duration-300 hover:scale-105'
                        placeholder='Enter your preferred short URL text'
                        name='text'
                        onChange={e => { setshorturl(e.target.value) }} />
                           {shortUrlError && <span className="text-red-600 text-xs md:text-sm">{shortUrlError}</span>}
                    <button onClick={generate} className='bg-purple-500 rounded-lg shadow-lg px-4 py-3 font-bold text-white disabled:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-70 w-full md:w-auto transition transform duration-300 hover:bg-purple-600 hover:scale-105 active:scale-95' disabled={!isFormValid }>Generate</button>
                </div>
               {generated && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-4 text-center md:text-left"
                    >
                        <span className="font-bold text-lg block mb-2">Your Link</span>
                        <code className="break-all">
                            <Link className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold transition duration-100 hover:scale-105' target="_blank" href={generated}>
                                {process.env.NEXT_PUBLIC_HOST}{generated}
                            </Link>
                        </code>
                    </motion.div>
                )}
            </div>
        </>
    )
}

export default Shorten
