'use client';

import { useEffect } from 'react';

const html = `
<div class="noise-overlay"></div>
<div class="fixed inset-0 w-full h-full pointer-events-none z-0">
<div class="absolute inset-0 bg-background-dark"></div>
<div class="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
</div>
<header class="fixed top-8 left-0 w-full z-50 px-4 md:px-12 flex justify-between items-start pointer-events-none">
<div class="pointer-events-auto group">
<h2 class="text-bone text-3xl font-condensed font-bold uppercase tracking-tighter group-hover:text-primary transition-colors duration-300">El Astillero</h2>
</div>
<nav class="hidden md:flex bg-background-dark/80 backdrop-blur-md border border-white/10 pointer-events-auto">
<a class="nav-item-active px-8 py-3 text-sm font-medium uppercase tracking-wide text-gray-300 border-r border-white/10 hover:bg-bone hover:text-black transition-colors duration-300 relative" href="#collection">Colección</a>
<a class="px-8 py-3 text-sm font-medium uppercase tracking-wide text-gray-300 border-r border-white/10 hover:bg-bone hover:text-black hover:text-primary-accent transition-colors duration-300" href="#craftsmanship">Artesanía</a>
<a class="px-8 py-3 text-sm font-medium uppercase tracking-wide text-gray-300 border-r border-white/10 hover:bg-bone hover:text-black transition-colors duration-300" href="#bespoke">Bespoke</a>
<a class="px-8 py-3 text-sm font-medium uppercase tracking-wide text-bone hover:bg-bone hover:text-black transition-colors duration-300 flex items-center gap-2" href="#contacto">Contacto</a>
<div class="px-4 py-3 flex items-center justify-center text-bone cursor-pointer hover:text-primary transition-colors border-l border-white/10"><span class="material-symbols-outlined">menu</span></div>
</nav>
<button class="md:hidden pointer-events-auto bg-bone text-black px-4 py-2 font-bold uppercase text-sm border-b-2 border-primary">Menu</button>
</header>
<section class="relative h-screen flex items-center justify-center overflow-hidden">
<div class="absolute inset-0 z-0">
<img alt="Close up of grilling steaks with charcoal embers glowing" class="w-full h-full object-cover opacity-50 scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnRrJQb5JzMl0tJ895_5PI0nWQwJ9CF0n4JDBc9TJfL-fwmTJsYzfiOvaW6T0M71NdKwEJwvY67ucwe_7_phu8wb52ElxOJX0NE64SnxDGVWLz36EeXLpHk3TNHESPXlGbRJcjKq9dAJHFkOG4nCIanzdRicf85ebZbijoTkKRi3f6JeNjtz7CK3VVkcRbnU0_Q-EXPa1q1OVib8htGkDaU7BRBd6aDXyZjZVojPBwqw0iN1cFIOr1v3ySo7UOOH1j7ddpRzGitrHf"/>
<div class="absolute inset-0 bg-black/40"></div>
</div>
<div class="relative z-10 w-full px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col items-start justify-end h-full pb-32">
<div class="fade-in-slow max-w-4xl">
<h1 class="font-condensed font-bold text-bone text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-8 uppercase">El asado <br/><span class="text-white">Se respeta</span><span class="text-primary">.</span></h1>
<div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-white/20 pt-8">
<p class="text-gray-300 text-sm md:text-base font-normal leading-relaxed max-w-sm border-l-2 border-primary pl-4">Ingeniería de precisión en acero inoxidable 304. Diseñado para quienes entienden que el fuego es un ritual sagrado.</p>
<div class="flex justify-start md:justify-end"><a class="btn-solid-system on-dark group" href="#collection"><span class="btn-text">Descubrir Colección</span><span class="btn-icon"><span class="material-symbols-outlined group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">north_east</span></span></a></div>
</div>
</div>
</div>
</section>
<section class="py-32 bg-[#0d0d0d] relative z-10" id="collection"><div class="max-w-[1600px] mx-auto px-6 md:px-12"><div class="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8"><h2 class="font-condensed font-bold text-5xl md:text-8xl text-bone uppercase leading-none tracking-tight">Colección<span class="text-primary">.</span></h2></div><div class="grid grid-cols-1 gap-12"><div class="grid grid-cols-1 md:grid-cols-2 border border-white/10 bg-surface-dark group hover:border-primary/30 transition-colors duration-500"><div class="relative overflow-hidden aspect-[4/3] md:aspect-auto h-full border-b md:border-b-0 md:border-r border-white/10"><img alt="Large built-in stainless steel grill with glass front and cabinet" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2LJV2kz12btqQuUSIkTglGslzkyVW0_Rd9JNoO0ABDK3bExQYEJ2qRqGx-TTB16ZG6hoZyEIrV6zR5uUY_-Lfww466MDZXZFkPPckhjEMsRkfncZX6K04Uk4PLKmISWmox9vddrhqHb1DdYQo3xPRgaxuUyh6P9nx_7Seqh9sxVyqSJjELrSXWyjhPEGKEur8M0MkAGf49S_1Bvowxdu4x0K7vLFR9WHAJHqKsIudbuusbj8IcW-a4sUUNvzPPeKufRWDOVrlq-N2"/></div><div class="p-8 md:p-12 flex flex-col justify-between items-start h-full"><div><div class="flex justify-between w-full mb-6"><span class="text-primary text-xs font-bold tracking-widest uppercase border border-primary/30 px-2 py-1">Signature Series</span><span class="text-bone font-mono">$ Upon Request</span></div><h3 class="font-condensed font-bold text-4xl md:text-5xl text-white mb-4 uppercase">Parrillas Empotrables</h3><p class="text-gray-400 text-sm leading-relaxed mb-8">El corazón de su cocina exterior. Diseño integrado que fusiona elegancia y potencia industrial.</p></div></div></div></div></div></section>
<section class="py-32 bg-bone relative border-t border-black/10 z-10" id="contacto"><div class="max-w-6xl mx-auto px-6 relative z-10"><div class="grid grid-cols-1 md:grid-cols-2 gap-20"><div class="flex flex-col justify-center"><span class="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-6 block">Servicio Exclusivo</span><h2 class="font-condensed font-bold text-6xl md:text-8xl text-black mb-8 uppercase leading-[0.9]">Diseño <br/>a Medida<span class="text-primary">.</span></h2><p class="text-gray-800 font-light text-lg mb-12 max-w-md">Transformamos su visión en realidad. Consultoría personalizada para proyectos residenciales de alto nivel.</p></div><div class="bg-white border border-black/10 p-8 md:p-12 relative"><form class="space-y-8"><div class="group"><label class="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3" for="name">Nombre</label><input class="w-full bg-[#f5f5f5] border border-black/10 text-black placeholder-gray-500 focus:border-primary focus:ring-0 px-4 py-3 transition-colors text-sm" id="name" placeholder="Ingrese su nombre" type="text"/></div><button class="w-full btn-solid-system on-light group flex" type="button"><span class="btn-text flex-grow">Iniciar Consulta</span><span class="btn-icon"><span class="material-symbols-outlined group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">north_east</span></span></button></form></div></div></div></section>
<footer class="bg-[#181818] text-bone py-24 relative overflow-hidden z-10"><div class="absolute inset-0 bg-background-dark/95"></div><div class="max-w-[1600px] mx-auto px-6 relative z-10"><div class="border-t border-white/10 pt-12 text-center md:text-left"><div class="relative inline-block w-full text-center"><h1 class="font-condensed font-bold text-[15vw] leading-[0.8] tracking-tighter text-white/5 select-none w-full relative z-10">EL ASTILLERO<span class="text-primary opacity-80">.</span></h1></div><div class="flex flex-col md:flex-row justify-between items-center mt-8 text-[10px] uppercase tracking-widest text-gray-600"><p>© 2024 El Astillero. All rights reserved.</p><p class="mt-2 md:mt-0">Designed for those who respect the fire.</p></div></div></div></footer>
`;

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((el) => {
      el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="bg-background-dark text-gray-200 font-sans antialiased overflow-x-hidden selection:bg-primary selection:text-white"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
