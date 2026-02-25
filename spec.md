# Functional Requirements Specification: VibeSlides MVP

## 1. Objective & Context
A premium, web-based presentation builder inspired by Codrops' Index 4 layout. The goal is to provide a "presentation-as-an-experience" where high-fidelity transitions meet structured content (Markdown + Mermaid).

## 2. User Roles
| Role | Permissions |
| :--- | :--- |
| **Viewer** | Access public presentation URL, navigate slides via scroll/drag/keys. |
| **Admin** | Access `/admin` via password `theDatum2026!`. Create/Update/Delete/Reorder slides, upload logo, edit markdown content. |

## 3. Core Entities
### Presentation Config
- **Logo**: URL/Blob string.
- **Global Theme**: Google Sans Flex (Variable).

### Slide
- **Title**: String (Displayed top-right).
- **Content**: Markdown-ready string (Supporting Mermaid syntax).
- **Background**: Image URL (Full-screen coverage).
- **OrderIndex**: Number (For sequencing).

## 4. User Flows
1. **The Viewer Flow**: Landing -> First Slide -> Scroll/Drag down -> Transition Animation (Clip-path/Scale) -> Next Slide.
2. **The Admin Entry**: Visit `/admin` -> Password Prompt -> Validation -> Dashboard.
3. **The Slide Editor**: Click "Edit Slide" -> Markdown Editor side-by-side with Preview -> "Save" -> Immediate Update.
4. **The Reorder Flow**: Drag-and-drop slide cards in Admin Dashboard to update `OrderIndex`.

## 5. UI Inventory
| Component | Purpose | States |
| :--- | :--- | :--- |
| `PresentationEngine` | High-fidelity slideshow wrapper | Loading, Active, Transitioning |
| `SlideFrame` | Individual slide content renderer | MD Render, Mermaid Render |
| `AdminHeader` | Persistent logo/slide info (top bar) | Dynamic Text, Logo Placeholder |
| `EditorCanvas` | Side-by-side MD editor | Syncing, Saved, Error |
| `PasswordGate` | Fixed-string auth overlay | Locked, Access Granted, Denied |
| `SortableSlideList` | Drag-and-drop dashboard view | Idle, Dragging, Reordering |