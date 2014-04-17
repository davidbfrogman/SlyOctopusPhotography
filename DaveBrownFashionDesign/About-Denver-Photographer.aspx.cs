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
using DaveBrownPhotography.Fashion;

namespace DaveBrownPhotography
{
    public partial class About : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ((DaveBrownPhotoMaster)(this.Master)).PageTitle = "About Denver Photographer Sly Octopus Photography";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Sly Octopus talks about what photography means to him, his approach to the photographic process, and where his photography comes from.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords = "denver photographer, denver engagement photographer,denver portrait phototgrapher, about, about Sly Octopus Photography";
            ((DaveBrownPhotoMaster)(this.Master)).BodyControl.Style.Add("overflow-y", "auto");
            ((DaveBrownPhotoMaster)(this.Master)).BodyControl.Style.Add("overflow-x", "auto");
            ((DaveBrownPhotoMaster)(this.Master)).ScrollBarHelper.Visible = false;
        }
    }
}
