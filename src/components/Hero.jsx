import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Play, Pause, ChevronRight, Compass, Utensils } from 'lucide-react';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToExplore = () => {
    const el = document.getElementById('categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[640px] max-h-[960px] flex items-center justify-center overflow-hidden bg-[#142A20]">
      {/* Background Video with Multi-Source Fallback */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          poster="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=85"
          className="absolute inset-0 w-full h-full object-cover scale-105 motion-safe:animate-pulse-subtle transition-opacity duration-1000"
        >
          <source src="/videos/hero-food.mp4" type="video/mp4" />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-chef-slicing-fresh-vegetables-41484-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/* Fallback Cinematic Poster Image when video fails or reduced motion is active */}
      {videoError && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=85")',
          }}
        />
      )}

      {/* Atmospheric Cinematic Gradient Scrim for contrast & readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/40" />
      <div className="absolute inset-0 bg-[#142A20]/25 mix-blend-multiply" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Editorial Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#A7B8A0] text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm">
          <Utensils className="w-3.5 h-3.5 text-[#C87852]" />
          <span>Your Daily Dose of Delicious</span>
        </div>

        {/* Main Heading with Balanced Wrap */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 text-balance max-w-4xl drop-shadow-md">
          Discover. Cook. <span className="text-[#C87852] italic font-serif">Share.</span>
        </h1>

        {/* Supporting Editorial Prose */}
        <p className="text-lg sm:text-xl text-white/85 max-w-2xl font-light leading-relaxed mb-10 text-balance drop-shadow">
          Explore recipes worth making, discover new flavors, and bring something
          wonderful to your table every single day.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/recipes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#234B38] hover:bg-[#1b3a2c] text-white font-medium text-base rounded-xl shadow-lg shadow-black/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Compass className="w-5 h-5 text-[#A7B8A0]" />
            <span>Explore Recipes</span>
          </Link>

          <Link
            to="/recipes/new"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-medium text-base rounded-xl backdrop-blur-md border border-white/25 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Share Your Recipe</span>
            <ChevronRight className="w-4 h-4 text-white/70" />
          </Link>
        </div>
      </div>

      {/* Video Control Widget (Bottom Right) */}
      {!videoError && (
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          className="absolute bottom-6 right-6 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      )}

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToExplore}
        aria-label="Scroll to discover recipes"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors group cursor-pointer"
      >
        <span className="text-[11px] tracking-widest uppercase font-medium">Scroll to Discover</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#A7B8A0]" />
      </button>
    </section>
  );
}
