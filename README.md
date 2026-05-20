# Credit Decision Rules Engine

A full-stack fintech-style credit decision rules engine built with **React**, **TypeScript**, and **ASP.NET Core Web API**.

The application allows a reviewer to enter applicant details such as credit score, income, monthly debt, requested loan amount, and loan purpose. The backend evaluates the application using rule-based lending logic and returns a recommendation, risk level, score, reasons, and suggested next actions.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- C#
- ASP.NET Core Web API
- Swagger / OpenAPI
- Dependency Injection
- Request validation with DTOs

## Features

- Applicant input form
- Credit score evaluation
- Debt-to-income ratio calculation
- Loan-to-income ratio calculation
- Rule-based recommendation engine
- Decision output with:
  - Recommendation
  - Risk level
  - Score
  - Decision reasons
  - Suggested reviewer actions
- Swagger API testing
- Clean frontend and backend separation

## Project Structure

```text
credit-decision-rules-engine/
├── backend/
│   ├── Controllers/
│   ├── DTOs/
│   ├── Models/
│   ├── Services/
│   ├── Program.cs
│   └── CreditDecision.Api.csproj
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
