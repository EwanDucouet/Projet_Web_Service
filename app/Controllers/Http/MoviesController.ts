import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from 'App/Models/Movie';

export default class MoviesController {
    public static async generateResponse( request, response, data ) {
        const xmlBuilder = require('xmlbuilder');
        const acceptHeader = request.header('Content-Type');

        if (acceptHeader && acceptHeader.includes('application/xml')) {
            //   const builder = new xml2js.Builder();
            //   const xml = builder.buildObject(data);
            // Using xmlbuilder to create XML from JSON data
            const root = xmlBuilder.create('movies');
            data.forEach(movie => {
                const movieElement = root.ele('movie', { id: movie.id });
                movieElement.ele('title', movie.title);
                movieElement.ele('description', movie.description);
                movieElement.ele('release', movie.release);
                movieElement.ele('note', movie.note);
                movieElement.ele('created_at', movie.created_at);
                movieElement.ele('updated_at', movie.updated_at);
            });
            const xml = root.end({ pretty: true });

            return response.header('Content-Type', 'application/xml').send(xml);
        } else {
            return response.header('Content-Type', 'application/json').json(data);
        }
    }

    public async index({request, response}: HttpContextContract)
    {
        const movies = await Movie.query();
        if (movies.length < 1) {
            return response.status(404).json({message: 'Movie not found'});
        }
        return MoviesController.generateResponse(request, response, movies);
    }

    public async show({request, response, params}: HttpContextContract)
    {
        try {
            const movie = await Movie.find(params.name);
            if(movie){
                return movie;
            } else {
                return response.status(404).json({message: 'Movie not found'});
            }
        } catch (error) {
        	return response.status(500).json({error: error});
        }
    }

    public async update({request, params}: HttpContextContract)
    {
        const movie = await Movie.find(params.name);
        if (movie) {
            movie.title = request.input('title');
            movie.description = request.input('description');
            movie.release = request.input('release');
            movie.note = request.input('note');

            if (await movie.save()) {
            	return movie;
        	}
        	return; // 422
        }
        return; // 401
    }

    public async store({request, response}: HttpContextContract)
    {
        const movie = new Movie();
        movie.title = request.input('title');
        movie.description = request.input('description');
        movie.release = request.input('release');
        movie.note = request.input('note');
        await movie.save();
        return movie;
    }

    public async destroy({response, request, params}: HttpContextContract)
    {
        const movie = await Movie.query().where('name', params.name).delete();
        return response.json({message:"Deleted successfully"});
    }
}
