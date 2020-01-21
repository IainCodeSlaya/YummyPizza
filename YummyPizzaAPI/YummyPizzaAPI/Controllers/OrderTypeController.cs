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
    public class OrderTypeController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/OrderType
        public IQueryable<Order_Type> GetOrder_Type()
        {
            return db.Order_Type;
        }

        // GET: api/OrderType/5
        [ResponseType(typeof(Order_Type))]
        public IHttpActionResult GetOrder_Type(int id)
        {
            Order_Type order_Type = db.Order_Type.Find(id);
            if (order_Type == null)
            {
                return NotFound();
            }

            return Ok(order_Type);
        }

        // PUT: api/OrderType/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder_Type(int id, Order_Type order_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order_Type.Order_Type_ID)
            {
                return BadRequest();
            }

            db.Entry(order_Type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Order_TypeExists(id))
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

        // POST: api/OrderType
        [ResponseType(typeof(Order_Type))]
        public IHttpActionResult PostOrder_Type(Order_Type order_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Order_Type.Add(order_Type);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = order_Type.Order_Type_ID }, order_Type);
        }

        // DELETE: api/OrderType/5
        [ResponseType(typeof(Order_Type))]
        public IHttpActionResult DeleteOrder_Type(int id)
        {
            Order_Type order_Type = db.Order_Type.Find(id);
            if (order_Type == null)
            {
                return NotFound();
            }

            db.Order_Type.Remove(order_Type);
            db.SaveChanges();

            return Ok(order_Type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Order_TypeExists(int id)
        {
            return db.Order_Type.Count(e => e.Order_Type_ID == id) > 0;
        }
    }
}