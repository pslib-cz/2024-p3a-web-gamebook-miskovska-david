using GameBook.Server;
using GameBook.Server.Data;
using Microsoft.EntityFrameworkCore;
using GameBook.Server.Interfaces;
using GameBook.Server.Managers;
using GameBook.Server.Models;
using GameBook.Server.Repository;
using Microsoft.AspNetCore.Identity;
var builder = WebApplication.CreateBuilder();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(
        options => options.UseSqlite("Data Source=gamebook.db")
);


//Automapper
builder.Services.AddAutoMapper(typeof(AutomapperConfigurationProfile));
//Room services
builder.Services.AddScoped<IRoomManager, RoomManager>();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<IBaseRepository<Room>, RoomRepository>();
//Item services
builder.Services.AddScoped<IItemManager, ItemManager>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<IBaseRepository<Item>, ItemRepository>();
//Location services
builder.Services.AddScoped<ILocationManager, LocationManager>();
builder.Services.AddScoped<ILocationRepository, LocationRepository>();
builder.Services.AddScoped<IBaseRepository<Location>, LocationRepository>();
//Character services
builder.Services.AddScoped<ICharacterManager, CharacterManager>();
builder.Services.AddScoped<ICharacterRepository, CharacterRepository>();
builder.Services.AddScoped<IBaseRepository<Character>, CharacterRepository>();


builder.Services.AddIdentity<IdentityUser, IdentityRole>(
    options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequiredLength = 6;
    }
    ).AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


app.MapFallbackToFile("/index.html");

app.Run();
