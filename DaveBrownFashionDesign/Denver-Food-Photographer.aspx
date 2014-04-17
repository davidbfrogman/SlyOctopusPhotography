<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Fashion.Master"
CodeBehind="Denver-Food-Photographer.aspx.cs" Inherits="DaveBrownPhotography.Food_Photography" %>
<asp:Content runat="server" ContentPlaceHolderID="cphMain">
    <h2>Denver Food Photographer</h2>
    <div class="sidescroll">
        <ul runat="server" id="ulImageHolder" class="images">
        </ul>
    </div>
    <div style="float:right">
    <p>
        <br />
            My food photography will bring something special to your business.  Whether its shots for a upcoming event, or a magazine spread, I can bring a unique flair to any situation.
            I have a unique eye when it comes to food photography, something that shows my passion for food, and my knowledge of what looks pleasing on film.  
            I can guarantee clean unique shots for your business that will add a modern touch to anything where your food is the centerpiece.
        </p>
        <p>
            I would love to take breathtaking shots of your dishes, or even portraits of your staff.
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
