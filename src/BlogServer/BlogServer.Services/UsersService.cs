using BlogServer.Models.DomainModels;
using BlogServer.Models.ResponseModels.Users;
using BlogServer.Services.Results;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BlogServer.Services
{
    public class UsersService
    {
        private readonly SignInManager<BlogUser> signInManager;

        private const string EmailPattern = @"^[A-Za-z0-9]+@[A-Za-z]+\.[a-z]{2,3}$";

        public UsersService(SignInManager<BlogUser> signInManager)
        {
            this.signInManager = signInManager;
        }

        public async Task<ResultData<ResponseModel>> Register(string email, string password, string repeatPassword)
        {
            var existingUser = await this.signInManager.UserManager.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (existingUser != null)
            {
                return new ResultData<ResponseModel>("Email is taken!", false, null);
            }

            if (string.IsNullOrEmpty(email))
            {
                return new ResultData<ResponseModel>("Email must not be empty!", false, null);
            }

            Match match = Regex.Match(email, EmailPattern);

            if (!match.Success)
            {
                return new ResultData<ResponseModel>("Invalid email!", false, null);
            }


            if (string.IsNullOrEmpty(password))
            {
                return new ResultData<ResponseModel>("Password cannot be empty!", false, null);
            }

            if (password.Length < 3)
            {
                return new ResultData<ResponseModel>("Passowrd length must be at least 3 characters long!", false, null);
            }

            if (password != repeatPassword)
            {
                return new ResultData<ResponseModel>("Passwords don't match", false, null);
            }

            var user = this.CreateUser(email);

            var createResult = await this.signInManager.UserManager.CreateAsync(user, password);

            if (!createResult.Succeeded)
            {
                return new ResultData<ResponseModel>("An error occured!", false, null);
            }

            var model = this.CreateResponseModel(user);

            return new ResultData<ResponseModel>("User created successfully!", true, model);
        }

        private ResponseModel CreateResponseModel(BlogUser user)
        {
            return new ResponseModel
            {
                Email = user.Email,
                Id = user.Id,
                Token = this.GenerateJwt(user)
            };
        }

        private string GenerateJwt(BlogUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private BlogUser CreateUser(string email)
        {
            return new BlogUser
            {
                Email = email,
                UserName = email,
                Posts = new HashSet<Post>(),
                Comments = new HashSet<Comment>()
            };
        }
    }
}