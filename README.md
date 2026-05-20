# Credit Decision Rules Engine

A full-stack fintech workflow demo built with **React** and **ASP.NET Core Web API**. The app evaluates borrower information, applies lending-style business rules, and returns a recommendation: **Recommended Approval**, **Manual Review**, or **High Risk**.

This project was designed for a Software Engineer II interview context where the role involves product development, API design, business logic, financial workflows, clean architecture, testing/debugging mindset, and maintainable software design.

## Tech Stack

### Backend
- C#
- ASP.NET Core Web API
- Swagger/OpenAPI
- Service-layer business logic
- Request validation with Data Annotations

### Frontend
- React
- TypeScript
- Vite
- CSS
- Fetch-based API integration

## Features

- Applicant loan input form
- Credit score, income, debt, and requested amount evaluation
- Debt-to-income calculation
- Loan-to-income calculation
- Rule-based recommendation engine
- Risk level output
- Decision score from 0 to 100
- Explanation of reasons behind the decision
- Suggested next actions for internal reviewers
- Swagger endpoint for backend testing
- Clean separation between controller, DTOs, models, and services

## Backend API

### Evaluate Credit Decision

```http
POST /api/creditdecision/evaluate
```

Sample request:

```json
{
  "applicantName": "Alex Johnson",
  "creditScore": 705,
  "annualIncome": 82000,
  "monthlyDebt": 1450,
  "requestedAmount": 25000,
  "loanPurpose": "Debt Consolidation"
}
```

Sample response:

```json
{
  "decision": "Manual Review",
  "riskLevel": "Medium",
  "score": 65,
  "reasons": [
    "Good credit score, but may still require standard review.",
    "Healthy debt-to-income ratio: 21.2%."
  ],
  "suggestedActions": [
    "Request supporting income and debt documentation.",
    "Have a reviewer validate exceptions before final decision."
  ]
}
```

### View Rules

```http
GET /api/creditdecision/rules
```

## How To Run Locally

### 1. Start the backend

```bash
cd backend
dotnet restore
dotnet run
```

Swagger should open at something like:

```text
https://localhost:7048/swagger
```

If your backend runs on a different port, update the frontend `.env` value.

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Optional Frontend Environment Variable

Create this file:

```bash
frontend/.env
```

Add:

```env
VITE_API_BASE_URL=https://localhost:7048
```

Change the port if your backend uses a different one.

## Architecture Notes

The backend keeps decision logic out of the controller by using a service layer:

```text
Controller -> Service -> Decision Result
```

This keeps the code easier to test, maintain, and extend. For example, new rules can be added to the service without changing the API contract or frontend flow.

## Future Improvements

- Add user authentication and reviewer roles
- Save evaluations to a database
- Add audit logs for decision changes
- Add automated unit tests for the rule engine
- Add reviewer override workflow
- Add downloadable decision summary
- Deploy backend to Azure App Service or AWS Elastic Beanstalk
- Deploy frontend to Vercel or Netlify

## Interview Talking Point

I built this project to mirror a small but realistic financial software workflow. The goal was not just to make a form, but to show how business rules can be modeled cleanly in a backend service, exposed through a simple API, and presented through a clear React interface. I separated the controller, DTOs, models, and service logic so the system is easier to maintain and extend as rules change.
