using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.Azure.Documents.Client;
using System.Linq;

namespace Company.Function
{
    public static class Register
    {
        [FunctionName("Register")]
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
                throw new Exception("name cannot be empty or whitespace");
            }

            User existingUser = client.CreateDocumentQuery<User>(UriFactory.CreateDocumentCollectionUri("game", "users"))
                .Where(p => p.Name.Equals(name))
                .AsEnumerable()
                .SingleOrDefault();

            if (existingUser != null)
            {
                throw new Exception("user already exists");
            }

            log.LogInformation($"Registering new user {name}...");

            User newUser = new User { Id = Guid.NewGuid(), Name = name, IsLoggedIn = false };
            await client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri("game", "users"), newUser);

            return new OkResult();
        }
    }
}
