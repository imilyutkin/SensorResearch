using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using SensorResearch.Domain;
using SensorResearch.Domain.Models;
using SensorResearch.Domain.Services;

namespace SensorResearch.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public void SaveResults(string msg)
        {
            var service = new ExperimentService();
            IList<ExperimentData> datas =
                JsonConvert.DeserializeObject<IList<ExperimentDataTime>>(msg)
                    .Select(
                        data =>
                            new ExperimentData
                            {
                                TimeOfMotorReaction = data.ReactTime,
                                TimeOfSensorReaction = data.SeeTime
                            }).ToList();
            var result = new ExperimentResult
            {
                User = GetCurrentUserProfile(),
                ExpirementDate = DateTime.Now,
                Distance = 1,
                AmountOfStimuls = 2,
                ExperimentDatas = datas,
                AvarageTimeOfMotorReaction = datas.Average(data => data.TimeOfMotorReaction),
                AvarageTimeOfSensorReaction = datas.Average(data => data.TimeOfSensorReaction)
            };
            service.Save(result);
        }

        private UserProfile GetCurrentUserProfile()
        {
            return UsersContext.Current.UserProfiles.First(user => user.UserName.Equals(User.Identity.Name));
        }
    }

    public class ExperimentDataTime
    {
        public float SeeTime
        {
            get;
            set;
        }

        public float ReactTime
        {
            get;
            set;
        }
    }
}
