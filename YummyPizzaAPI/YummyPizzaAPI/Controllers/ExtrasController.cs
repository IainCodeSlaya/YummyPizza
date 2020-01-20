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
    public class ExtrasController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/Extras
        public IHttpActionResult GetExtras()
        {
            var extradetails = db.getExtraDetails();
            return Ok(extradetails);
        }

        // GET: api/Extras/5
        [ResponseType(typeof(Extra))]
        public IHttpActionResult GetExtra(int id)
        {
            Extra extra = db.Extras.Find(id);
            if (extra == null)
            {
                return NotFound();
            }

            return Ok(extra);
        }

        // PUT: api/Extras/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutExtra(int id, Extra extra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != extra.Extra_ID)
            {
                return BadRequest();
            }

            db.Entry(extra).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExtraExists(id))
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

        // POST: api/Extras
        [ResponseType(typeof(Extra))]
        public IHttpActionResult PostExtra(Extra extra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Extras.Add(extra);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = extra.Extra_ID }, extra);
        }

        // DELETE: api/Extras/5
        [ResponseType(typeof(Extra))]
        public IHttpActionResult DeleteExtra(int id)
        {
            Extra extra = db.Extras.Find(id);
            if (extra == null)
            {
                return NotFound();
            }

            db.Extras.Remove(extra);
            db.SaveChanges();

            return Ok(extra);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExtraExists(int id)
        {
            return db.Extras.Count(e => e.Extra_ID == id) > 0;
        }
    }
}