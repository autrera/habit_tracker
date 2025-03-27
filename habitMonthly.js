import {
  createSignal,
  createEffect,
  Switch,
  Match,
} from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";
import { getDateRange, groupDatesForDisplay, getToday } from "./utilities.js";
import HabitCheck from "/habitCheck.js";
import DailyCheck from "/dailyCheck.js";
import HabitMenu from "/habitMenu.js";
import HabitForm from "/habitForm.js";

export default function HabitMonthly(props) {
  const today = getToday();
  const dateRange = getDateRange(35).reverse();
  const dateMap = groupDatesForDisplay(dateRange, 7);
  const [checks, setChecks] = createSignal([]);
  const [showEditHabit, setShowEditHabit] = createSignal(false);

  createEffect(() => {
    const elements = document.getElementsByClassName("habit-monthly__days");
    for (let element of elements) {
      element.scrollLeft = element.scrollWidth;
    }
  }, []);

  createEffect(() => {
    const checksDates = [];
    props.checks().forEach((check) => {
      if (check.habit_id == props.data.id) {
        checksDates.push(check.date);
      }
    });
    setChecks(checksDates);
  }, [props.checks]);

  return html`
    <div class="habit-monthly__wrapper">
      <div class="habit-monthly">
        <div class="habit-monthly__header">
          <span class="habit-monthly__name" title=${props.data.title}
            >${props.data.title}</span
          >
          <${HabitMenu}>
            <li
              onClick=${(event) => {
                setShowEditHabit(true);
              }}
            >
              Edit
            </li>
            <li class="separator">&nbsp;</li>
            <li
              onClick=${(event) => {
                if (confirm("Do you want to archive the habit?") == true) {
                  props.onRemove(props.data.id);
                }
              }}
            >
              Archive
            </li>
          <//>
          <div class="pusher">&nbsp;</div>
          ${() => html`
            <${DailyCheck}
              today=${today}
              color=${() => props.data.color}
              checks=${checks()}
              checked=${checks().includes(today)}
              onCheck=${() => props.onCheck(today, props.data.id)}
              onUncheck=${() => props.onUncheck(today, props.data.id)}
            />
          `}
        </div>
        <div class="habit-monthly__days">
          <table>
            ${() =>
              dateMap.map(
                (group) => html`
                  <tr>
                    ${() =>
                      group.map(
                        (date) => html`
                          <td>
                            <${HabitCheck}
                              date=${date}
                              color=${() => props.data.color}
                              checked=${checks().includes(date)}
                              onCheck=${() =>
                                props.onCheck(date, props.data.id)}
                              onUncheck=${() =>
                                props.onUncheck(date, props.data.id)}
                            />
                          </td>
                        `,
                      )}
                  </tr>
                `,
              )}
          </table>
        </div>
      </div>
    </div>
    <${Switch}>
      ${() => html`
        <${Match} when=${showEditHabit() == true}>
          <${HabitForm}
            title=${() => props.data.title}
            color=${() => props.data.color}
            onClose=${() => setShowEditHabit(false)}
            onSubmit=${(data) => props.onUpdate(props.data.id, data)}
          />
        <//>
      `}
    <//>
  `;
}
