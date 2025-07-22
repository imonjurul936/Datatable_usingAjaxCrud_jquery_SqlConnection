using System.Web;
using System.Web.Mvc;

namespace Teck_Geeks_2nd_attamp
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
