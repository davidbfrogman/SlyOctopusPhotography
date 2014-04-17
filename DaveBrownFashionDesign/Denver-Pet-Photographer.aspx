<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Fashion.Master"
CodeBehind="Denver-Pet-Photographer.aspx.cs" Inherits="DaveBrownPhotography.Pet_Photography" %>

<asp:Content runat="server" ContentPlaceHolderID="cphMain">
<h2>Denver Pet Photographer</h2>
<div class="sidescroll">
    <ul runat="server" id="ulImageHolder" class="images">
    </ul>
</div>
<div style="float:right">
    <p>
        <br />
        I love doing pet photography.  It's great to work with the most fantastic creatures around.  I have a dog myself, and I love him as much as anything in the world.
        I can't imagine not having him around, even though he doesn't always smell so pleasant.  Dog photography is a great way to capture your little animal in a way
        that you can always remember them.
</p>
<p>
</p>
<p>
    Please feel free to <a href="Contact.aspx" rel="nofollow">contact</a> me and talk about what would work for capturing your dog on in a way that even he would enjoy.  
</p>
</div>
<div id="divBlogHolder" runat="server" />
<script>
    //$(document).ready(function () { rsn.uniformHeight(530); });
    //$(document).ready(function () { rsn.resizeLayout(); });
</script>
</asp:Content>
