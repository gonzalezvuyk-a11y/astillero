import { existsSync, readdirSync } from 'fs';
import path from 'path';
import HeroScrollBackground from './components/HeroScrollBackground';

const whatsappMessage =
  'Hola, quiero cotizar una parrilla El Astillero. Tipo: ____. Medidas aprox: __ x __. Ciudad: ____. Tengo foto/plano: sí/no.';
const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

const benefits = [
  {
    title: 'Acero inoxidable de primera',
    text: 'Durabilidad real + estética premium.'
  },
  {
    title: 'Fabricación a medida',
    text: 'Tu espacio manda: medidas, diseño y opciones.'
  },
  {
    title: 'Instalación + garantía',
    text: 'Entregamos funcionando, con soporte post-venta.'
  }
];

const featuredModels = [
  {
    label: 'Signature Series',
    price: '$ Upon Request',
    title: 'Empotrables con vidrio',
    text: 'Look arquitectónico, integrado al quincho. Diseño premium que combina presencia visual y rendimiento.',
    features: ['Acero inox 304', 'Herrajes de precisión', 'Iluminación LED opcional'],
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Bespoke Design',
    price: 'Custom Quote',
    title: 'Quinchos completos / rediseño',
    text: 'Upgrade total del área de asado. Proyecto integral desde concepto, fabricación e instalación final.',
    features: ['Diseño arquitectónico', 'Materiales premium', 'Integración total'],
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
  }
];

const modelTiles = [
  {
    title: 'Parrillas para terraza',
    cta: 'Ver detalles',
    image:
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Fogoneros',
    cta: 'Ver detalles',
    image:
      'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Revestimientos inox',
    cta: 'Ver detalles',
    image:
      'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=900&q=80'
  }
];

const detailShots = [
  { label: 'Frontal', image: 'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&fit=crop&w=1400&q=80' },
  { label: '3/4', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Lateral', image: 'https://images.unsplash.com/photo-1514517220031-1f8f58ce56d9?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Macro manija', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Macro vidrio', image: 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=1400&q=80' }
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
  const heroDir = path.join(process.cwd(), 'public', 'herogif');
  if (!existsSync(heroDir)) return [];

  return readdirSync(heroDir)
    .filter((file) => allImageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((file) => `/herogif/${encodeURIComponent(file)}`);
}

const heroGifFrames = getHeroGifFrames();

const steps = ['Medimos / recibimos medidas', 'Diseñamos propuesta', 'Fabricamos', 'Instalamos y entregamos'];

const testimonialQuotes = [
  '“Terminación impecable, se nota el nivel.”',
  '“Quedó integrado perfecto al quincho.”',
  '“Instalación prolija y materiales top.”'
];

const projectPhotos = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1556910096-6f5e72db6803?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80'
];

const footerSparks = [
  { left: '8%', delay: '0s', duration: '5.6s', size: 3 },
  { left: '14%', delay: '1.4s', duration: '6.2s', size: 2 },
  { left: '21%', delay: '0.8s', duration: '5.1s', size: 2 },
  { left: '29%', delay: '2.2s', duration: '6.4s', size: 3 },
  { left: '36%', delay: '1.1s', duration: '5.7s', size: 2 },
  { left: '44%', delay: '2.8s', duration: '6.6s', size: 3 },
  { left: '52%', delay: '0.4s', duration: '5.2s', size: 2 },
  { left: '59%', delay: '1.9s', duration: '6s', size: 3 },
  { left: '66%', delay: '2.6s', duration: '5.4s', size: 2 },
  { left: '73%', delay: '1.2s', duration: '6.3s', size: 3 },
  { left: '81%', delay: '2.1s', duration: '5.8s', size: 2 },
  { left: '89%', delay: '0.9s', duration: '6.5s', size: 3 },
  { left: '11%', delay: '0.3s', duration: '4.8s', size: 3 },
  { left: '18%', delay: '1.7s', duration: '5.3s', size: 4 },
  { left: '26%', delay: '2.5s', duration: '5.9s', size: 3 },
  { left: '34%', delay: '0.6s', duration: '4.9s', size: 4 },
  { left: '47%', delay: '1.5s', duration: '5.4s', size: 3 },
  { left: '55%', delay: '2.3s', duration: '5.8s', size: 4 },
  { left: '63%', delay: '0.2s', duration: '5s', size: 3 },
  { left: '71%', delay: '1.1s', duration: '5.6s', size: 4 },
  { left: '79%', delay: '2.4s', duration: '6s', size: 3 },
  { left: '86%', delay: '1.8s', duration: '5.2s', size: 4 },
  { left: '93%', delay: '0.7s', duration: '5.7s', size: 3 }
];

export default function Home() {
  return (
    <main className="bg-background-dark text-text-100 font-sans antialiased selection:bg-primary selection:text-text-100">
      <div className="noise-overlay" />
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-background-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-transparent to-black/45" />
      </div>

      <header className="fixed top-8 left-0 w-full z-50 px-4 md:px-12 flex justify-between items-start pointer-events-none">
        <a
          href="#inicio"
          className="pointer-events-auto text-bone text-3xl font-condensed font-bold uppercase tracking-tighter hover:text-primary transition-colors duration-300"
        >
          El Astillero
        </a>
        <nav className="hidden md:flex bg-background-dark/80 backdrop-blur-md border border-bg-300 pointer-events-auto">
          <a
            className="px-8 py-3 text-sm font-medium uppercase tracking-wide text-text-200 border-r border-bg-300 hover:bg-bone hover:text-bg-100 transition-colors duration-300"
            href="#modelos"
          >
            Modelos
          </a>
          <a
            className="px-8 py-3 text-sm font-medium uppercase tracking-wide text-text-200 border-r border-bg-300 hover:bg-bone hover:text-bg-100 transition-colors duration-300"
            href="#detalles"
          >
            Detalles
          </a>
          <a
            className="px-8 py-3 text-sm font-medium uppercase tracking-wide text-text-200 border-r border-bg-300 hover:bg-bone hover:text-bg-100 transition-colors duration-300"
            href="#galeria-productos"
          >
            Galeria
          </a>
          <a
            className="px-8 py-3 text-sm font-medium uppercase tracking-wide text-text-200 border-r border-bg-300 hover:bg-bone hover:text-bg-100 transition-colors duration-300"
            href="#proceso"
          >
            Proceso
          </a>
          <a
            className="px-8 py-3 text-sm font-medium uppercase tracking-wide text-bone hover:bg-bone hover:text-bg-100 transition-colors duration-300"
            href="#contacto"
          >
            Contacto
          </a>
        </nav>
      </header>

      <section id="inicio" className="relative z-10">
        <div className="relative h-[300vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
              {heroGifFrames.length > 0 ? (
                <HeroScrollBackground
                  frames={heroGifFrames}
                  sectionId="inicio"
                  className="w-full h-full opacity-[0.98]"
                  fit="cover"
                  zoom={1.12}
                  anchorY={1}
                />
              ) : (
                <img
                  alt="Parrilla premium en uso"
                  className="w-full h-full object-cover object-[50%_72%] opacity-[0.95]"
                  src="https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&fit=crop&w=1600&q=80"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/6 via-transparent to-black/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-black/3" />
            </div>
            <div className="relative z-10 flex h-full items-center">
              <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto pt-28 md:pt-20 pb-20">
                <div className="inline-flex text-primary text-xs font-bold tracking-[0.3em] uppercase border border-primary/30 px-3 py-2 mb-8">
                  El asado se respeta.
                </div>
                <h1 className="font-condensed font-bold text-bone text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight max-w-5xl uppercase">
                  Parrillas premium en acero inoxidable, hechas a medida en Paraguay.
                </h1>
                <p className="text-text-200 text-base md:text-xl mt-8 max-w-3xl">
                  Diseño, fabricación e instalación para quinchos y terrazas con terminación impecable.
                </p>
                <div className="flex flex-wrap gap-4 mt-10">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-solid-system on-dark group">
                    <span className="btn-text">Cotizar por WhatsApp</span>
                    <span className="btn-icon">
                      <span className="material-symbols-outlined group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                        north_east
                      </span>
                    </span>
                  </a>
                  <a href="#modelos" className="btn-solid-system on-light group">
                    <span className="btn-text">Ver modelos</span>
                    <span className="btn-icon">
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-300">
                        arrow_forward
                      </span>
                    </span>
                  </a>
                </div>
                <p className="mt-8 text-sm text-text-200 border-l-2 border-primary pl-4">
                  Acero inoxidable de primera · A medida · Instalación + garantía
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-bg-200 relative z-10 border-t border-bg-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="border border-bg-300 bg-surface-dark p-7 hover:border-primary/40 transition-colors"
              >
                <h2 className="font-condensed font-bold text-3xl text-bone uppercase leading-tight">{benefit.title}</h2>
                <p className="mt-4 text-text-200">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="modelos" className="py-24 bg-background-dark relative z-10 border-t border-bg-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="font-condensed font-bold text-5xl md:text-7xl text-bone uppercase tracking-tight">
            Modelos / Soluciones<span className="text-primary">.</span>
          </h2>

          <div className="mt-12 space-y-6">
            {featuredModels.map((model, index) => (
              <article
                key={model.title}
                className={`grid grid-cols-1 md:grid-cols-2 border border-bg-300 bg-surface-dark ${
                  index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="min-h-[340px]">
                  <img src={model.image} alt={model.title} className="h-full w-full object-cover grayscale" />
                </div>

                <div className="p-8 md:p-10 flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[11px] text-primary border border-primary/40 px-2 py-1 uppercase tracking-[0.18em] font-semibold">
                      {model.label}
                    </span>
                    <span className="text-text-200 text-sm">{model.price}</span>
                  </div>

                  <h3 className="mt-6 font-condensed font-bold text-5xl leading-[0.92] uppercase text-text-100">
                    {model.title}
                  </h3>
                  <p className="mt-5 text-text-200 text-lg max-w-xl">{model.text}</p>

                  <div className="mt-auto pt-10 border-t border-bg-300">
                    <ul className="space-y-2">
                      {model.features.map((feature) => (
                        <li key={feature} className="text-xs uppercase tracking-[0.16em] text-text-200 flex items-center gap-2">
                          <span className="text-primary">●</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {modelTiles.map((item) => (
              <article key={item.title} className="border border-bg-300 bg-surface-dark overflow-hidden">
                <img src={item.image} alt={item.title} className="h-72 w-full object-cover grayscale" />
                <div className="p-6 border-t border-bg-300">
                  <h4 className="font-condensed text-4xl uppercase text-text-100">{item.title}</h4>
                  <a href="#contacto" className="inline-flex mt-3 text-sm uppercase tracking-[0.16em] text-text-200 hover:text-primary transition-colors">
                    {item.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="galeria-productos"
        className="product-gallery-section py-20 md:py-24 relative z-10 border-t border-[#d4cfc5] border-b border-[#d4cfc5]"
      >
        <div className="product-gallery-vignette" />
        <div className="product-marquee">
          <div className="product-track">
            {[...productCarouselImages, ...productCarouselImages].map((image, index) => (
              <article key={`${image}-${index}`} className="product-card">
                <div className="product-visual-wrap">
                  <img src={image} alt="" className="h-56 md:h-64 w-full object-contain bg-transparent" />
                </div>
                <div className="product-reflection" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="detalles" className="py-24 bg-bg-200 relative z-10 border-t border-bg-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="font-condensed font-bold text-5xl md:text-7xl text-bone uppercase tracking-tight">Detalles que se notan.</h2>
          <p className="text-text-200 text-lg mt-5 max-w-4xl">
            Terminaciones, herrajes y proporciones pensadas para que el quincho se vea premium incluso cuando no estás
            asando.
          </p>
          <div className="mt-10 flex gap-5 overflow-x-auto pb-2">
            {detailShots.map((shot) => (
              <article key={shot.label} className="min-w-[85%] md:min-w-[32%] border border-bg-300 bg-surface-dark">
                <img src={shot.image} alt={`Render ${shot.label}`} className="h-72 w-full object-cover" />
                <div className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-text-200 border-t border-bg-300">
                  {shot.label}
                </div>
              </article>
            ))}
          </div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-solid-system on-dark group mt-10">
            <span className="btn-text">Cotizar un modelo</span>
            <span className="btn-icon">
              <span className="material-symbols-outlined group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                north_east
              </span>
            </span>
          </a>
        </div>
      </section>

      <section id="proceso" className="py-24 bg-background-dark relative z-10 border-t border-bg-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="font-condensed font-bold text-5xl md:text-7xl text-bone uppercase tracking-tight">Cómo trabajamos.</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-5">
            {steps.map((step, index) => (
              <article key={step} className="border border-bg-300 bg-surface-dark p-6">
                <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Paso {index + 1}</p>
                <p className="mt-4 text-text-200">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-bg-200 relative z-10 border-t border-bg-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2 className="font-condensed font-bold text-5xl md:text-7xl text-bone uppercase tracking-tight">Proyectos reales.</h2>
          <p className="mt-4 text-text-200 text-sm uppercase tracking-[0.2em]">+X proyectos entregados en Paraguay</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
            {projectPhotos.map((photo, index) => (
              <img
                key={photo}
                src={photo}
                alt={`Proyecto real ${index + 1}`}
                className="h-40 md:h-52 w-full object-cover border border-bg-300"
              />
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonialQuotes.map((quote) => (
              <blockquote key={quote} className="border border-bg-300 bg-surface-dark p-6 text-text-100 italic">
                {quote}
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 bg-text-100 text-bg-100 relative z-10 border-t border-bg-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold">Servicio exclusivo</p>
              <h2 className="mt-5 font-condensed font-bold text-[clamp(3.2rem,9vw,8rem)] uppercase leading-[0.88] tracking-tight">
                Diseño
                <br />
                a medida<span className="text-primary">.</span>
              </h2>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-bg-200">
                Transformamos su visión en realidad. Consultoría personalizada para proyectos residenciales de alto nivel.
              </p>

              <div className="mt-10 space-y-4 text-bg-200">
                <p className="flex items-center gap-3 text-lg">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  Envíos a todo el país
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

            <div className="bg-[#f4f2ed] border border-[#ddd9d0] p-7 md:p-10">
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-bg-300 mb-3">Nombre</label>
                  <input
                    type="text"
                    placeholder="Ingrese su nombre"
                    className="w-full h-14 border border-[#d4d0c8] bg-[#eceae5] px-4 text-bg-200 placeholder:text-bg-300/70 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-bg-300 mb-3">Email</label>
                  <input
                    type="email"
                    placeholder="Ingrese su email"
                    className="w-full h-14 border border-[#d4d0c8] bg-[#eceae5] px-4 text-bg-200 placeholder:text-bg-300/70 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-bg-300 mb-3">
                    Detalles del proyecto
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Cuéntenos sobre su proyecto"
                    className="w-full border border-[#d4d0c8] bg-[#eceae5] px-4 py-4 text-bg-200 placeholder:text-bg-300/70 focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-solid-system on-light group w-full">
                  <span className="btn-text flex-1">Iniciar consulta</span>
                  <span className="btn-icon">
                    <span className="material-symbols-outlined group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                      north_east
                    </span>
                  </span>
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden z-10 border-t border-bg-300 bg-bg-100">
        <div className="footer-sparks" aria-hidden="true">
          {footerSparks.map((spark, index) => (
            <span
              key={`spark-${index}`}
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
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-text-200/70 font-semibold">Quick Links</p>
              <div className="mt-6 space-y-3 text-text-100 text-3xl font-condensed uppercase leading-none">
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
                <a href="mailto:consultas@elastillero.com" className="block text-2xl font-condensed hover:text-primary transition-colors">
                  consultas@elastillero.com
                </a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="block text-xl text-text-200 hover:text-primary transition-colors">
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

          <div className="mt-14 border-t border-bg-300 pt-10">
            <h2 className="font-condensed font-bold uppercase tracking-tight leading-[0.85] text-[clamp(3.2rem,15vw,13rem)] text-text-100/10 select-none">
              El Astillero<span className="text-primary">.</span>
            </h2>
            <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between text-[11px] tracking-[0.14em] uppercase text-text-200/60 gap-2">
              <p>© 2026 El Astillero. All rights reserved.</p>
              <p>Designed for those who respect the fire.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
