// app/about/page.js
import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        About BitLinks
      </h1>
      <p className="text-lg mb-4">
        At BitLinks, we provide a straightforward URL shortening service without the need for logins or tracking. Our mission is to make sharing links easier and more efficient.
      </p>
      <p className="text-lg mb-4">
        Whether you&apos;re sharing a blog post, a product page, or any other link, BitLinks ensures your URLs are concise and shareable.
      </p>
      <p className="text-lg">
        Our goal is to help users save time, simplify sharing, and create a seamless experience for everyone.
      </p>
    </div>
  );
};

export default About;
