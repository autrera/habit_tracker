// app.js
import {
  createSignal,
  onMount,
  Switch,
  Match,
} from "https://esm.sh/solid-js@1.8.1";
import { openDB, getAll, add, remove, getByIndex, update } from "./db.js";
import html from "https://esm.sh/solid-js@1.8.1/html";
import HabitWeekly from "./habitWeekly.js";
import HabitMonthly from "./habitMonthly.js";
import HabitYearly from "./habitYearly.js";
import Drawer from "./drawer.js";
import HabitForm from "./habitForm.js";

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

  const handleAddHabit = async (data) => {
    if (!data.title.trim() || !db()) return;

    await add(db(), "habits", {
      title: data.title,
      color: data.color,
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

  const handleUpdateHabit = async (id, data) => {
    await update(db(), "habits", {
      id: id,
      title: data.title,
      color: data.color,
      completed: false,
    });

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
      <svg
        class="app__new-habit-launcher"
        onClick=${() => setShowCreateHabit(true)}
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="currentColor"
          fill-rule="evenodd"
          sketch:type="MSPage"
        >
          <g
            id="Icon-Set"
            sketch:type="MSLayerGroup"
            transform="translate(-464.000000, -1087.000000)"
            fill="currentColor"
          >
            <path
              d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z"
              id="plus-circle"
              sketch:type="MSShapeGroup"
            ></path>
          </g>
        </g>
      </svg>
      <span
        onClick=${() => setShowCreateHabit(true)}
        style="align-self: center; margin-left: 4px; cursor: pointer;"
        >New habit</span
      >
    </div>

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
                    onUpdate=${handleUpdateHabit}
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
                    onUpdate=${handleUpdateHabit}
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
                    onUpdate=${handleUpdateHabit}
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
          <${HabitForm}
            title=${() => newHabitTitle()}
            color=${() => newHabitColor()}
            onClose=${() => setShowCreateHabit(false)}
            onSubmit=${(data) => handleAddHabit(data)}
          />
        <//>
      `}
    <//>

    ${() => {
      if (habits().length == 0) {
        return html`
          <h1 style="text-align: center">No habits found. Let's add some!</h1>
        `;
      } else {
        return html`
          <div class="view-switcher">
            <button
              class=${() => (currentView() == "yearly" ? "active" : "")}
              onClick=${() => setCurrentView("yearly")}
            >
              Yearly
            </button>
            <button
              class=${() => (currentView() == "monthly" ? "active" : "")}
              onClick=${() => setCurrentView("monthly")}
            >
              Monthly
            </button>
            <button
              class=${() => (currentView() == "weekly" ? "active" : "")}
              onClick=${() => setCurrentView("weekly")}
            >
              Weekly
            </button>
          </div>
        `;
      }
    }}
  `;
}
