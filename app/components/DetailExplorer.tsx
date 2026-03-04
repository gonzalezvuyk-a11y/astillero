'use client';

import { useState } from 'react';
import Image from 'next/image';

export type DetailItem = {
    id: string;
    title: string;
    desc: string;
    imageSrc: string;
};

interface DetailExplorerProps {
    details: DetailItem[];
    whatsappUrl: string;
}

export default function DetailExplorer({ details, whatsappUrl }: DetailExplorerProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-bg-300 bg-surface-dark overflow-hidden mt-10">
            {/* Left Column: Image Viewer */}
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[600px] border-b lg:border-b-0 lg:border-r border-bg-300 bg-[#111111] overflow-hidden">
                {details.map((detail, index) => (
                    <Image
                        key={detail.id}
                        src={detail.imageSrc}
                        alt={detail.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        unoptimized
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        priority={index === 0}
                        onError={(e) => {
                            // Simple fallback if image fails to load
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                ))}
            </div>

            {/* Right Column: Interaction List */}
            <div className="flex flex-col bg-bg-200">
                <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <ul className="flex flex-col">
                        {details.map((detail, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <li key={detail.id} className="border-b border-bg-300 last:border-b-0">
                                    <button
                                        onClick={() => setActiveIndex(index)}
                                        className="w-full text-left px-8 py-6 md:py-8 flex flex-col transition-all duration-300 group relative"
                                    >
                                        {/* Animated active indicator line */}
                                        <div
                                            className={`absolute left-0 top-0 bottom-0 w-1 bg-primary transition-all duration-300 ease-out ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                                                }`}
                                        />

                                        <h3
                                            className={`font-condensed font-bold text-xl md:text-2xl uppercase tracking-wide transition-colors duration-300 ${isActive ? 'text-primary' : 'text-text-100 group-hover:text-text-100/80'
                                                }`}
                                        >
                                            {detail.title}
                                        </h3>
                                        <p
                                            className={`mt-2 text-sm md:text-base tracking-wide transition-colors duration-300 ${isActive ? 'text-text-200' : 'text-text-200/60'
                                                }`}
                                        >
                                            {detail.desc}
                                        </p>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* CTA Area fixed at the bottom of the right column */}
                <div className="p-8 border-t border-bg-300 bg-surface-dark mt-auto">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-stretch border-[1.5px] border-[#dcd7cd] bg-[#f4f2ed] hover:border-primary transition-colors duration-300 cursor-pointer text-[#181a18] hover:text-primary group w-full max-w-sm"
                    >
                        <span className="flex-1 font-condensed font-bold text-lg uppercase tracking-wide px-4 py-3 flex items-center justify-center transition-colors duration-300">
                            Cotizar este modelo
                        </span>
                        <div className="border-l-[1.5px] border-[#dcd7cd] group-hover:border-primary px-4 py-3 flex items-center justify-center transition-colors duration-300">
                            <span className="material-symbols-outlined text-[1.2rem] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300">
                                north_east
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
