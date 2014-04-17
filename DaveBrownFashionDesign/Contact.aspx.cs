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
using System.Net.Mail;
using System.Net;
using DaveBrownPhotography.Fashion;

namespace DaveBrownPhotography
{
    public partial class Contact : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ((DaveBrownPhotoMaster)(this.Master)).PageTitle = "Contact Denver Photographer Sly Octopus Photography";
            ((DaveBrownPhotoMaster)(this.Master)).MetaDescription = "Feel Free to contact Denver, Colorado based Photographer Sly Octopus. Sly Octopus is a Denver Portrait Photographer who specializes in Engagement, Senior Portraits, Commercial, Pet Portraits, and Fashion Photography.";
            ((DaveBrownPhotoMaster)(this.Master)).MetaKeywords = "denver photographer, denver engagement photographer, phototgrapher denver, contact, contact Sly Octopus Photography";
            btnSend.Click += new EventHandler(btnSend_Click);
            ((DaveBrownPhotoMaster)(this.Master)).BodyControl.Style.Add("overflow-y", "auto");
            ((DaveBrownPhotoMaster)(this.Master)).BodyControl.Style.Add("overflow-x", "auto");
            ((DaveBrownPhotoMaster)(this.Master)).ScrollBarHelper.Visible = false;
        }

        protected void btnSend_Click(object sender, EventArgs e)
        {
            lblSendConfirmation.Visible = true;
				try
				{
					MailMessage email = new MailMessage(txtEmail.Text
																	 , "info@slyoctopusphotography.com"
                                                                     , "[" + txtName.Text + "]" + "[" + txtEmail.Text + "]" + txtSubject.Text
																	 , txtMessage.Text);
                    email.ReplyToList.Add(new MailAddress(txtEmail.Text));

					System.Net.Mail.SmtpClient smtpClient = new SmtpClient(System.Configuration.ConfigurationManager.AppSettings["SmtpServer"],587);
					smtpClient.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["SmtpUser"]
																				  , ConfigurationManager.AppSettings["SmtpPassword"]);
                    smtpClient.EnableSsl = true;
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

					smtpClient.Send(email);
					lblSendConfirmation.Text = "Thanks!  I promise I'll get back to you as soon as I can.";
					tblSendNote.Visible = false;
					spnFeelFree.Visible = false;
				}
				catch
				{
                    tblSendNote.Visible = false;
                    spnFeelFree.Visible = false;
					lblSendConfirmation.Text = "Boooo... I think my contact form is broken.  Can you please just send me an email at: info@davebrownphotography.com";
                    lblSendConfirmation.Style.Add("background-color", "red");
				}
        }
    }
}
