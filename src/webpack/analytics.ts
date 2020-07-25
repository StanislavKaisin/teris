import * as $ from "jquery";

function createAnalitics(): object {
  let counter = 0;
  // to stop
  let isDestroyed: boolean = false;
  const listener = (): number => {
    return counter++;
  };
  // document.addEventListener("click", listener);
  $(document).on("click", listener);
  return {
    destroy() {
      // document.removeEventListener("click", listener);
      $(document).off("click", listener);
      isDestroyed = true;
    },
    getClicks() {
      if (isDestroyed) {
        return "Analytics is destroyed totally";
      }
      return counter;
    },
  };
}

window["analytics"] = createAnalitics();
