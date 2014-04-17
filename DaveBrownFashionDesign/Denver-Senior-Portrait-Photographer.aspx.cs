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
    public partial class Senior_Photography : PortfolioBasePage
    {
        public override string ImageDirectory { get{return "Senior";}}
        public override HtmlGenericControl imageHolderControl { get { return this.ulImageHolder; } }
        public override HtmlGenericControl BlogHolder { get { return this.divBlogHolder; } }


        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
            ((DaveBrownPhotoMaster)(this.Master)).PageTitle = "Denver Senior Portrait Photography, Senior Portraits in Denver Colorado";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Denver Senior Portrait Photographer Sly Octopus specializes in Senior Portrait photographer, senior portraits, and class portraits, and Senior Portrait pictures.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords = "denver Senior Portrait photography, Senior Portrait Photography Denver, Senior Portrait photographer denver, Senior Portrait photographer colorado, colorado Senior Portrait photography, Senior Portrait, denver, colorado, photography, Senior Portrait pictures denver";
        }
    }
}
