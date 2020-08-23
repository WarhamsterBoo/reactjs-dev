using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Linq;
using Microsoft.Azure.Documents.Client;
using System;

namespace Company.Function
{
    public static class LogIn
    {
        [FunctionName("LogIn")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(databaseName: "game",
                collectionName: "users",
                ConnectionStringSetting = "CosmosDBConnection")] DocumentClient client,
            ILogger log)
        {
            var name = req.Query["name"];
            if (string.IsNullOrWhiteSpace(name))
            {
                return new StatusCodeResult(403);
            }

            log.LogInformation($"Logging in {name}...");

            User user = client.CreateDocumentQuery<User>(UriFactory.CreateDocumentCollectionUri("game", "users"))
                .Where(p => p.Name.Equals(name))
                .AsEnumerable()
                .SingleOrDefault();

            if (user != null)
            {
                user.IsLoggedIn = true;
                await client.ReplaceDocumentAsync(UriFactory.CreateDocumentUri("game", "users", user.Id.ToString()), user);
                log.LogInformation($"User {name} logged in!");
                return new OkResult();
            };

            log.LogInformation($"Access Denied for user {name}.");
            return new StatusCodeResult(403);
        }
    }
}
