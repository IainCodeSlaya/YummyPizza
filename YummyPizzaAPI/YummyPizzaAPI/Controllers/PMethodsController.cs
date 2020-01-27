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
    public class PMethodsController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/PMethods
        public IQueryable<PMethod> GetPMethods()
        {
            return db.PMethods;
        }

        // GET: api/PMethods/5
        [ResponseType(typeof(PMethod))]
        public IHttpActionResult GetPMethod(int id)
        {
            PMethod pMethod = db.PMethods.Find(id);
            if (pMethod == null)
            {
                return NotFound();
            }

            return Ok(pMethod);
        }

        // PUT: api/PMethods/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPMethod(int id, PMethod pMethod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pMethod.PMethod_ID)
            {
                return BadRequest();
            }

            db.Entry(pMethod).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PMethodExists(id))
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

        // POST: api/PMethods
        [ResponseType(typeof(PMethod))]
        public IHttpActionResult PostPMethod(PMethod pMethod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PMethods.Add(pMethod);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = pMethod.PMethod_ID }, pMethod);
        }

        // DELETE: api/PMethods/5
        [ResponseType(typeof(PMethod))]
        public IHttpActionResult DeletePMethod(int id)
        {
            PMethod pMethod = db.PMethods.Find(id);
            if (pMethod == null)
            {
                return NotFound();
            }

            db.PMethods.Remove(pMethod);
            db.SaveChanges();

            return Ok(pMethod);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PMethodExists(int id)
        {
            return db.PMethods.Count(e => e.PMethod_ID == id) > 0;
        }
    }
}