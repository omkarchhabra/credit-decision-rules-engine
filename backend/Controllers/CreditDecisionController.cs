using CreditDecision.Api.DTOs;
using CreditDecision.Api.Models;
using CreditDecision.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CreditDecision.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CreditDecisionController : ControllerBase
{
    private readonly ICreditDecisionService _decisionService;

    public CreditDecisionController(ICreditDecisionService decisionService)
    {
        _decisionService = decisionService;
    }

    [HttpPost("evaluate")]
    [ProducesResponseType(typeof(DecisionResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<DecisionResult> Evaluate([FromBody] CreditDecisionRequest request)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var result = _decisionService.Evaluate(request);
        return Ok(result);
    }

    [HttpGet("rules")]
    public ActionResult<object> GetRules()
    {
        return Ok(new
        {
            Description = "Simple lending decision rules used for demo purposes.",
            Rules = new[]
            {
                "Credit score 740+ strongly improves approval score.",
                "Debt-to-income ratio below 30% is preferred.",
                "Debt-to-income ratio above 45% increases risk.",
                "Requested amount is compared against annual income.",
                "Final output is Recommended Approval, Manual Review, or High Risk."
            }
        });
    }
}
