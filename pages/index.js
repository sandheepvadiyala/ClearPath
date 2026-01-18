import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>ClearPath</h1>
      <p>Guided immigration steps in plain language, with voice instructions</p>
      <Link href="/select">
        <button>Get Started</button>
      </Link>
    </div>
  );
}
