using GameBook.Server.Data;
using Microsoft.EntityFrameworkCore;
using GameBook.Server.Repository;
using GameBook.Server.Interfaces;
using GameBook.Server;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(
        options => options.UseSqlite("Data Source=gamebook.db")
);

builder.Services.AddScoped(typeof(IBaseReposity<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddAutoMapper(typeof(AutomapperConfigurationProfile));
var app = builder.Build();

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
