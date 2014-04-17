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

namespace DaveBrownPhotography.Fashion
{
    public partial class Home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ((IDaveBrownPhotoMaster)(this.Master)).BodyControl.Attributes["class"] = " bleed left";
            ((DaveBrownPhotoMaster)(this.Master)).ScrollBarHelper.Visible = false;
        }
    }
}
