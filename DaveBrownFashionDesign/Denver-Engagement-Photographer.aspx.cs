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
    public partial class Engagement_Photography : PortfolioBasePage
    {
        public override string ImageDirectory { get{return "Engagement";}}
        public override HtmlGenericControl imageHolderControl { get { return this.ulImageHolder; } }
        public override HtmlGenericControl BlogHolder { get { return this.divBlogHolder; } }


        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
            ((DaveBrownPhotoMaster)(this.Master)).PageTitle = "Denver Engagement Photography, Engagement Photography Denver Colorado";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Denver Engagement Photographer Sly Octopus specializes in engagement photographer, love photography, and engagement portraits, and engagement pictures.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords = "denver engagement photography, Engagement Photography Denver, engagement photographer denver, engagement photographer colorado, colorado engagement photography, engagement, denver, colorado, photography, engagement pictures denver";
        }
    }
}
