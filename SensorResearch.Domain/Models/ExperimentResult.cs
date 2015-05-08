using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SensorResearch.Domain.Models
{
    public class ExperimentResult : BaseEntity
    {
        [Required]
        public UserProfile User
        {
            get;
            set;
        }

        [Required]
        public int AmountOfStimuls
        {
            get;
            set;
        }

        [Required]
        public int Distance
        {
            get;
            set;
        }

        [Required]
        public DateTime ExpirementDate
        {
            get;
            set;
        }

        [Required]
        public float AvarageTimeOfSensorReaction
        {
            get;
            set;
        }

        [Required]
        public float AvarageTimeOfMotorReaction
        {
            get;
            set;
        }

        public virtual ICollection<ExperimentData> ExperimentDatas
        {
            get;
            set;
        }
    }
}
