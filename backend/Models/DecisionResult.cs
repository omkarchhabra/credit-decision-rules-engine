namespace CreditDecision.Api.Models;

public class DecisionResult
{
    public string Decision { get; set; } = string.Empty;
    public string RiskLevel { get; set; } = string.Empty;
    public int Score { get; set; }
    public List<string> Reasons { get; set; } = new();
    public List<string> SuggestedActions { get; set; } = new();
}
