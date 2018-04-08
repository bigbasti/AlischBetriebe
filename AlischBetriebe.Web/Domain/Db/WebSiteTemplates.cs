using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AlischBetriebe.Web.Domain.Site;

namespace AlischBetriebe.Web.Domain.Db
{
    public  class WebSiteTemplates
    {
        public WebSite StartPage(string header)
        {
            var site = new WebSite()
                           {
                               SiteLabel = "Startseite",
                               SiteTitle = "Startseite",
                               SiteType = WebSiteType.Default,
                               SiteUrl = "/",
                               SiteHeader = header,
                               UpperBody = @"<div class='row-fluid'>
                                                    <div class='span12'>
                                                        <div class='peKenBurns'
                                                                data-mode='kb'
                                                                data-logo='disabled'
                                                                data-shadow='disabled'
                                                                data-thumb='disabled'
                                                                data-controls='disabled'
                                                                data-autopause='image'
                                                                data-captions='disabled'>
                                                            <div class='peKb_active' data-delay='5'
                                                                    data-zoom='random'
                                                                    data-align='center,center'
                                                                    data-pan='top,center'>
                                                                <img src='/Content/uploads/slider/Startseite1.jpg' />
                                                                <h1>CAPTION 01</h1>
                                                            </div>
         
                                                            <div data-delay='5'>
                                                                <img src='/Content/uploads/slider/Startseite2.jpg' />
                                                                <h1>CAPTION 02</h1>
                                                            </div>

                                                            <div data-delay='5'>
                                                                <img src='/Content/uploads/slider/Startseite3.jpg' />
                                                                <h1>CAPTION 02</h1>
                                                            </div>

                                                            <div data-delay='5'>
                                                                <img src='/Content/uploads/slider/Startseite4.jpg' />
                                                                <h1>CAPTION 02</h1>
                                                            </div>

                                                            <div data-delay='5'>
                                                                <img src='/Content/uploads/slider/Startseite5.jpg' />
                                                                <h1>CAPTION 02</h1>
                                                            </div>
          
                                                        </div>
                                                    </div>
                                                </div>",
                               SiteContent = @"<h3>Herzlich Willkommen!</h3>
                                            <h4>Sie haben einen Grund zu feiern?</h4>
                                            <h4>Wie schön!</h4>
                                            <p>Genießen Sie und legen Sie die Hände in den Schoss.
                                                Wir kümmern uns um alles!</p>
                                            <p>Ein angenehmer Anlass kann auch schnell einmal zum Stress werden. 
                                                Amüsieren Sie sich doch lieber mit Ihren Gästen. Wir übernehmen Vorbereitung und Ausrichtung, 
                                                um Ihnen eine Feier ganz nach Ihren Vorstellungen zu kreieren.</p>
                                            <p>Wir möchten Ihrem Fest den 
                                                angemessenen Rahmen geben, so dass Sie sich ganz dem Inhalt widmen können.</p>"
                           };
            return site;
        }
    }
}