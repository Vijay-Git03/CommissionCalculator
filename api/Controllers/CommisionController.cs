using Microsoft.AspNetCore.Mvc;

namespace FCamara.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommisionController : ControllerBase
    {
        [HttpPost]
        public IActionResult Calculate([FromBody] CommissionCalculationRequest request)
        {
            // Ensure that the request object is valid
            if (request == null)
            {
                return BadRequest("Invalid data");
            }

            var fcamaraCommission = 0.20m * request.LocalSalesCount * request.AverageSaleAmount
                                    + 0.35m * request.ForeignSalesCount * request.AverageSaleAmount;
            var competitorCommission = 0.02m * request.LocalSalesCount * request.AverageSaleAmount
                                      + 0.0755m * request.ForeignSalesCount * request.AverageSaleAmount;

            var response = new CommissionCalculationResponse
            {
                FCamaraCommissionAmount = fcamaraCommission,
                CompetitorCommissionAmount = competitorCommission
            };

            return Ok(response);
        }
    }

    public class CommissionCalculationRequest
    {
        public int LocalSalesCount { get; set; }
        public int ForeignSalesCount { get; set; }
        public decimal AverageSaleAmount { get; set; }
    }

    public class CommissionCalculationResponse
    {
        public decimal FCamaraCommissionAmount { get; set; }
        public decimal CompetitorCommissionAmount { get; set; }
    }
}
