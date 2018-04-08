using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AlischBetriebe.Web.Domain.Menu
{
    public class MenuEntry
    {
        [Key]
        public int MenuEntryId { get; set; }

        public int Position { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public virtual ICollection<MenuEntry> MenuEntries { get; set; }
    }
}