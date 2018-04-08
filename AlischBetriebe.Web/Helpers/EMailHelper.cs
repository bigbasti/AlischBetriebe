using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace AlischBetriebe.Web.Helpers
{
    public class EMailHelper
    {
        public static bool SendMail(string from, string to, string subject, string body, bool html)
        {
            MailMessage message = new MailMessage(from, to, subject, body);
            message.IsBodyHtml = html;

            try
            {
                SmtpClient client = new SmtpClient();
                //{
                //    Host = "mail.partyzelte-toilettenwagen.de",
                //    Credentials = new NetworkCredential("infomailer@partyzelte-toilettenwagen.de", "1!a@Infomailer"),
                //    Port = 25
                //};
                client.Send(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

            return true;
        }
    }
}