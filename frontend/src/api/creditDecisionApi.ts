import { CreditDecisionRequest, DecisionResult } from '../types/credit';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:5000';

export async function evaluateCreditDecision(payload: CreditDecisionRequest): Promise<DecisionResult> {
  const response = await fetch(`${API_BASE_URL}/api/creditdecision/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Unable to evaluate credit decision.');
  }

  return response.json();
}
