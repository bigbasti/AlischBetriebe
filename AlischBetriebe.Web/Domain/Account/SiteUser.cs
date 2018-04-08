using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AlischBetriebe.Web.Domain.Account
{
    public class SiteUser
    {

        [Key]
        public int UserId { get; set; }

        [Required]
        [DisplayName("Vorname")]
        public string Firstname { get; set; }

        [Required]
        [DisplayName("Nachname")]
        public string Lastname { get; set; }

        [Required]
        [DisplayName("Benutzername")]
        public string Username { get; set; }

        [Required]
        [DisplayName("E-Mail Adresse")]
        public string Email { get; set; }

        [Required]
        [DisplayName("Passwort")]
        public string Password { get; set; }

        [Required, System.Web.Mvc.Compare("Password", ErrorMessage = "Die beiden Passwörter stimmen nicht überein!")]
        [DisplayName("Passwort wiederholen")]
        public string Password2 { get; set; }

    }
}