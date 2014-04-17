using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Collections.Generic;

namespace DaveBrownPhotography
{
    public class Kewords
    {
       
        public static string KeywordString = @"sly
                octopus
                photography
                denver
                engagement
                photo
                photographers
                photographer
                photos
                colorado
                commercial
                denver
                pictures
                boulder
                broomfield
                picture
                photographers
                phtography
                senior
                portrait
                edgy
                littleton
                studios
                professional
                portraits
                band
                music
                solo
                artist
                musician
                baby
                newborn
                corprate
                headshot
                high school senior
                ";
    }

    public abstract class KeywordPhrases
    {
        public static Random r = new Random();

        public abstract List<string> keywordPhrase { get; }

        public string GetRandomKeywordPhrase()
        {
            int index = GetRandomNumber(0, keywordPhrase.Count() - 1);
            return keywordPhrase[index];
        }

        public int GetRandomNumber(int min, int max)
        {
            return r.Next(min, max);
        } 
    }

    public class GeneralKeywordPhrases : KeywordPhrases
    {
        public override List<string> keywordPhrase
        {
            get
            {
                return new List<string>()
                {
                    "Denver Portrait Photographer",
                    "Denver Engagement Photographer",
                    "Denver Photographer",
                    "Colorado Portrait Photographer",
                    "Portrait Photographer in Denver",
                    "Portrait Photography in Denver",
                    "Engagement Photography in Denver",
                    "Portrait Photographer Denver",
                    "Newborn Photographer Denver",
                    "Baby Photography Denver",
                    "Headshot Photographer Denver",
                    "Corprate Headshot Photographer Denver",
                    "Band Photography Denver",
                    "Musician Photography Denver",
                    "Band Photographer Denver",
                    "Senior Portriat Photography Denver",
                    "Senior Portrait Photographer Denver",
                    "High School Portrait Photographer Denver",
                    "High School Portrait Photography Denver",
                    "Food Photography Denver",
                    "Food Photographer Denver",
                    "Wedding Photographer Denver"
                };
            }
        }
    }

    public class PicturesOfDenverKeywordPhrases : KeywordPhrases
    {
        public override List<string> keywordPhrase
        {
            get
            {
                return new List<string>()
                {
                    "Pictures of Denver",
                    "Denver Pictures",
                    "Pictures Denver",
                    "Downtown Denver Pictures",
                    "Pictures of Downtown Denver",
                };
            }
        }
    }

    public class PhotosDenverKeywordPhrases : KeywordPhrases
    {
        public override List<string> keywordPhrase
        {
            get
            {
                return new List<string>()
                {
                    "Denver Photos",
                    "Photos Denver",
                    "Photos of Denver",
                    "Photos of Downtown Denver",
                    "Downtown Denver Photos",
                };
            }
        }
    }

    public class PhotoDenverSingularKeywordPhrases : KeywordPhrases
    {
        public override List<string> keywordPhrase
        {
            get
            {
                return new List<string>()
                {
                    "Denver Photo",
                    "Photo Denver",
                    "Photo of Denver",
                    "Photo of Downtown Denver",
                    "Downtown Denver Photo",
                };
            }
        }
    }
}
