import Event from '../schemas/db/eventSchema.js';
import logger from '../services/logger.js';
import crypto from 'node:crypto';
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
    static async set({title, slug, content, longitude, latitude, country, province, address, virtual, links, prices, organizer, startDate, endDate, featuredImage}){
        try {
            const newEvent = new Event({
                title: title,
                slug: slug,
                content: content,
                location: {
                    longitude: longitude,
                    latitude: latitude,
                    country: country,
                    province: province,
                    address: address,
                },
                virtual: virtual,
                links: links,
                prices: prices,
                organizer: organizer,
                startDate: startDate,
                endDate: endDate,
                featuredImage: featuredImage,
            })

            const saveEvnt = await newEvent.save();
            return new JsonR(200,true,'app-model-set','Event create successfully', saveEvnt);
        } catch (err) {
            console.error('Error:', err);
            throw err; // Lanzar el error para que sea manejado por el código que llama a esta función
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
            console.error('Error:', err);
            throw err; // Lanzar el error para que sea manejado por el código que llama a esta función
        }
    }

    /**
     *  Add One link to the event.
     * @param {ObjectId} eventId - Id del evento
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
            console.error('Error:', err);
            throw err; // Lanzar el error para que sea manejado por el código que llama a esta función
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
            console.error('Error:', err);
            throw err; // Lanzar el error para que sea manejado por el código que llama a esta función
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
        return new JsonR(500, false, 'app-model-set', 'Server error', {});
        }
    }

    /**
     * Get a event with the ID.
     * @param {ObjectId} eventId - eventid
    * @returns {Object} JsonR with the data/errors.
    */
    static async get({ eventid }){
        try {
            const EventFind = await Event.findById(eventid);
            if(!EventFind) return new JsonR(404, false, 'app-model-get', 'App not found', {});
    
            return new JsonR(200,true,'app-model-get','App found successfully', EventFind);
        } catch (err) {
            return new JsonR(500, false, 'app-model-set', 'Server error', {});
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