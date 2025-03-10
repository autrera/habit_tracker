import { createSignal, createEffect, Switch, Match } from "https://esm.sh/solid-js@1.8.1";
import html from "https://esm.sh/solid-js@1.8.1/html";

export default function DailyCheck(props) {
  const [check, setCheck] = createSignal(props.checked);

  createEffect(() => {
    console.log(props);
  }, [props.checks]);

  const handleCheck = () => {
    if (check()) {
      props.onUncheck;
    } else {
      props.onCheck;
    }
    setCheck(!check());
  }

  return html`
    <div class="daily-check" onClick=${() => handleCheck()}>
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
