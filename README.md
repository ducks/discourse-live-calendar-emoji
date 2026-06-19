# Live Calendar Emoji

A Discourse theme component that renders the 📅 calendar emoji as a small
Apple-style calendar icon showing **today's real date** — the way the
Calendar app icon on iOS/macOS always shows the current day.

Type 📅 (the `:date:` emoji) anywhere in a post and it renders as a live
calendar icon. The date is computed in the browser at render time, so it
always shows today regardless of when the post was written.

![example](https://github.com/ducks/discourse-live-calendar-emoji)

## How it works

Discourse cooks 📅 into `<img class="emoji" alt=":date:">`. This component
registers a `<calendar-icon>` custom element and, on every cooked post,
swaps those emoji images for a live-date SVG. No server-side changes — it's
a pure client-side theme component.

## Settings

| Setting | Default | Description |
| ------- | ------- | ----------- |
| `show_current_date` | `true` | Replace 📅 with the live icon. Off = normal emoji. |
| `icon_size` | `1.2em` | CSS size of the rendered icon; scales with text. |

## Notes

- It only targets the desk-calendar emoji 📅 (`:date:`), not `:calendar:`.
- By design the icon shows *today*, not the post's date — that's the
  Apple-icon effect. A post from last week still shows today.

## Install

Admin → Customize → Themes → Install → From a git repository, then add it
as a component to your theme.
