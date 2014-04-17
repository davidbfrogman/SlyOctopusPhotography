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
    public partial class Wedding_Photography : PortfolioBasePage
    {
        public override string ImageDirectory { get{return "Wedding";}}
        public override HtmlGenericControl imageHolderControl { get { return this.ulImageHolder; } }
        public override HtmlGenericControl BlogHolder { get { return this.divBlogHolder; } }

        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
            ((DaveBrownPhotoMaster)(this.Master)).PageTitle = "Denver Wedding Photography, Wedding Photographer Denver Colorado";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Denver, Colorado based wedding Photographer Sly Octopus specializes in wedding, love photography, and wedding portraits.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords = "denver wedding photography, wedding Photography Denver, wedding photographer denver, wedding photography colorado, colorado wedding photography, wedding, denver, colorado, photography";
        }
    }
}
