using System.Linq;
using System.Web.Mvc;
using SensorResearch.Domain;
using SensorResearch.Domain.Models;
using SensorResearch.Domain.Services;

namespace SensorResearch.Web.Controllers
{
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
            var results = Service.GetLastExperimentForUser(GetCurrentUserProfile());
            return View(results);
        }

        private UserProfile GetCurrentUserProfile()
        {
            return UsersContext.Current.UserProfiles.First(user => user.UserName.Equals(User.Identity.Name));
        }
    }
}
