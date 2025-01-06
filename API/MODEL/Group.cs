using System.ComponentModel.DataAnnotations;

namespace API.MODEL;

public class Group
{
    [Key]
    public required string Name { get; set; }
    public ICollection<Connection> Connections { get; set; } = [];
}
