using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AlischBetriebe.Web.Domain.Media
{
    public class ImageSlider
    {
        [Key]
        public int IntSliderId { get; set; }

        [Required]
        public string Name { get; set; }

        [Range(100, 628, ErrorMessage = "Dieser Wert sollte zwischen 100 und 628 liegen")]
        [Required]
        public int Width { get; set; }

        [Range(50, 1000, ErrorMessage = "Dieser Wert sollte zwischen 50 und 1000 liegen")]
        [Required]
        public int Height { get; set; }

        public virtual ICollection<SliderFile> Pictures { get; set; }
    }
}