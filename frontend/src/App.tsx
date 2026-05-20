import { FormEvent, useState } from 'react';
import { Building2, ShieldCheck } from 'lucide-react';
import { evaluateCreditDecision } from './api/creditDecisionApi';
import { DecisionCard } from './components/DecisionCard';
import { CreditDecisionRequest, DecisionResult } from './types/credit';
import './styles.css';

const initialForm: CreditDecisionRequest = {
  applicantName: 'Alex Johnson',
  creditScore: 705,
  annualIncome: 82000,
  monthlyDebt: 1450,
  requestedAmount: 25000,
  loanPurpose: 'Debt Consolidation'
};

export default function App() {
  const [form, setForm] = useState<CreditDecisionRequest>(initialForm);
  const [result, setResult] = useState<DecisionResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: keyof CreditDecisionRequest, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: field === 'applicantName' || field === 'loanPurpose' ? value : Number(value)
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const decision = await evaluateCreditDecision(form);
      setResult(decision);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <header className="hero">
        <div className="hero-badge">
          <Building2 size={18} />
          Fintech Workflow Demo
        </div>
        <h1>Credit Decision Rules Engine</h1>
        <p>
          A small full-stack lending workflow built with React and ASP.NET Core. It evaluates applicant information,
          applies business rules, and returns a clear recommendation for reviewers.
        </p>
      </header>

      <section className="metrics-row">
        <div className="metric-card">
          <span>Architecture</span>
          <strong>React + C# API</strong>
        </div>
        <div className="metric-card">
          <span>Workflow</span>
          <strong>Loan Review</strong>
        </div>
        <div className="metric-card">
          <span>Focus</span>
          <strong>Rules + Validation</strong>
        </div>
      </section>

      <section className="content-grid">
        <form className="card form-card" onSubmit={handleSubmit}>
          <div className="section-title">
            <ShieldCheck size={22} />
            <div>
              <p className="eyebrow">Applicant Input</p>
              <h2>Evaluate application</h2>
            </div>
          </div>

          <label>
            Applicant Name
            <input value={form.applicantName} onChange={(e) => updateField('applicantName', e.target.value)} />
          </label>

          <div className="two-column">
            <label>
              Credit Score
              <input type="number" min="300" max="850" value={form.creditScore} onChange={(e) => updateField('creditScore', e.target.value)} />
            </label>
            <label>
              Annual Income
              <input type="number" min="1" value={form.annualIncome} onChange={(e) => updateField('annualIncome', e.target.value)} />
            </label>
          </div>

          <div className="two-column">
            <label>
              Monthly Debt
              <input type="number" min="0" value={form.monthlyDebt} onChange={(e) => updateField('monthlyDebt', e.target.value)} />
            </label>
            <label>
              Requested Amount
              <input type="number" min="1000" value={form.requestedAmount} onChange={(e) => updateField('requestedAmount', e.target.value)} />
            </label>
          </div>

          <label>
            Loan Purpose
            <select value={form.loanPurpose} onChange={(e) => updateField('loanPurpose', e.target.value)}>
              <option>Debt Consolidation</option>
              <option>Auto Loan</option>
              <option>Home Improvement</option>
              <option>Personal Loan</option>
              <option>Business Expense</option>
            </select>
          </label>

          {error && <p className="error-message">Backend error: check that the ASP.NET Core API is running. {error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Evaluating...' : 'Run Decision'}
          </button>
        </form>

        <DecisionCard result={result} />
      </section>
    </main>
  );
}
