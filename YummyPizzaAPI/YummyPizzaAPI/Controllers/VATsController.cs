﻿using System;
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
    public class VATsController : ApiController
    {
        private PizzaShopEntities db = new PizzaShopEntities();

        // GET: api/VATs
        public IQueryable<VAT> GetVATs()
        {
            return db.VATs;
        }

        // GET: api/VATs/5
        [ResponseType(typeof(VAT))]
        public IHttpActionResult GetVAT(int id)
        {
            VAT vAT = db.VATs.Find(id);
            if (vAT == null)
            {
                return NotFound();
            }

            return Ok(vAT);
        }

        // PUT: api/VATs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVAT(int id, VAT vAT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vAT.Vat_ID)
            {
                return BadRequest();
            }

            db.Entry(vAT).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VATExists(id))
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

        // POST: api/VATs
        [ResponseType(typeof(VAT))]
        public IHttpActionResult PostVAT(VAT vAT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.VATs.Add(vAT);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = vAT.Vat_ID }, vAT);
        }

        // DELETE: api/VATs/5
        [ResponseType(typeof(VAT))]
        public IHttpActionResult DeleteVAT(int id)
        {
            VAT vAT = db.VATs.Find(id);
            if (vAT == null)
            {
                return NotFound();
            }

            db.VATs.Remove(vAT);
            db.SaveChanges();

            return Ok(vAT);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VATExists(int id)
        {
            return db.VATs.Count(e => e.Vat_ID == id) > 0;
        }
    }
}