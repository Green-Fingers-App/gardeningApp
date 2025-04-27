# GreenFingers Test Plan

## Table of contents

- [1. Introduction](#1-introduction)
  * [1.1 Purpose](#11-purpose)
  * [1.2 Scope](#12-scope)
  * [1.3 Intended Audience](#13-intended-audience)
  * [1.4 Document Terminology and Acronyms](#14-document-terminology-and-acronyms)
  * [1.5 References](#15-references)
  * [1.6 Document Structure](#16-document-structure)
- [2. Evaluation Mission and Test Motivation](#2-evaluation-mission-and-test-motivation)
  * [2.1 Background](#21-background)
  * [2.2 Evaluation Mission](#22-evaluation-mission)
  * [2.3 Test Motivators](#23-test-motivators)
- [3. Target Test Items](#3-target-test-items)
- [4. Outline of Planned Tests](#4-outline-of-planned-tests)
  * [4.1 Outline of Test Inclusions](#41-outline-of-test-inclusions)
  * [4.2 Outline of Other Candidates for Potential Inclusion](#42-outline-of-other-candidates-for-potential-inclusion)
  * [4.3 Outline of Test Exclusions](#43-outline-of-test-exclusions)
- [5. Test Approach](#5-test-approach)
  * [5.1 Initial Test-Idea Catalogs and Other Reference Sources](#51-initial-test-idea-catalogs-and-other-reference-sources)
  * [5.2 Testing Techniques and Types](#52-testing-techniques-and-types)
    + [5.2.1 Data and Database Integrity Testing](#521-data-and-database-integrity-testing)
    + [5.2.2 Functional Testing](#522-functional-testing)
    + [5.2.3 Business Cycle Testing](#523-business-cycle-testing)
    + [5.2.4 User Interface Testing](#524-user-interface-testing)
    + [5.2.5 Performance Profiling](#525-performance-profiling)
    + [5.2.6 Load Testing](#526-load-testing)
    + [5.2.7 Stress Testing](#527-stress-testing)
    + [5.2.8 Volume Testing](#528-volume-testing)
    + [5.2.9 Security and Access Control Testing](#529-security-and-access-control-testing)
    + [5.2.10 Failover and Recovery Testing](#5210-failover-and-recovery-testing)
    + [5.2.11 Configuration Testing](#5211-configuration-testing)
    + [5.2.12 Installation Testing](#5212-installation-testing)
- [6. Entry and Exit Criteria](#6-entry-and-exit-criteria)
  * [6.1 Test Plan](#61-test-plan)
    + [6.1.1 Test Plan Entry Criteria](#611-test-plan-entry-criteria)
    + [6.1.2 Test Plan Exit Criteria](#612-test-plan-exit-criteria)
    + [6.1.3 Suspension and Resumption Criteria](#613-suspension-and-resumption-criteria)
  * [6.2 Test Cycles](#62-test-cycles)
    - [6.2.1 Test Cycle Entry Criteria](#621-test-cycle-entry-criteria)
    - [6.2.2 Test Cycle Exit Criteria](#622-test-cycle-exit-criteria)
    - [6.2.3 Test Cycle Abnormal Termination](#623-test-cycle-abnormal-termination)
- [7. Deliverables](#7-deliverables)
  * [7.1 Test Evaluation Summaries](#71-test-evaluation-summaries)
  * [7.2 Reporting on Test Coverage](#72-reporting-on-test-coverage)
  * [7.3 Perceived Quality Reports](#73-perceived-quality-reports)
  * [7.4 Incident Logs and Change Requests](#74-incident-logs-and-change-requests)
  * [7.5 Smoke Test Suite and Supporting Test Scripts](#75-smoke-test-suite-and-supporting-test-scripts)
  * [7.6 Additional Work Products](#76-additional-work-products)
    + [7.6.1 Detailed Test Results](#761-detailed-test-results)
    + [7.6.2 Additional Automated Functional Test Scripts](#762-additional-automated-functional-test-scripts)
    + [7.6.3 Test Guidelines](#763-test-guidelines)
    + [7.6.4 Traceability Matrices](#764-traceability-matrices)
- [8. Testing Workflow](#8-testing-workflow)
- [9. Environmental Needs](#9-environmental-needs)
  * [9.1 Base System Hardware](#91-base-system-hardware)
  * [9.2 Base Software Elements in the Test Environment](#92-base-software-elements-in-the-test-environment)
  * [9.3 Productivity and Support Tools](#93-productivity-and-support-tools)
  * [9.4 Test Environment Configurations](#94-test-environment-configurations)
- [10. Responsibilities, Staffing, and Training Needs](#10-responsibilities--staffing--and-training-needs)
  * [10.1 People and Roles](#101-people-and-roles)
  * [10.2 Staffing and Training Needs](#102-staffing-and-training-needs)
- [11. Iteration Milestones](#11-iteration-milestones)
- [12. Risks, Dependencies, Assumptions, and Constraints](#12-risks--dependencies--assumptions--and-constraints)
- [13. Management Process and Procedures](#13-management-process-and-procedures)

---

## 1. Introduction
### 1.1 Purpose
This test plan defines the testing strategy for the GreenFingers App, a gardening assistant using React Native, Node.js, Express.js, PostgreSQL, and microcontroller sensor integration. The objective is to ensure correctness, reliability, and performance of all app features.

### 1.2 Scope
Covers:
- Mobile frontend (UI, interaction, form validation)
- Backend API (routes, logic, DB communication)
- Sensor integration
- E2E flow tests for user features

Out of scope:
- Performance/load testing
- Deployment and infrastructure-level tests

### 1.3 Intended Audience
- Student dev team
- Supervisors and instructors
- QA reviewers

### 1.4 Terminology and Acronyms
| Abbr | Meaning |
|------|---------|
| API | Application Programming Interface |
| E2E | End-to-End |
| UI  | User Interface |
| CI  | Continuous Integration |
| DB  | Database |

### 1.5 References
| Title | Date | Author |
|-------|------|--------|
| Project GitHub | 2025 | GreenFingers Team |
| Requirements Spec | 2025 | GreenFingers Team |

### 1.6 Document Structure
Follows the Rational Unified Process (RUP) structure for test planning.

---

## 2. Evaluation Mission and Test Motivation
- Ensure all implemented features (login, signup, garden/plant/sensor/calendar management) work as expected.
- Verify that data from sensors (humidity, moisture) is correctly handled.

---

## 3. Target Test Items
- React Native frontend forms and logic
- Node.js/Express API routes and controllers
- PostgreSQL database operations
- Microcontroller integration logic
- E2E user journeys (e.g., login → garden overview → plant detail)

---

## 4. Outline of Planned Tests
- **Frontend:** Jest + React Testing Library (unit/component tests)
- **Backend:** Jest (unit tests + API route tests)
- **API:** Postman + Newman
- **E2E:** Detox (mobile flows like login, garden create, etc.)

Optional:
- Accessibility testing (manual)
- Exploratory testing (manual)

---

## 5. Test Approach
- Use unit tests for core logic (React components, Express controllers)
- Use integration tests for API+DB behavior
- Use E2E tests for simulating complete user actions
- Mock external services and sensor input where needed

Techniques:
- Boundary tests (input length, invalid values)
- Error handling tests (DB down, network errors)
- Mocked sensor tests

---

## 6. Entry and Exit Criteria
### Entry Criteria
- Feature completed in dev branch
- Code merged with correct naming/test structure

### Exit Criteria
- No critical test failures
- Minimum 85% unit test coverage

---

## 7. Deliverables
- Test reports per commit (GitHub Actions)
- Postman/Newman API test results
- Detox test logs/screenshots
- Coverage summary

---

## 8. Testing Workflow
- Developer writes unit/component tests with feature
- PR triggers CI pipeline → runs Jest, Postman, Detox
- Instructor manually verifies E2E flows on staging build

---

## 9. Environmental Needs
### 9.1 Hardware

### 9.2 Software
| Item | Notes |
|------|-------|
| Node.js | Backend runtime |
| Expo + React Native | Mobile framework |
| PostgreSQL | Database |
| Jest + RTL | Unit testing |
| Detox | E2E testing |
| Postman + Newman | API testing |

---

## 10. Responsibilities, Staffing, and Training Needs
| Role | Person(s) | Responsibility |
|------|-----------|----------------|
| Frontend QA | Malte | Component tests |
| Backend QA | Sima | API + DB tests |
| Test Leader | Malte | Test plan, CI/CD, coverage |

---

## 11. Iteration Milestones
- Iteration 1: Auth & navigation tests ready
- Iteration 2: Garden/Plant/Calendar logic tested
- Iteration 3: Sensor logic tested

---

## 12. Risks, Dependencies, Assumptions, and Constraints
| Risk | Mitigation |
|------|------------|
| Emulator failures | Use physical device fallback |
| Sensor data delay | Mock data for testing |
| CI flakiness | Retry with cache busting |

---

## 13. Management Process and Procedures
- Test coverage monitored via Jest
- Reports reviewed every sprint retro

