import { apiInitializer } from "discourse/lib/api";

// A self-contained <calendar-icon> custom element: an Apple-style calendar
// SVG that defaults to *today's* real date, recomputed each render. month/
// day/size are overridable but we rely on the live defaults here.
function defineCalendarIcon() {
  if (window.customElements.get("calendar-icon")) {
    return;
  }

  class CalendarIcon extends HTMLElement {
    static get observedAttributes() {
      return ["month", "day", "size"];
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    get month() {
      return (
        this.getAttribute("month") ||
        new Date().toLocaleString("en-US", { month: "short" }).toUpperCase()
      );
    }

    get day() {
      return this.getAttribute("day") || String(new Date().getDate());
    }

    render() {
      const size = this.getAttribute("size") || "1em";
      this.shadowRoot.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"
             width="${size}" height="${size}" role="img"
             style="vertical-align: text-bottom"
             aria-label="${this.month} ${this.day}">
          <rect x="8" y="24" width="104" height="88" rx="8" ry="8"
                fill="#fff" stroke="#e0e0e0" stroke-width="2"/>
          <rect x="8" y="24" width="104" height="28" rx="8" ry="8"
                fill="#ea4335"/>
          <rect x="8" y="40" width="104" height="12" fill="#ea4335"/>
          <rect x="34" y="18" width="8" height="18" rx="4" ry="4"
                fill="#b0b0b0"/>
          <rect x="78" y="18" width="8" height="18" rx="4" ry="4"
                fill="#b0b0b0"/>
          <text x="60" y="46" text-anchor="middle"
                font-family="Helvetica, Arial, sans-serif"
                font-weight="700" font-size="14"
                fill="#fff">${this.month}</text>
          <text x="60" y="96" text-anchor="middle"
                font-family="Helvetica, Arial, sans-serif"
                font-weight="700" font-size="48"
                fill="#333">${this.day}</text>
        </svg>
      `;
    }
  }

  window.customElements.define("calendar-icon", CalendarIcon);
}

export default apiInitializer("1.8.0", (api) => {
  if (!settings.show_current_date) {
    return;
  }

  defineCalendarIcon();

  // Discourse cooks 📅 into <img class="emoji" alt=":date:">. Swap each one
  // for a live <calendar-icon>. Runs on every cooked post render.
  api.decorateCookedElement(
    (element) => {
      const emojis = element.querySelectorAll('img.emoji[alt=":date:"]');
      emojis.forEach((img) => {
        const icon = document.createElement("calendar-icon");
        icon.setAttribute("size", settings.icon_size);
        icon.className = "live-calendar-emoji";
        img.replaceWith(icon);
      });
    },
    { id: "live-calendar-emoji" }
  );
});
