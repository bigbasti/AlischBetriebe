using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AlischBetriebe.Web.Domain.Site
{
    public class SiteFooter
    {
        [Key]
        public int SiteFooterId { get; set; }

        [AllowHtml]
        public string SiteFooterContent { get; set; }
    }
}