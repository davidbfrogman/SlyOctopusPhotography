using System;
namespace DaveBrownPhotography
{
    interface IDaveBrownPhotoMaster
    {
        System.Web.UI.HtmlControls.HtmlGenericControl BodyControl { get; }
        string MetaDescription { get; set; }
        string MetaKeywords { get; set; }
        string PageTitle { get; set; }
        System.Web.UI.HtmlControls.HtmlGenericControl ScrollBarHelper { get; }

    }
}
