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
    public class SizesController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/Sizes
        public IHttpActionResult GetSizes()
        {
            var sizedetails = db.getSizeDetails();
            return Ok(sizedetails);
        }

        // GET: api/Sizes/5
        [ResponseType(typeof(Size))]
        public IHttpActionResult GetSize(int id)
        {
            Size size = db.Sizes.Find(id);
            if (size == null)
            {
                return NotFound();
            }

            return Ok(size);
        }

        // PUT: api/Sizes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSize(int id, Size size)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != size.Size_ID)
            {
                return BadRequest();
            }

            db.Entry(size).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SizeExists(id))
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

        // POST: api/Sizes
        [ResponseType(typeof(Size))]
        public IHttpActionResult PostSize(Size size)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Sizes.Add(size);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = size.Size_ID }, size);
        }

        // DELETE: api/Sizes/5
        [ResponseType(typeof(Size))]
        public IHttpActionResult DeleteSize(int id)
        {
            Size size = db.Sizes.Find(id);
            if (size == null)
            {
                return NotFound();
            }

            db.Sizes.Remove(size);
            db.SaveChanges();

            return Ok(size);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SizeExists(int id)
        {
            return db.Sizes.Count(e => e.Size_ID == id) > 0;
        }
    }
}