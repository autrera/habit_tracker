import { createSignal, createEffect } from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";
import colors from "./colors.js";

export default function HabitColors(props) {
  const [currentColor, setCurrentColor] = createSignal(props.currentColor);

  const handleChangeColor = (color) => {
    setCurrentColor(color);
    props.onChange(color);
  };

  return html`
    <div class="habit-colors">
      ${() =>
        colors.map((color) => {
          return html`
            <div
              onClick=${() => handleChangeColor(color)}
              class=${currentColor() == color
                ? "habit-colors__color selected"
                : "habit-colors__color"}
              style=${"background: " + color}
            ></div>
          `;
        })}
    </div>
  `;
}
