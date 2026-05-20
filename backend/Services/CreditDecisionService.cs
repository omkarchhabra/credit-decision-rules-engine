using CreditDecision.Api.DTOs;
using CreditDecision.Api.Models;

namespace CreditDecision.Api.Services;

public class CreditDecisionService : ICreditDecisionService
{
    public DecisionResult Evaluate(CreditDecisionRequest request)
    {
        var result = new DecisionResult();
        var monthlyIncome = request.AnnualIncome / 12;
        var debtToIncomeRatio = monthlyIncome == 0 ? 100 : (request.MonthlyDebt / monthlyIncome) * 100;
        var loanToIncomeRatio = request.AnnualIncome == 0 ? 100 : (request.RequestedAmount / request.AnnualIncome) * 100;

        var score = 0;

        if (request.CreditScore >= 740)
        {
            score += 40;
            result.Reasons.Add("Excellent credit score.");
        }
        else if (request.CreditScore >= 680)
        {
            score += 25;
            result.Reasons.Add("Good credit score, but may still require standard review.");
        }
        else if (request.CreditScore >= 620)
        {
            score += 10;
            result.Reasons.Add("Moderate credit score. Manual review recommended.");
        }
        else
        {
            score -= 20;
            result.Reasons.Add("Credit score is below preferred lending threshold.");
        }

        if (debtToIncomeRatio <= 30)
        {
            score += 30;
            result.Reasons.Add($"Healthy debt-to-income ratio: {debtToIncomeRatio:F1}%.");
        }
        else if (debtToIncomeRatio <= 45)
        {
            score += 10;
            result.Reasons.Add($"Debt-to-income ratio requires review: {debtToIncomeRatio:F1}%.");
        }
        else
        {
            score -= 25;
            result.Reasons.Add($"High debt-to-income ratio: {debtToIncomeRatio:F1}%.");
        }

        if (request.AnnualIncome >= 75000)
        {
            score += 20;
            result.Reasons.Add("Strong annual income for requested loan review.");
        }
        else if (request.AnnualIncome >= 45000)
        {
            score += 10;
            result.Reasons.Add("Moderate annual income.");
        }
        else
        {
            score -= 10;
            result.Reasons.Add("Annual income may need additional verification.");
        }

        if (loanToIncomeRatio <= 35)
        {
            score += 10;
            result.Reasons.Add($"Requested amount is reasonable compared to income: {loanToIncomeRatio:F1}%.");
        }
        else if (loanToIncomeRatio <= 70)
        {
            result.Reasons.Add($"Requested amount is somewhat high compared to income: {loanToIncomeRatio:F1}%.");
        }
        else
        {
            score -= 15;
            result.Reasons.Add($"Requested amount is high compared to income: {loanToIncomeRatio:F1}%.");
        }

        result.Score = Math.Clamp(score, 0, 100);

        if (result.Score >= 75)
        {
            result.Decision = "Recommended Approval";
            result.RiskLevel = "Low";
            result.SuggestedActions.Add("Proceed with standard document verification.");
            result.SuggestedActions.Add("Prepare approval package for reviewer sign-off.");
        }
        else if (result.Score >= 50)
        {
            result.Decision = "Manual Review";
            result.RiskLevel = "Medium";
            result.SuggestedActions.Add("Request supporting income and debt documentation.");
            result.SuggestedActions.Add("Have a reviewer validate exceptions before final decision.");
        }
        else
        {
            result.Decision = "High Risk";
            result.RiskLevel = "High";
            result.SuggestedActions.Add("Escalate to senior reviewer before any approval decision.");
            result.SuggestedActions.Add("Consider reducing requested amount or requesting a co-signer.");
        }

        return result;
    }
}
