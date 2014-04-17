using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.IO;
using System.Collections.Generic;
using DaveBrownPhotography.Fashion;

namespace DaveBrownPhotography
{
    public partial class CorprateHeadshot_Photography : PortfolioBasePage
    {
        //adding for testing github
        public override string ImageDirectory { get{return "Corprate-Headshots";}}
        public override HtmlGenericControl imageHolderControl { get { return this.ulImageHolder; } }
        public override HtmlGenericControl BlogHolder { get { return this.divBlogHolder; } }

        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
            ((DaveBrownPhotoMaster)(this.Master)).PageTitle = "Denver Corprate Headshot Photographer, Headshot Photographer Denver, Business Portraits in Denver Colorado";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Denver Corprate Headshot Photographer Sly Octopus is a Corprate Headshot Photographer who specializes in Corprate Headshots, business portraits, and general portrait photography.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords =
            @"denver Corprate Headshot photographer, Corprate Headshot photographer denver, 
            business portraits in denver, colorado portrait photographer, portrait photography, 
            denver phototgrapher, family portraits, denver, photographer";
        }
    }
}
