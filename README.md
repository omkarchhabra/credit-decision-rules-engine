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
```

## How It Works

The frontend collects applicant information and sends it to the backend API.

```text
React Frontend → ASP.NET Core API → Credit Decision Service → JSON Response
```

The backend applies lending-style business rules to evaluate the applicant. The service calculates:

- Monthly income
- Debt-to-income ratio
- Loan-to-income ratio
- Credit score strength
- Overall decision score

Based on the final score, the API returns one of the following recommendations:

- Recommended Approval
- Manual Review
- High Risk

## API Endpoint

### Evaluate Credit Decision

```http
POST /api/creditdecision/evaluate
```

Example request:

```json
{
  "applicantName": "Alex Morgan",
  "creditScore": 730,
  "annualIncome": 70000,
  "monthlyDebt": 1450,
  "requestedAmount": 25000,
  "loanPurpose": "Personal Loan"
}
```

Example response:

```json
{
  "decision": "Recommended Approval",
  "riskLevel": "Low",
  "score": 75,
  "reasons": [
    "Good credit score.",
    "Healthy debt-to-income ratio."
  ],
  "suggestedActions": [
    "Proceed with standard document verification.",
    "Prepare approval package for reviewer sign-off."
  ]
}
```

## Running the Project Locally

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

The backend runs on:

```text
http://localhost:5000
```

Swagger is available at:

```text
http://localhost:5000/swagger
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Design Notes

The backend keeps the controller thin and places the business logic inside a dedicated service layer. This makes the decision rules easier to maintain, test, and extend.

The frontend separates API calls, shared types, UI components, and page logic to keep the code organized and easy to modify.

## Future Improvements

- Add authentication and role-based access
- Store evaluations in a database
- Add audit logs for reviewer actions
- Add unit tests for each decision rule
- Add configurable rules instead of hardcoded thresholds
- Deploy frontend and backend to cloud hosting
- Add structured logging and monitoring

## Purpose

This project was built to demonstrate full-stack software development with a financial workflow, including API design, business logic, validation, clean architecture, and a reviewer-friendly user interface.