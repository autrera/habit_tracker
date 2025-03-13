// app.js
import { createSignal, onMount, Switch, Match } from "https://esm.sh/solid-js@1.8.1";
import { openDB, getAll, add, remove, getByIndex } from './db.js';
import html from "https://esm.sh/solid-js@1.8.1/html";
import Habit from './habit.js';
import HabitMonthly from './habitMonthly.js';
import HabitYearly from './habitYearly.js';
import Drawer from './drawer.js';

export default function App() {
  const [habits, setHabits] = createSignal([]);
  const [checks, setChecks] = createSignal([]);
  const [db, setDb] = createSignal(null);
  const [newHabit, setNewHabit] = createSignal('');
  const [showCreateHabit, setShowCreateHabit] = createSignal(false);

  onMount(async () => {
    const database = await openDB();
    setDb(database);
    refreshHabits(database);
    refreshChecks(database);
  });

  const refreshHabits = async (database) => {
    const items = await getAll(database, 'habits');
    setHabits(items);
  };

  const refreshChecks = async (database) => {
    const items = await getAll(database, 'checks');
    setChecks(items);
  };

  const handleAddHabit = async () => {
    if (!newHabit().trim() || !db()) return;
    
    await add(db(), 'habits', {
      title: newHabit(),
      completed: false
    });
    
    setNewHabit('');
    refreshHabits(db());
    setShowCreateHabit(false);
  };

  const handleRemoveHabit = async (id) => {
    await remove(db(), 'habits', id);
    refreshHabits(db());
  };

  const handleAddCheck = async (date, habit_id) => {
    await add(db(), 'checks', {
      date: date,
      habit_id: habit_id,
      active: true
    });
    refreshChecks(db());
  };

  const handleRemoveCheck = async (date, habit_id) => {
    const results = await getByIndex(db(), 'checks', 'checks_habit_id_date_index', [habit_id, date]);
    await remove(db(), 'checks', results[0].id);
    refreshChecks(db());
  };

  return html`
    <div class="app__header">
      <h1 class="app__title">
        Habit Tracker
      </h1>
      <div class="pusher">&nbsp;</div>
      <span class="app__new-habit-launcher" onClick=${() => setShowCreateHabit(true)}>+</span>
    </div>

    <div class="app__habits">
      ${() => habits().map(habit => (
        html`
          <${HabitYearly} 
            data=${() => habit} 
            checks=${() => checks} 
            onRemove=${handleRemoveHabit}
            onCheck=${handleAddCheck}
            onUncheck=${handleRemoveCheck}
          />
        `
      ))}

      <${Switch}>
        ${() => (
          html`
            <${Match} when=${showCreateHabit() == true}>
              <${Drawer}
                onClose=${() => setShowCreateHabit(false)}
              >
                <div class="new-habit-form">
                  <label for="new-habit-form__name">Name</label>
                  <input
                    id="new-habit-form__name"
                    class="app__input"
                    type="text"
                    value=${() => newHabit()}
                    onInput=${(e) => {
                        setNewHabit(e.currentTarget.value)
                    }}
                    placeholder="Add new habit"
                  />
                  <label for="new-habit-form__color">Color</label>
                  <input
                    id="new-habit-form__color"
                    class="app__input"
                    type="text"
                    value=${() => newHabit()}
                    onInput=${(e) => {
                        setNewHabit(e.currentTarget.value)
                    }}
                    placeholder="Add new habit color"
                  />
                  <button onClick=${handleAddHabit}>Add</button>
                </div>
              <//>
            <//>
          `
        )}
        ${() => (
          html`
            <${Match} when=${showCreateHabit() == false}>
              <div></div>
            <//>
          `
        )}
      <//>
    </div>
  `;
}
