import styles from '../../styles/ui/JusticeEmblem.module.css'

// Decorative emblem: scales of justice on a pillar inside a double ring.
// Drawn in currentColor, so the panel's CSS sets the colour.
export function JusticeEmblem({ className }: { className?: string }) {
  return (
    <div className={className ? `${styles.panel} ${className}` : styles.panel} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* double ring */}
        <circle cx="120" cy="120" r="112" strokeWidth="7" />
        <circle cx="120" cy="120" r="100" strokeWidth="2" />

        {/* pillar with finial */}
        <circle cx="120" cy="52" r="7" fill="currentColor" stroke="none" />
        <path d="M120 60v118" strokeWidth="6" />
        <path d="M112 74h16" strokeWidth="4" />

        {/* base */}
        <path d="M94 196h52l-9-16h-34z" fill="currentColor" stroke="none" />
        <path d="M84 202h72" strokeWidth="4" />

        {/* beam */}
        <path d="M58 92Q120 78 182 92" strokeWidth="5" />
        <circle cx="120" cy="84" r="6" fill="currentColor" stroke="none" />
        <circle cx="58" cy="92" r="4" fill="currentColor" stroke="none" />
        <circle cx="182" cy="92" r="4" fill="currentColor" stroke="none" />

        {/* left pan */}
        <path d="M58 92 42 144M58 92l16 52" strokeWidth="2" />
        <path d="M36 144h44a22 22 0 0 1-44 0z" fill="currentColor" stroke="none" />

        {/* right pan */}
        <path d="M182 92l-16 52M182 92l16 52" strokeWidth="2" />
        <path d="M160 144h44a22 22 0 0 1-44 0z" fill="currentColor" stroke="none" />

      </svg>
    </div>
  )
}
