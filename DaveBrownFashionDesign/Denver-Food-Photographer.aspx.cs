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
    public partial class Food_Photography : PortfolioBasePage
    {
        public override string ImageDirectory { get{return "Denver-Food-Photography";}}
        public override HtmlGenericControl imageHolderControl { get { return this.ulImageHolder; } }


        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
            ((DaveBrownPhotoMaster)(this.Master)).PageTitle = "Denver Food Photographer, Food Photographer in Denver, Food Photographer Denver Colorado";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Denver Food Photographer Sly Octopus specializes in food photography, commercial photography, denver food photographer, food pictures denver.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords = "denver food photographer, Food Photographer Denver, food photography denver, food photography colorado, colorado food photography, food, denver, colorado, photography, food pictures denver";
        }

        public override HtmlGenericControl BlogHolder
        {
            get { return divBlogHolder; }
        }
    }
}
