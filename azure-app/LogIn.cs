using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public static class LogIn
    {
        [FunctionName("LogIn")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string name = req.Query["name"];

            log.LogInformation($"Start authentication for user: {name}");

            if (name == "Alice" || name == "Bob")
            {
                return new OkResult();
            }

            return new StatusCodeResult(403);
        }
    }
}
