import {
  createSignal,
  createEffect,
  onCleanup,
  Switch,
  Match,
} from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";

export default function HabitMenu(props) {
  const [show, setShow] = createSignal(false);

  createEffect(() => {
    const callback = () => {
      setShow(false);
    };
    if (show() == true) {
      const event = document.addEventListener("click", callback);
    }
    onCleanup(() => document.removeEventListener("click", callback));
  }, [show]);

  return html`
    <div class="habit-menu">
      <svg
        onClick=${() => {
          setShow(true);
        }}
        class="habit-menu__launcher"
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
            <ul class="habit-menu__content">
              ${() => props.children}
            </ul>
          <//>
        `}
      <//>
    </div>
  `;
}
