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
                davebrown
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
                fashion
                picture
                locations
                photographers
                character
                newcastle
                nudes
                phtography
                browne
                senior
                david
                ireland
                karate
                millom
                dead
                flower
                fine
                museum
                downtown
                tennyson
                nature
                science
                photograpy
                places
                portrait
                edgy
                union
                station
                engadgement
                engaement
                littleton
                spots
                photography
                photogrphers
                center
                performing
                arts
                color
                strobe
                longmont
                shooting
                photos
                washington
                photorapher
                studios
                metro
                backdrops
                studio
                professional
                around
                station
                rates
                portraits
                band
                music
                solo
                artist
                musician
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
                    "Denver Fashion Photographer",
                    "Fashion Photographer in Denver",
                    "Colorado Portrait Photographer",
                    "Portrait Photographer in Denver",
                    "Portrait Photography in Denver",
                    "Engagement Photography in Denver",
                    "Portrait Photographer Denver",
                    "Portrait Photography Denver"
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
