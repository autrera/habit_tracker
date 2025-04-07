import { createSignal, createEffect } from "./solid/solid.js";
import html from "./solid/html.js";

export default function Drawer(props) {
  createEffect(() => {
    props.onOpen;
  });

  return html`
    <div class="drawer">
      <div class="drawer__backdrop" onClick=${() => props.onClose}>&nbsp;</div>
      <div class="drawer__content">${() => props.children}</div>
    </div>
  `;
}
