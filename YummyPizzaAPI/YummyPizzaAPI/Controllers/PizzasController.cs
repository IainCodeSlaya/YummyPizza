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
    public class PizzasController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/Pizzas
        public IHttpActionResult GetPizzas()
        {
            var pizzadetails = db.getPizzaDetails();
            return Ok(pizzadetails);
        }

        // GET: api/Pizzas/5
        [ResponseType(typeof(Pizza))]
        public IHttpActionResult GetPizza(int id)
        {
            Pizza pizza = db.Pizzas.Find(id);
            if (pizza == null)
            {
                return NotFound();
            }

            return Ok(pizza);
        }

        // PUT: api/Pizzas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPizza(int id, Pizza pizza)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pizza.Pizza_ID)
            {
                return BadRequest();
            }

            db.Entry(pizza).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PizzaExists(id))
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

        // POST: api/Pizzas
        [ResponseType(typeof(Pizza))]
        public IHttpActionResult PostPizza(Pizza pizza)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Pizzas.Add(pizza);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = pizza.Pizza_ID }, pizza);
        }

        // DELETE: api/Pizzas/5
        [ResponseType(typeof(Pizza))]
        public IHttpActionResult DeletePizza(int id)
        {
            Pizza pizza = db.Pizzas.Find(id);
            if (pizza == null)
            {
                return NotFound();
            }

            db.Pizzas.Remove(pizza);
            db.SaveChanges();

            return Ok(pizza);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PizzaExists(int id)
        {
            return db.Pizzas.Count(e => e.Pizza_ID == id) > 0;
        }
    }
}