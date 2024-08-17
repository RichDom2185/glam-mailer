import { _Object } from "../../../../utils/types";
import autocomplete from "./autocomplete.json";
import keymap from "./keymap.json";

// TODO: Address scraper warnings manually
// Warning: /docs/container has a row with 3 cells instead of 2.
// Warning: /docs/text-color has a row with 3 cells instead of 2.
// Warning: /docs/background-color has a row with 3 cells instead of 2.
// Warning: /docs/gradient-color-stops has a row with 3 cells instead of 2.
// Warning: /docs/border-color has a row with 3 cells instead of 2.
// Warning: /docs/divide-color has a row with 3 cells instead of 2.
// Warning: /docs/cursor has a row with 3 cells instead of 2.

export const TAILWIND_CLASSES_AUTOCOMPLETE: ReadonlyArray<{
  group: string;
  items: string[];
}> = _Object.entries(keymap).flatMap(([href, label]) => {
  switch (href) {
    case "/docs/container":
    case "/docs/text-color":
    case "/docs/background-color":
    case "/docs/gradient-color-stops":
    case "/docs/border-color":
    case "/docs/divide-color":
    case "/docs/cursor":
      return [];
  }
  return [{ group: label, items: Object.keys(autocomplete[href]) }];
});
