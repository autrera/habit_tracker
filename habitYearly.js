import { createSignal, createEffect } from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";
import { getDateRange, groupDatesByWeek } from './utilities.js';
import HabitCheck from '/habitCheck.js';

export default function HabitYearly(props) {
  const dateRange = getDateRange(595).reverse(); 
  const dateMap = groupDatesByWeek(dateRange); 
  const [checks, setChecks] = createSignal([]);

  createEffect(() => {
    const checksDates = [];
    props.checks().forEach(check => {
      if(check.habit_id == props.data.id) {
        checksDates.push(check.date);
      }
    });
    setChecks(checksDates);
  }, [props.checks]);

  return html`
    <div class="habit-yearly__wrapper">
      <div class="habit-yearly">
        <div class="habit-yearly__name">
          ${props.data.title}<a onClick=${() => props.onRemove(props.data.id)}>[ X ]</a>
        </div>
        <div class="habit-yearly__days">
          <table>
          ${() => dateMap.map(group => (
            html`
            <tr>
              ${() => group.map(date => (
                html`
                  <td>
                    <${HabitCheck}
                      checked=${checks().includes(date)}
                      onCheck=${() => props.onCheck(date, props.data.id)}
                      onUncheck=${() => props.onUncheck(date, props.data.id)}
                    />
                  </td>
                `
              ))}
            </tr>
            `
          ))}
          </table>
        </div>
      </div>
    </div>
  `
}
