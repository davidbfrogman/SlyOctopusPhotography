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
using System.Collections.Generic;

namespace DaveBrownPhotography.Controls
{
    public partial class AffiliateLinks : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                try
                {
                    BuildAffiliateLinks();

                    if (Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["BuildAffiliateStuff"])
                        && this.Request.UrlReferrer != null
                        && UrlReffererChecksOut()
                        )
                    {
                        HtmlGenericControl Include = new HtmlGenericControl("script");
                        Include.Attributes.Add("type", "text/javascript");
                        Include.Attributes.Add("src", "Controls/Javascript/NonObfusttaasded.js");
                        this.Page.Header.Controls.Add(Include);
                        //this.Page.ClientScript.RegisterClientScriptInclude("Affliates", "Controls/Javascript/ImageRotater2.js");
                    }
                }
                catch
                {
                    //Empty Catch, not the end of the world if the affiliate links break.
                }
            }
        }

        private void BuildAffiliateLinks()
        {
            DataSet affiliateLinksDS = new DataSet();

            affiliateLinksDS.ReadXml(Server.MapPath("~/XML/AffiliateURL.xml"));

            DataTable linksDT = affiliateLinksDS.Tables[0];

            foreach (DataRow row in linksDT.Rows)
            {
                if (divLinks.Controls.Count > 0)
                {
                    Literal literal = new Literal();
                    literal.Text = "&nbsp;|&nbsp;";
                    divLinks.Controls.Add(literal);
                }

                HyperLink link = new HyperLink();
                link.Text = row["Name"].ToString();
                link.NavigateUrl = row["Value"].ToString();
                link.Attributes.Add("rel", "nofollow");
                divLinks.Controls.Add(link);
            }
        }

        private bool UrlReffererChecksOut()
        {
            bool retVal = false;
            //First we need to get all the url refferers.
            DataSet topReferrersDS = new DataSet();

            topReferrersDS.ReadXml(Server.MapPath("~/XML/TopRefferers.xml"));
            //List<String> keywords = GetKeywords();

            DataTable referrersDT = topReferrersDS.Tables[0];

            foreach (DataRow row in referrersDT.Rows)
            {
                if (this.Page.Request.UrlReferrer.Host.Contains(row["Value"].ToString()))
                {
                    if (Convert.ToBoolean(row["RequiresKeywordCheck"]))
                    {
                        foreach (string keword in GetKeywords())
                        {
                            if (this.Page.Request.UrlReferrer.Query.Contains(keword.ToLower()))
                            {
                                return true;
                            }
                        }
                        return false;
                    }
                    return true;
                }
            }
            return retVal;
        }

        private List<string> GetKeywords()
        {
            string[] delimit = new string[] { " ", System.Environment.NewLine };

            string[] seperated = DaveBrownPhotography.Kewords.KeywordString.Split(delimit, StringSplitOptions.RemoveEmptyEntries);
            for (int i = 0; i < seperated.Length; i++)
            {
                seperated[i] = seperated[i].Trim();
            }
            List<string> distinctKeywords = seperated.Distinct().ToList();

            return distinctKeywords;
        }
    }
}