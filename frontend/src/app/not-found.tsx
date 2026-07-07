import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fdfcfa',
        fontFamily: 'Nunito Sans, sans-serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p
        style={{
          fontSize: '7rem',
          fontWeight: 700,
          color: '#e8e5de',
          lineHeight: 1,
          fontFamily: 'Playfair Display, serif',
          marginBottom: '0.5rem',
        }}
      >
        404
      </p>
      <h1
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#0F3D2E',
          fontFamily: 'Playfair Display, serif',
          marginBottom: '0.75rem',
        }}
      >
        Page Not Found
      </h1>
      <p style={{ color: '#6b7b72', fontSize: '1rem', marginBottom: '2rem', maxWidth: 400 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          background: '#D4AF37',
          color: '#0F3D2E',
          padding: '0.75rem 2rem',
          borderRadius: '0.75rem',
          fontWeight: 700,
          fontSize: '0.95rem',
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
