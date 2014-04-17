<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Fashion.Master"
CodeBehind="Denver-Engagement-Photographer.aspx.cs" Inherits="DaveBrownPhotography.Engagement_Photography" %>

<asp:Content runat="server" ContentPlaceHolderID="cphMain">
<h2>Denver Engagement Photographer</h2>
<div class="sidescroll">
    <ul runat="server" id="ulImageHolder" class="images">
    </ul>
</div>
<div style="float:right">
    <p>
        <br />
        My engagement photography is all about capturing you and your fiance at your best.  Whether it's being playful, a little serious, sexy,
        or just downright goofy. I want to capture it all.  This is a special time, and I want you to get photographs that you 
        will truly cherish for years to come.  I bring my knowledge of fashion photography to my engagement sessions, so you're sure
        to get images that will make your friends and family say WOW!
    </p>
    <p>
        I typically like to shoot my engagement sessions in downtown Denver because of all the great backdrops that I have at my disposal.  But
        your engagement pictures should be all about YOU!  So whatever works best for your personality is where we will do the shoot.
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
