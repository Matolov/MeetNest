using API.MODEL;

namespace API.INTERFACE;

public interface ITokenService
{
    Task<string> CreateToken(AppUser user);
}
