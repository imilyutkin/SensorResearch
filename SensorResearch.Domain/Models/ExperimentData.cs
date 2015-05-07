using System.ComponentModel.DataAnnotations;

namespace SensorResearch.Domain.Models
{
    public class ExperimentData : BaseEntity
    {
        [Required]
        public float TimeOfSensorReaction
        {
            get;
            set;
        }

        [Required]
        public float TimeOfMotorReaction
        {
            get;
            set;
        }
    }
}
