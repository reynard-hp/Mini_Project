using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniProject.Data;
using MiniProject.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MiniProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        // POST api/<ProductController>
        [HttpPost("{userid}")]
        public ActionResult Post([FromRoute] Guid userid, [FromBody] NewProductRequest newProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _context.Users.FirstOrDefault(x => x.UserID == userid);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var product = new Product
            {
                ProductID = newProduct.ProductID,
                ProductCategory = newProduct.ProductCategory,
                UserID = userid,
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return Ok(newProduct);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{productid}")]
        public async Task<ActionResult> PutAsync([FromRoute] int productid, [FromBody] UpdateProductRequest value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!_context.Products.Any(x => x.ProductID == productid))
            {
                return BadRequest("Product not Found");
            }

            var product = await _context.Products.FirstOrDefaultAsync(x => x.ProductID == productid);
            product.ProductCategory = value.ProductCategory;

            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{productid}")]
        public async Task<IActionResult> Delete([FromRoute] int productid)
        {
            var product = _context.Products.FirstOrDefault(x => x.ProductID == productid);
            
            if(product == null)
            {
                return BadRequest("Product Not Found");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
