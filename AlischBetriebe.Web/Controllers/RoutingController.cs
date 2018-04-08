using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using AlischBetriebe.Web.Domain.Db;
using AlischBetriebe.Web.Domain.Media;
using AlischBetriebe.Web.Domain.Site;

namespace AlischBetriebe.Web.Controllers
{
    public class RoutingController : Controller
    {
        //
        // GET: /Routing/

        public ActionResult Displaycontent(string permalink)
        {
            if (permalink == null)
            {
                permalink = "/";
            }

            WebSite site = new AbDb().WebSites.FirstOrDefault(w => w.SiteUrl.Equals(permalink));

            //Pruefen, ob ein Slider eingebaut werden muss
            try
            {
                string sliderName = GetStringInBetween("$$", "$$", site.SiteContent, false, false)[0];

                var slider = new AbDb().ImageSliders.FirstOrDefault(s => s.Name.Equals(sliderName));

                site.SiteContent = site.SiteContent.Replace("$$" + sliderName + "$$",
                                                            createHTMLForSlider(slider));
                ViewBag.Slider = true;
                ViewBag.SliderWidth = slider.Width;
                ViewBag.SliderHeight = slider.Height;

            }catch(Exception ex)
            {
                //Es wurde wohl kein Slider gefunden
                ViewBag.Slider = false;
            }

            return View(site);
        }

        public static string[] GetStringInBetween(string strBegin, string strEnd, string strSource, bool includeBegin, bool includeEnd)
        {
            string[] result = { "", "" };
            int iIndexOfBegin = strSource.IndexOf(strBegin);
            if (iIndexOfBegin != -1)
            {
                // include the Begin string if desired
                if (includeBegin)
                    iIndexOfBegin -= strBegin.Length;
                strSource = strSource.Substring(iIndexOfBegin
                    + strBegin.Length);
                int iEnd = strSource.IndexOf(strEnd);
                if (iEnd != -1)
                {
                    // include the End string if desired
                    if (includeEnd)
                        iEnd += strEnd.Length;
                    result[0] = strSource.Substring(0, iEnd);
                    // advance beyond this segment
                    if (iEnd + strEnd.Length < strSource.Length)
                        result[1] = strSource.Substring(iEnd
                            + strEnd.Length);
                }
            }
            else
                // stay where we are
                result[1] = strSource;
            return result;
        }

        private string createHTMLForSlider(ImageSlider slider)
        {
            string sliderHtml = slider.Pictures.Aggregate("<div id=\"banner-fade\">\n<!-- start Basic Jquery Slider -->\n<ul class=\"bjqs\">\n", (current, f) => current + "<li><img src=\"" + Url.Content("~/Content/uploads/slider/" + f.FileName) + "\" /></li>\n");

            sliderHtml = sliderHtml + "</ul>\n</div>\n";

            //sliderHtml = sliderHtml + "<script type=\"text/javascript\">jQuery(document).ready(function ($) {$('#banner-fade').bjqs({height: 400,width: 800,responsive: true,showcontrols: false,centercontrols: false,showmarkers: false});});</script>";

            return sliderHtml;
        }
    }
}
