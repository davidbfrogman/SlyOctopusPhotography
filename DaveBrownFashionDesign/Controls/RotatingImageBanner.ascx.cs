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
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;
using System.Text;
using System.Drawing.Drawing2D;

namespace DaveBrownPhotography.Controls
{
    public partial class RotatingImageBanner : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //Load up random image
            if (this.Visible)
            {
                LoadRandomImage();
                btnResize.Click += new EventHandler(btnResize_Click);
                this.Page.ClientScript.RegisterClientScriptBlock(this.Page.GetType(), "ImagesForArray", GetImagesScript(), true);
                ((IDaveBrownPhotoMaster)(this.Page.Master)).BodyControl.Attributes.Add("onLoad", "runSlideShow()");
            }
        }

        private string GetImagesScript()
        {
            DirectoryInfo di = new DirectoryInfo(Server.MapPath("~/Images/ShotsForHomePage"));

            FileInfo[] rgFiles = di.GetFiles("*.jpg");
            List<FileInfo> files = rgFiles.ToList<FileInfo>();

            StringBuilder jsImageArray = new StringBuilder();
            jsImageArray.Append("var Pic = new Array();");
            int i = 0;
            foreach (FileInfo fi in files)
            {
                //Pic[0] = '/Images/ShotsForHomePage/AdrienneSkullSweater.jpg'
                jsImageArray.AppendFormat("Pic[{0}] = '/Images/ShotsForHomePage/{1}';", i.ToString(), fi.Name);
                i++;
            }
            return jsImageArray.ToString();
        }

        #region Resizing Code
        void btnResize_Click(object sender, EventArgs e)
        {
            DirectoryInfo di = new DirectoryInfo(Server.MapPath("~/Images/Resizing"));

            FileInfo[] rgFiles = di.GetFiles("*.jpg");
            List<FileInfo> files = rgFiles.ToList<FileInfo>();

            foreach (FileInfo fi in files)
            {
                System.Drawing.Image img = System.Drawing.Image.FromFile(fi.FullName);
                ResizeImage(fi.FullName, fi.FullName.Replace("Resizing", "Output"), 1600, 500, false, 99);
            }
        }

        private void saveJpeg(string path, Bitmap img, long quality)
        {
            // Encoder parameter for image quality
            EncoderParameter qualityParam = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, quality);

            // Jpeg image codec
            ImageCodecInfo jpegCodec = this.getEncoderInfo("image/jpeg");

            if (jpegCodec == null)
                return;

            EncoderParameters encoderParams = new EncoderParameters(1);
            encoderParams.Param[0] = qualityParam;

            img.Save(path, jpegCodec, encoderParams);
        }

        public void ResizeImage(string OriginalFile, string NewFile, int NewWidth, int MaxHeight, bool OnlyResizeIfWider, long quality)
        {
            System.Drawing.Image FullsizeImage = System.Drawing.Image.FromFile(OriginalFile);

            // Prevent using images internal thumbnail
            FullsizeImage.RotateFlip(System.Drawing.RotateFlipType.Rotate180FlipNone);
            FullsizeImage.RotateFlip(System.Drawing.RotateFlipType.Rotate180FlipNone);

            if (OnlyResizeIfWider)
            {
                if (FullsizeImage.Width <= NewWidth)
                {
                    NewWidth = FullsizeImage.Width;
                }
            }

            int NewHeight = FullsizeImage.Height * NewWidth / FullsizeImage.Width;
            if (NewHeight > MaxHeight)
            {
                // Resize with height instead
                NewWidth = FullsizeImage.Width * MaxHeight / FullsizeImage.Height;
                NewHeight = MaxHeight;
            }

            System.Drawing.Image NewImage = FullsizeImage.GetThumbnailImage(NewWidth, NewHeight, null, IntPtr.Zero);

            // Clear handle to original file so that we can overwrite it if necessary
            FullsizeImage.Dispose();

            // Save resized picture
            saveJpeg(NewFile, (Bitmap)NewImage, quality);
        }


        private static System.Drawing.Image resizeImage(System.Drawing.Image imgToResize, Size size)
        {
            int sourceWidth = imgToResize.Width;
            int sourceHeight = imgToResize.Height;

            float nPercent = 0;
            float nPercentW = 0;
            float nPercentH = 0;

            nPercentW = ((float)size.Width / (float)sourceWidth);
            nPercentH = ((float)size.Height / (float)sourceHeight);

            if (nPercentH < nPercentW)
                nPercent = nPercentH;
            else
                nPercent = nPercentW;

            int destWidth = (int)(sourceWidth * nPercent);
            int destHeight = (int)(sourceHeight * nPercent);

            Bitmap b = new Bitmap(destWidth, destHeight);
            Graphics g = Graphics.FromImage((System.Drawing.Image)b);
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;

            g.DrawImage(imgToResize, 0, 0, destWidth, destHeight);
            g.Dispose();

            return (System.Drawing.Image)b;
        }

        private ImageCodecInfo getEncoderInfo(string mimeType)
        {
            // Get image codecs for all image formats
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();

            // Find the correct image codec
            for (int i = 0; i < codecs.Length; i++)
                if (codecs[i].MimeType == mimeType)
                    return codecs[i];
            return null;
        }
        #endregion

        protected void LoadRandomImage()
        {
            DirectoryInfo di = new DirectoryInfo(Server.MapPath("~/Images/ShotsForHomePage"));

            FileInfo[] rgFiles = di.GetFiles("*.jpg");
            List<FileInfo> files = rgFiles.ToList<FileInfo>();

            Random r = new Random();
            int randomIndex = r.Next(0, files.Count);

            System.Web.UI.WebControls.Image image = new System.Web.UI.WebControls.Image() { ImageUrl = String.Format("~/Images/ShotsForHomePage/{0}", files[randomIndex].Name) };
            image.Attributes.Add("name", "SlideShow");
            image.Attributes.Add("width", "619px");
            image.Attributes.Add("height", "440px");

            plcRotatedImage.Controls.Add(image);

        }
    }
}