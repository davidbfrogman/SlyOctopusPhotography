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

namespace DaveBrownPhotography
{
    public abstract class PortfolioBasePage : System.Web.UI.Page
    {
        public abstract string ImageDirectory { get; }
        public abstract HtmlGenericControl imageHolderControl { get; }
        public virtual KeywordPhrases keywordPhrases { get { return new GeneralKeywordPhrases(); } }
        public virtual bool ShuffleFiles { get { return false; } }

        public abstract HtmlGenericControl BlogHolder { get; }

        protected virtual void Page_Load(object sender, EventArgs e)
        {
            DirectoryInfo di = new DirectoryInfo(Server.MapPath(String.Format("~/Photographer/{0}", ImageDirectory)));

            FileInfo[] rgFiles = di.GetFiles("*.jpg");
            List<FileInfo> files = rgFiles.ToList<FileInfo>();
            if (ShuffleFiles)
            {
                files = MixList<FileInfo>(files);
            }

            int i = 1;
            foreach (FileInfo fi in files)
            {
                HtmlGenericControl listItem = new HtmlGenericControl("li");
                listItem.Style.Add("max-width", "none");

                Image image = new Image() { ImageUrl = String.Format("~/Photographer/{0}/{1}", ImageDirectory, fi.Name) };

                image.Style.Add("margin", "70px 10px 20px 0px");
                image.ID = "image-" + i.ToString();

                image.AlternateText = keywordPhrases.GetRandomKeywordPhrase();
                image.Attributes.Add("title", keywordPhrases.GetRandomKeywordPhrase());
                listItem.Controls.Add(image);
                imageHolderControl.Controls.Add(listItem);
                i++;
            }

            BlogHolder.Controls.Add(LoadControl("~/Controls/LatestBlogPosts.ascx"));
        }

        private List<E> MixList<E>(List<E> inputList)
        {
            List<E> randomList = new List<E>();

            Random r = new Random();
            int randomIndex = 0;
            while (inputList.Count > 0)
            {
                randomIndex = r.Next(0, inputList.Count); //Choose a random object in the list
                randomList.Add(inputList[randomIndex]); //add it to the new, random list
                inputList.RemoveAt(randomIndex); //remove to avoid duplicates
            }

            return randomList; //return the new random list
        }
    }
}
