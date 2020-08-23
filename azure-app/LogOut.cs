using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Documents.Client;
using System;
using System.Linq;

namespace Company.Function
{
    public static class LogOut
    {
        [FunctionName("LogOut")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(databaseName: "game",
                collectionName: "users",
                ConnectionStringSetting = "CosmosDBConnection")] DocumentClient client,
            ILogger log)
        {
            string name = req.Query["name"];
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new Exception("name cannot be empty");
            }

            log.LogInformation($"Logging out {name}...");

            User user = client.CreateDocumentQuery<User>(UriFactory.CreateDocumentCollectionUri("game", "users"))
                .Where(p => p.Name.Equals(name))
                .AsEnumerable()
                .SingleOrDefault();

            if (user != null)
            {
                user.IsLoggedIn = false;
                await client.ReplaceDocumentAsync(UriFactory.CreateDocumentUri("game", "users", user.Id.ToString()), user);
                log.LogInformation($"User {name} logged out.");
            };

            return new OkResult();
        }
    }
}
