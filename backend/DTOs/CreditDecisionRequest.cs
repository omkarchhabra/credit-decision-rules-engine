using System.ComponentModel.DataAnnotations;

namespace CreditDecision.Api.DTOs;

public class CreditDecisionRequest
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string ApplicantName { get; set; } = string.Empty;

    [Range(300, 850)]
    public int CreditScore { get; set; }

    [Range(1, 10000000)]
    public decimal AnnualIncome { get; set; }

    [Range(0, 10000000)]
    public decimal MonthlyDebt { get; set; }

    [Range(1000, 10000000)]
    public decimal RequestedAmount { get; set; }

    [Required]
    [StringLength(80)]
    public string LoanPurpose { get; set; } = string.Empty;
}
