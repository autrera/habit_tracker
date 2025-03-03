import { createSignal, createEffect, Switch, Match } from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";

export default function HabitCheck(props) {

  return html`
    <div class="habitCheck">
      <${Switch}>
        <${Match} when=${props.checked == true}>
          <span class="checked">&nbsp;</span>
        <//>
        <${Match} when=${props.checked == false}>
          <span class="unchecked">&nbsp;</span>
        <//>
      <//>
    </div>
  `
}
