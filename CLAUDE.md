# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack web application with Angular frontend and NestJS backend, both using TypeScript. The project uses OpenAI Agents library for AI-powered chat functionality.

```
openAiAgents/
├── frontend/           # Angular 20 frontend application
│   ├── src/app/
│   │   ├── chat/       # Chat component for AI conversations
│   │   ├── tell-joke/  # Joke component using OpenAI agents
│   │   └── shared/     # Shared services (chat service)
│   └── package.json
├── backend/            # NestJS backend API
│   ├── src/
│   │   ├── chat/       # Chat module with OpenAI agents integration
│   │   └── app.module.ts
│   └── package.json
└── public/             # Static assets
```

## Development Commands

### Frontend (Angular)

Run commands from the `/frontend` directory:

- `npm start` or `ng serve` - Start development server on http://localhost:4200
- `npm run build` or `ng build` - Build for production
- `npm test` or `ng test` - Run unit tests with Karma
- `ng generate component <name>` - Generate new component
- `ng generate --help` - List available schematics

### Backend (NestJS)

Run commands from the `/backend` directory:

- `npm run start:dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run build` - Build the application

## Architecture Notes

### TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Frontend

- Uses Angular 20 with Material UI components (magenta-violet theme)
- SCSS for styling
- Standalone components architecture
- Chat functionality integrates with backend API
- Uses RxJS for reactive programming
- Uses Angular Material for UI components

#### Angular Best Practices

- Always use standalone components over NgModules
- Don't use explicit `standalone: true` (it is implied by default)
- Use signals for state management
- Implement lazy loading for feature routes
- Use `NgOptimizedImage` for all static images.

#### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Important: Do NOT use `ngClass`, use `class` bindings instead
- Important: Do NOT use `ngStyle`, use `style` bindings instead

#### State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable

#### Templates

- Keep templates simple and avoid complex logic
- Important: Do NOT use `*ngIf`, `*ngFor`, `*ngSwitch`
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Always add one blank line between sibling elements in html files

#### UI components

- Avoid custom and inline styles when possible
- Use Angular's built-in components when possible
- Use Angular Material components when possible, for example use:
  - `MatCard` for cards
  - `MatButton` for buttons
  - `MatIcon` for icons
  - etc.

#### Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Do not use the constructor to inject services, instead use the `inject()` function

### Backend

- NestJS framework with Express platform
- OpenAI Agents library (@openai/agents) for AI functionality
- ConfigModule for environment variable management
- Modular architecture with separate chat module
- Uses withTrace for workflow tracing

### Key Integration Points

- Frontend chat service communicates with backend chat controller
- Backend uses OpenAI Agents for AI-powered responses
- Environment variables needed for API keys (create .env in backend/)

## OpenAI Agents Integration

The project uses `@openai/agents` library version 0.0.11 for AI functionality:

- Agent creation with custom instructions
- Workflow tracing with `withTrace`
- Error handling for agent responses
- Located in `backend/src/chat/chat.service.ts`

## Testing

- Frontend: Karma with Jasmine
- TypeScript configuration files for different environments
- Test files follow `.spec.ts` naming convention
