using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Helpers;
using System.Web.Mvc;
using Newtonsoft.Json;
using SensorResearch.Domain;
using SensorResearch.Domain.Models;
using SensorResearch.Domain.Services;

namespace SensorResearch.Web.Controllers
{
    public class HomeController : Controller
    {
        protected readonly ExperimentService Service;

        public HomeController()
        {
            Service = new ExperimentService();
        }

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
        public ActionResult SaveResults(string msg)
        {
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
            var resultId = Service.Save(result);
            return new JsonResult
            {
                Data = new { id = resultId }
            };
        }

        [HttpGet]
        public JsonResult GetResultData(int id)
        {
            var results = Service.GetResultsById(id);
            var tmp = JsonConvert.SerializeObject(results);
            return new JsonResult
            {
                Data = tmp,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

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
