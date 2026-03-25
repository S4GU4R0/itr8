# AI Agents Coordination Guide

This document serves as a comprehensive guide for AI agents working on the ITR8 project. It outlines agent roles, interaction protocols, performance expectations, and escalation procedures.

## Agent Roles Overview

| Agent | Primary Responsibilities | Key Performance Indicators |
|-------|------------------------|----------------------------|
| **plan** | Generate implementation roadmaps, create structured plans | • Plan completeness (≥ 95% coverage)<br>• Target file correctness<br>• Plan generation time (< 30s) |
| **code-review** | Review code modifications for correctness, style, and security | • Issue detection rate (≥ 90% of defects)<br>• Review turnaround (< 60s) |
| **explore** | Gather contextual information from codebase/external resources | • Context accuracy<br>• Retrieval speed (< 2s) |
| **document-writer** | Generate project documentation following standards | • Documentation completeness<br>• Style adherence |
| **test-writer** | Create comprehensive test suites | • Test coverage<br>• CI pass rate |
| **coding** | Execute implementation tasks (code modifications) | • Code correctness<br>• Performance impact assessment<br>• Style compliance |
| **agent-self-improver** | Reflect on performance, propose improvements | • Improvement acceptance rate<br>• Configuration efficacy |
| **assumption-validator** | Verify project assumptions/requirements | • Assumption accuracy<br>• Stakeholder confirmation |
| **output-validator** | Verify outputs meet expectations | • Correctness score<br>• User confirmation rate |
| **plan-execution** | Execute approved plans and track progress | • Task completion rate<br>• On-time delivery |

## Interaction Protocol

1. **Task Delegation Workflow**
   - User request → `plan` creates implementation plan
   - Based on plan, delegate to appropriate agents
   - Validate outputs using appropriate agents
   - Mark task as completed when criteria met

2. **Agent Communication**
   - Use `callAgent` for delegation with clear `task`, `context`, and `targets`
   - For parallel execution, specify non-overlapping `targets`
   - Always provide complete `context` with necessary state

3. **Conflict Resolution**
   - Prioritize based on criticality (security > refactors)
   - Use `code-review` for conflict analysis
   - Resolve through iterative edits

## File Interaction Protocol

- Use `readFile` to preview before editing
- Use `writeFile` for new files, `editFile` for modifications
- Maintain code style and naming conventions
- Validate after each edit

## Performance Metrics

| Metric | Target | Responsible Agent |
|--------|--------|-------------------|
| Plan Accuracy | ≥ 95% | `plan` |
| Code Review Coverage | ≥ 90% defects detected | `code-review` |
| Test Coverage | ≥ 80% line coverage | `test-writer` |
| User Satisfaction | ≥ 4.5/5 | All agents |

## Governance Structure

- **AI Oversight Committee**: Quarterly performance reviews
- **Code Review Board**: PR-level approvals
- **Agent Improvement Panel**: Bi-monthly evaluation
- **User Feedback Forum**: Monthly satisfaction surveys

## Escalation Matrix

- Agent failures → `plan` → `agent-self-improver` → Human
- Critical bugs → `code-review` → `plan` → Human
- System-wide failures → Immediate Human Support

*Version: 1.0 - Last Updated: 2026-03-25*