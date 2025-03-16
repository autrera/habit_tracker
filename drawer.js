import { createSignal, createEffect } from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";

export default function Drawer(props) {

  return html`
    <div class="drawer">
      <div class="drawer__backdrop" onClick=${() => props.onClose()}>
        &nbsp;
      </div>
      <div class="drawer__content">
        ${() => props.children}
      </div>
    </div>
  `
}
