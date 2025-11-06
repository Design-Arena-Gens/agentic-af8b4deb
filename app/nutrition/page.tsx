"use client";
import { useEffect, useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/storage';

type MealEntry = {
  date: string;
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  notes?: string;
};

const KEY = 'fitness.nutrition.v1';

export default function NutritionPage() {
  const [entries, setEntries] = useState<MealEntry[]>([]);
  const [form, setForm] = useState<MealEntry>({ date: new Date().toISOString().slice(0,10), meal: '', calories: 0, protein: 0, carbs: 0, fat: 0, notes: '' });

  useEffect(() => { setEntries(loadFromLocalStorage<MealEntry[]>(KEY, [])); }, []);
  useEffect(() => { saveToLocalStorage(KEY, entries); }, [entries]);

  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    setEntries([form, ...entries]);
    setForm({ ...form, meal: '', calories: 0, protein: 0, carbs: 0, fat: 0, notes: '' });
  }

  function removeEntry(idx: number) { setEntries(entries.filter((_, i) => i !== idx)); }

  return (
    <div className="grid">
      <div className="col-12"><h1 className="h1">Nutrition</h1></div>

      <div className="col-12 card">
        <form onSubmit={addEntry}>
          <div className="row">
            <div className="col-3">
              <label className="label">Date</label>
              <input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="col-9">
              <label className="label">Meal</label>
              <input className="input" placeholder="Chicken salad" value={form.meal} onChange={e => setForm({ ...form, meal: e.target.value })} required />
            </div>
            <div className="col-3">
              <label className="label">Calories</label>
              <input className="input" type="number" min={0} value={form.calories} onChange={e => setForm({ ...form, calories: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="col-3">
              <label className="label">Protein (g)</label>
              <input className="input" type="number" min={0} value={form.protein} onChange={e => setForm({ ...form, protein: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="col-3">
              <label className="label">Carbs (g)</label>
              <input className="input" type="number" min={0} value={form.carbs} onChange={e => setForm({ ...form, carbs: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="col-3">
              <label className="label">Fat (g)</label>
              <input className="input" type="number" min={0} value={form.fat} onChange={e => setForm({ ...form, fat: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="col-12">
              <label className="label">Notes</label>
              <textarea className="textarea" placeholder="Pre-workout meal" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="col-12 actions">
              <button className="btn" type="submit">Add Meal</button>
              <a className="btn secondary" href="/api/export-word">Export Word Template</a>
            </div>
          </div>
        </form>
      </div>

      <div className="col-12 card">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th><th>Meal</th><th>Calories</th><th>Protein</th><th>Carbs</th><th>Fat</th><th>Notes</th><th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i}>
                <td>{e.date}</td><td>{e.meal}</td><td>{e.calories}</td><td>{e.protein}</td><td>{e.carbs}</td><td>{e.fat}</td><td>{e.notes}</td>
                <td><button className="btn secondary" onClick={() => removeEntry(i)}>Remove</button></td>
              </tr>
            ))}
            {entries.length === 0 && (<tr><td colSpan={8} className="small">No entries yet</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
