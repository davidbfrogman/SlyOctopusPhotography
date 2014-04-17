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
    public partial class DaveBrownPhotoMaster : System.Web.UI.MasterPage, IDaveBrownPhotoMaster
    {
        public HtmlGenericControl BodyControl
        {
            get
            {
                return pageindex2;
            }
        }

        public HtmlGenericControl ScrollBarHelper
        {
            get { return scrollBarHelper; }
        }

        public string MetaDescription
        {
            get
            {
                return this.metaDescription.Content;
            }
            set
            {
                this.metaDescription.Content = value;
            }
        }

        public string MetaKeywords
        {
            get
            {
                return this.metaKeywords.Content;
            }
            set
            {
                this.metaKeywords.Content = value;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
        }

        public string PageTitle
        {
            get
            {
                return this.title.Text;
            }
            set
            {
                this.title.Text = value;
            }
        }
    }
}
