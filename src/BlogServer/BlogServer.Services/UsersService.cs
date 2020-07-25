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
using BlogServer.Utilities;

namespace BlogServer.Services
{
    public class UsersService
    {
        private readonly SignInManager<BlogUser> signInManager;

        public UsersService(SignInManager<BlogUser> signInManager)
        {
            this.signInManager = signInManager;
        }

        public async Task<ResultData<ResponseModel>> Register(string email, string password, string repeatPassword)
        {
            BlogUser existingUser = await this.signInManager.UserManager.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (existingUser != null)
            {
                return new ResultData<ResponseModel>(Constants.EmailTakenMessage, false, null);
            }

            if (string.IsNullOrEmpty(email))
            {
                return new ResultData<ResponseModel>(Constants.EmptyEmailMessage, false, null);
            }

            Match match = Regex.Match(email, Constants.EmailPattern);

            if (!match.Success)
            {
                return new ResultData<ResponseModel>(Constants.InvalidEmailMessage, false, null);
            }


            if (string.IsNullOrEmpty(password))
            {
                return new ResultData<ResponseModel>(Constants.PasswordEmptyMessage, false, null);
            }

            if (password.Length < 3)
            {
                return new ResultData<ResponseModel>(Constants.PasswordTooShortMessage, false, null);
            }

            if (password != repeatPassword)
            {
                return new ResultData<ResponseModel>(Constants.PasswordsDontMatchMessage, false, null);
            }

            BlogUser user = this.CreateUser(email);

            IdentityResult createResult = await this.signInManager.UserManager.CreateAsync(user, password);

            if (!createResult.Succeeded)
            {
                return new ResultData<ResponseModel>(Constants.GenericErrorMessage, false, null);
            }

            ResponseModel model = this.CreateResponseModel(user);

            return new ResultData<ResponseModel>(Constants.UserRegisteredSuccessMessage, true, model);
        }

        public async Task<ResultData<ResponseModel>> Login(string email, string password)
        {
            if (string.IsNullOrEmpty(email))
            {
                return new ResultData<ResponseModel>(Constants.InvalidEmailOrPasswordMessage, false, null);
            }

            Match match = Regex.Match(email, Constants.EmailPattern);

            if (!match.Success)
            {
                return new ResultData<ResponseModel>(Constants.InvalidEmailOrPasswordMessage, false, null);
            }

            if (string.IsNullOrEmpty(password))
            {
                return new ResultData<ResponseModel>(Constants.InvalidEmailOrPasswordMessage, false, null);
            }

            if (password.Length < 3)
            {
                return new ResultData<ResponseModel>(Constants.InvalidEmailOrPasswordMessage, false, null);
            }

            BlogUser user = await this.signInManager.UserManager.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return new ResultData<ResponseModel>(Constants.InvalidEmailOrPasswordMessage, false, null);
            }

            bool passwordIsCorrect = await this.signInManager.UserManager.CheckPasswordAsync(user, password);

            if (!passwordIsCorrect)
            {
                return new ResultData<ResponseModel>(Constants.InvalidEmailOrPasswordMessage, false, null);
            }

            ResponseModel model = new ResponseModel
            {
                Id = user.Id,
                Email = user.Email,
                Token = this.GenerateJwt(user)
            };

            return new ResultData<ResponseModel>(Constants.UserLoginSuccessMessage, true, model);
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

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constants.AppSecret));

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