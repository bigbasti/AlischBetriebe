using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AlischBetriebe.Web.Domain.Site;

namespace AlischBetriebe.Web.Models.Admin
{
    public class SiteOverviewModel
    {
        public ICollection<WebSite> Sites { get; set; } 
    }
}