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
    public class OrderStatusController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/OrderStatus
        public IQueryable<Order_Status> GetOrder_Status()
        {
            return db.Order_Status;
        }

        // GET: api/OrderStatus/5
        [ResponseType(typeof(Order_Status))]
        public IHttpActionResult GetOrder_Status(int id)
        {
            Order_Status order_Status = db.Order_Status.Find(id);
            if (order_Status == null)
            {
                return NotFound();
            }

            return Ok(order_Status);
        }

        // PUT: api/OrderStatus/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder_Status(int id, Order_Status order_Status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order_Status.Order_Status_ID)
            {
                return BadRequest();
            }

            db.Entry(order_Status).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Order_StatusExists(id))
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

        // POST: api/OrderStatus
        [ResponseType(typeof(Order_Status))]
        public IHttpActionResult PostOrder_Status(Order_Status order_Status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Order_Status.Add(order_Status);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = order_Status.Order_Status_ID }, order_Status);
        }

        // DELETE: api/OrderStatus/5
        [ResponseType(typeof(Order_Status))]
        public IHttpActionResult DeleteOrder_Status(int id)
        {
            Order_Status order_Status = db.Order_Status.Find(id);
            if (order_Status == null)
            {
                return NotFound();
            }

            db.Order_Status.Remove(order_Status);
            db.SaveChanges();

            return Ok(order_Status);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Order_StatusExists(int id)
        {
            return db.Order_Status.Count(e => e.Order_Status_ID == id) > 0;
        }
    }
}