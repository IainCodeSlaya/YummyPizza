using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using YummyPizzaAPI.Models;

namespace YummyPizzaAPI.Controllers
{
    public class OrdersController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/Orders
        public IQueryable<Order> GetOrders()
        {
            return db.Orders;
        }

        // GET: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrder(int id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder(int id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.Order_ID)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [ResponseType(typeof(Order))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*", exposedHeaders: "*")]
        public IHttpActionResult PostOrder(Order order)
        {
            try
            {
                //exercise plan table
                db.Orders.Add(order);

                //exercise plan day tavle
                foreach (var item in order.OrderItems)
                {
                    db.OrderItems.Add(item);
                }
                db.SaveChanges();

                return Ok(order.Order_ID);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //db.Orders.Add(order);
            //db.SaveChanges();

            //return CreatedAtRoute("DefaultApi", new { id = order.Order_ID }, order);
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult DeleteOrder(int id)
        {
            Order order = db.Orders.Include(y => y.OrderItems)
                .SingleOrDefault(x => x.Order_ID == id);
            
            foreach (var item in order.OrderItems.ToList())
            {
                db.OrderItems.Remove(item);
            }

            db.Orders.Remove(order);
            db.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.Order_ID == id) > 0;
        }
    }
}