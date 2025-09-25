"use client"
import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { motion } from "framer-motion"; 


const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Home() {
  return (
    <main className="bg-purple-100">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh] px-6 md:px-16">
        <div className="flex flex-col gap-6 items-center md:items-start justify-center text-center md:text-left py-10">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-2xl md:text-4xl font-bold ${poppins.className}`}
          >
            The best URL shortener in the Market
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm md:text-base max-w-lg"
          >
            We are the most straightforward URL Shortener in the world. Most of
            the URL shorteners will track you or ask you to give your details
            for login. We understand your needs and hence we have created this
            URL shortener.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex gap-3"
          >
            <Link href="/shorten">
              <button className="bg-purple-500 rounded-lg shadow-lg px-5 py-2 font-bold text-white hover:bg-purple-600 transition">
                Try Now
              </button>
            </Link>
            <Link href="/github">
              <button className="bg-purple-500 rounded-lg shadow-lg px-5 py-2 font-bold text-white hover:bg-purple-600 transition">
                GitHub
              </button>
            </Link>
          </motion.div>
        </div>
        <div className=" relative flex justify-center md:justify-end items-center mt-6 md:mt-0">
          <Image className="mix-blend-darken object-contain" alt="an Image of a vector" src={"/vector.jpg"}   width={500}
            height={400}
            priority />
        </div>
      </section>
    </main>
  );
}
