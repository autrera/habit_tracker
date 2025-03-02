import { createSignal, createEffect } from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";
import { getDateRange, groupDatesByWeek } from './utilities.js';

export default function HabitMonthly(props) {
  const dateRange = getDateRange(35).reverse(); 
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

  const handleCheck = (event, date, habit_id) => {
    if (event.target.checked) {
      props.onCheck(date, habit_id);
    } else {
      props.onUncheck(date, habit_id);
    }
  }

  return html`
    <div class="habit-monthly__wrapper">
      <div class="habit-monthly">
        <div class="habit-monthly__name">
          ${props.data.title}<a onClick=${() => props.onRemove(props.data.id)}>[ X ]</a>
        </div>
        <div class="habit-monthly__days">
          <table>
          ${() => dateMap.map(group => (
            html`
            <tr>
              ${() => group.map(date => (
                html`
                  <td style="width: 10px">
                    <input type="checkbox" value=${date} checked=${checks().includes(date)} onClick=${(e) => handleCheck(e, date, props.data.id) } />
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
