import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";
import Movie from "App/Models/Movie";


export default class CategoriesController {

    public static async generateResponse( request, response, data ) {
        const xmlBuilder = require('xmlbuilder');
        const acceptHeader = request.header('Content-Type');

        if (acceptHeader && acceptHeader.includes('application/xml')) {
            //   const builder = new xml2js.Builder();
            //   const xml = builder.buildObject(data);
            // Using xmlbuilder to create XML from JSON data
            const root = xmlBuilder.create('categories');
            data.forEach(category => {
                const categoryElement = root.ele('category', { id: category.id });
                categoryElement.ele('name', category.name);
                const categoryMovies = xmlBuilder.create('movies');
                data.movies.forEach(movie => {
                    const movieElement = categoryMovies.ele('movie', { id: movie.id });
                    movieElement.ele('title', movie.title);
                    movieElement.ele('description', movie.description);
                    movieElement.ele('release', movie.release);
                    movieElement.ele('note', movie.note);
                    movieElement.ele('created_at', movie.created_at);
                    movieElement.ele('updated_at', movie.updated_at);
                });
            });
            const xml = root.end({ pretty: true });

            return response.header('Content-Type', 'application/xml').send(xml);
        } else {
            return response.header('Content-Type', 'application/json').json(data);
        }
    }

    public async index({request, response}: HttpContextContract)
    {
        const categories = await Category.query();
        if (categories.length < 1) {
            return response.status(404).json({message: 'Category not found'});
        }
        return CategoriesController.generateResponse(request, response, categories);
    }

    public async show({request, response, params}: HttpContextContract)
    {
        try {
            const categories = await Category.find(params.name);
            if(categories){
                return categories;
            } else {
                return response.status(404).json({message: 'Category not found'});
            }
        } catch (error) {
        	return response.status(500).json({error: error});
        }
    }

    public async update({request, params}: HttpContextContract)
    {
        const categories = await Category.find(params.name);
        if (categories) {
            categories.name = request.input('name');
            categories.movies = request.input('movies');

            if (await categories.save()) {
            	return categories;
        	}
        	return; // 422
        }
        return; // 401
    }

    public async store({request, response}: HttpContextContract)
    {
        const categories = new Category();
        categories.name = request.input('name');
        categories.movies = request.input('movies');
        await categories.save();
        return categories;
    }

    public async destroy({response, request, params}: HttpContextContract)
    {
        const categories = await Category.query().where('name', params.name).delete();
        return response.json({message:"Deleted successfully"});
    }
}