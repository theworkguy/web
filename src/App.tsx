import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Shop from './sections/Shop';
import About from './sections/About';
import Books from './sections/Books';
import Movies from './sections/Movies';
import Media from './sections/Media';
import Reviews from './sections/Reviews';
import BookJohn from './sections/BookJohn';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <Shop />
        <About id="my-journey" />
        <Books />
        <Movies />
        <Media />
        <Reviews />
        <BookJohn />
        <Contact />
      </main>
    </div>
  );
}

export default App;