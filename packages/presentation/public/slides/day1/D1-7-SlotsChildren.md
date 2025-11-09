## D1.7: Slots vs. Children (Time: 15 mins)

branch: day-1/06-slots-vs-children

### Concept: Content Projection

How do we pass _content_ (like HTML or other components) _into_ a component?

| Framework | Syntax             | Common Use                           |
| :-------- | :----------------- | :----------------------------------- |
| **Vue**   | `<slot />`         | Passing icons, text, or layout.      |
| **React** | `{props.children}` | The standard way to wrap components. |

---

### Your Task

Modify your **Button** in both projects to accept an optional icon (e.g., an - emoji) as a slot/child, appearing _before_ the label text.
