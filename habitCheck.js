import { createSignal, createEffect, Switch, Match } from "./solid/solid.js";
import html from "./solid/html.js";

export default function HabitCheck(props) {
  const [check, setCheck] = createSignal(props.checked);

  const handleCheck = () => {
    if (check()) {
      props.onUncheck;
    } else {
      props.onCheck;
    }
    setCheck(!check());
  };

  return html`
    <div class="habit-check" onClick=${() => handleCheck()}>
      <${Switch}>
        ${() => html`
          <${Match} when=${check() == true}>
            <span
              title=${props.date}
              class="checked"
              style=${"background: " + props.color}
              >&nbsp;</span
            >
          <//>
        `}
        ${() => html`
          <${Match} when=${check() == false}>
            <span
              title=${props.date}
              class="unchecked"
              style=${"background: " + props.color}
              >&nbsp;</span
            >
          <//>
        `}
      <//>
    </div>
  `;
}
