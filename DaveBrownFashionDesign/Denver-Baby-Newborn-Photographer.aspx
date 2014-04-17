<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Fashion.Master"
CodeBehind="Denver-Baby-Newborn-Photographer.aspx.cs" Inherits="DaveBrownPhotography.BabyNewborn_Photography" %>

<asp:Content runat="server" ContentPlaceHolderID="cphMain">
    <h2>Denver Portrait Photographer</h2>
    <div class="sidescroll">
        <ul runat="server" id="ulImageHolder" class="images" />
    </div>
<div style="float:right">
    <p>
        <br />
        Man do I love <b>photographing babies</b>.  They each have their own little personality, even at this age.  It's great to see
        how a new mother interacts with her child.  Really it's a beautiful thing.  I love seeing that warmth between the mother
        and her newborn.  There's nothing more magical than that connection that's shared between the little one and her mother.
    </p>
    <p>
        My newborn sessions are easy and fun.  I only use the safest equipment around your little one.  Natural window light, in my studio.
    </p>
    <p>
        Maybe you're looking for a newborn photographer, or a family photographer that can work with your new bundle of joy.  Either
        way I tailor my shoot to capture you and whoever else to get warm close portraits of this special time in you and your 
        babies life.
    </p>
    <p>
        Being a <b>Denver Newborn Photographer</b> is about more than just taking a picture, it's about 
        capturing a personality on film.  I love being able to capture the wonderful connection that a new mother and her
        child share.
    </p>
</div>
<div id="divBlogHolder" runat="server" />
<script>
    //$(document).ready(function () { rsn.uniformHeight(530); });
    //$(document).ready(function () { rsn.resizeLayout(); });
</script>
</asp:Content>
