using API.HELPER;
using Microsoft.AspNetCore.Mvc;

namespace API.CONTROLLER;

[ServiceFilter(typeof(LogUserActivity))]
[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase { }
