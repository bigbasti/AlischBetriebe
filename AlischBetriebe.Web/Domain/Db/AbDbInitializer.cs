using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Web;
using AlischBetriebe.Web.Domain.Account;
using AlischBetriebe.Web.Domain.Menu;
using AlischBetriebe.Web.Domain.Site;

namespace AlischBetriebe.Web.Domain.Db
{
    public class AbDbInitializer : DropCreateDatabaseIfModelChanges<AbDb>
    {
        protected override void Seed(AbDb context)
        {
            SetupUsers(context);
            SetupWebSites(context);
            SetupSiteHeaders(context);
            SetupMenu(context);
            SetupSiteFooter(context);

            context.SaveChanges();
        }

        private void SetupSiteFooter(AbDb context)
        {
            var footer = new SiteFooter()
                             {
                                 SiteFooterContent =
                                     "&copy; Alisch Betriebe 2013 - Osnabrückerstr. 266 - 32257 Bünde / Ahle - 05223-960900 <a href=\"/admin\">Administration</a>"
                             };
            context.SiteFooters.Add(footer);
        }

        private void SetupMenu(AbDb context)
        {
            var menu = new MenuEntry()
                           {
                               Name = "Home",
                               Position = 1,
                               MenuEntries = new Collection<MenuEntry>()
                                                 {
                                                     new MenuEntry()
                                                         {
                                                             Name = "Startseite",
                                                             Position = 1,
                                                             Url = "/",
                                                             MenuEntries = new Collection<MenuEntry>()
                                                         }
                                                 }
                           };
            context.MenuEntries.Add(menu);
        }

        private void SetupUsers(AbDb context)
        {
            var user = new SiteUser()
                            {
                                Email = "bigbasti@gmail.com",
                                Firstname = "Sebastian",
                                Lastname = "Gross",
                                Password = "70e104246886ba9c6fa9cc220a897ec0",
                                Password2 = "70e104246886ba9c6fa9cc220a897ec0",
                                Username = "bigbasti"
                            };
            var user2 = new SiteUser()
            {
                Email = "info@alisch-eventagentur.de",
                Firstname = "Alisch",
                Lastname = "Betriebe",
                Password = "e8636ea013e682faf61f56ce1cb1ab5c",
                Password2 = "e8636ea013e682faf61f56ce1cb1ab5c",
                Username = "alisch"
            };
            context.SiteUsers.Add(user);
            //context.SiteUsers.Add(user2);
        }

        private void SetupWebSites(AbDb context)
        {
            var sites = new WebSiteTemplates();
            context.WebSites.Add(sites.StartPage("standard_seitenheader.jpg"));
        }

        private void SetupSiteHeaders(AbDb context)
        {
            var header = new SiteHeader()
            {
                FileName = "standard_seitenheader.jpg",
                Name = "Standard Header"
            };
            var header2 = new SiteHeader()
            {
                FileName = "standard_seitenheader2.jpg",
                Name = "Standard Header Abgeschnitten"
            };
            var header3 = new SiteHeader()
            {
                FileName = "tische.jpg",
                Name = "Dekorierte Tische"
            };
            var header4 = new SiteHeader()
            {
                FileName = "tische_und_schtuehle.jpg",
                Name = "Runde Tische mit Stühlen"
            };
            var header5 = new SiteHeader()
            {
                FileName = "zelt.jpg",
                Name = "Großes Partyzelt"
            };
            context.SiteHeaders.Add(header);
            context.SiteHeaders.Add(header2);
            context.SiteHeaders.Add(header3);
            context.SiteHeaders.Add(header4);
            context.SiteHeaders.Add(header5);
        }
    }
}