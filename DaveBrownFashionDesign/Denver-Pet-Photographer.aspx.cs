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
    public partial class Pet_Photography : PortfolioBasePage
    {
        public override string ImageDirectory { get{return "Pet";}}
        public override HtmlGenericControl imageHolderControl { get { return this.ulImageHolder; } }
        public override HtmlGenericControl BlogHolder { get { return this.divBlogHolder; } }

        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
				((DaveBrownPhotoMaster)(this.Master)).PageTitle = "Denver Pet Photographer, Pet Photographer in Denver Colorado";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Denver Pet Photographer Sly octopus photography is great at captures your precious furry friends.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords = "denver photographer, denver pet photographer, phototgrapher denver, pet photography denver, pets, dog.";
        }
    }
}
