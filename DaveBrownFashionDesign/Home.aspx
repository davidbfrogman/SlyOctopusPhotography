<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="DaveBrownPhotography.Fashion.Home" MasterPageFile="Fashion.Master" %>
<%@ Register Src="~/Controls/LatestBlogPosts.ascx" TagName="LatestBlogPosts" TagPrefix="dbp" %>
<asp:Content runat="server" ContentPlaceHolderID="cphMain">
    <div id="billboard" class="loading">
        <img src="/Photographer/FullHomeLayout/DSC_5844-Edit.jpg" alt="Denver Photographer" style="left:250px;" >
    </div>
    <div style="position:absolute; top:1500px; left:0px;"><dbp:LatestBlogPosts runat="server" ID="latestBlogs"/>
    <p>
Take a look at my distinctive <a href="Denver-Engagement-Photographer.aspx" style="font-weight:bold;" title="Denver Engagement Photographer">denver engagement photography</a>.
</p>
<p>
See my <a href="Denver-Fashion-Photographer.aspx" title="Denver fashion Photographer">fashion photography in denver<a>
</p>
<p>
Feel free to take a peek at my <a href="Denver-Wedding-Photographer.aspx" title="Denver Wedding Photographer">denver wedding photography</a>.
</p>
<p>
I don't just take a portrait I tries to capture the character behind the portrait. I love working with new and interesting people, to try and capture a portrait that works for you.
See my <a href="Denver-Portrait-Photographer.aspx" title="Denver Portrait Photographer">artistic portrait photography</a>.    
</p>
<p>
I brings his artistic approach to my <a href="Denver-Commercial-Photographer.aspx" title="Denver Commercial Photographer">commercial photography</a> work in denver colorado and the surrounding areas.
</p>
<p>
I shoots on location and at a professional photography studio located in Downtown Denver.
</p>
<p>
Also Serving: Arvada, Aurora, Avondale, Broomfield, Centennial, Denver,
Englewood, Fort Collins, Golden, Greeley, Lafayette, Littleton, 
Longmont, Loveland, Pierce, Reunion, 
Wellington, Westminster, and other Colorado areas.
</p>
<p>
Please feel free to <a href="Contact.aspx" rel="nofollow" title="Contact Denver Portrait Photographer">contact</a> me for my rates.
</p>
Quick Links:
<p>
Are you looking for a <b><a href="Denver-Engagement-Photographer.aspx" title="Denver Engagement Photograper">Denver Engagement Photographer</a></b>?
Maybe you're trying to find a <b><a href="Denver-Portrait-Photographer.aspx" title="Denver Portrait Photograper">Denver Portrait Photographer</a></b>?
How about a <b><a href="Denver-Fashion-Photographer.aspx" title="Denver Fashion Photograper">Denver Fashion Photographer</a></b>?
Or Maybe a <b><a href="Denver-Wedding-Photographer.aspx" title="Denver Wedding Photograper">Denver Wedding Photographer</a></b>?
Well then you've come to the right place.
</p>
<p>
    Address: 3501 Wazee Street Denver, CO 80216
    Phone: 303-949-6889
    Email: info@davebrownpho<span style="display:none; visibility:hidden;">x</span>tography.com
</p>
</div>
<%--<dbp:AffiliateLinks ID="links" runat="server" />--%>
</asp:Content>