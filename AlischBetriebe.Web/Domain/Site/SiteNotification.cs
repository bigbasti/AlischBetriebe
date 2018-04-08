using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AlischBetriebe.Web.Domain.Site
{
    public class SiteNotification
    {
        [Key]
        public int NotificationId { get; set; }

        public DateTime Date { get; set; }

        public string Sender { get; set; }

        public string Subject { get; set; }

        [AllowHtml]
        public string Content { get; set; }

        public bool WasRead { get; set; }
    }
}