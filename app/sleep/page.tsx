"use client";
import { useEffect, useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/storage';

type SleepEntry = {
  date: string;
  hours: number;
  quality: number; // 1-5
  notes?: string;
};

const KEY = 'fitness.sleep.v1';

export default function SleepPage() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [form, setForm] = useState<SleepEntry>({ date: new Date().toISOString().slice(0,10), hours: 8, quality: 4, notes: '' });

  useEffect(() => { setEntries(loadFromLocalStorage<SleepEntry[]>(KEY, [])); }, []);
  useEffect(() => { saveToLocalStorage(KEY, entries); }, [entries]);

  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    setEntries([form, ...entries]);
    setForm({ ...form, notes: '' });
  }

  function removeEntry(idx: number) { setEntries(entries.filter((_, i) => i !== idx)); }

  return (
    <div className="grid">
      <div className="col-12"><h1 className="h1">Sleep</h1></div>

      <div className="col-12 card">
        <form onSubmit={addEntry}>
          <div className="row">
            <div className="col-4">
              <label className="label">Date</label>
              <input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="col-4">
              <label className="label">Hours Slept</label>
              <input className="input" type="number" min={0} step={0.25} value={form.hours} onChange={e => setForm({ ...form, hours: parseFloat(e.target.value) || 0 })} />
            </div>
            <div className="col-4">
              <label className="label">Quality (1-5)</label>
              <input className="input" type="number" min={1} max={5} value={form.quality} onChange={e => setForm({ ...form, quality: parseInt(e.target.value) || 1 })} />
            </div>
            <div className="col-12">
              <label className="label">Notes</label>
              <textarea className="textarea" placeholder="Woke up refreshed" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="col-12 actions">
              <button className="btn" type="submit">Add Sleep</button>
              <a className="btn secondary" href="/api/export-word">Export Word Template</a>
            </div>
          </div>
        </form>
      </div>

      <div className="col-12 card">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th><th>Hours</th><th>Quality</th><th>Notes</th><th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i}>
                <td>{e.date}</td><td>{e.hours}</td><td>{e.quality}</td><td>{e.notes}</td>
                <td><button className="btn secondary" onClick={() => removeEntry(i)}>Remove</button></td>
              </tr>
            ))}
            {entries.length === 0 && (<tr><td colSpan={5} className="small">No entries yet</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
