"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setgenerated] = useState("")
     const [urlError, setUrlError] = useState("")
  const [shortUrlError, setShortUrlError] = useState("")

     // URL validation regex
  const urlPattern = /^https?:\/\/.+/

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
  }, [url, shorturl])

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
                setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
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

            <div className='mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4'>
                <h1 className='font-bold text-2xl'>Generate your short URLs</h1>
                <div className='flex flex-col gap-2'>
                    <input type="url"
                        value={url}
                         pattern="https?://.+"
                        className='px-4 py-2 focus: outline-purple-600 rounded-md'
                        placeholder='Enter your URL'
                        name='url'
                        onChange={e => { seturl(e.target.value) }}  />

                         {urlError && <span className="text-red-600 text-xs">{urlError}</span>}

                    <input type="text"
                        value={shorturl}

                        className='px-4 py-2 focus: outline-purple-600 rounded-md'
                        placeholder='Enter your preferred short URL text'
                        name='text'
                        onChange={e => { setshorturl(e.target.value) }} />
                           {shortUrlError && <span className="text-red-600 text-xs">{shortUrlError}</span>}
                    <button onClick={generate} className='bg-purple-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white disabled:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-8' disabled={!isFormValid }>Generate</button>
                </div>
                {generated && <> <span className='font-bold text-lg'>Your Link</span> <code> <Link target="_blank" href={generated}>{generated}</Link>
                </code> </>}
            </div>
        </>
    )
}

export default Shorten
