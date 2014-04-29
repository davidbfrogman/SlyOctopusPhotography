using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using DaveBrownPhotographyBlog;

namespace DaveBrownFashionDesign.Utilities
{
    public static class CurrentRssFeed
    {
        public static RssFeed CurrentFeed { get; set; }

        static CurrentRssFeed()
        {
            ThreadPool.QueueUserWorkItem(RefreshFeedCache);
        }

        public static void RefreshFeedCache(object data)
        {
            RssReader rssReader = new RssReader();
            CurrentFeed = rssReader.Retrieve("http://www.slyoctopusphotography.com/blog/feed");
        }
    }
}