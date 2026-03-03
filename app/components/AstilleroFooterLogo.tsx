export default function AstilleroFooterLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      id="Capa_2"
      data-name="Capa 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 276.74 86.47"
      className={`text-text-100/15 ${className}`}
    >
      <style>
        {`
          .footer-logo-text {
            fill: #181a18;
            font-family: BeniBold, Beni, sans-serif;
            font-size: 89.46px;
          }
          .footer-logo-char {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: default;
          }
          .footer-logo-char:hover {
            opacity: 1;
            fill: var(--primary-100);
            transition: all 0.05s ease-out; /* snap fast to fire when hovered */
          }
          .cls-2 { letter-spacing: .02em; }
          .cls-3 { letter-spacing: .02em; }
          .cls-4 { letter-spacing: .01em; }
          .cls-5 { letter-spacing: .02em; }
          .cls-6 { letter-spacing: 0em; }
          .cls-7 { letter-spacing: 0em; }
          .cls-8 { letter-spacing: .01em; }
          .cls-9 { letter-spacing: 0em; }
        `}
      </style>
      <g id="Capa_1-2" data-name="Capa 1">
        <text className="footer-logo-text" transform="translate(0 72.87)">
          <tspan className="cls-9 footer-logo-char" x="0" y="0">E</tspan>
          <tspan className="cls-3 footer-logo-char" x="22.03" y="0">L </tspan>
          <tspan className="cls-8 footer-logo-char" x="58.44" y="0">A</tspan>
          <tspan className="cls-2 footer-logo-char" x="87.04" y="0">S</tspan>
          <tspan className="cls-4 footer-logo-char" x="116.27" y="0">T</tspan>
          <tspan className="cls-7 footer-logo-char" x="139.35" y="0">I</tspan>
          <tspan className="cls-5 footer-logo-char" x="153.89" y="0">LL</tspan>
          <tspan className="cls-9 footer-logo-char" x="196.67" y="0">E</tspan>
          <tspan className="cls-6 footer-logo-char" x="218.71" y="0">R</tspan>
          <tspan className="cls-3 footer-logo-char" x="248.56" y="0">O</tspan>
        </text>
      </g>
    </svg>
  );
}
