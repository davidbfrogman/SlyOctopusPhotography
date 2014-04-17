<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Menu.ascx.cs" Inherits="DaveBrownPhotography.Menu" %>
<%--<div style="cursor:pointer; padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px; height:15px; text-align:left; width:100%;"  class="MasterMenu">
    <asp:Menu runat="server" ID="mnuMainMenu"  
    Orientation="Horizontal" 
    DisappearAfter="20"
    StaticDisplayLevels="1"
    DynamicEnableDefaultPopOutImage="false"
    StaticEnableDefaultPopOutImage="false"
    >
     <DynamicMenuStyle BackColor="#E9E6DD" CssClass=""/>
     <DynamicSelectedStyle BackColor="#E9E6DD" />
      <DynamicMenuItemStyle HorizontalPadding="0px" VerticalPadding="0px" />
     <DynamicHoverStyle BackColor="#E9E6DD"/>
    </asp:Menu>
</div>--%>

<%--<div class="RPTmenu">
<asp:Repeater ID="rptMainLinksLevel1" runat="server">
    <HeaderTemplate></HeaderTemplate>
    <ItemTemplate>
        <a href="<%# Eval("Url")%>">  <%# Eval("DisplayText")%> </a>
    </ItemTemplate>
    <FooterTemplate></FooterTemplate>
</asp:Repeater>
<br />
<br />
<br />
<asp:Repeater ID="rptMainLinksLevel2" runat="server">
    <HeaderTemplate></HeaderTemplate>
    <ItemTemplate>
        <a href="<%# Eval("Url")%>" title=" <%# Eval("Title")%> "> <%# Eval("DisplayText")%> </a>
    </ItemTemplate>
    <FooterTemplate></FooterTemplate>
</asp:Repeater>

<br />
</div>--%>
<div class="RPTmenu">
<ul id="coolMenu">   <li><a href="Home.aspx" title="Home">HOME</a></li>   <li>        <a href="#">PORTFOLIO</a>        <ul class="noJS">            <li><a href="Denver-Engagement-Photographer.aspx" title=" Denver Engagement Photographer ">ENGAGEMENT PHOTOGRAPHY</a></li>            <li><a href="Denver-Fashion-Photographer.aspx" title=" Denver Fashion Photographer ">FASHION PHOTOGRAPHY</a></li>            <li><a href="Denver-Food-Photographer.aspx" title=" Denver Food Photographer ">FOOD PHOTOGRAPHY</a></li>            <li><a href="Denver-Wedding-Photographer.aspx" title=" Denver Wedding Photographer ">WEDDING PHOTOGRAPHY</a></li>            <li><a href="Denver-Portrait-Photographer.aspx" title=" Denver Portrait Photographer ">PORTRAIT PHOTOGRAPHY</a></li>            <li><a href="Denver-Senior-Portrait-Photographer.aspx" title=" Denver Senior Portrait Photographer ">SENIOR PORTRAITS</a></li>            <li><a href="Denver-Pet-Portrait-Photographer.aspx" title=" Denver Pet Portrait Photographer ">PET PHOTOGRAPHY</a></li>            <li><a href="Denver-Commercial-Photographer.aspx" title=" Denver Commercial Photographer ">COMMERCIAL PHOTOGRAPHY</a></li>		</ul>   </li>   <li><a href="BlogInstall/index.php" title="Blog">BLOG</a></li>   <li><a href="About.aspx" title="About Denver Photographer Sly Octopus Photography">ABOUT</a></li>   <li><a href="Contact.aspx" title="Contact Denver Photographer Sly Octopus Photography">CONTACT</a></li></ul>
</div>