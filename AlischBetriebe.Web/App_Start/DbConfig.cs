using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using AlischBetriebe.Web.Domain.Db;

namespace AlischBetriebe.Web.App_Start
{
    public class DbConfig
    {
        public static void RegisterDatabase()
        {
            Database.SetInitializer(new AbDbInitializer());

            //WebSecurity.InitializeDatabaseConnection("DefaultConnection", "UserProfile", "UserId", "UserName", autoCreateTables: true);
        }
    }
}