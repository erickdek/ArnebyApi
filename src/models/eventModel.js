import Event from '../schemas/db/eventSchema.js';
import logger from '../services/logger.js';
import JsonR from '../models/jsonModel.js';

class eventModel{

    /**
     * Ingresa un evento en mongodb.
     * @param {String} title - Titulo del evento.
     * @param {String} slug - Slug con guiones para el evento.
     * @param {number} content - Contenido del evento Descripción
     * @param {number} longitude - Longitud de la ubicacion del evento
     * @param {number} latitude - Latitud de la ubicacion del evento
     * @param {String} country - Pais del evento
     * @param {String} province - Provincia/Estado/Region del evento
     * @param {String} address - Direccion del evento
     * @param {Boolean} virtual - Es virtual el evento true o false
     * @param {Array} links - Array de links [titulo, url]
     * @param {ObjectId} organizer - Id de mongodb del usuario organizador (quien publico)
     * @param {Date} startDate - Fecha de inicio del evento
     * @param {Date} endDate - Fecha de fin del evento
     * @param {Image} featuredImage - Id de mongodb de la coleccion imagenes
     * @returns {Object} JsonR con todo el resultado final.
     */
    static async set({title, slug, content, category, location, virtual, links, prices, organizer, startDate, endDate, featuredImage, promoted, levelPromoted, state}){
        try {
            const newEvent = new Event({
                title: title,
                slug: slug,
                content: content,
                category: category,
                location: location,
                virtual: virtual,
                links: links,
                prices: prices,
                organizer: organizer,
                startDate: startDate,
                endDate: endDate,
                featuredImage: featuredImage,
                promoted: promoted,
                levelPromoted: levelPromoted,
                state: state,
            })

            const saveEvnt = await newEvent.save();
            return new JsonR(200,true,'event-model-set','Event create successfully', saveEvnt);
        } catch (err) {
            console.error(err);
            return new JsonR(500, false, 'event-model-set', 'Error Interno', {});
        }
    }

    /**
     *  Add new short Event with little data.
     * @param {String} linkTitle - event link title: whatsapp, meetup, facebook group.
     * @param {String} linkURL - event link url: https://example.com.
    * @returns {Object} JsonR with the data/errors.
    */
    static async addOneLink({eventId, linkTitle, linkURL}){
        try {
            //Get the event by the _id
            const EventFind = await Event.findById(eventId);

            //Check if the event exists
            if (!EventFind) {
                return new JsonR(404, false, 'event-model-addOneLink', 'Event not found', {});
            }

            // Add a new link in the event
            EventFind.links.push({ title: linkTitle, url: linkURL });

            // Save the event in the database
            const saveEvnt = await EventFind.save();

            return new JsonR(200, true, 'event-model-addOneLink', 'Event add link successfully', saveEvnt);
        } catch (err) {
            return new JsonR(500, false, 'event-model-addOneLink', 'Error Interno', {});
        }
    }

    /**
     * Add links to the event.
     * @param {ObjectId} eventId - Id del evento
     * @param {Array} links - Array of links [{ title: "whatsapp", url: "https://example.com" }, ...]
     * @returns {Object} JsonR with the data/errors.
     */
    static async addLinks({ eventId, links }) {
        try {
        // Obtiene el evento por el _id
        const event = await Event.findById(eventId);
    
        // Verifica si el evento existe
        if (!event) {
            return new JsonR(404, false, 'event-model-addLinks', 'Event not found', {});
        }
    
        // Agrega los nuevos enlaces al array de links
        event.links.push(...links);
    
        // Guarda el evento actualizado en la base de datos
        const saveEvent = await event.save();
    
        return new JsonR(200, true, 'event-model-addLinks', 'Event add links successfully', saveEvent);
        } catch (err) {
            return new JsonR(500, false, 'event-model-addLinks', 'Error Interno', {});
        }
    }

    /**
     * Replace existing links with new links in the event.
     * @param {ObjectId} eventId - Id del evento
     * @param {Array} links - Array of links [{ title: "whatsapp", url: "https://example.com" }, ...]
     * @returns {Object} JsonR with the data/errors.
     */
    static async replaceLinks({ eventId, links }) {
        try {
            // Obtiene el evento por el _id
            const event = await Event.findById(eventId);
        
            // Verifica si el evento existe
            if (!event) {
                return new JsonR(404, false, 'event-model-replaceLinks', 'Event not found', {});
            }
        
            // Reemplaza los enlaces existentes con los nuevos enlaces
            event.links = links;
        
            // Guarda el evento actualizado en la base de datos
            const saveEvent = await event.save();
        
            return new JsonR(200, true, 'event-model-replaceLinks', 'Event links replaced successfully', saveEvent);
        } catch (err) {
            return new JsonR(500, false, 'event-model-replaceLinks', 'Error Interno', {});
        }
    }

    /**
     * Get an event by its ID.
     * @param {string} id - The ID of the event.
     * @returns {Object} JsonR with the data/errors.
     */
    static async getById({ id } ) {
        try {
            const event = await Event.findById(id)
                .populate({
                    path: 'featuredImage',
                    select: '-author'
                })
                .populate({
                    path: 'category',
                    select: '-createdAt -updatedAt -__v'
                })
                .populate({
                    path: 'organizer',
                    select: '-_id -role -createdAt -updatedAt -email -password -favoriteEvents -country -updatedAt -__v'
                })
                .exec();

            if (!event) {
                return new JsonR(404, false, 'event-model-getById', 'Event not found', {});
            }

            return new JsonR(200, true, 'event-model-getById', 'Event found successfully', event);
        } catch (err) {
            logger.error(err);
            return new JsonR(500, false, 'event-model-getById', 'Server error', {});
        }
    }

    /**
     * Get an event by its slug.
     * @param {string} slug - The slug of the event.
     * @returns {Object} JsonR with the data/errors.
     */
    static async getBySlug({ slug }) {
        try {
            const event = await Event.findOne({ slug: slug })
                .populate({
                    path: 'featuredImage',
                    select: '-author'
                })
                .populate({
                    path: 'category',
                    select: '-createdAt -updatedAt -__v'
                })
                .populate({
                    path: 'organizer',
                    select: '-_id -role -createdAt -updatedAt -email -password -favoriteEvents -country -updatedAt -__v'
                })
                .exec();

            if (!event) {
                return new JsonR(404, false, 'app-model-getBySlug', 'Event not found', {});
            }

            return new JsonR(200, true, 'app-model-getBySlug', 'Event found successfully', event);
        } catch (err) {
            logger.error(err);
            return new JsonR(500, false, 'app-model-getBySlug', 'Server error', {});
        }
    }

    /**
     * Get all events with pagination.
     * @param {number} eventsPerPage - Number of events per page.
     * @param {number} page - Page number.
     * @returns {Object} JsonR with the data/errors.
     */
    static async getAll({ eventsPerPage = 10, page = 1 }) {
        try {
            const pageNumber = parseInt(page, 10);
            const pageSize = parseInt(eventsPerPage, 10);
    
            const events = await Event.find()
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .populate({
                    path: 'featuredImage',
                    select: '-author'
                })
                .populate({
                    path: 'category',
                    select: '-createdAt -updatedAt -__v'
                })
                .populate({
                    path: 'organizer',
                    select: '-_id -role -createdAt -updatedAt -email -password -favoriteEvents -country -updatedAt -__v'
                })
                .select('-content')
                .exec();
        
            const totalEvents = await Event.countDocuments();
            const totalPages = Math.ceil(totalEvents / pageSize);
        
            const result = {
                events,
                pageInfo: {
                    totalEvents,
                    totalPages,
                    currentPage: pageNumber,
                    pageSize: pageSize,
                }
            };
        
            return new JsonR(200, true, 'app-model-getAll', 'Events found successfully', result);
        } catch (err) {
            logger.error(err);
            return new JsonR(500, false, 'app-model-getAll', 'Server error', {});
        }
    }

    static async delete({ userid, id }) {
        try {
            const AppFind = await App.findOneAndDelete({ _id: id, userid: userid });
            if (!AppFind) {
                return new JsonR(404, false, 'app-model-delete', 'App not found', {});
            }
            return new JsonR(200, true, 'app-model-delete', 'App deleted successfully', AppFind);

        } catch (err) {
            return new JsonR(500, false, 'app-model-delete', 'Server error', {});
        }
    }

    static async update({ userid, id, domain, apptype, resume }) {
        try {
            // Crea un objeto con los campos que se pueden actualizar
            const updateFields = {};
            if (domain) updateFields.domain = domain;
            if (apptype) updateFields.apptype = apptype;
            if (resume) updateFields.resume = resume;
        
            // Realiza la actualización solo si se proporcionan campos válidos
            if (Object.keys(updateFields).length === 0)
                return new JsonR(400, false, 'app-model-update', 'No valid fields provided for update', {});
        
            // Realiza la actualización del documento
            const updatedApp = await App.findOneAndUpdate(
                { _id: id, userid: userid },
                updateFields,
                { new: true }
            );
        
            if (!updatedApp)
                return new JsonR(404, false, 'app-model-update', 'App not found or not authorized to update', {});
    
            return new JsonR(200, true, 'app-model-update', 'App updated successfully', updatedApp);

        } catch (err) {
            return new JsonR(500, false, 'app-model-delete', 'Server error', {});
        }
    }
}



export default eventModel;