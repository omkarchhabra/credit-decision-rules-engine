export type CreditDecisionRequest = {
  applicantName: string;
  creditScore: number;
  annualIncome: number;
  monthlyDebt: number;
  requestedAmount: number;
  loanPurpose: string;
};

export type DecisionResult = {
  decision: string;
  riskLevel: string;
  score: number;
  reasons: string[];
  suggestedActions: string[];
};
