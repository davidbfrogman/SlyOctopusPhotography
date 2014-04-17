<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="RotatingImageBanner.ascx.cs" Inherits="DaveBrownPhotography.Controls.RotatingImageBanner" %>
<script language="javascript" type="text/javascript" >

// Set slideShowSpeed (milliseconds)
var slideShowSpeed = 3000;
// Duration of crossfade (seconds)
var crossFadeDuration = 3;
// Specify the image files
/*This section was commented out because we are doing this dynamically 
in code behind to cycle all the images in the home directory.
//var Pic = new Array();
//// to add more images, just continue
//// the pattern, adding to the array below

//Pic[0] = '/Images/ShotsForHomePage/AdrienneSkullSweater.jpg'
//Pic[1] = '/Images/ShotsForHomePage/AshleyRedlineEye.jpg'
//Pic[2] = '/Images/ShotsForHomePage/AshleyRedLineHandsUp.jpg'
//Pic[3] = '/Images/ShotsForHomePage/Rockabilly3.jpg'

*/

// do not edit anything below this line
var t;
var j = 0;
var p = Pic.length;
var preLoad = new Array();
for (i = 0; i < p; i++) {
preLoad[i] = new Image();
preLoad[i].src = Pic[i];
}
function runSlideShow() {
if (document.all) {
document.images.SlideShow.style.filter="blendTrans(duration=2)";
document.images.SlideShow.style.filter="blendTrans(duration=crossFadeDuration)";
document.images.SlideShow.filters.blendTrans.Apply();
}
document.images.SlideShow.src = preLoad[j].src;
if (document.all) {
document.images.SlideShow.filters.blendTrans.Play();
}
j = j + 1;
if (j > (p - 1)) j = 0;
t = setTimeout('runSlideShow()', slideShowSpeed);
}
//  End -->
</script>
<table cellpadding="0" cellspacing="0" width="1000px">
    <tr>
        <td>
            <img alt="Photography The art or process of creating images by radiant energy"
            src="../Images/NewLayoutImages/photographyLeftOnly.jpg" />
        </td>
        <td>
            <asp:PlaceHolder runat="server" ID="plcRotatedImage" />
        </td>
    </tr>
</table>
<asp:Button runat="server" ID="btnResize" Text="Resize" Visible="false" />