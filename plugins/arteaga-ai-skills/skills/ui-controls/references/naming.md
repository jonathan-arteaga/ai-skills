# Naming map

Same control, different systems. Use the local product name when one exists. Otherwise use the default in the first column.

## Status, labels, and compact marks

| Default | Also called | Job |
| --- | --- | --- |
| Label | Form label | Names an input. Not decorative. |
| Badge | Lozenge, status, pill | System metadata on an object. Short, not a button. |
| Tag | Chip (removable), pill | User-created or user-removable category. |
| Chip | Filter chip, pill | Toggleable or dismissible filter value. |
| Count badge | Notification badge | Numeric count on another control. Not a status label. |

Pill is a shape, not a component. A Badge, Tag, or Chip can be pill-shaped. Name the job first, radius second.

## Structure

| Default | Also called | Job |
| --- | --- | --- |
| Header | App bar, top bar, navbar, page header | Persistent chrome for the page or app. |
| Heading | Title, section header | Typography that introduces a section. |
| Toolbar | Action bar | Actions for the current view. |
| Sidebar | Nav rail, side nav | Persistent secondary navigation. |
| Breadcrumb | Breadcrumb trail | Path back through hierarchy. |
| Tabs | Tablist | Switch panels of related content in place. |
| Accordion | Disclosure, collapse | Reveal extra content under a heading. |

Header is chrome. Heading is type. A page can have both.

## Choosing a value

| Default | Also called | Job |
| --- | --- | --- |
| Select | Dropdown, pick list, native select | Pick one (or many) from a known, bounded list. |
| Combobox | Autocomplete, typeahead | Type or pick. List can be long or remote. |
| Dropdown menu | Action menu, overflow menu | Commands, not a form value. |
| Radio group | Segmented control (few options) | Pick one, all options visible. |
| Checkbox group | Multi-select list | Pick many, all options visible. |
| Switch | Toggle | Instant on/off of a setting. Not a form submit. |

"Pick list" is not a component. Map it to Select, Combobox, Radio group, or Dropdown menu by asking whether the user is setting a value or running a command.

## Collections

| Default | Also called | Job |
| --- | --- | --- |
| List | Resource list, collection | Scan or act on items. One primary object per row. |
| Table | Data table, index table | Compare attributes across rows. Sorting and columns earn their keep. |
| Card | Tile | One object as a standalone unit. Weak for comparison. |
| Tree | Tree view | Nested hierarchy the user expands. |
| Pagination | Pager | Move through a known result set. |

## Lookup

When the local system uses an unfamiliar name, search [The Component Gallery](https://component.gallery/components/) by alias before inventing a new one.
