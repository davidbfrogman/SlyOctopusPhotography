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
    public partial class Commercial_Photography : PortfolioBasePage
    {
        public override string ImageDirectory { get{return "Commercial";}}
        public override HtmlGenericControl imageHolderControl { get { return this.ulImageHolder; } }
        public override HtmlGenericControl BlogHolder { get { return this.divBlogHolder; } }

        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
				((DaveBrownPhotoMaster)(this.Master)).PageTitle = "Denver Commercial Photographer, Corporate Photographer in Denver Colorado";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Denver Commercial Photographer Sly Octopus is a Denver Portrait Photographer who specializes in headshots, product promotion images,and general photography.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords = "denver photographer, denver commercial photographer, phototgrapher denver, commercial photography denver, corprate, headshots denver, corprate photography.";
        }
    }
}
