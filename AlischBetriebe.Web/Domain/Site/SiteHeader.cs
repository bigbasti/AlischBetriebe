using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AlischBetriebe.Web.Domain.Site
{
    public class SiteHeader
    {
        [Key]
        public int HeaderId { get; set; }
        
        [Required]
        [DisplayName("Bezeichnung für diesen Seitentitel")]
        public string Name { get; set; }

        [DisplayName("Bezeichnung für diesen Seitentitel")]
        public string FileName { get; set; }
    }
}