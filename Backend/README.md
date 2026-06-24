# Backend folder map

Only the existing backend files have been moved. The AI files are empty learning
placeholders; they are not connected to the application yet.

```text
src/
├── app.js
├── config/
│   ├── db.js
│   └── redis.js
├── modules/
│   ├── auth/       # auth controller, service, routes, middleware
│   ├── users/      # user controller, service, routes, model
│   ├── chats/      # chat controller, service, routes, model
│   ├── messages/   # message controller, service, routes, model
│   └── ai/         # future AI routes/controllers/orchestration
├── ai/
│   ├── embeddings/ # convert text into vectors
│   ├── vector-db/  # store and search vectors with Qdrant
│   ├── retrieval/  # find useful context for a question
│   ├── prompts/    # reusable prompt templates
│   └── gemini/     # communicate with Gemini
├── shared/
│   ├── cache/      # Redis helper functions
│   └── errors/     # shared service errors
└── workers/        # future background embedding jobs
```

The only required code changes are import paths caused by moving the existing
files and the `package.json` start path (`src/app.js`).
