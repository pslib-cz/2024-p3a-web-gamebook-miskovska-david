using GameBook.Server;
using GameBook.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using GameBook.Server.Interfaces;
using GameBook.Server.Managers;
using GameBook.Server.Models;
using GameBook.Server.Repository;
var builder = WebApplication.CreateBuilder();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(
        options => options.UseSqlite("Data Source=gamebook.db")
);

builder.Services.AddAutoMapper(typeof(AutomapperConfigurationProfile));
builder.Services.AddScoped<IRoomManager, RoomManager>();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<IBaseRepository<Room>, RoomRepository>();
var app = builder.Build();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
    RequestPath = "/wwwroot"
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "uploads")),
    RequestPath = "/uploads"
});

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
