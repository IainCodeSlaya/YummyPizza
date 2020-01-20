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
    public class BasesController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/Bases
        public IHttpActionResult GetBases()
        {
            var basedetails = db.getBaseDetails();
            return Ok(basedetails);
        }

        // GET: api/Bases/5
        [ResponseType(typeof(Base))]
        public IHttpActionResult GetBase(int id)
        {
            Base @base = db.Bases.Find(id);
            if (@base == null)
            {
                return NotFound();
            }

            return Ok(@base);
        }

        // PUT: api/Bases/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBase(int id, Base @base)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != @base.Base_ID)
            {
                return BadRequest();
            }

            db.Entry(@base).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BaseExists(id))
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

        // POST: api/Bases
        [ResponseType(typeof(Base))]
        public IHttpActionResult PostBase(Base @base)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Bases.Add(@base);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = @base.Base_ID }, @base);
        }

        // DELETE: api/Bases/5
        [ResponseType(typeof(Base))]
        public IHttpActionResult DeleteBase(int id)
        {
            Base @base = db.Bases.Find(id);
            if (@base == null)
            {
                return NotFound();
            }

            db.Bases.Remove(@base);
            db.SaveChanges();

            return Ok(@base);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BaseExists(int id)
        {
            return db.Bases.Count(e => e.Base_ID == id) > 0;
        }
    }
}