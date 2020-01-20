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
    public class ComboesController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/Comboes
        public IHttpActionResult GetExtras()
        {
            var combodetails = db.getCombo();
            return Ok(combodetails);
        }

        // GET: api/Comboes/5
        [ResponseType(typeof(Combo))]
        public IHttpActionResult GetCombo(int id)
        {
            Combo combo = db.Comboes.Find(id);
            if (combo == null)
            {
                return NotFound();
            }

            return Ok(combo);
        }

        // PUT: api/Comboes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCombo(int id, Combo combo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != combo.Combo_ID)
            {
                return BadRequest();
            }

            db.Entry(combo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComboExists(id))
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

        // POST: api/Comboes
        [ResponseType(typeof(Combo))]
        public IHttpActionResult PostCombo(Combo combo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Comboes.Add(combo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = combo.Combo_ID }, combo);
        }

        // DELETE: api/Comboes/5
        [ResponseType(typeof(Combo))]
        public IHttpActionResult DeleteCombo(int id)
        {
            Combo combo = db.Comboes.Find(id);
            if (combo == null)
            {
                return NotFound();
            }

            db.Comboes.Remove(combo);
            db.SaveChanges();

            return Ok(combo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ComboExists(int id)
        {
            return db.Comboes.Count(e => e.Combo_ID == id) > 0;
        }
    }
}