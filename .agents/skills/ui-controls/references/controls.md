# Control rules

Read only the family in play.

## Label

Use when an input needs a visible name.

- One Label per input. Keep it a noun, not a hint.
- Helper text and error text are separate. Do not cram them into the Label.
- Placeholder is not a Label. Placeholders disappear.

Do not use a Heading as a Label. Do not use a Badge as a Label.

## Badge, Tag, Chip

Use Badge for system state the user does not edit (Paid, Failed, Admin).
Use Tag or Chip when the user applied the value and can remove it (filter "Status: Open").

- One short word or two. Sentence case unless the product already uses title case for status.
- Color is backup. The text has to work in monochrome.
- Do not make a Badge a button. If it opens a menu, it is a Chip or a menu trigger.
- In a Table, Badge lives in a status column. It is not the row title.

## Header vs Heading

Header wraps the page or app: title, primary action, search, nav.
Heading is the text that starts a section.

- One page Header. Many Headings.
- Heading level follows document order. Do not skip levels to change size.
- A section of cards or a table still needs a Heading or a Header action that names the set.

## Select, Combobox, Dropdown menu

Ask two questions: is this a value, and can the user type?

| Situation | Control |
| --- | --- |
| Bounded list, under ~10 options, value required | Select, or Radio group if space allows |
| Bounded list, long or searchable | Combobox |
| User may enter a value not in the list | Combobox |
| Trigger reveals commands (Edit, Delete, Share) | Dropdown menu |
| Two to five mutually exclusive view modes | Segmented control |

Do not use a Dropdown menu as a form field. Do not use a Select for commands.

## List vs Table

Use a List when the user scans, selects, or opens one object.
Use a Table when the user compares the same attributes across many objects.

- A Table that only shows a title and one Badge is a List wearing columns.
- Numeric columns right-align. Text columns left-align.
- Row actions stay off the data until selection or hover/focus needs them.
- Empty, loading, and error states are part of the control. Design them with the Table, not after.

## Filters

Applied filters render as dismissible Chips or Tags, not as a paragraph of text.
The filter builder can be a Select or Combobox. The applied state is the Chip.
