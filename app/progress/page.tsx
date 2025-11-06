"use client";
import { useEffect, useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/storage';

type ProgressEntry = {
  date: string;
  weightKg: number;
  bodyFatPct?: number;
  steps?: number;
  notes?: string;
};

const KEY = 'fitness.progress.v1';

export default function ProgressPage() {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [form, setForm] = useState<ProgressEntry>({ date: new Date().toISOString().slice(0,10), weightKg: 70, bodyFatPct: undefined, steps: undefined, notes: '' });

  useEffect(() => { setEntries(loadFromLocalStorage<ProgressEntry[]>(KEY, [])); }, []);
  useEffect(() => { saveToLocalStorage(KEY, entries); }, [entries]);

  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    setEntries([form, ...entries]);
  }

  function removeEntry(idx: number) { setEntries(entries.filter((_, i) => i !== idx)); }

  return (
    <div className="grid">
      <div className="col-12"><h1 className="h1">Progress</h1></div>

      <div className="col-12 card">
        <form onSubmit={addEntry}>
          <div className="row">
            <div className="col-3">
              <label className="label">Date</label>
              <input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="col-3">
              <label className="label">Weight (kg)</label>
              <input className="input" type="number" min={0} step={0.1} value={form.weightKg} onChange={e => setForm({ ...form, weightKg: parseFloat(e.target.value) || 0 })} />
            </div>
            <div className="col-3">
              <label className="label">Body Fat (%)</label>
              <input className="input" type="number" min={0} max={100} step={0.1} value={form.bodyFatPct ?? ''} onChange={e => setForm({ ...form, bodyFatPct: e.target.value === '' ? undefined : parseFloat(e.target.value) })} />
            </div>
            <div className="col-3">
              <label className="label">Steps</label>
              <input className="input" type="number" min={0} step={1} value={form.steps ?? ''} onChange={e => setForm({ ...form, steps: e.target.value === '' ? undefined : parseInt(e.target.value) })} />
            </div>
            <div className="col-12">
              <label className="label">Notes</label>
              <textarea className="textarea" placeholder="Weekly check-in" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="col-12 actions">
              <button className="btn" type="submit">Add Progress</button>
              <a className="btn secondary" href="/api/export-word">Export Word Template</a>
            </div>
          </div>
        </form>
      </div>

      <div className="col-12 card">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th><th>Weight</th><th>Body Fat</th><th>Steps</th><th>Notes</th><th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i}>
                <td>{e.date}</td>
                <td>{e.weightKg}</td>
                <td>{e.bodyFatPct ?? '-'}</td>
                <td>{e.steps ?? '-'}</td>
                <td>{e.notes}</td>
                <td><button className="btn secondary" onClick={() => removeEntry(i)}>Remove</button></td>
              </tr>
            ))}
            {entries.length === 0 && (<tr><td colSpan={6} className="small">No entries yet</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
