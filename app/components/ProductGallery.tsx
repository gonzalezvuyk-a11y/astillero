"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProductGalleryProps {
    products: {
        title: string;
        image: string;
        description: string;
    }[];
}

export default function ProductGallery({ products }: ProductGalleryProps) {
    const containerRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!trackRef.current || !containerRef.current) return;

            const track = trackRef.current;

            // Calculate how far we need to translate horizontally
            // It's the full scroll width of the track minus the viewport width
            const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

            // Create a tween that moves the track horizontally
            const tween = gsap.to(track, {
                x: getScrollAmount,
                ease: "none"
            });

            // Tie this horizontal tween to the vertical scroll of the section
            ScrollTrigger.create({
                trigger: containerRef.current,
                animation: tween,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`, // Scroll distance equals horizontal distance
                scrub: 1, // Smooth scrubbing
                pin: true, // Pin the section while we scroll horizontally
                invalidateOnRefresh: true // Recalculate on resize
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="product-gallery-section relative py-12 md:py-20 overflow-hidden z-20 border-t border-bg-300 h-screen max-h-[900px] flex flex-col justify-center bg-[#e6ccba]"
        >
            <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 relative z-20 mb-8 md:mb-12 shrink-0">
                <h2 className="font-condensed font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.01em] text-background-dark">
                    Línea de Parrillas
                </h2>
                <p className="mt-4 text-background-dark/70 max-w-2xl font-medium text-lg">
                    Equipos diseñados milímetro a milímetro. Deslizá para conocer las series.
                </p>
            </div>

            <div className="w-full relative z-20 overflow-visible shrink-0 mt-4 md:mt-8">
                <div ref={trackRef} className="product-track w-max flex gap-4 md:gap-6 px-6 md:px-12 items-end pb-8">
                    {products.map((product, i) => (
                        <article key={i} className="group relative flex flex-col w-[75vw] md:w-[32vw] lg:w-[26vw] xl:w-[23vw] bg-[#f4f2ed] border-[1.5px] border-[#dcd7cd] shadow-sm transition-transform duration-500 ease-out hover:-translate-y-2 shrink-0">
                            {/* Image Container */}
                            <div className="flex-1 w-full aspect-[4/5] sm:aspect-square flex items-center justify-center p-6 md:p-10 overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={960}
                                    height={960}
                                    sizes="(max-width: 768px) 75vw, (max-width: 1280px) 32vw, 26vw"
                                    className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>

                            {/* Bottom Button Bar */}
                            <div className="mx-3 mb-3 md:mx-4 md:mb-4 flex items-stretch border-[1.5px] border-[#181a18] bg-[#f4f2ed] hover:border-primary transition-colors duration-300 cursor-pointer text-[#181a18] hover:text-primary group/btn">
                                <h3 className="flex-1 font-condensed font-bold text-base md:text-lg uppercase tracking-wide px-3 md:px-4 py-2 md:py-3 flex items-center transition-colors duration-300">
                                    {product.title}
                                </h3>
                                <div className="border-l-[1.5px] border-[#181a18] group-hover/btn:border-primary px-3 md:px-4 py-2 md:py-3 flex items-center justify-center transition-colors duration-300">
                                    <span className="material-symbols-outlined text-[1.1rem] md:text-[1.2rem] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform duration-300">north_east</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
