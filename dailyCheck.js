import { createSignal, createEffect, Switch, Match } from "./solid/solid.js";
import html from "./solid/html.js";

export default function DailyCheck(props) {
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
    <div class="daily-check" onClick=${() => handleCheck()}>
      <${Switch}>
        ${() => html`
          <${Match} when=${check() == true}>
            <svg class="checked" style=${"color: " + props.color} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#ddd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <//>
        `}
        ${() => html`
          <${Match} when=${check() == false}>
            <svg class="unchecked" style=${"color: " + props.color} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#ddd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <//>
        `}
      <//>
    </div>
  `;
}
