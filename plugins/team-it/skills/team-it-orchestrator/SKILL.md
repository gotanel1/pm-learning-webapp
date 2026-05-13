---
name: team-it-orchestrator
description: Coordinate a cross-functional IT delivery workflow across PM, analyst, architect, frontend, backend, QA, and deploy roles. Use when Codex needs to turn a request into phased execution, role handoffs, ownership, deliverables, and a practical end-to-end plan.
---

# Team IT Orchestrator

Turn a user request into a delivery flow that can be handed to the rest of the Team IT skills.

## Workflow

1. Clarify the business goal, users, timeline, and constraints from the prompt and available repo context.
2. Split the work into phases: discovery, design, build, test, release.
3. Assign each phase to the most relevant role skill.
4. Define expected outputs for every handoff before moving to the next role.
5. Surface missing dependencies, risks, and release blockers early.

## Role Routing

- Use `it-project-manager` for scope, milestones, priorities, and stakeholder alignment.
- Use `it-business-analyst` for user stories, acceptance criteria, and process detail.
- Use `it-solution-architect` for technical design, system boundaries, and integration choices.
- Use `it-tech-lead` for implementation direction, task breakdown, coding standards, and technical execution decisions.
- Use `it-frontend-developer` for UI implementation, client behavior, and usability details.
- Use `it-backend-developer` for APIs, data flow, services, and server-side changes.
- Use `it-qa-tester` for test design, bug finding, regression coverage, and release readiness.
- Use `it-devops-deploy` for environments, CI/CD, deployment steps, rollback, and observability.

## Output Shape

Provide:

- Delivery goal
- Phase-by-phase owner
- Inputs and outputs for each role
- Risks and assumptions
- Recommended next role to activate first
