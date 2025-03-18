// app.js
import {
  createSignal,
  onMount,
  Switch,
  Match,
} from "https://esm.sh/solid-js@1.8.1";
import { openDB, getAll, add, remove, getByIndex } from "./db.js";
import html from "https://esm.sh/solid-js@1.8.1/html";
import HabitWeekly from "./habitWeekly.js";
import HabitMonthly from "./habitMonthly.js";
import HabitYearly from "./habitYearly.js";
import Drawer from "./drawer.js";

export default function App() {
  const [habits, setHabits] = createSignal([]);
  const [checks, setChecks] = createSignal([]);
  const [db, setDb] = createSignal(null);
  const [newHabitTitle, setNewHabitTitle] = createSignal("");
  const [newHabitColor, setNewHabitColor] = createSignal("");
  const [showCreateHabit, setShowCreateHabit] = createSignal(false);
  const [currentView, setCurrentView] = createSignal("yearly");

  onMount(async () => {
    const database = await openDB();
    setDb(database);
    refreshHabits(database);
    refreshChecks(database);
    setEscapeListener();
  });

  const refreshHabits = async (database) => {
    const items = await getAll(database, "habits");
    setHabits(items);
  };

  const refreshChecks = async (database) => {
    const items = await getAll(database, "checks");
    setChecks(items);
  };

  const handleAddHabit = async () => {
    if (!newHabitTitle().trim() || !db()) return;

    await add(db(), "habits", {
      title: newHabitTitle(),
      color: newHabitColor(),
      completed: false,
    });

    setNewHabitTitle("");
    setNewHabitColor("");
    refreshHabits(db());
    setShowCreateHabit(false);
  };

  const handleRemoveHabit = async (id) => {
    await remove(db(), "habits", id);
    refreshHabits(db());
  };

  const handleAddCheck = async (date, habit_id) => {
    await add(db(), "checks", {
      date: date,
      habit_id: habit_id,
      active: true,
    });
    refreshChecks(db());
  };

  const handleRemoveCheck = async (date, habit_id) => {
    const results = await getByIndex(
      db(),
      "checks",
      "checks_habit_id_date_index",
      [habit_id, date],
    );
    await remove(db(), "checks", results[0].id);
    refreshChecks(db());
  };

  const setEscapeListener = () => {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        setShowCreateHabit(false);
      }
    };
  };

  return html`
    <div class="app__header">
      <h1 class="app__title">Habit Tracker</h1>
      <div class="pusher">&nbsp;</div>
      <span
        class="app__new-habit-launcher"
        onClick=${() => setShowCreateHabit(true)}
        >+</span
      >
      <span
        onClick=${() => setShowCreateHabit(true)}
        style="align-self: center; margin-left: 4px; cursor: pointer;"
        >New habit</span
      >
    </div>

    ${() => {
      if (habits().length == 0) {
        return html`
          <h1 style="text-align: center">No habits found. Let's add some!</h1>
        `;
      } else {
        return html`
          <div class="view-switcher">
            <button onClick=${() => setCurrentView("yearly")}>Yearly</button>
            <button onClick=${() => setCurrentView("monthly")}>Monthly</button>
            <button onClick=${() => setCurrentView("weekly")}>Weekly</button>
          </div>
        `;
      }
    }}

    <${Switch}>
      ${() => html`
        <${Match} when=${currentView() == "yearly"}>
          <div class="app__habits">
            ${() =>
              habits().map(
                (habit) => html`
                  <${HabitYearly}
                    data=${() => habit}
                    checks=${() => checks}
                    onRemove=${handleRemoveHabit}
                    onCheck=${handleAddCheck}
                    onUncheck=${handleRemoveCheck}
                  />
                `,
              )}
          </div>
        <//>
      `}
      ${() => html`
        <${Match} when=${currentView() == "monthly"}>
          <div class="app__habits">
            ${() =>
              habits().map(
                (habit) => html`
                  <${HabitMonthly}
                    data=${() => habit}
                    checks=${() => checks}
                    onRemove=${handleRemoveHabit}
                    onCheck=${handleAddCheck}
                    onUncheck=${handleRemoveCheck}
                  />
                `,
              )}
          </div>
        <//>
      `}
      ${() => html`
        <${Match} when=${currentView() == "weekly"}>
          <div class="app__habits">
            ${() =>
              habits().map(
                (habit) => html`
                  <${HabitWeekly}
                    data=${() => habit}
                    checks=${() => checks}
                    onRemove=${handleRemoveHabit}
                    onCheck=${handleAddCheck}
                    onUncheck=${handleRemoveCheck}
                  />
                `,
              )}
          </div>
        <//>
      `}
    <//>

    <${Switch}>
      ${() => html`
        <${Match} when=${showCreateHabit() == true}>
          <${Drawer}
            onOpen=${() =>
              document.getElementById("new-habit-form__name").focus()}
            onClose=${() => setShowCreateHabit(false)}
          >
            <div class="new-habit-form">
              <div class="new-habit-form__input">
                <label for="new-habit-form__name">Name</label>
                <input
                  id="new-habit-form__name"
                  class="app__input"
                  type="text"
                  value=${() => newHabitTitle()}
                  onInput=${(e) => {
                    setNewHabitTitle(e.currentTarget.value);
                  }}
                  placeholder="Add new habit"
                />
              </div>
              <div class="new-habit-form__input">
                <label for="new-habit-form__color">Color</label>
                <input
                  id="new-habit-form__color"
                  class="app__input"
                  type="text"
                  value=${() => newHabitColor()}
                  onInput=${(e) => {
                    setNewHabitColor(e.currentTarget.value);
                  }}
                  placeholder="Add new habit color"
                />
              </div>
              <div style="text-align: right">
                <button onClick=${() => setShowCreateHabit(false)}>
                  Close
                </button>
                &nbsp;
                <button onClick=${handleAddHabit}>Add</button>
              </div>
            </div>
          <//>
        <//>
      `}
      ${() => html`
        <${Match} when=${showCreateHabit() == false}>
          <div></div>
        <//>
      `}
    <//>
  `;
}
