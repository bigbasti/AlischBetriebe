using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using AlischBetriebe.Web.Domain.Account;
using AlischBetriebe.Web.Domain.Media;
using AlischBetriebe.Web.Domain.Menu;
using AlischBetriebe.Web.Domain.Site;

namespace AlischBetriebe.Web.Domain.Db
{
    public class AbDb : DbContext
    {
        public AbDb()
            : base("AbDb") {
        }

        public DbSet<SiteUser> SiteUsers { get; set; }
        public DbSet<WebSite> WebSites { get; set; }
        public DbSet<SiteHeader> SiteHeaders { get; set; }
        public DbSet<MenuEntry> MenuEntries { get; set; }
        public DbSet<SiteFooter> SiteFooters { get; set; }
        public DbSet<SiteNotification> SiteNotifications { get; set; }
        public DbSet<ImageSlider> ImageSliders { get; set; }
    }
}