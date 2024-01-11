using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniProject.Data;
using MiniProject.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MiniProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<UserController>
        [HttpGet]
        public List<User> Get()
        {
            var userList = _context.Users.
                Select(x => new User
                {
                    UserID = x.UserID,
                    UserName = x.UserName,
                    UserEmail = x.UserEmail,
                    UserPassword = x.UserPassword,
                    Products = x.Products
                });
            return userList.ToList();
        }
       
        // GET api/<UserController>/5
        [HttpGet("{userid}")]
        public ActionResult<User> Get(Guid userid)
        {
            var user = _context.Users
                .Where(x => x.UserID == userid)
                .Select(x => new User
                {
                    UserID = x.UserID,
                    UserName = x.UserName,
                    UserEmail = x.UserEmail,
                    UserPassword = x.UserPassword,
                    Products = x.Products
                }).FirstOrDefault();

            if(user == null)
            {
                return NotFound("User not found");
            }

            return new OkObjectResult(user);
        }

        // POST api/<UserController>
        [HttpPost]
        public ActionResult Post([FromBody] NewUserRequest newUser)
        {
            if (!ModelState.IsValid) 
            { 
                return BadRequest(ModelState); 
            }

            if(_context.Users.Any(x => x.UserEmail == newUser.UserEmail))
            {
                return Conflict("Student Already Exists");
            }

            var user = new User
            {
                UserID = newUser.UserID,
                UserName = newUser.UserName,
                UserEmail = newUser.UserEmail,
                UserPassword = newUser.UserPassword,
            };

            _context.Users.Add(user);   
            _context.SaveChanges();

            return Ok(newUser); 
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] NewLoginRequest login)
        {
            var user = _context.Users.Where(u => u.UserEmail == login.UserEmail && u.UserPassword == login.UserPassword)
                    .FirstOrDefault();

            if(user == null)
            {
                return BadRequest("Username or password is incorrect");
            }

            return Ok(user);
        }

        

        // PUT api/<UserController>/5
        /*
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        */
    }
}
