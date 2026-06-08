using RecipeManager.Api.Data;
using RecipeManager.Api.Dtos;
using Microsoft.EntityFrameworkCore;
using RecipeManager.Api.Models;

public static class TagEndpoints
{
    public static void MapTagEndpoints(this WebApplication app)
    {
        RouteGroupBuilder tags = app.MapGroup("/api/tags");

        tags.MapGet("/", async (RecipeManagerContext db) =>
            await db.Tags.Select(
                tag => new
                {
                    tag.TagId,
                    tag.TagName
                }
            ).ToListAsync()
        );


        tags.MapGet("/{id}", async (int id, RecipeManagerContext db) =>
        {
            Tag? tag = await db.Tags
                .Include(t => t.Recipes)
                .FirstOrDefaultAsync(t => t.TagId == id);

            if (tag is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(
                new TagResponse(
                    tag.TagId,
                    tag.TagName,
                    tag.Recipes.Select(
                        r => r.RecipeName
                    ).ToList()
                )
            );
        });


        tags.MapPost("/", async (CreateTagRequest tagDto, RecipeManagerContext db) =>
        {
            Tag tag = new() { TagName = tagDto.TagName };
            await db.Tags.AddAsync(tag);
            await db.SaveChangesAsync();
            return Results.Created($"/api/tags/{tag.TagId}", new TagResponse(
                tag.TagId, tag.TagName, []
            ));
        });


        tags.MapPut("/{id}", async (
            int id,
            CreateTagRequest tagDto,
            RecipeManagerContext db) =>
        {
            Tag? tag = await db.Tags.FindAsync(id);

            if (tag is null)
                return Results.NotFound();

            tag.TagName = tagDto.TagName;
            await db.SaveChangesAsync();
            return Results.NoContent();
        });


        tags.MapDelete("/{id}", async (int id, RecipeManagerContext db) =>
        {
            Tag? tag = await db.Tags.FindAsync(id);

            if (tag is null)
                return Results.NotFound();

            db.Tags.Remove(tag);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}