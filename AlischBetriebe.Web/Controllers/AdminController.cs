using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using AlischBetriebe.Web.Domain.Account;
using AlischBetriebe.Web.Domain.Db;
using AlischBetriebe.Web.Domain.Media;
using AlischBetriebe.Web.Domain.Menu;
using AlischBetriebe.Web.Domain.Site;
using AlischBetriebe.Web.Helpers;
using AlischBetriebe.Web.Models.Admin;

namespace AlischBetriebe.Web.Controllers
{
    public class AdminController : Controller
    {
        //
        // GET: /Admin/

        [Authorize]
        public ActionResult Index()
        {
            //Seitenübersicht
            var db = new AbDb();
            var model = new SiteOverviewModel();
            model.Sites = db.WebSites.ToList();

            ViewBag.ActiveSite = "siteoverview";
            return View(model);
        }

        [Authorize]
        [HttpPost]
        public ActionResult ChangePassword(int id, FormCollection data)
        {
            var db = new AbDb();
            var user = db.SiteUsers.FirstOrDefault(u => u.UserId == id);

            var pass1 = data["newpass"];
            var pass2 = data["newpass2"];

            if(!pass1.Equals(pass2) || string.IsNullOrEmpty(pass1))
            {
                ViewBag.Error = true;
                ViewBag.ErrorMessage =
                    "<ul><li>Das Passwort darf nicht leer sein</li><li>Die beiden angegebenen Passwörter müssen gleich sein</li></ul>";
            }else
            {
                user.Password = GenerateMD5(pass1);
                user.Password2 = GenerateMD5(pass2);
                db.SaveChanges();

                ViewBag.Success = true;
                ViewBag.SuccessMessage =
                    "Das Passwort für den Benutzer " + user.Username + " wurde erfolgreich geändert!";
            }

            var model = db.SiteUsers;
            ViewBag.ActiveSite = "useroverview";
            return View("ShowUsers", model);
        }

        [Authorize]
        public ActionResult DeleteUser(int id)
        {
            var db = new AbDb();
            var user = db.SiteUsers.FirstOrDefault(u => u.UserId == id);

            if (db.SiteUsers.Count() > 1)
            {
                db.SiteUsers.Remove(user);
                db.SaveChanges();
            }

            var model = db.SiteUsers;
            ViewBag.ActiveSite = "useroverview";
            return View("ShowUsers", model);
        }
        
        [Authorize]
        public ActionResult Slider()
        {
            ViewBag.ActiveSite = "bilderslider";
            return View(new AbDb().ImageSliders.ToList());
        }

        [Authorize]
        public ActionResult Createslider()
        {
            ViewBag.ActiveSite = "bilderslider";
            return View(new ImageSlider());
        }

        [Authorize]
        [HttpPost, ActionName("createslider")]
        public ActionResult CreatesliderDb(ImageSlider slider)
        {
            AbDb db = new AbDb();
            var test = db.ImageSliders.FirstOrDefault(s => s.Name.Equals(slider.Name));

            if(test != null)
            {
                //Slider schon vorhanden
                ViewBag.ErrorMessage = "Dieser Slidername ist schon benutzt worden! Bitte wählen Sie einen anderen.";
                return View(slider);
            }

            slider.Pictures = new LinkedList<SliderFile>();
            db.ImageSliders.Add(slider);
            db.SaveChanges();

            ViewBag.ActiveSite = "bilderslider";
            return RedirectToAction("Slider");
        }

        [Authorize]
        public ActionResult Editslider(int id)
        {
            AbDb db = new AbDb();
            var slider = db.ImageSliders.FirstOrDefault(s => s.IntSliderId == id);

            ViewBag.ActiveSite = "bilderslider";
            return View(slider);
        }

        [Authorize]
        [HttpPost, ActionName("editslider")]
        public ActionResult Addsliderimage(int id)
        {
            ViewBag.ActiveSite = "bilderslider";
            var file = Request.Files[0];

            var fileName = Path.GetFileName(file.FileName);

            var db = new AbDb();

            var slider = db.ImageSliders.FirstOrDefault(s => s.IntSliderId == id);

            if (file.ContentLength > 0)
            {
                try
                {
                    if(System.IO.File.Exists(Path.Combine(Server.MapPath("~/Content/uploads/slider/"), fileName)))
                    {
                        System.IO.File.Delete(Path.Combine(Server.MapPath("~/Content/uploads/slider/"), fileName));
                    }
                    var path = Path.Combine(Server.MapPath("~/Content/uploads/slider/"), fileName);
                    file.SaveAs(path);
                    if(slider.Pictures == null)
                    {
                        slider.Pictures = new Collection<SliderFile>();
                    }
                    slider.Pictures.Add(new SliderFile(){FileName = fileName});
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    ViewBag.ErrorMessage = ex.Message;
                    return View(slider);
                }
            }

            return View(slider);
        }

        [Authorize]
        public ActionResult DeleteSliderImage(int id)
        {
            var db = new AbDb();

            var slider = db.ImageSliders.FirstOrDefault(s => s.Pictures.FirstOrDefault(p => p.FileId == id) != null);
            if(slider != null)
            {
                var picture = slider.Pictures.FirstOrDefault(p => p.FileId == id);
                var fileName = picture.FileName;
                slider.Pictures.Remove(picture);
                db.SaveChanges();
                try
                {
                    System.IO.File.Delete(Path.Combine(Server.MapPath("~/Content/uploads/slider/"), fileName));
                }catch(Exception ex){}
            }

            return View("Editslider", slider);
        }

        [Authorize]
        public ActionResult Deleteslider(int id)
        {
            var db = new AbDb();

            var slider = db.ImageSliders.FirstOrDefault(s => s.IntSliderId == id);
            if (slider != null)
            {
                foreach(SliderFile s in slider.Pictures.ToList())
                {
                    var fileName = s.FileName;
                    slider.Pictures.Remove(s);
                    try
                    {
                        System.IO.File.Delete(Path.Combine(Server.MapPath("~/Content/uploads/slider/"), fileName));
                    }
                    catch (Exception ex) { }
                }
                db.ImageSliders.Remove(slider);
                db.SaveChanges();
            }

            return RedirectToAction("Slider");
        }

        [Authorize]
        public ActionResult Notifications()
        {
            ViewBag.ActiveSite = "notifications";
            return View(new AbDb().SiteNotifications.ToList());
        }

        [Authorize]
        public ActionResult Shownotification(int id)
        {
            var db = new AbDb();
            var notification = db.SiteNotifications.FirstOrDefault(n => n.NotificationId == id);

            notification.WasRead = true;
            db.SaveChanges();

            ViewBag.ActiveSite = "notifications";
            return View(notification);
        }

        [Authorize]
        public ActionResult Deletenotification(int id)
        {
            var db = new AbDb();
            var notification = db.SiteNotifications.FirstOrDefault(n => n.NotificationId == id);

            db.SiteNotifications.Remove(notification);
            db.SaveChanges();

            ViewBag.ActiveSite = "notifications";
            return RedirectToAction("Notifications");
        }

        [HttpPost]
        public ActionResult SendMessage(FormCollection items, string validate = "true")
        {
            var db = new AbDb();
            bool spamMessage = false;

            //Wenn eins der Felder nicht ausgefüllt wurde Nachricht nicht verarbeiten
            bool cancel = false;
            if (validate.Equals("true"))
            {
                foreach (string item in items)
                {
                    if (items[item] == null || items[item] == "")
                    {
                        cancel = true;
                    }
                }
                if (cancel)
                {
                    ViewBag.ErrorMessage = "Bitte füllen Sie alle Felder aus.";
                    return View("FormError");
                }
            }

            string email = "";
            string subject = "Kein Betreff angegeben";
            string sender = "unbekannt";
            StringBuilder content = new StringBuilder();

            content.AppendLine(@"<h3>Folgende Nachricht wurde an das Kontaktsystem übermittelt:</h3>");
            content.AppendLine(@"<table border='0' cellpadding='5'>");

            foreach (string item in items)
            {
                if (!item.Equals("submit"))
                {
                    string text = items[item];
                    if (item.Equals("Ort_PLZ"))
                    {
                        if (text.Length < 5)
                        {
                            spamMessage = true;
                        }
                    }

                    if (item.Equals("Zeitraum_von") || item.Equals("Zeitraum_bis"))
                    {
                        if (!text.Contains("."))
                        {
                            spamMessage = true;
                        }
                    }

                    
                    if (items[item].Contains("\n"))
                    {
                        //Wenn Umbrüche vorhanden sind, müssen diese auf HTML gemappt werden
                        text = items[item].Replace("\n", "<br />");
                    }
                    content.AppendLine(@"<tr><td><strong>").Append(item).Append(@"</strong></td><td>").Append(text).Append(@"</td></tr>");

                    //E-Mailadressen erkennen
                    if (item.ToLower().Equals("email"))
                    {
                        email = items[item];
                    }

                    //Betreff erkennen
                    if (item.ToLower().Equals("betreff"))
                    {
                        subject = items[item];
                    }

                    //Absender erkennen
                    if (item.ToLower().Equals("name"))
                    {
                        sender = items[item];
                    }
                }
            }

            content.AppendLine(@"</table>");

            content.AppendLine(@"<p>Ankunft der Nachricht: ").Append(DateTime.Now).Append(@"</p>");
            if (!email.Equals(""))
            {
                content.AppendLine(@"<p>Klicken Sie hier um auf diese Nachricht zu <a href='mailto:").Append(email).Append(@"' target='_blank'>Antworten</a></p>");
            }
            else
            {
                content.AppendLine(@"<p>Es konnte kein Feld mit einer Antwortadresse ermittelt werden. Bitte ggf. die Adresse manuell aus der Nachricht lesen!</p>");
            }

            db.SiteNotifications.Add(new SiteNotification()
                                         {
                                             Date = DateTime.Now,
                                             Content = content.ToString(),
                                             Sender = sender,
                                             Subject = subject,
                                             WasRead = false
                                         });
            db.SaveChanges();

            content.Append(@"<hr /><p>Diese Nachricht können Sie auch im Benachrichtigungen-Bereich der <a href='http://www.alisch-betriebe.de'>Webseite</a> abrufen.</p>");

            SiteUser[] admins = db.SiteUsers.ToArray();

            if (!spamMessage)
            {
                //SPAM Nachrichten nicht versenden, aber dennoch in die Datenbank speichern!
                foreach (SiteUser u in admins)
                {
                    bool success = EMailHelper.SendMail("infomailer@partyzelte-toilettenwagen.de", u.Email,
                                                        "Neue Kontaktaufnahme über die Webseite", content.ToString(),
                                                        true);
                    if (!success)
                    {
                        // ??
                    }
                }
            }

            ViewBag.ActiveSite = "notifications";
            return View("FormSuccess");
        }

        [Authorize]
        public ActionResult Footer()
        {
            var footer = new AbDb().SiteFooters.First();

            ViewBag.ActiveSite = "footer";
            return View(footer);
        }

        [Authorize]
        [HttpPost, ActionName("Footer")]
        public ActionResult UpdateFooter(SiteFooter newFooter)
        {
            var db = new AbDb();
            var footer = db.SiteFooters.First();
            footer.SiteFooterContent = newFooter.SiteFooterContent;
            db.SaveChanges();

            ViewBag.ActiveSite = "footer";
            return View(footer);
        }

        [Authorize]
        public ActionResult RecoverFooter()
        {
            var db = new AbDb();
            var footer = db.SiteFooters.First();
            footer.SiteFooterContent =
                "&copy; Alisch Betriebe 2013 - Osnabrückerstr. 266 - 32257 Bünde / Ahle - 05223-960900 <a href=\"/admin\">Administration</a>";
            db.SaveChanges();
            ViewBag.ActiveSite = "footer";
            return RedirectToAction("footer");
        }

        [Authorize]
        public ActionResult Menu()
        {
            var db = new AbDb();
            var model = new LinkedList<MenuEntry>(db.MenuEntries.Where(m => m.Url.Equals("#")));

            var sites = new LinkedList<SelectListItem>();
            foreach (var site in db.WebSites)
            {
                sites.AddLast(new SelectListItem()
                                  {
                                      Text = site.SiteLabel,
                                      Value = site.SiteId.ToString()
                                  });
            }

            ViewBag.Sites = sites;
            ViewBag.ActiveSite = "menuoverview";
            return View(model);
        }

        [Authorize]
        [HttpPost]
        public ActionResult Createsubmenu(int id, FormCollection data)
        {
            var db = new AbDb();
            var siteId = Convert.ToInt32(data["sitelabel"]);
            var menu = db.MenuEntries.FirstOrDefault(m => m.MenuEntryId == id);
            var site = db.WebSites.FirstOrDefault(s => s.SiteId == siteId);

            var newEntry = new MenuEntry()
                               {
                                   MenuEntries = new Collection<MenuEntry>(),
                                   Name = site.SiteLabel,
                                   Url = site.SiteUrl,
                                   Position = menu.MenuEntries.Count + 1
                               };
            menu.MenuEntries.Add(newEntry);
            db.SaveChanges();

            return RedirectToAction("Menu");
        }

        [Authorize]
        [HttpPost]
        public ActionResult Createmenu(FormCollection data)
        {
            var db = new AbDb();
            var menuName = data["menuname"];

            var newEntry = new MenuEntry()
            {
                MenuEntries = new Collection<MenuEntry>(),
                Name = menuName,
                Url = "#",
                Position = db.MenuEntries.Count() + 1
            };

            db.MenuEntries.Add(newEntry);
            db.SaveChanges();

            return RedirectToAction("Menu");
        }

        [Authorize]
        public ActionResult MoveMenuUp(int id)
        {
            var db = new AbDb();
            var menus = db.MenuEntries.Where(m => m.Url.Equals("#")).OrderBy(m => m.Position).ToList();
            MenuEntry menu = null;
            MenuEntry upperMenu = null;
            int p1 = 0;
            int p2 = 0;
            for (int i = 0; i < menus.Count; i++)
            {
                if(menus[i].MenuEntryId == id)
                {
                    menu = menus[i];
                    p1 = menus[i].Position;
                    upperMenu = menus[i - 1];
                    p2 = menus[i-1].Position;
                    continue;
                }
            }

            var m1 = db.MenuEntries.FirstOrDefault(m => m.MenuEntryId == menu.MenuEntryId);
            var m2 = db.MenuEntries.FirstOrDefault(m => m.MenuEntryId == upperMenu.MenuEntryId);

            m1.Position = p2;
            m2.Position = p1;

            db.SaveChanges();

            return RedirectToAction("Menu");
        }

        [Authorize]
        public ActionResult MoveMenuDown(int id)
        {
            var db = new AbDb();
            var menus = db.MenuEntries.Where(m => m.Url.Equals("#")).OrderBy(m => m.Position).ToList();
            MenuEntry menu = null;
            MenuEntry upperMenu = null;
            int p1 = 0;
            int p2 = 0;
            for (int i = 0; i < menus.Count; i++)
            {
                if (menus[i].MenuEntryId == id)
                {
                    menu = menus[i];
                    p1 = menus[i].Position;
                    upperMenu = menus[i + 1];
                    p2 = menus[i + 1].Position;
                    continue;
                }
            }

            var m1 = db.MenuEntries.FirstOrDefault(m => m.MenuEntryId == menu.MenuEntryId);
            var m2 = db.MenuEntries.FirstOrDefault(m => m.MenuEntryId == upperMenu.MenuEntryId);

            m1.Position = p2;
            m2.Position = p1;

            db.SaveChanges();

            return RedirectToAction("Menu");
        }

        [Authorize]
        public ActionResult MoveSubMenuDown(int id)
        {
            var db = new AbDb();
            var parent = db.MenuEntries.FirstOrDefault(m => m.MenuEntries.FirstOrDefault(mm => mm.MenuEntryId == id) != null);
            var menus = parent.MenuEntries.Where(m => !m.Url.Equals("#")).OrderBy(m => m.Position).ToList();
            MenuEntry menu = null;
            MenuEntry upperMenu = null;
            int p1 = 0;
            int p2 = 0;
            for (int i = 0; i < menus.Count; i++)
            {
                if (menus[i].MenuEntryId == id)
                {
                    menu = menus[i];
                    p1 = menus[i].Position;
                    upperMenu = menus[i + 1];
                    p2 = menus[i + 1].Position;
                    continue;
                }
            }

            var m1 = db.MenuEntries.FirstOrDefault(m => m.MenuEntryId == menu.MenuEntryId);
            var m2 = db.MenuEntries.FirstOrDefault(m => m.MenuEntryId == upperMenu.MenuEntryId);

            m1.Position = p2;
            m2.Position = p1;

            db.SaveChanges();

            return RedirectToAction("Menu");
        }

        [Authorize]
        public ActionResult MoveSubMenuUp(int id)
        {
            var db = new AbDb();
            var parent = db.MenuEntries.FirstOrDefault(m => m.MenuEntries.FirstOrDefault(mm => mm.MenuEntryId == id) != null);
            var menus = parent.MenuEntries.Where(m => !m.Url.Equals("#")).OrderBy(m => m.Position).ToList();
            MenuEntry menu = null;
            MenuEntry upperMenu = null;
            int p1 = 0;
            int p2 = 0;
            for (int i = 0; i < menus.Count; i++)
            {
                if (menus[i].MenuEntryId == id)
                {
                    menu = menus[i];
                    p1 = menus[i].Position;
                    upperMenu = menus[i - 1];
                    p2 = menus[i - 1].Position;
                    continue;
                }
            }

            var m1 = db.MenuEntries.FirstOrDefault(m => m.MenuEntryId == menu.MenuEntryId);
            var m2 = db.MenuEntries.FirstOrDefault(m => m.MenuEntryId == upperMenu.MenuEntryId);

            m1.Position = p2;
            m2.Position = p1;

            db.SaveChanges();

            return RedirectToAction("Menu");
        }

        [Authorize]
        public ActionResult DeleteMenu(int id)
        {
            var db = new AbDb();
            var menu = db.MenuEntries.FirstOrDefault(m => m.MenuEntryId == id);
            db.MenuEntries.Remove(menu);

            db.SaveChanges();

            return RedirectToAction("Menu");
        }

        [Authorize]
        public ActionResult Header()
        {
            //Seitenübersicht
            var db = new AbDb();

            ViewBag.ActiveSite = "seitentitel";
            return View(db.SiteHeaders);
        }
        
        [Authorize]
        [HttpGet]
        public ActionResult Createheader()
        {
            var model = new SiteHeader();
            ViewBag.ActiveSite = "seitentitel";
            return View();
        }

        [Authorize]
        [HttpPost, ActionName("createheader")]
        public ActionResult CreateNewHeader(SiteHeader header)
        {

            var file = Request.Files[0];

            var fileName = Path.GetFileName(file.FileName);

            if (file.ContentLength > 0)
            {
                try
                {
                    if (System.IO.File.Exists(Path.Combine(Server.MapPath("~/Content/uploads/header/"), fileName)))
                    {
                        System.IO.File.Delete(Path.Combine(Server.MapPath("~/Content/uploads/header/"), fileName));
                    }
                    var path = Path.Combine(Server.MapPath("~/Content/uploads/header/"), fileName);
                    file.SaveAs(path);

                    AbDb db = new AbDb();
                    header.FileName = fileName;
                    db.SiteHeaders.Add(header);
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    ViewData.ModelState.AddModelError("FileName", ex.Message);
                    ViewBag.ActiveSite = "seitentitel";
                    return View(header);
                }
            }

            return RedirectToAction("Header");
        }

        [Authorize]
        public ActionResult DeleteHeader(int id)
        {
            AbDb db = new AbDb();
            var header = db.SiteHeaders.FirstOrDefault(h => h.HeaderId == id);
            db.SiteHeaders.Remove(header);

            try
            {
                db.SaveChanges();
                System.IO.File.Delete(Path.Combine(Server.MapPath("~/Content/uploads/header/"), header.FileName));
            }catch(Exception)
            {}

            return RedirectToAction("Header");
        }

        [Authorize]
        public ActionResult ShowUsers()
        {
            //Seitenübersicht
            var db = new AbDb();
            var model = db.SiteUsers;
            ViewBag.ActiveSite = "useroverview";
            return View(model);
        }

        //
        // GET: /Admin/

        [Authorize]
        [HttpGet]
        public ActionResult NewSite()
        {
            //Seitenübersicht
            var model = new WebSite();

            ViewBag.SiteHeaders = GetAvailableSiteHeaders(null);

            ViewBag.ActiveSite = "newsite";
            return View(model);
        }

        [Authorize]
        [HttpPost, ActionName("newsite")]
        public ActionResult CreateNewSite(WebSite site)
        {
            if(!validateWebSite(site, false))
            {
                var db = new AbDb();
                int headerId = Convert.ToInt32(site.SiteHeader);
                site.SiteHeader = new AbDb().SiteHeaders.FirstOrDefault(h => h.HeaderId == headerId).FileName;
                db.WebSites.Add(site);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ActiveSite = "newsite";
            return View(site);
        }

        [Authorize]
        [HttpGet]
        public ActionResult EditSite(int id)
        {
            var db = new AbDb();
            var model = db.WebSites.FirstOrDefault(s => s.SiteId == id);
            ViewBag.SiteHeaders = GetAvailableSiteHeaders(model.SiteHeader);
            return View(model);
        }

        [Authorize]
        [HttpPost, ActionName("editsite")]
        public ActionResult SaveEditedSite(WebSite site)
        {
            if (!validateWebSite(site, true))
            {
                int headerId = Convert.ToInt32(site.SiteHeader);
                var db = new AbDb();
                var dbSite = db.WebSites.FirstOrDefault(s => s.SiteId == site.SiteId);
                dbSite.SiteContent = site.SiteContent;
                dbSite.SiteLabel = site.SiteLabel;
                dbSite.SiteTitle = site.SiteTitle;
                dbSite.SiteType = site.SiteType;
                dbSite.SiteUrl = site.SiteUrl;
                dbSite.SiteHeader = new AbDb().SiteHeaders.FirstOrDefault(h => h.HeaderId == headerId).FileName;
                dbSite.UpperBody = dbSite.UpperBody;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.SiteHeaders = GetAvailableSiteHeaders(site.SiteHeader);
            return View(site);
        }

        [Authorize]
        [HttpGet]
        public ActionResult DeleteSite(int id)
        {
            var db = new AbDb();
            WebSite site = db.WebSites.FirstOrDefault(s => s.SiteId == id);
            db.WebSites.Remove(site);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost, ActionName("login")]
        public ActionResult LoginUser(FormCollection data)
        {
            string user = data["user"];
            try
            {
                string pass = GenerateMD5(data["pass"]);
                if ((!String.IsNullOrEmpty(user) && !String.IsNullOrEmpty(pass)) && new AbDb().SiteUsers.FirstOrDefault(u => u.Username.Equals(user) && u.Password.Equals(pass)) != null)
                {
                    FormsAuthentication.SetAuthCookie(user, false);
                    return RedirectToAction("index", "admin");
                }
                else
                {
                    ViewBag.Error = true;
                    ViewData.ModelState.AddModelError("Error", "Der Benutzername oder das Passwort sind unbekannt!");
                }
            }catch(Exception)
            {
                ViewBag.Error = true;
                ViewData.ModelState.AddModelError("Error", "Der Benutzername oder das Passwort sind unbekannt!");
            }

            return View();
        }

        [HttpPost]
        public ActionResult RecoverPassword(FormCollection data)
        {
            var db = new AbDb();
            string email = data["email"];

            string newPassBody = "<html><body><h3>Ihr neues Passwort</h3>" +
                                         "<p>ACHTING: Bitte antworten Sie nicht auf diese E-Mail. Wenn Sie weitere Fragen haben melden Sie sich bitte über unser Kontaktformular an uns!</p>" +
                                         "<p>Ihr neues Passwort lautet:<br />" +
                                         "<b>$NEWPASS$</b><br />" +
                                         "</p>" +
                                         "<p>Es wird empfohlen Ihr neues Passwort bei dem nächsten Login zu ändern!</p>" +
                                         "<hr><p>Alisch Betriebe</p></body></html>";

            //Passwort-Reset
            SiteUser user = db.SiteUsers.FirstOrDefault(u => u.Email.Equals(email));
            if (user != null)
            {
                //Es gibt einen Benutzer zu der angegebenen Emailadresse

                //Zufallszahl als Passwort generieren
                string newPass = new Random().Next(1000, 1000000).ToString();

                //Versuchen das neue Passwort per Mail zu versenden
                if (EMailHelper.SendMail("infomailer@partyzelte-toilettenwagen.de", email, "Passwort Zurücksetzung", newPassBody.Replace("$NEWPASS$", newPass), true))
                {
                    //Wenn die Email erfolgreich gesendet wurde
                    user.Password = GenerateMD5(newPass);
                    user.Password2 = user.Password;
                    db.SaveChanges();

                    ViewBag.Success = true;
                    ViewBag.SuccessMessage =
                        "Das Passwort wurde erfolgreich zurückgesetzt. Sie erhalten in Kürze eine Email mit Ihren neuen Zugangsdaten.";
                }
                else
                {
                    ViewBag.Error = true;
                    ViewBag.ErrorMessage =
                        "Es ist ein Fehler beim Versenden der Email aufgetreten. Bitte kontaktieren Sie den Administrator!";
                }

            }
            else
            {
                //Keinen Benutzer mit der Adresse gefunden
                ViewBag.Error = true;
                ViewBag.ErrorMessage =
                    "Die angegebene Email Adresse ist uns nicht bekannt!";
            }

            return View("Login");
        }

        [Authorize]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("index", "admin");
        }

        private static String GenerateMD5(String wert)
        {
            byte[] bWert = Encoding.UTF8.GetBytes(wert);
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] hash = md5.ComputeHash(bWert);
            string md5Wert = BitConverter.ToString(hash).Replace("-", "").ToLower();

            return md5Wert;
        }

        /// <summary>
        /// Wird vom CKEditor aufgerufen wenn eine Datei hochgeladen werden soll
        /// </summary>
        /// <param name="upload"></param>
        /// <param name="CKEditorFuncNum"></param>
        /// <param name="CKEditor"></param>
        /// <param name="langCode"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public ActionResult uploadsiteimage(string CKEditorFuncNum, string CKEditor, string langCode)
        {
            string url; // url to return
            string message; // message to display (optional)

            var file = Request.Files[0];

            var fileName = Path.GetFileName(file.FileName);

            string output = "";

            if (file.ContentLength > 0)
            {
                try
                {
                    var path = Path.Combine(Server.MapPath("~/Content/uploads/seiten/"), fileName);
                    file.SaveAs(path);
                }
                catch (Exception ex)
                {
                    message = ex.Message + "\n\r" + ex.StackTrace;
                    output = @"<html><body><script>window.parent.CKEDITOR.tools.callFunction(" + CKEditorFuncNum + ", \"" + "http://localhost:1457/Content/Images/my_uploaded_image.jpg" + "\", \"" + message + "\");</script></body></html>";
                    return Content(output);
                }
            }

            // path of the image

            string pathToFile = Url.Content("~/Content/uploads/seiten/") + fileName;

            // will create http://localhost:1457/Content/Images/my_uploaded_image.jpg
            url = Request.Url.GetLeftPart(UriPartial.Authority) + pathToFile;

            // passing message success/failure
            message = "Das Bild wurde erfolgreich hochgeladen :)";

            // since it is an ajax request it requires this string
            output = @"<html><body><script>window.parent.CKEDITOR.tools.callFunction(" + CKEditorFuncNum + ", \"" + url + "\", \"" + message + "\");</script></body></html>";
            return Content(output);
        }

        private bool validateWebSite(WebSite site, bool isEdit)
        {
            bool error = false;
            if (site.SiteUrl.StartsWith("/") && !site.SiteUrl.Equals("/"))
            {
                ViewData.ModelState.AddModelError("SiteUrl", "Die Adresse der Seite darf nicht mit '/' anfangen!");
                error = true;
            }
            if (!isEdit && new AbDb().WebSites.FirstOrDefault(s => s.SiteLabel.Equals(site.SiteLabel)) != null)
            {
                ViewData.ModelState.AddModelError("SiteLabel", "Es existiert bereits eine Seite mit dieser Bezeichnung");
                error = true;
            }
            if (site.SiteUrl.Contains(" "))
            {
                ViewData.ModelState.AddModelError("SiteUrl", "Die Adresse darf keine Leerzeichen enthalten");
                error = true;
            }
            return error;
        }

        private LinkedList<SelectListItem> GetAvailableSiteHeaders(string selected)
        {
            var headers = new LinkedList<SelectListItem>();

            if (selected == null)
            {
                headers.AddFirst(new SelectListItem()
                                     {
                                         Selected = true,
                                         Text = "Standard Header",
                                         Value = "1"
                                     });
            }else
            {
                headers.AddFirst(new SelectListItem()
                {
                    Selected = false,
                    Text = "Standard Header",
                    Value = "1"
                });
            }
            foreach (var header in new AbDb().SiteHeaders.Where(h => h.HeaderId > 1))
            {
                var select = false;
                if(selected != null)
                {
                    select = header.FileName.Equals(selected);
                }
                headers.AddLast(new SelectListItem()
                                    {
                                        Selected = select,
                                        Text = header.Name,
                                        Value = header.HeaderId.ToString()
                                    });
            }
            return headers;
        }


    }
}
