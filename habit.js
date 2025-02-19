import { createSignal, createEffect } from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";
import { getDateRange } from './utilities.js';

export default function Habit(props) {
  const dateRange = getDateRange(5).reverse(); 
  const [checks, setChecks] = createSignal([]);

  createEffect(() => {
    const checksDates = [];
    props.checks().forEach(check => {
      if(check.habit_id == props.data.id) {
        checksDates.push(check.date);
      }
    });
    setChecks(checksDates);
  });

  return html`
    <li>
      ${props.data.title}<a onClick=${() => props.onRemove(props.data.id)}>[ X ]</a>
      ${() => dateRange.map(date => (
        html`<input type="checkbox" value=${date} checked=${checks().includes(date)} onClick=${() => props.onCheck(date, props.data.id)} />`
      ))}
    </li>
  `
}

