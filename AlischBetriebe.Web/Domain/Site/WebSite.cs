using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AlischBetriebe.Web.Domain.Site
{
    public class WebSite
    {
        [Key]
        public int SiteId { get; set; }

        [Required(ErrorMessage="Bitte geben Sie einen Titel für die neue Seite an")]
        [DisplayName("Titel der Seite")]
        public string SiteTitle { get; set; }

        [Required(ErrorMessage = "Bitte geben Sie eine Menübezeichnung an")]
        [DisplayName("Im Menü anzeigen als")]
        public string SiteLabel { get; set; }

        [AllowHtml]
        [DisplayName("Seiteninhalt")]
        public string SiteContent { get; set; }

        [AllowHtml]
        public string UpperBody { get; set; }
        
        //TODO: Menüsteuerung
        //[DisplayName("Im Menü anzeigen?")]
        //public bool ShowOnMenu { get; set; }

        //[DisplayName("Position im Menü")]
        //public int MenuOrderID { get; set; }

        [DisplayName("Grafik für den Seitentitel")]
        public String SiteHeader { get; set; }

        [DisplayName("Steuert die Darstellung der Seite")]
        public WebSiteType SiteType { get; set; }

        [Required(ErrorMessage = "Bitte geben Sie eine Adresse für diese Seite an")]
        [DisplayName("Adresse der Seite")]
        public string SiteUrl { get; set; }
    }
}