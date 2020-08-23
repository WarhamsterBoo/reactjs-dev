using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;

namespace Company.Function
{
    public static class Register
    {
        [FunctionName("Register")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(databaseName: "game",
                collectionName: "users",
                ConnectionStringSetting = "CosmosDBConnection")] IAsyncCollector<User> documents,
            ILogger log)
        {
            string name = req.Query["name"];

            if (string.IsNullOrWhiteSpace(name)) {
                throw new Exception("name cannot be empty or whitespace");
            }

            log.LogInformation($"Registering new user {name}...");

            await documents.AddAsync(new User { Name = name, IsLoggedIn = false });

            return new OkResult();
        }
    }
}
