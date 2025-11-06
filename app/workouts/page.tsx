"use client";
import { useEffect, useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/storage';

type WorkoutEntry = {
  date: string;
  exercise: string;
  sets: number;
  reps: number;
  weightKg: number;
  notes?: string;
};

const KEY = 'fitness.workouts.v1';

export default function WorkoutsPage() {
  const [entries, setEntries] = useState<WorkoutEntry[]>([]);
  const [form, setForm] = useState<WorkoutEntry>({ date: new Date().toISOString().slice(0,10), exercise: '', sets: 3, reps: 8, weightKg: 0, notes: '' });

  useEffect(() => {
    setEntries(loadFromLocalStorage<WorkoutEntry[]>(KEY, []));
  }, []);

  useEffect(() => { saveToLocalStorage(KEY, entries); }, [entries]);

  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    setEntries([form, ...entries]);
    setForm({ ...form, exercise: '', notes: '' });
  }

  function removeEntry(index: number) {
    setEntries(entries.filter((_, i) => i !== index));
  }

  return (
    <div className="grid">
      <div className="col-12"><h1 className="h1">Workouts</h1></div>

      <div className="col-12 card">
        <form onSubmit={addEntry}>
          <div className="row">
            <div className="col-3">
              <label className="label">Date</label>
              <input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="col-6">
              <label className="label">Exercise</label>
              <input className="input" placeholder="Squat" value={form.exercise} onChange={e => setForm({ ...form, exercise: e.target.value })} required />
            </div>
            <div className="col-3">
              <label className="label">Weight (kg)</label>
              <input className="input" type="number" min={0} step={0.5} value={form.weightKg} onChange={e => setForm({ ...form, weightKg: parseFloat(e.target.value) || 0 })} />
            </div>
            <div className="col-3">
              <label className="label">Sets</label>
              <input className="input" type="number" min={1} value={form.sets} onChange={e => setForm({ ...form, sets: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="col-3">
              <label className="label">Reps</label>
              <input className="input" type="number" min={1} value={form.reps} onChange={e => setForm({ ...form, reps: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="col-12">
              <label className="label">Notes</label>
              <textarea className="textarea" placeholder="Felt strong today" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="col-12 actions">
              <button className="btn" type="submit">Add Workout</button>
              <a className="btn secondary" href="/api/export-word">Export Word Template</a>
            </div>
          </div>
        </form>
      </div>

      <div className="col-12 card">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight (kg)</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i}>
                <td>{e.date}</td>
                <td>{e.exercise}</td>
                <td>{e.sets}</td>
                <td>{e.reps}</td>
                <td>{e.weightKg}</td>
                <td>{e.notes}</td>
                <td><button className="btn secondary" onClick={() => removeEntry(i)}>Remove</button></td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr><td colSpan={7} className="small">No entries yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
