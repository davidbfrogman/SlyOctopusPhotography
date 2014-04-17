<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Fashion.Master"
CodeBehind="Denver-Commercial-Photographer.aspx.cs" Inherits="DaveBrownPhotography.Commercial_Photography" %>

<asp:Content runat="server" ContentPlaceHolderID="cphMain">
<h2>Denver Commercial Photographer</h2>
<div class="sidescroll">
    <ul runat="server" id="ulImageHolder" class="images">
    </ul>
</div>
<div style="float:right">
    <p>
        <br />
    My commercial photography has a more creative feel to it than most denver commercial photographers.  I bring my knowledge of fashion,
    and an artistic eye to my commercial shoots.  I try to create images that will captivate.  I want to show off the best aspects
    of any business.  I use my artistic skills to create images that are sure to make your clients say wow.  Anything from
    headshots to product shoots, I can do it all.  You will get clean crisp images that only a skilled photographer with the 
    right tools can capture.
</p>
<p>
    My clients have included The Bank and Boston Lofts, The Denver Center For Perfoming Arts, The Denver Aquarium, Linger, New York Food Review, and many others.
</p>
<p>
    Please feel free to <a href="Contact.aspx" rel="nofollow">contact</a> me and we can speak further about what might
    work for your business.  
</p>
</div>
<div id="divBlogHolder" runat="server" />
<script>
    //$(document).ready(function () { rsn.uniformHeight(530); });
    //$(document).ready(function () { rsn.resizeLayout(); });
</script>
</asp:Content>
