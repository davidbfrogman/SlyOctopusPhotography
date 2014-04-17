<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Fashion.Master"
CodeBehind="Denver-Wedding-Photographer.aspx.cs" Inherits="DaveBrownPhotography.Wedding_Photography" %>

<asp:Content runat="server" ContentPlaceHolderID="cphMain">
<h2>Denver Wedding Photographer</h2>
<div class="sidescroll">
    <ul runat="server" id="ulImageHolder" class="images">
    </ul>
</div>
<div style="float:right">
    <p>
        <br />
            I see denver wedding photography as another avenue where I can be extremely creative.  
            I try and capture your wedding in an artistic, thoughtful, and wonderfully beautiful way.
            The way that you meant for your wedding to be experienced.  I can promise you that you will get tons of clean, crisp wedding pictures of your big day.  
            I understand
            how important this day is to you and your fiance, and I'll be honest about what you can 
            expect from me on your wedding day.  
            <b>Denver Wedding photography</b> is something I take very seriously, and I would love to speak
            more with you about hiring me for your big day.  
        </p>
        <p>
            Please feel free to <a href="Contact.aspx" rel="nofollow">contact</a> me for my rates.
        </p>
        <p>
            I photograph on location in the <b>Denver</b> metro area, but I am also available to shoot almost anywhere
            in the front range area.  Depending on location there might be a travel fee.
        </p>
</div>
<div id="divBlogHolder" runat="server" />
    <script>
        //$(document).ready(function () { rsn.uniformHeight(530); });
        //$(document).ready(function () { rsn.resizeLayout(); });
</script>
</asp:Content>
