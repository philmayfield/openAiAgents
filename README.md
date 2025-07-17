# OpenAI Agents

A full-stack web application with Angular frontend and NestJS backend, featuring some goofy AI features using OpenAI Agents.

## Architecture

- **Frontend**: Angular 20 application with a few features
- **Backend**: NestJS API with OpenAI Agents integration
- **AI Features**: Automated research with planning, web search, and report generation

## Prerequisites

You will need an OpenAI API key. You can get one at the [OpenAI platform](https://platform.openai.com/) website. Once you have your API key, you can do one of two things.

1. Add it to a `.env` file in the `backend/` directory.

```
OPENAI_API_KEY=sk-your-actual-key-here
```

2. Set the environment variable in your terminal:

```bash
export OPENAI_API_KEY=sk-your-actual-key-here
```

## Development Setup

### Backend (NestJS)

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start:dev
```

The backend API will run on `http://localhost:3001`

### Frontend (Angular)

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ng serve
```

The frontend will run on `http://localhost:4200` and automatically reload when you modify source files.

## Features

### Research Agent

- **AI-Powered Research**: Automatically plans and executes web searches
- **Real-time Streaming**: Live status updates with progress tracking
- **Multi-stage Process**: Planning → Searching → Report Writing
- **Markdown Output**: Structured research reports

### Chat Agent

- **Joke Generation**: Specialized joke-telling functionality

## API Endpoints

### Backend API (`http://localhost:3001`)

- `POST /api/research` - Perform research (traditional)
- `GET /api/research/stream` - Stream research progress (SSE)
- `POST /api/chat/joke` - Generate jokes

## Building

### Frontend

```bash
cd frontend
ng build
```

### Backend

```bash
cd backend
npm run build
```

## Technology Stack

- **Frontend**: Angular 20, Angular Material, RxJS, Server-Sent Events
- **Backend**: NestJS, TypeScript, OpenAI Agents (@openai/agents)
- **AI**: OpenAI GPT models with structured output and function calling
