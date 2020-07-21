using BlogServer.Models.DomainModels.Enums;
using System;

namespace BlogServer.Services
{
    public class PostsService
    {
        public string[] GetCategories()
        {
            string[] categories = Enum.GetNames(typeof(Category));

            return categories;
        }
    }
}