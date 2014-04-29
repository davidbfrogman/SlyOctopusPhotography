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
using DaveBrownFashionDesign.Utilities;
using DaveBrownPhotographyBlog;

namespace DaveBrownPhotography.Controls
{

    public partial class LatestBlogPosts : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!Convert.ToBoolean(ConfigurationManager.AppSettings["BlogDown"]))
                {

                    string mainTemplate = "%Items%";
                    string itemsTemplateFormat = "<div class=\"blogItem\" ><h2><a href=\"%Link%\"> %Title% </a></h2><div>%Description%</div></div>";

                    RssHtmlMaker htmlMaker = new RssHtmlMaker();
                    htmlMaker.MaxItems = 5;

                    Literal lit = new Literal();
                    lit.Text = htmlMaker.GetHtmlContents(CurrentRssFeed.CurrentFeed, mainTemplate, itemsTemplateFormat, string.Empty);
                    plcBlogPosts.Controls.Add(lit);
                }
            }
            catch
            {
            }
        }
    }
}