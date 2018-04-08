using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using AlischBetriebe.Web.Domain.Db;

namespace AlischBetriebe.Web.Routing
{
    public class CmsUrlConstraint : IRouteConstraint
    {
        public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
        {
            var db = new AbDb();
            string permalink = "/";
            if (values[parameterName] != null)
            {
                permalink = values[parameterName].ToString();
            }
            return db.WebSites.Any(w => w.SiteUrl.Equals(permalink));
        }
    }
}