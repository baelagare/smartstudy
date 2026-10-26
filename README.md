# Acuity — Responsive Personalized Study Planner
> **Tagline:** Plan Smarter. Study Better. Clarity in Focus  
> **Academic Project:** Human–Computer Interaction (HCI) Prototype

---

## 1. Project Overview

**Acuity** is a personalized study-planning web application designed to help college students organize their academic coursework, prioritize looming deadlines, track study progress, and receive explainable, rule-based study recommendations.

This prototype implements core HCI usability heuristics, responsive layout patterns across mobile, tablet, and desktop viewports, and transparent personalization logic.

---

## 2. Technology Stack

- **Frontend Framework:** React 18 with Vite
- **Language:** Modern JavaScript (ES2022+ / JSX)
- **Styling:** Tailwind CSS (with bespoke academic color palette and dark mode)
- **Iconography:** Lucide React
- **Data Visualization:** Recharts (Course completion breakdown)
- **Data Persistence:** Browser `localStorage` (client-side, privacy-preserving)

---

## 3. Getting Started & Running Locally

### Prerequisites
- Node.js (v18, v20, v22, or v24)
- npm or yarn

### Installation

Clone or open the project folder in your terminal:

```bash
cd smartstudy
```

Install dependencies:
```bash
# Using npm
npm install

# Or using corepack / yarn
corepack yarn install
```

### Running Development Server

```bash
# Using npm
npm run dev

# Or using yarn
corepack yarn dev
```

Open your browser and navigate to:
```
http://localhost:5173/
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 4. Main Pages and Architecture

```
src/
├── components/
│   ├── ConfirmDialog.jsx      # Accessible safety confirmation modal
│   ├── EmptyState.jsx         # Informative empty states with contextual CTAs
│   ├── Header.jsx             # Sticky header with greeting, date, theme toggle, and Add Task CTA
│   ├── MobileNavigation.jsx   # Bottom tab bar and drawer navigation for touch devices
│   ├── ProgressChart.jsx      # Recharts bar chart for subject completion breakdown
│   ├── RecommendationCard.jsx # Renders rule-based study advice with rationale badges
│   ├── SearchAndFilters.jsx   # Multi-criteria search, filter, and sorting toolbar
│   ├── Sidebar.jsx            # Desktop & tablet navigation sidebar
│   ├── StudyTimerModal.jsx    # Interactive 25-minute Pomodoro study focus modal
│   ├── SummaryCard.jsx        # Workload metrics cards with semantic color themes
│   ├── TaskCard.jsx           # Interactive task item with quick complete and status dropdown
│   ├── TaskForm.jsx           # Accessible creation and editing modal with field validation
│   └── Toast.jsx              # Status feedback toast notifications
├── hooks/
│   ├── useLocalStorage.js    # Resilient local storage synchronization hook
│   └── useTasks.js           # Central task state management and operations
├── pages/
│   ├── Dashboard.jsx          # Executive workload overview and quick actions
│   ├── Tasks.jsx              # Comprehensive task management, search, and filters
│   ├── Planner.jsx            # Chronological study schedule with overload warnings
│   ├── Recommendations.jsx    # Transparent rule-based study suggestions engine
│   ├── Progress.jsx           # Completion rates, subject metrics, and encouragement
│   └── Settings.jsx           # Profile customization, theme toggle, and data reset
├── utils/
│   ├── dateUtils.js           # Date parsing, relative labels, and agenda grouping
│   ├── progressCalculations.js# Dynamic completion percentage and subject aggregations
│   ├── recommendations.js     # Rule-based heuristics for personalized study advice
│   ├── sampleData.js          # Realistic demo coursework tasks with dynamic dates
│   └── taskPriority.js        # Urgency scoring algorithm and sorting utilities
├── App.jsx                    # Root state coordinator and layout shell
├── index.css                  # Tailwind directives and accessible focus rings
└── main.jsx                   # React DOM entrypoint
```

---

## 5. HCI Principles Demonstrated

### 1. Visibility of System Status (Nielsen Heuristic #1)
- **Dynamic Dashboard Metrics:** Total, Pending, Completed, and Overdue cards instantly reflect task mutations.
- **Visual Progress Ring & Bar:** Live completion percentage calculated directly from task state.
- **Action Feedback (Toasts):** Creating, updating, deleting, or completing a task triggers an immediate, non-intrusive feedback toast.
- **Focus Timer:** Real-time circular countdown indicating elapsed and remaining study time.

### 2. Consistency and Standards (Nielsen Heuristic #4)
- Consistent visual language across all pages (Indigo primary, soft violet accent, slate text, semantic status badges).
- Recognized standard conventions: checkboxes for completion, trash icons for deletion, pencil icons for editing, and standard date input controls.

### 3. Recognition Rather than Recall (Nielsen Heuristic #6)
- Filter dropdowns visibly list statuses, priorities, and task types so users don't have to remember query parameters.
- Recommendations provide explicit rationale tags (`"Approaching High-Priority Deadline"`, `"Overdue Attention"`, `"Cognitive Load Reduction"`) explaining *why* a suggestion is surfaced.

### 4. User Control and Freedom (Nielsen Heuristic #3)
- Users can toggle completed tasks back to pending if clicked by mistake.
- Easy cancellation of forms and modal dialogs with Escape key, backdrop clicks, or explicit Cancel buttons.
- Full control over local data: option to clear all tasks or restore sample demo tasks.

### 5. Error Prevention & Constructive Recovery (Nielsen Heuristics #5 & #9)
- **Destructive Action Safety:** Deleting a task or clearing local data triggers an accessible `ConfirmDialog`.
- **Inline Form Validation:** Real-time error messages appear directly below invalid fields (e.g., empty title, missing due date, duration `<= 0`).

### 6. Flexibility and Efficiency of Use (Nielsen Heuristic #7)
- Multi-criteria sorting: Smart Priority (considers urgency, course weight, and overdue status), deadline chronological order, or priority level.
- Quick "Study" action on task cards to instantly jump into a timed focus session.

### 7. Aesthetic and Minimalist Design (Nielsen Heuristic #8)
- Clean, focused typography with comfortable reading line widths and subtle elevation.
- Avoids unnecessary animations or visual clutter that distract students from academic tasks.

### 8. Accessibility & Responsive Usability
- Semantic HTML tags (`<header>`, `<main>`, `<aside>`, `<nav>`, `<article>`, `<section>`).
- Associated `<label>` elements with form inputs via `htmlFor` and `id`.
- Touch targets designed to exceed 44 × 44 CSS pixels on mobile screens.
- Screen widths tested: 375px (iPhone SE), 390px (iPhone 14/15), 768px (iPad portrait), 1024px (iPad landscape / laptop), and 1440px (desktop).

---

## 6. Prototype Scope and Limitations

### Implemented in this Prototype (50% Core Scope)
✅ Complete multi-page responsive interface and navigation  
✅ Full task management (Create, Read, Update, Delete, Toggle Complete, Status Change)  
✅ Browser `localStorage` persistence  
✅ Dynamic calculations for dashboard statistics and progress charts  
✅ Rule-based personalized study recommendation engine with explainable rationales  
✅ Chronological study agenda with deadline overload warnings  
✅ Focus study timer modal with Pomodoro presets (15m, 25m, 45m, 60m)  
✅ Light and dark theme toggle with system persistence  
✅ Student profile customization and sample demo data management  

### Reserved for Future Iterations
⏳ Multi-user cloud authentication and backend database sync  
⏳ Machine learning / LLM integration for automated syllabus parsing  
⏳ Push notifications and calendar export (.ics / Google Calendar)  
⏳ Peer study groups and collaborative milestone sharing  

---

## 7. Verification Checklist

1. [x] Application builds and runs with zero terminal errors (`yarn build` & `yarn dev`).
2. [x] Dashboard summary values dynamically match active task counts.
3. [x] Creating, editing, or deleting a task updates all charts and agenda timelines.
4. [x] Completing a task strikes through the title and recalculates the completion rate.
5. [x] Search, multi-filtering, and sorting work seamlessly.
6. [x] Recommendations update based on actual task deadlines and priorities.
7. [x] Data remains intact after a browser refresh.
8. [x] Theme preference and display name persist across browser sessions.
9. [x] Empty states render cleanly when all tasks are removed or completed.
10. [x] Mobile drawer and bottom tab bar adapt cleanly on screens under 768px.
