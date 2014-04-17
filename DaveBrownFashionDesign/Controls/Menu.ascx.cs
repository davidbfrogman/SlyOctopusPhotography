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

namespace DaveBrownPhotography
{
    public partial class Menu : System.Web.UI.UserControl
    {
        public DataSet menusDS = new DataSet();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                //menusDS.ReadXml(Server.MapPath("~/XML/Menus.xml"));

                //DataSet menusLevel1DS = new DataSet();
                //DataSet menusLevel2DS = new DataSet();

                //menusLevel1DS.ReadXml(Server.MapPath("~/XML/MenuLevel1.xml"));
                //menusLevel2DS.ReadXml(Server.MapPath("~/XML/MenuLevel2.xml"));

                //rptMainLinksLevel1.DataSource = menusLevel1DS.Tables[0];
                //rptMainLinksLevel1.DataBind();

                //rptMainLinksLevel2.DataSource = menusLevel2DS.Tables[0];
                //rptMainLinksLevel2.DataBind();

                //DataRelation DR = new DataRelation("InnerJoin", menusDS.Tables[0].Columns["MenuID"], menusDS.Tables[0].Columns["ParentMenuID"], true);
                //DR.Nested = true;
                //menusDS.Relations.Add(DR);

                //foreach (DataRow menuItemDR in menusDS.Tables[0].Rows)
                //{
                //    if (menuItemDR["ParentMenuID"].ToString() == "0")
                //    {
                //        MenuItem menuItem = new MenuItem()
                //        {
                //            Text = menuItemDR["DisplayText"].ToString(),
                //            NavigateUrl = menuItemDR["Url"].ToString(), 
                //            Target = menuItemDR["Target"].ToString(),
                //            ToolTip = menuItemDR["Title"].ToString(),
                //        };
                //        menuItem.Selectable = Convert.ToBoolean(menuItemDR["IsSwingItem"]) == false;
                        
                //        mnuMainMenu.StaticMenuItemStyle.CssClass = "StaticMenuLink";
                //        mnuMainMenu.DynamicMenuItemStyle.CssClass = "DynamicMenuLink";
                //        mnuMainMenu.Style.Add("text-decoration", "none");
                        
                //        mnuMainMenu.Items.Add(menuItem);
                //        AddChildMenuItems(menuItemDR, menuItem);
                //    }
                //}
            }
        }

        public void AddChildMenuItems(DataRow parentDataRow, MenuItem parentMenuItem)
        {
            //foreach (DataRow row in menusDS.Tables[0].Rows)
            //{
            //    if (row["ParentMenuID"].ToString() == parentDataRow["MenuID"].ToString())
            //    {
            //        MenuItem menuItem = new MenuItem()
            //        {
            //            Text = row["DisplayText"].ToString(),
            //            NavigateUrl = row["Url"].ToString(),
            //            Target = row["Target"].ToString(),
            //            ToolTip = row["Title"].ToString(),
            //        };
            //        menuItem.Selectable = Convert.ToBoolean(row["IsSwingItem"]) == false;
            //        parentMenuItem.ChildItems.Add(menuItem);
            //        AddChildMenuItems(row, menuItem);
            //    }
            //}
        }
    }
}