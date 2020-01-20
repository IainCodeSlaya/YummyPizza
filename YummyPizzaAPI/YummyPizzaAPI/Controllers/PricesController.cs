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
    public class PricesController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/Prices
        public IQueryable<Price> GetPrices()
        {
            return db.Prices;
        }

        // GET: api/Prices/5
        [ResponseType(typeof(Price))]
        public IHttpActionResult GetPrice(int id)
        {
            Price price = db.Prices.Find(id);
            if (price == null)
            {
                return NotFound();
            }

            return Ok(price);
        }

        // PUT: api/Prices/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPrice(int id, Price price)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != price.Price_ID)
            {
                return BadRequest();
            }

            db.Entry(price).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriceExists(id))
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

        // POST: api/Prices
        [ResponseType(typeof(Price))]
        public IHttpActionResult PostPrice(Price price)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Prices.Add(price);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = price.Price_ID }, price);
        }

        // DELETE: api/Prices/5
        [ResponseType(typeof(Price))]
        public IHttpActionResult DeletePrice(int id)
        {
            Price price = db.Prices.Find(id);
            if (price == null)
            {
                return NotFound();
            }

            db.Prices.Remove(price);
            db.SaveChanges();

            return Ok(price);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PriceExists(int id)
        {
            return db.Prices.Count(e => e.Price_ID == id) > 0;
        }
    }
}