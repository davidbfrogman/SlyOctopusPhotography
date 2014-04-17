<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Fashion.Master"
CodeBehind="Denver-Band-Music-Photographer.aspx.cs" Inherits="DaveBrownPhotography.Band_Photography" %>

<asp:Content runat="server" ContentPlaceHolderID="cphMain">
<h2>Denver Band Music Photographer</h2>
<div class="sidescroll">
    <ul runat="server" id="ulImageHolder" class="images">
    </ul>
</div>
<div style="float:right">
    <p>
        <br />
            Man do I love working with bands.  Creative people are always the most fun to take portraits of.  Working with 
            Musicians is a real passion of mine.  I haven't had a chance to work with a lot of bands around town, but I'd love 
            to be able to put together a package that meets the needs of your band, artist or musician.  Working in Denver
            gives me a ton of access to both amazing locations and amazing backdrops.  I can't wait to work with 
            you!
        </p>
        <p>
            Please feel free to <a href="Contact.aspx" rel="nofollow">contact</a> me for my rates.
        </p>
        <p>
            I photograph on location in the <b>Denver</b> metro area, but I am also available to shoot almost anywhere
            in the front range area.  Fort Collins, Boulder, Estes Park, etc.  Depending on location there might be a travel fee.
        </p>
</div>
<div id="divBlogHolder" runat="server" />
</asp:Content>
