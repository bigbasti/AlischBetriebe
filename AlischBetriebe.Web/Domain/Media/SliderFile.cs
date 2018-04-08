using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AlischBetriebe.Web.Domain.Media
{
    public class SliderFile
    {
        [Key]
        public int FileId { get; set; }

        public string FileName { get; set; }
    }
}