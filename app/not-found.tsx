import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background-dark text-text-100 flex items-center justify-center px-6">
      <section className="max-w-xl text-center border border-bg-300 bg-surface-dark p-10">
        <p className="text-xs tracking-[0.18em] uppercase text-text-200">404</p>
        <h1 className="mt-4 font-condensed text-5xl uppercase">Página no encontrada</h1>
        <p className="mt-4 text-text-200">La URL solicitada no existe o fue movida.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center border border-bg-300 bg-bg-200 px-4 py-3 text-xs uppercase tracking-[0.16em] hover:border-primary hover:text-primary transition-colors"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
