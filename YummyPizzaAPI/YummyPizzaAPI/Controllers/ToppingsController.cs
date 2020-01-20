using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using YummyPizzaAPI.Models;

namespace YummyPizzaAPI.Controllers
{
    public class ToppingsController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/Toppings
        public IHttpActionResult GetToppings()
        {
            var toppingdetails = db.getToppingDetails();
            return Ok(toppingdetails);
        }

        // GET: api/Toppings/5
        [ResponseType(typeof(Topping))]
        public IHttpActionResult GetTopping(int id)
        {
            Topping topping = db.Toppings.Find(id);
            if (topping == null)
            {
                return NotFound();
            }

            return Ok(topping);
        }

        // PUT: api/Toppings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTopping(int id, Topping topping)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != topping.Topping_ID)
            {
                return BadRequest();
            }

            db.Entry(topping).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToppingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Toppings
        [ResponseType(typeof(Topping))]
        public IHttpActionResult PostTopping(Topping topping)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Toppings.Add(topping);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = topping.Topping_ID }, topping);
        }

        // DELETE: api/Toppings/5
        [ResponseType(typeof(Topping))]
        public IHttpActionResult DeleteTopping(int id)
        {
            Topping topping = db.Toppings.Find(id);
            if (topping == null)
            {
                return NotFound();
            }

            db.Toppings.Remove(topping);
            db.SaveChanges();

            return Ok(topping);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ToppingExists(int id)
        {
            return db.Toppings.Count(e => e.Topping_ID == id) > 0;
        }
    }
}