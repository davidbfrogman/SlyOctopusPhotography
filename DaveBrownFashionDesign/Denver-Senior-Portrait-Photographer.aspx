<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Fashion.Master"
CodeBehind="Denver-Senior-Portrait-Photographer.aspx.cs" Inherits="DaveBrownPhotography.Senior_Photography" %>

<asp:Content runat="server" ContentPlaceHolderID="cphMain">
<h2>Denver Senior Portrait Photographer</h2>
<div class="sidescroll">
    <ul runat="server" id="ulImageHolder" class="images">
    </ul>
</div>
<div style="float:right">
    <p>
        <br />
I love doing senior portraits that allow me to capture your personality at this unique time in your life.  It's all about showing the real you, and letting your friends see you for 
        exactly what you want them to.  I use modern techniques that allow me to capture breathtaking images, and portraits.  These are things I've learned over the years as a fashion
        photographer, and allow me to make amazing senior portrait images.  My senior portrait photography will stand out amongst the crowd.  No leaning on trees, no goofy poses, just 
        amazing photography.  
    </p>
    <p>
        I typically do my senior shoots in and around downtown denver, but I can do Senior Portrait Photographer, anywhere in Denver, or the surrounding front range area.  My images always
        have a modern twist on what senior portrait photography means.  
        Please feel free to <a href="Contact.aspx" rel="nofollow">contact</a> me for my rates.
    </p>
    <p>
        I photograph on location in the <b>Denver metro area</b>, but I am also available to shoot almost anywhere
        in the front range area.  Depending on location there might be a travel fee.
    </p>
</div>
<div id="divBlogHolder" runat="server" />
<script>
        //$(document).ready(function () { rsn.uniformHeight(530); });
        //$(document).ready(function () { rsn.resizeLayout(); });
</script>
</asp:Content>
