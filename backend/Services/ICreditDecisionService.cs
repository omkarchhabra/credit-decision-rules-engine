using CreditDecision.Api.DTOs;
using CreditDecision.Api.Models;

namespace CreditDecision.Api.Services;

public interface ICreditDecisionService
{
    DecisionResult Evaluate(CreditDecisionRequest request);
}
