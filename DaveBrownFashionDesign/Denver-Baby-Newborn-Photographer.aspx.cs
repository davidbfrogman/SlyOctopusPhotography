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
    public partial class BabyNewborn_Photography : PortfolioBasePage
    {
        //adding for testing github
        public override string ImageDirectory { get { return "Baby"; } }
        public override HtmlGenericControl imageHolderControl { get { return this.ulImageHolder; } }
        public override HtmlGenericControl BlogHolder { get { return this.divBlogHolder; } }

        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
            ((DaveBrownPhotoMaster)(this.Master)).PageTitle = "Denver Baby Newborn Photographer, Baby Newborn Photographer Denver, Baby Newborn Portraits in Denver Colorado";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Denver Baby Newborn Photographer Sly Octopus is a Baby Newborn Photographer who specializes in Baby Newborn, Newborn portraits, and Baby Photography.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords =
            @"denver Baby Newborn photographer, Baby Newborn photographer denver, 
            Baby Newborn portraits in denver, colorado portrait photographer, Baby Newborn photography, 
            denver phototgrapher, family portraits, denver, photographer";
        }
    }
}
