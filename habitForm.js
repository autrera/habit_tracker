import { createSignal, createEffect } from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";
import Drawer from "/drawer.js";

export default function HabitForm(props) {
  const [title, setTitle] = createSignal(props.title);
  const [color, setColor] = createSignal(props.color);

  return html`
    <${Drawer}
      onOpen=${() => document.getElementById("habit-form__name").focus()}
      onClose=${() => props.onClose}
    >
      <div class="habit-form">
        <div class="habit-form__input">
          <label for="habit-form__name">Name</label>
          <input
            id="habit-form__name"
            class="app__input"
            type="text"
            value=${() => title()}
            onInput=${(e) => {
              setTitle(e.currentTarget.value);
            }}
            placeholder="Add new habit"
          />
        </div>
        <div class="habit-form__input">
          <label for="habit-form__color">Color</label>
          <input
            id="habit-form__color"
            class="app__input"
            type="text"
            value=${() => color()}
            onInput=${(e) => {
              setColor(e.currentTarget.value);
            }}
            placeholder="Add new habit color"
          />
        </div>
        <div style="text-align: right">
          <button onClick=${() => props.onClose}>Close</button>
          &nbsp;
          <button
            class="action"
            onClick=${() => props.onSubmit({ title: title(), color: color() })}
          >
            ${props.title == "" ? "Add" : "Update"}
          </button>
        </div>
      </div>
    <//>
  `;
}
