using System.Linq;
using System.Web.Mvc;
using System.Web.Security;
using SensorResearch.Domain;
using SensorResearch.Domain.Models;
using SensorResearch.Domain.Services;
using SensorResearch.Web.Filters;
using WebMatrix.WebData;

namespace SensorResearch.Web.Controllers
{
    [InitializeSimpleMembership]
    public class ProfileController : Controller
    {
        protected readonly ExperimentService Service;

        public ProfileController()
        {
            Service = new ExperimentService();
        }

        //
        // GET: /Profile/

        public ActionResult Index()
        {
            if (User.IsInRole("admin"))
            {
                var allResults = Service.GetAll();
                return View(allResults);
            }
            var results = Service.GetLastExperimentForUser(GetCurrentUserProfile());
            return View(results);
        }

        private UserProfile GetCurrentUserProfile()
        {
            return UsersContext.Current.UserProfiles.First(user => user.UserName.Equals(User.Identity.Name));
        }
    }
}
