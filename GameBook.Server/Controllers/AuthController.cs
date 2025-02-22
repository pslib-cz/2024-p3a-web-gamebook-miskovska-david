using GameBook.Server.Interfaces;
using GameBook.Server.Migrations;
using GameBook.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IPlayerManager _playerManager;
        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IPlayerManager playerManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _playerManager = playerManager;
        }

        private async Task<UserDto> ConvertToUserDto(IdentityUser user)
        {

            var userDto = new UserDto
            {
                UserId = Guid.Parse(user.Id),
                Email = user.Email,
                UserName = user.UserName
            };
            return userDto;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(LoginDto loginDto)
        {
            var user = new IdentityUser
            {
                UserName = loginDto.Email,
                Email = loginDto.Email
            };

            var result = await _userManager.CreateAsync(user, loginDto.Password);

            if (result.Succeeded)
            {
                IdentityUser newUser = await _userManager.FindByEmailAsync(loginDto.Email) ?? throw new Exception("Uživatel nebyl nalezen");
                UserDto userDto = await ConvertToUserDto(newUser);
                await _playerManager.CreatePlayer(new Player{
                    Id = newUser.Id,
                    Coin = 10,
                    Damage = 10,
                    Defence = 10,
                    hp = 100
                });
                return Ok(userDto);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
                var logUser = await _userManager.FindByEmailAsync(loginDto.Email);

                if (logUser == null)
                {
                    return NotFound("Uživatel nebyl nalezen");
                }
            Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.CheckPasswordSignInAsync(logUser, loginDto.Password, false);

            if (result.Succeeded)
            {
                UserDto userDto = await ConvertToUserDto(logUser);
                return Ok(userDto);
            }

            return BadRequest("Špatné heslo nebo email");
        }
    }
}
