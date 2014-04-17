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
    public partial class Band_Photography : PortfolioBasePage
    {
        public override string ImageDirectory { get{return "Band";}}
        public override HtmlGenericControl imageHolderControl { get { return this.ulImageHolder; } }
        public override HtmlGenericControl BlogHolder { get { return this.divBlogHolder; } }

        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
            ((DaveBrownPhotoMaster)(this.Master)).PageTitle = "Denver Band Photography, Band Photographer Denver Colorado, Musician Photographer Denver";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Denver, Colorado based band Photographer Sly Octopus specializes in band, musician photography, and music portraits.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords = "denver music photography, music Photography Denver, music photographer denver, music photography colorado, colorado music photography, music, denver, colorado, photography, band";
        }
    }
}
