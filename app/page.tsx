import { existsSync, readdirSync } from 'fs';
import path from 'path';
import Image from 'next/image';
import HeroSection from './components/HeroSection';
import HeaderBar from './components/HeaderBar';
import ScrollReveal from './components/ScrollReveal';
import AstilleroFooterLogo from './components/AstilleroFooterLogo';
import ProductGallery from './components/ProductGallery';
import DetailExplorer from './components/DetailExplorer';
import ProjectsRealGrid from './components/ProjectsRealGrid';
import ProcessTimeline, { type ProcessStep } from './components/ProcessTimeline';
import FooterPremiumEffects from './components/FooterPremiumEffects';

const whatsappMessage =
  'Hola, quiero cotizar una parrilla El Astillero. Tipo: ____. Medidas aprox: __ x __. Ciudad: ____. Tengo foto/plano: sí/no.';
const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

const benefits = [
  {
    title: 'INOX DE PRIMERA',
    text: 'Durabilidad real. Estética premium.'
  },
  {
    title: 'A MEDIDA',
    text: 'Medidas, diseño y opciones.'
  },
  {
    title: 'INSTALACIÓN + GARANTÍA',
    text: 'Entregamos funcionando. Post-venta.'
  }
];

type ModelSolutionCard = {
  title: string;
  tag: string;
  quoteType: 'COTIZACIÓN' | 'A MEDIDA';
  description: string;
  specs: [string, string, string];
  cta: 'Ver modelos' | 'Cotizar';
  ctaHref: string;
  image: string;
  layout: 'featured' | 'compact';
};

// Para cambiar por renders/macros de El Astillero, reemplazá solo el valor de `image` en cada card.
const modelSolutionCards: ModelSolutionCard[] = [
  {
    title: 'Empotrables con vidrio',
    tag: 'SIGNATURE SERIES',
    quoteType: 'COTIZACIÓN',
    description: 'Integración limpia para quinchos premium con presencia arquitectónica.',
    specs: ['Inox 304', 'Frente vidrio', 'Guías de precisión'],
    cta: 'Cotizar',
    ctaHref: '#contacto',
    image: '/modelos/empotrables.png',
    layout: 'featured'
  },
  {
    title: 'Quinchos completos / rediseño',
    tag: 'BESPOKE DESIGN',
    quoteType: 'A MEDIDA',
    description: 'Proyecto integral desde diseño técnico hasta instalación final.',
    specs: ['Planificación 360°', 'Materiales premium', 'Instalación experta'],
    cta: 'Cotizar',
    ctaHref: '#contacto',
    image: '/modelos/quincho.png',
    layout: 'featured'
  },
  {
    title: 'Parrillas para terraza',
    tag: 'TERRAZAS',
    quoteType: 'COTIZACIÓN',
    description: 'Versiones compactas y robustas para espacios urbanos exigentes.',
    specs: ['Formato compacto', 'Ventilación optimizada', 'Terminación mate'],
    cta: 'Ver modelos',
    ctaHref: '#modelos',
    image: '/modelos/terraza.png',
    layout: 'compact'
  },
  {
    title: 'Fogoneros',
    tag: 'LÍNEA FUEGO',
    quoteType: 'A MEDIDA',
    description: 'Piezas de alto impacto visual para encuentros alrededor del fuego.',
    specs: ['Acabado resistente', 'Control de calor', 'Opciones modulares'],
    cta: 'Ver modelos',
    ctaHref: '#modelos',
    image: '/modelos/fogonero.png',
    layout: 'compact'
  },
  {
    title: 'Revestimientos inox',
    tag: 'DETALLE TÉCNICO',
    quoteType: 'COTIZACIÓN',
    description: 'Protección térmica y estética continua para áreas de cocción premium.',
    specs: ['Calibre reforzado', 'Fácil mantenimiento', 'Cortes a medida'],
    cta: 'Cotizar',
    ctaHref: '#contacto',
    image: '/modelos/revestimiento.png',
    layout: 'compact'
  }
];

const featuredModelCards = modelSolutionCards.filter((card) => card.layout === 'featured');
const compactModelCards = modelSolutionCards.filter((card) => card.layout === 'compact');

const details = [
  {
    id: 'inox-cepillado',
    title: 'INOX CEPILLADO',
    desc: 'Durabilidad real. Estética premium.',
    imageSrc: '/detalles/1.png'
  },
  {
    id: 'guias-guillotina',
    title: 'GUÍAS GUILLOTINA',
    desc: 'Apertura suave y segura.',
    imageSrc: '/detalles/2.png'
  },
  {
    id: 'vidrio-ahumado',
    title: 'VIDRIO AHUMADO',
    desc: 'Visibilidad sin perder elegancia.',
    imageSrc: '/detalles/3.png'
  },
  {
    id: 'herrajes-inox',
    title: 'HERRAJES INOX',
    desc: 'Robusto, sólido, preciso.',
    imageSrc: '/detalles/4.png'
  },
  {
    id: 'cajon-cenicero',
    title: 'CAJÓN CENICERO',
    desc: 'Limpieza fácil para uso diario.',
    imageSrc: '/detalles/5.png'
  },
  {
    id: 'parrilla-brasero',
    title: 'PARRILLA / BRASERO',
    desc: 'Control térmico y rendimiento constante.',
    imageSrc: '/detalles/6.png'
  }
];

const rasterImageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
const allImageExtensions = new Set([...rasterImageExtensions, '.svg']);

function getProductCarouselImages() {
  const productsDir = path.join(process.cwd(), 'public', 'products');
  if (!existsSync(productsDir)) return [];

  const files = readdirSync(productsDir)
    .filter((file) => /^capa\b/i.test(path.parse(file).name))
    .filter((file) => allImageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  const rasterFiles = files.filter((file) => rasterImageExtensions.has(path.extname(file).toLowerCase()));
  const selectedFiles = rasterFiles.length > 0 ? rasterFiles : files;

  return selectedFiles.map((file) => `/products/${encodeURIComponent(file)}`);
}

const productCarouselImages = getProductCarouselImages();

function getHeroGifFrames() {
  const heroDir = path.join(process.cwd(), 'public', 'herogif3');
  if (!existsSync(heroDir)) return [];

  return readdirSync(heroDir)
    .filter((file) => allImageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((file) => `/herogif3/${encodeURIComponent(file)}`);
}

const heroGifFrames = getHeroGifFrames();

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Medimos / Brief',
    description: 'Medidas, fotos y ubicación.'
  },
  {
    number: '02',
    title: 'Propuesta',
    description: 'Modelo + opciones + presupuesto.'
  },
  {
    number: '03',
    title: 'Fabricación',
    description: 'Taller + terminación premium.'
  },
  {
    number: '04',
    title: 'Instalación',
    description: 'Entrega + puesta en marcha.',
    highlight: true
  }
];

const instagramProfileUrl = 'https://www.instagram.com/parrillaselastillero/';

function getProjectGridImages() {
  const projectsDir = path.join(process.cwd(), 'public', 'proyectos');
  if (!existsSync(projectsDir)) return [];

  return readdirSync(projectsDir)
    .filter((file) => rasterImageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .slice(0, 12)
    .map((file) => `/proyectos/${encodeURIComponent(file)}`);
}

const projectGridImages = getProjectGridImages();

const heroSparks = Array.from({ length: 18 }).map((_, i) => ({
  left: `${Math.random() * 100}%`,
  delay: `${(Math.random() * 3).toFixed(1)}s`,
  duration: `${(Math.random() * 2 + 4).toFixed(1)}s`,
  size: Math.floor(Math.random() * 3) + 2
}));

const FOOTER_EMBER_COUNT = 12;
const footerEmbers = Array.from({ length: FOOTER_EMBER_COUNT }).map(() => ({
  left: `${Math.random() * 100}%`,
  delay: `${(Math.random() * 2.4).toFixed(1)}s`,
  duration: `${(Math.random() * 2.2 + 4.8).toFixed(1)}s`,
  size: Math.floor(Math.random() * 3) + 2
}));

export default function Home() {
  return (
    <main className="bg-background-dark text-text-100 font-sans antialiased selection:bg-primary selection:text-text-100">
      <ScrollReveal />
      <div className="noise-overlay" />
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-background-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-transparent to-black/45" />
      </div>

      <HeaderBar />

      <HeroSection heroGifFrames={heroGifFrames} whatsappUrl={whatsappUrl} sparks={heroSparks} />

      <section
        className="next-section-overlap -mt-[100vh] py-28 bg-[#ece8e0] relative z-20"
        data-header-logo="dark"
        data-reveal="up"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          {/* Horizontal Band layout for benefits (no boarders, fine dividers) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#c9c4ba]">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="py-12 md:py-8 md:px-12 flex flex-col justify-center text-center md:text-left group"
                data-reveal="up"
                data-reveal-delay={String(index * 150)}
              >
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <span className="w-8 h-[1.5px] bg-[#df572e] opacity-80 group-hover:w-12 transition-all duration-500 ease-out" />
                  <h2 className="font-condensed font-bold text-lg md:text-xl text-[#181a18] uppercase tracking-[0.05em] transition-colors duration-300">
                    {benefit.title}
                  </h2>
                </div>
                <p className="text-[#3b3a37] font-medium text-sm md:text-base leading-relaxed tracking-wide">
                  {benefit.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="modelos" className="py-24 bg-background-dark relative z-10 border-t border-bg-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="font-condensed font-bold text-4xl md:text-6xl text-bone uppercase tracking-[0.01em]" data-reveal="up">
            Modelos / Soluciones<span className="text-primary">.</span>
          </h2>

          <div className="mt-12 space-y-6">
            {featuredModelCards.map((card, index) => (
              <article
                key={card.title}
                className={`grid grid-cols-1 md:grid-cols-2 border border-bg-300 bg-surface-dark ${index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                data-reveal={index % 2 === 1 ? 'left' : 'right'}
              >
                <div className="group relative min-h-[340px] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="p-8 md:p-10 flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] text-primary border border-primary px-2 py-1 uppercase tracking-[0.18em] font-semibold">
                      {card.tag}
                    </span>
                    <span className="text-[11px] text-text-100 border border-bg-300 px-2 py-1 uppercase tracking-[0.18em] font-semibold">
                      {card.quoteType}
                    </span>
                  </div>

                  <h3 className="mt-6 font-condensed font-bold text-4xl md:text-5xl leading-[1.02] uppercase tracking-[0.01em] text-text-100">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-text-200 text-base md:text-lg max-w-xl">{card.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {card.specs.map((spec) => (
                      <span
                        key={`${card.title}-${spec}`}
                        className="inline-flex items-center border border-bg-300 bg-bg-200 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-text-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 md:mt-auto pt-8 md:pt-10 border-t border-bg-300">
                    <a
                      href={card.ctaHref}
                      className="inline-flex items-center border border-bg-300 bg-bg-200 text-[11px] font-sans uppercase tracking-[0.16em] text-text-100 transition-colors duration-300 hover:border-primary hover:text-primary"
                    >
                      <span className="px-4 py-3">{card.cta}</span>
                      <span className="border-l border-bg-300 px-3 py-3">
                        <span className="material-symbols-outlined text-[1rem] leading-none">north_east</span>
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {compactModelCards.map((card, index) => (
              <article
                key={card.title}
                className="group border border-bg-300 bg-surface-dark overflow-hidden"
                data-reveal="up"
                data-reveal-delay={String(index * 100)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={900}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-72 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-6 border-t border-bg-300 flex flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] text-primary border border-primary px-2 py-1 uppercase tracking-[0.16em] font-semibold">
                      {card.tag}
                    </span>
                    <span className="text-[10px] text-text-100 border border-bg-300 px-2 py-1 uppercase tracking-[0.16em] font-semibold">
                      {card.quoteType}
                    </span>
                  </div>
                  <h4 className="mt-4 font-condensed text-3xl md:text-4xl uppercase tracking-[0.01em] text-text-100">{card.title}</h4>
                  <p className="mt-3 text-text-200 text-sm">{card.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.specs.map((spec) => (
                      <span
                        key={`${card.title}-compact-${spec}`}
                        className="inline-flex items-center border border-bg-300 bg-bg-200 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-text-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 pt-5 border-t border-bg-300">
                    <a
                      href={card.ctaHref}
                      className="inline-flex items-center border border-bg-300 bg-bg-200 text-[11px] font-sans uppercase tracking-[0.16em] text-text-100 transition-colors duration-300 hover:border-primary hover:text-primary"
                    >
                      <span className="px-4 py-3">{card.cta}</span>
                      <span className="border-l border-bg-300 px-3 py-3">
                        <span className="material-symbols-outlined text-[1rem] leading-none">north_east</span>
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProductGallery
        products={productCarouselImages.map((img, i) => ({
          title: `Modelo 0${i + 1}`,
          image: img,
          description: 'Acero Inoxidable Premium'
        }))}
      />

      <section id="detalles" className="py-24 bg-bg-200 relative z-10 border-t border-bg-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="font-condensed font-bold text-4xl md:text-6xl text-bone uppercase tracking-[0.01em]" data-reveal="up">
            Detalles que se notan.
          </h2>
          <p className="text-text-200 text-lg mt-5 max-w-4xl" data-reveal="up" data-reveal-delay="120">
            Terminaciones, herrajes y proporciones pensadas para que el quincho se vea premium incluso cuando no estás
            asando.
          </p>
          <div className="mt-10" data-reveal="up" data-reveal-delay="100">
            <DetailExplorer details={details} whatsappUrl={whatsappUrl} />
          </div>
        </div>
      </section>

      <section id="proceso" className="py-24 bg-background-dark relative z-10 border-t border-bg-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="font-condensed font-bold text-4xl md:text-6xl text-bone uppercase tracking-[0.01em]" data-reveal="up">
            Cómo trabajamos.
          </h2>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      <section className="py-24 bg-bg-200 relative z-10 border-t border-bg-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="font-condensed font-bold text-4xl md:text-6xl text-bone uppercase tracking-[0.01em]" data-reveal="up">
            Proyectos reales.
          </h2>
          <p className="mt-4 text-text-200 text-sm uppercase tracking-[0.2em]" data-reveal="up" data-reveal-delay="100">
            +X proyectos entregados en Paraguay
          </p>

          <ProjectsRealGrid images={projectGridImages} profileUrl={instagramProfileUrl} />

          <div className="mt-10 flex justify-center" data-reveal="up" data-reveal-delay="120">
            <a
              href={instagramProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid-system on-dark group hero-cta-compact font-sans"
            >
              <span className="btn-text">Ver más trabajos en Instagram</span>
              <span className="btn-icon">
                <span className="material-symbols-outlined group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                  north_east
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 bg-[#ece8e0] text-background-dark relative z-10 border-t border-bg-300" data-header-logo="dark">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div data-reveal="left">
              <p className="inline-flex border border-primary px-3 py-2 text-xs font-semibold tracking-[0.3em] uppercase text-primary">
                Servicio exclusivo
              </p>
              <h2 className="mt-8 md:mt-10 font-condensed font-bold text-[clamp(2.8rem,7vw,6.6rem)] uppercase leading-[0.88] tracking-[0.01em]">
                Diseño
                <br />
                a medida.
              </h2>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-background-dark/80">
                Transformamos su visión en realidad. Consultoría personalizada para proyectos residenciales de alto nivel.
              </p>

              <div className="mt-10 space-y-4 text-bg-200">
                <p className="flex items-center gap-3 text-lg">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                  Cobertura en todo el país
                </p>
                <p className="flex items-center gap-3 text-lg">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  Garantía extendida
                </p>
                <p className="flex items-center gap-3 text-lg">
                  <span className="material-symbols-outlined text-primary">construction</span>
                  Instalación especializada
                </p>
              </div>
            </div>

            <div className="bg-[#f4f2ed] border border-[#ddd9d0] p-7 md:p-10" data-reveal="right">
              <form className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold tracking-[0.2em] uppercase text-bg-300 mb-3">
                    Nombre
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ingrese su nombre"
                    className="w-full h-14 border border-[#d4d0c8] bg-[#eceae5] px-4 text-bg-200 placeholder:text-bg-300/70 focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#eceae5]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold tracking-[0.2em] uppercase text-bg-300 mb-3">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Ingrese su email"
                    className="w-full h-14 border border-[#d4d0c8] bg-[#eceae5] px-4 text-bg-200 placeholder:text-bg-300/70 focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#eceae5]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-details" className="block text-xs font-semibold tracking-[0.2em] uppercase text-bg-300 mb-3">
                    Detalles del proyecto
                  </label>
                  <textarea
                    id="contact-details"
                    name="details"
                    rows={5}
                    placeholder="Cuéntenos sobre su proyecto"
                    className="w-full border border-[#d4d0c8] bg-[#eceae5] px-4 py-4 text-bg-200 placeholder:text-bg-300/70 focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#eceae5] resize-none"
                  />
                </div>

                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-stretch border-[1.5px] border-[#181a18] bg-[#181a18] hover:bg-primary hover:border-primary transition-colors duration-300 cursor-pointer text-bone group w-full">
                  <span className="flex-1 font-condensed font-bold text-lg uppercase tracking-wide px-4 py-4 flex items-center justify-center">
                    Iniciar consulta
                  </span>
                  <div className="border-l-[1.5px] border-bone/20 px-4 py-4 flex items-center justify-center transition-colors duration-300">
                    <span className="material-symbols-outlined text-[1.2rem] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300">
                      north_east
                    </span>
                  </div>
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-premium relative overflow-hidden z-10 border-t border-bg-300 bg-bg-100">
        <div className="footer-sparks" aria-hidden="true">
          {footerEmbers.map((spark, index) => (
            <span
              key={`footer-ember-${index}`}
              className="footer-spark"
              style={{
                left: spark.left,
                width: `${spark.size}px`,
                height: `${spark.size}px`,
                animationDelay: spark.delay,
                animationDuration: spark.duration
              }}
            />
          ))}
        </div>
        <FooterPremiumEffects />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-36">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-text-200/70 font-semibold">Quick Links</p>
              <div className="mt-6 space-y-3 text-text-100 text-2xl md:text-3xl font-condensed uppercase leading-none tracking-[0.01em]">
                <a href="#modelos" className="block hover:text-primary transition-colors">
                  Modelos
                </a>
                <a href="#detalles" className="block hover:text-primary transition-colors">
                  Detalles
                </a>
                <a href="#proceso" className="block hover:text-primary transition-colors">
                  Proceso
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-text-200/70 font-semibold">Contacto</p>
              <div className="mt-6 space-y-3 text-text-100">
                <a
                  href="mailto:consultas@elastillero.com"
                  className="block text-xl md:text-2xl font-condensed tracking-[0.01em] hover:text-primary transition-colors"
                >
                  consultas@elastillero.com
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block text-xl text-text-200 hover:text-primary transition-colors">
                  +595 981 000 000
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-text-200/70 font-semibold">Social</p>
              <div className="mt-6 flex flex-wrap gap-6 text-text-200">
                <a href="#" className="hover:text-primary transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-24 border-t border-bg-300 pt-8 md:pt-10">
            <div className="footer-logo-reveal-shell w-full mb-12 md:mb-16 relative z-10">
              <AstilleroFooterLogo className="footer-logo-reveal w-full h-auto object-contain select-none" />
            </div>
            <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between text-[11px] tracking-[0.14em] uppercase text-text-200/60 gap-2">
              <p>© 2026 El Astillero. All rights reserved.</p>
              <p>Diseñado para quienes respetan el fuego.</p>
            </div>
          </div>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir a WhatsApp"
        className="fixed bottom-2 right-3 md:bottom-6 md:right-6 z-[70] inline-flex items-center gap-1.5 md:gap-2 border border-[#181a18] bg-primary text-[#181a18] px-3 py-2.5 md:px-4 md:py-3 text-[0.78rem] md:text-[0.92rem] font-semibold uppercase tracking-[0.08em] shadow-[0_10px_24px_rgba(0,0,0,0.28)] hover:bg-[#ff6a42] transition-colors duration-300"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1rem] w-[1rem] md:h-[1.15rem] md:w-[1.15rem] fill-current">
          <path d="M20.52 3.49A11.78 11.78 0 0 0 12.12.02C5.62.02.34 5.3.34 11.8c0 2.08.54 4.11 1.57 5.9L.02 24l6.45-1.69a11.73 11.73 0 0 0 5.62 1.44h.01c6.5 0 11.78-5.28 11.78-11.78a11.7 11.7 0 0 0-3.36-8.48ZM12.1 21.75h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.22-3.82 1 1.02-3.72-.24-.38a9.78 9.78 0 0 1-1.5-5.22c0-5.41 4.41-9.82 9.82-9.82 2.62 0 5.08 1.02 6.93 2.87a9.73 9.73 0 0 1 2.88 6.95c0 5.41-4.41 9.82-9.81 9.82Zm5.38-7.34c-.29-.14-1.71-.84-1.98-.94-.26-.1-.45-.14-.65.14-.19.29-.74.94-.9 1.13-.16.19-.32.22-.61.08-.29-.14-1.2-.44-2.28-1.39a8.45 8.45 0 0 1-1.58-1.95c-.16-.29-.02-.45.12-.59.13-.13.29-.32.43-.48.14-.16.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.56-.89-2.13-.23-.56-.46-.48-.65-.49h-.55c-.19 0-.5.07-.77.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.8 1.18 3 .14.19 2.03 3.1 4.91 4.34.69.29 1.22.47 1.64.6.69.22 1.31.19 1.8.12.55-.08 1.71-.7 1.95-1.38.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34Z" />
        </svg>
        <span>Cotizá</span>
      </a>
    </main>
  );
}
