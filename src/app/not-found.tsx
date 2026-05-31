'use client';

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      </head>
      <body style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F0F4F8', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', margin: 0 }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', color: '#1A365D', marginBottom: '16px' }}>404</h1>
          <p style={{ fontSize: '18px', color: '#4A5568', marginBottom: '32px' }}>La página que buscas no existe o fue movida.</p>
          <a 
            href="/es" 
            style={{ 
              backgroundColor: '#2563EB', 
              color: 'white', 
              padding: '12px 24px', 
              textDecoration: 'none', 
              borderRadius: '8px',
              fontWeight: 600
            }}
          >
            Volver al Inicio
          </a>
        </div>
      </body>
    </html>
  );
}
