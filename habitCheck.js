import { createSignal, createEffect, Switch, Match } from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";

export default function HabitCheck(props) {
  const [check, setCheck] = createSignal(props.checked);

  const handleCheck = () => {
    if (check()) {
      props.onUncheck;
    } else {
      props.onCheck;
    }
    setCheck(!check());
  }

  return html`
    <div class="habitCheck" onClick=${() => handleCheck()}>
      <${Switch}>
        ${() => (
          html`
            <${Match} when=${check() == true}>
              <span class="checked">&nbsp;</span>
            <//>
          `
        )}
        ${() => (
          html`
            <${Match} when=${check() == false}>
              <span class="unchecked">&nbsp;</span>
            <//>
          `
        )}
      <//>
    </div>
  `
}
