"use client";
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-links">
          <Link href="/"><span className="brand">Fitness Tracker</span></Link>
          <Link href="/workouts">Workouts</Link>
          <Link href="/nutrition">Nutrition</Link>
          <Link href="/sleep">Sleep</Link>
          <Link href="/progress">Progress</Link>
        </div>
        <a className="btn" href="/api/export-word">Download Word Template</a>
      </div>
    </nav>
  );
}
