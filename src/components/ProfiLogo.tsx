interface ProfiLogoProps {
  className?: string
  title?: string
}

export function ProfiLogo({ className, title = 'Профи.ру' }: ProfiLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 32"
      fill="none"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect width="32" height="32" rx="8" fill="#FF4455" />
      <path
        d="M10 8.5h6.2c3.2 0 5.3 1.8 5.3 4.6 0 2.9-2.1 4.7-5.3 4.7H13.2V23.5H10V8.5zm3.2 6.6h2.8c1.5 0 2.4-.8 2.4-2s-.9-2-2.4-2h-2.8v4z"
        fill="white"
      />
      <text
        x="40"
        y="21.5"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
        fontSize="14"
        fontWeight="700"
      >
        Профи.ру
      </text>
    </svg>
  )
}
