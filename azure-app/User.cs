
using System;
using Newtonsoft.Json;

public class User
{
    [JsonProperty("id")]
    public Guid Id { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("isLoggedIn")]
    public bool IsLoggedIn { get; set; }
}