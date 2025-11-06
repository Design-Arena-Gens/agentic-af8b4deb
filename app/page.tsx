import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid">
      <div className="col-12">
        <h1 className="h1">Your Daily Fitness Tracker</h1>
        <p className="small">Track your workouts, meals, sleep, and progress. Export an editable Word template anytime.</p>
      </div>

      <div className="col-6">
        <div className="card">
          <h2 className="h2">Workouts</h2>
          <p>Log exercises, sets, reps, and weights.</p>
          <div className="actions"><Link href="/workouts" className="btn">Open</Link></div>
        </div>
      </div>

      <div className="col-6">
        <div className="card">
          <h2 className="h2">Nutrition</h2>
          <p>Record meals and macros for the day.</p>
          <div className="actions"><Link href="/nutrition" className="btn">Open</Link></div>
        </div>
      </div>

      <div className="col-6">
        <div className="card">
          <h2 className="h2">Sleep</h2>
          <p>Track your sleep duration and quality.</p>
          <div className="actions"><Link href="/sleep" className="btn">Open</Link></div>
        </div>
      </div>

      <div className="col-6">
        <div className="card">
          <h2 className="h2">Progress</h2>
          <p>Monitor weight, body fat, and steps.</p>
          <div className="actions"><Link href="/progress" className="btn">Open</Link></div>
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <h2 className="h2">Export</h2>
          <p>Download an editable Word template covering all five sections.</p>
          <div className="actions"><a className="btn" href="/api/export-word">Download Word Template</a></div>
        </div>
      </div>
    </div>
  );
}
