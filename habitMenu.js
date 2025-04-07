import {
  createSignal,
  createEffect,
  onCleanup,
  Switch,
  Match,
} from "./solid/solid.js";
import html from "./solid/html.js";

export default function HabitMenu(props) {
  const [show, setShow] = createSignal(false);

  createEffect(() => {
    const rootElement = document.getElementById("app");
    const callback = () => {
      setShow(false);
    };
    if (show() == true) {
      const event = rootElement.addEventListener("click", callback);
    }
    onCleanup(() => rootElement.removeEventListener("click", callback));
  }, [show]);

  return html`
    <div
      class="habit-menu-launcher"
      onClick=${() => {
        setShow(true);
      }}
    >
      <svg
        class="habit-menu-launcher__icon"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path
          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
        />
      </svg>
      <${Switch}>
        ${() => html`
          <${Match} when=${show() == true}>
            <ul class="habit-menu">
              ${() => props.children}
            </ul>
          <//>
        `}
      <//>
    </div>
  `;
}
