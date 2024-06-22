using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using LostAndFoundBack.DataBase;
using LostAndFoundBack.DbModels;

namespace LostAndFoundBack.Controllers
{
    public class ReportedItemsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ReportedItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: ReportedItems
        public async Task<IActionResult> Index()
        {
            return View(await _context.ReportedItems.ToListAsync());
        }

        // GET: ReportedItems/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var reportedItem = await _context.ReportedItems
                .FirstOrDefaultAsync(m => m.item_id == id);
            if (reportedItem == null)
            {
                return NotFound();
            }

            return View(reportedItem);
        }

        // GET: ReportedItems/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: ReportedItems/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("item_id,UserId,description,date_found,location_found,category,Status")] ReportedItem reportedItem)
        {
            if (ModelState.IsValid)
            {
                _context.Add(reportedItem);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(reportedItem);
        }

        // GET: ReportedItems/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var reportedItem = await _context.ReportedItems.FindAsync(id);
            if (reportedItem == null)
            {
                return NotFound();
            }
            return View(reportedItem);
        }

        // POST: ReportedItems/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("item_id,UserId,description,date_found,location_found,category,Status")] ReportedItem reportedItem)
        {
            if (id != reportedItem.item_id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(reportedItem);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ReportedItemExists(reportedItem.item_id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(reportedItem);
        }

        // GET: ReportedItems/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var reportedItem = await _context.ReportedItems
                .FirstOrDefaultAsync(m => m.item_id == id);
            if (reportedItem == null)
            {
                return NotFound();
            }

            return View(reportedItem);
        }

        // POST: ReportedItems/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var reportedItem = await _context.ReportedItems.FindAsync(id);
            if (reportedItem != null)
            {
                _context.ReportedItems.Remove(reportedItem);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ReportedItemExists(int id)
        {
            return _context.ReportedItems.Any(e => e.item_id == id);
        }
    }
}
