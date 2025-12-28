# NestJS Hexagonal API

A backend API built with **NestJS** following **Hexagonal Architecture (Ports & Adapters)** principles.

This project focuses on **clear separation of concerns**, **domain isolation**, and **testable application design**.

---

## Overview

This project demonstrates how to structure a NestJS application using Hexagonal Architecture to keep
the core business logic independent from frameworks, databases, and external services.

- The main goals are:
- Easy and fast unit testing
- Clear and explicit business rules
- Infrastructure-agnostic domain layer
- Maintainable and extensible codebase

---

## Architecture

The application is structured around **Hexagonal Architecture**, also known as **Ports & Adapters**.

### Layers

- **Domain**
  - Contains entities and domain-specific exceptions
  - Defines repository interfaces (ports)
  - Has no dependency on NestJS or infrastructure

- **Application**
  - Implements use cases as services
  - Depends only on domain abstractions
  - Fully unit tested with mocked ports

- **Infrastructure**
  - Implements adapters such as Prisma repositories
  - Handles persistence and external systems

- **Delivery (HTTP)**
  - Controllers act as inbound adapters
  - Global exception filters and validation pipes handle cross-cutting concerns

Infrastructure details never leak into the domain.

---

## Key Concepts

- Domain-driven entities and value objects
- Application services as use cases
- Repository pattern via ports
- Explicit domain exceptions
- Dependency inversion using interfaces
- Unit testing with mocked adapters

---

## Tech Stack

- **NestJS**
- **TypeScript**
- **Jest** (unit & service tests)
- **Node.js**
- **Prisma**
- **Zod** (validation)

---

## Project Structure

```text
src/
├── common/                 # Cross-cutting concerns
│   ├── exceptions/         # Domain-level exceptions
│   ├── filters/            # HTTP, domain & Prisma exception filters
│   └── pipes/              # Zod validation pipes
│
├── word/                   # Feature / Bounded Context
│   ├── domain/             # Core business logic
│   │   ├── entity.ts
│   │   └── repository.ts  # Port
│   │
│   ├── services/           # Application services (use cases)
│   │   ├── *.service.ts
│   │   └── *.spec.ts       # Unit tests
│   │
│   ├── infra/              # Infrastructure adapters
│   │   └── prisma-word.repository.ts
│   │
│   ├── word.controller.ts # HTTP adapter
│   ├── word.dto.ts
│   └── word.module.ts
│
└── main.ts                 # Application bootstrap

```

## Testing

The project includes unit tests for application services.

- Repositories are mocked
- Tests focus on business behavior
- No database or framework dependency in tests

## Running the Project

```bash
yarn install
yarn run start:dev
```

To run test

```bash
yarn test
```

## Design Decisions & Trade-offs

- **Validation**
  - Request validation is implemented using **Zod** via custom pipes.
  - This keeps validation schemas explicit and framework-agnostic.
  - Alternatively, `class-validator` could be used for tighter NestJS and Swagger integration.

- **Serialization**
  - `ClassSerializerInterceptor` is intentionally not used.
  - Domain entities are treated as internal models and are never exposed directly via HTTP.
  - Responses are explicitly shaped to avoid leaking domain or persistence details.
  - NestJS serialization via `ClassSerializerInterceptor` is documented here:
    https://docs.nestjs.com/techniques/serialization

- **Read Operations**
  - For list/read-only operations (e.g. `findAll`), database rows are returned instead of domain entities.
  - This avoids unnecessary domain instantiation and keeps read paths simple and performant.

- **Deletion Strategy**
  - The application uses **hard deletes** intentionally.
  - Soft delete was deliberately avoided to keep the domain model simple and focused.
  - There are no audit, recovery, or regulatory requirements in this domain that justify soft deletion.
  - The deletion strategy can be easily changed at the infrastructure level if business requirements evolve.
