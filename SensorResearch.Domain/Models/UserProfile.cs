using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SensorResearch.Domain.Models
{
    [Table("UserProfile")]
    public class UserProfile
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string UserName { get; set; }

        [MaxLength(6)]
        public String GroupNumber
        {
            get;
            set;
        }

        public String LastName
        {
            get;
            set;
        }
    }
}