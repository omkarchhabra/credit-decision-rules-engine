import { AlertTriangle, CheckCircle2, ClipboardList } from 'lucide-react';
import { DecisionResult } from '../types/credit';

type Props = {
  result: DecisionResult | null;
};

function getDecisionIcon(decision: string) {
  if (decision === 'Recommended Approval') return <CheckCircle2 size={24} />;
  if (decision === 'Manual Review') return <ClipboardList size={24} />;
  return <AlertTriangle size={24} />;
}

export function DecisionCard({ result }: Props) {
  if (!result) {
    return (
      <section className="card empty-state">
        <h2>Decision output</h2>
        <p>Enter applicant details and run the evaluation to see the recommendation, risk level, reasons, and next actions.</p>
      </section>
    );
  }

  return (
    <section className="card result-card">
      <div className="result-header">
        <div className="result-icon">{getDecisionIcon(result.decision)}</div>
        <div>
          <p className="eyebrow">Decision</p>
          <h2>{result.decision}</h2>
        </div>
      </div>

      <div className="score-grid">
        <div>
          <span>Risk Level</span>
          <strong>{result.riskLevel}</strong>
        </div>
        <div>
          <span>Decision Score</span>
          <strong>{result.score}/100</strong>
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${result.score}%` }} />
      </div>

      <div className="result-section">
        <h3>Reasons</h3>
        <ul>
          {result.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h3>Suggested Actions</h3>
        <ul>
          {result.suggestedActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
