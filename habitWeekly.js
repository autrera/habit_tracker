import { createSignal, createEffect } from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";
import { getDateRange, groupDatesForDisplay, getToday } from "./utilities.js";
import HabitCheck from "/habitCheck.js";
import DailyCheck from "/dailyCheck.js";

export default function HabitWeekly(props) {
  const today = getToday();
  const dateRange = getDateRange(7).reverse();
  const dateMap = groupDatesForDisplay(dateRange, 7);
  const [checks, setChecks] = createSignal([]);

  createEffect(() => {
    const elements = document.getElementsByClassName("habit-weekly__days");
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
    <div class="habit-weekly__wrapper">
      <div class="habit-weekly">
        <div class="habit-weekly__name">
          ${props.data.title}
          <a onClick=${() => props.onRemove(props.data.id)}>[ X ]</a>
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
        <div class="habit-weekly__days">
          <table>
            ${() =>
              dateMap.map(
                (group) => html`
                  <tr>
                    ${group.map(
                      (date) => html`
                        <td>
                          <${HabitCheck}
                            date=${date}
                            color=${() => props.data.color}
                            checked=${checks().includes(date)}
                            onCheck=${() => props.onCheck(date, props.data.id)}
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
  `;
}
