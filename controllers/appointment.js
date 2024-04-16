import expressAsyncHandler from 'express-async-handler';
import Appointment from '../models/Appointment.js'
import { appointmentGenerics } from '../generics/index.js';
import { convertArrayToObject } from '../utils/convertArrayToObject.js';
import { externalApiReqHandler } from '../utils/externalApiReqHandler.js';

const asyncHandler = expressAsyncHandler;
// GET /appointments
export const getAppointments = asyncHandler(async (req, res) => {
    try {
        const { startDate, endDate, userId, calendarId, teamId, includeAll } = req.query
        const expectedEntries = [{ startDate }, { endDate }, { userId }, { calendarId }, { teamId }, { includeAll }]
        const suppliedEntries = convertArrayToObject(expectedEntries) || {}
        const appointments = await Appointment.find(suppliedEntries)

        res.status(200).json({ message: 'success', appointments: appointments })
        // const appointments = await Appointment.find(suppliedEntries);
        // res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /appointments/:id
export const getAppointmentById = asyncHandler(async (req, res) => {
    try {
        const appointmentId = req.params.id

        const appointment = await Appointment.findById(appointmentId);
        if (appointment) {
            res.status(200).json({ appointment });
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const getAppointmentsSlots = asyncHandler(async (req, res) => {
    try {
        const { startDate, endDate, userId, calendarId, timezone } = req.query
        const expectedEntries = [{ startDate }, { endDate }, { userId }, { calendarId }, { timezone }]
        const suppliedEntries = convertArrayToObject(expectedEntries)

        const response = await externalApiReqHandler({
            method: 'GET',
            url: appointmentGenerics.externalRoutes.getSlots.path,
            params: suppliedEntries
        })

        res.status(200).json(response)
        // const appointments = await Appointment.find(suppliedEntries);
        // res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// POST /appointments
// ...

export const createAppointment = asyncHandler(async (req, res) => {
    try {
        const { email, phone, selectedSlot, selectedTimezone, calendarId, firstName, lastName, name, title, address1, city, state, website, calendarNotes} = req.body;

        const externalEntries = [{ email }, { phone }, { selectedSlot }, { selectedTimezone }, { calendarId }, {firstName}, {lastName}, {name}, {title}, {address1}, {city}, {state}, {website}, {calendarNotes}]
        const suppliedExternalEntries = convertArrayToObject(externalEntries)

        const response = await externalApiReqHandler({
            method: 'POST',
            payload: suppliedExternalEntries,
            url: appointmentGenerics.externalRoutes.create.path
        })

        // database entries
        const { branchId, userId, notes } = req.body

        const dateObj = new Date(selectedSlot)
        const date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
        const time = `${dateObj.getHours()}:${dateObj.getMinutes()}`

        if(response){
            const apiId  = response.id

            const newAppointment = new Appointment({ apiId, branchId, userId, notes, time, date, status: 'confirmed' })
            newAppointment.id = `U${newAppointment._id}`
            
            const savedAppointment = await newAppointment.save()
 
            return res.status(201).json({ message: 'success', appointment: savedAppointment })

        } else {
            res.status(404).json({ message: 'failed to create appointment' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /appointments/:id
export const updateAppointment = asyncHandler(async (req, res) => {
    try {

        const { selectedSlot, selectedTimezone} = req.body;

        const externalEntries = [{ selectedSlot }, { selectedTimezone }]
        const suppliedExternalEntries = convertArrayToObject(externalEntries)

        // database entries
        const { branchId, userId, notes, time, date, status } = req.body
        const databaseEntries = [{ branchId }, { userId }, { notes }, { time }, { date }, { status }]
        const suppliedDatabaseEntries = convertArrayToObject(databaseEntries)
        // const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, suppliedEntries, { new: true });

        const response = await externalApiReqHandler({
            method: 'PUT',
            url: appointmentGenerics.externalRoutes.updateById.path + `/${req.params.id}`,
            payload: suppliedExternalEntries,
        })

        if (response) {


            const updatedAppointment = await Appointment.findOneAndUpdate({apiId: req.params.id}, suppliedDatabaseEntries, { new: true });

            return res.status(201).json({ message: 'success', appointment: updatedAppointment })
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /appointments/:id
export const deleteAppointment = asyncHandler(async (req, res) => {
    try {
        // const appointment = await Appointment.findById(req.params.id);

        const response = await externalApiReqHandler({
            method: 'DELETE',
            url: appointmentGenerics.externalRoutes.deleteById.path + `/${req.params.id}`,
        })

        if(response){
            const deletedAppointment = await Appointment.findOneAndDelete({apiId: req.params.id});
            res.status(200).json({ message: 'Appointment deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
    try {
        const { status } = req.body;

        const response = await externalApiReqHandler({
            method: 'PUT',
            url: appointmentGenerics.externalRoutes.updateAppointmentStatus.path + `/${req.params.id}/status`,
            payload: { status },
        })

        if (response) {
            const updatedAppointment = await Appointment.findOneAndUpdate({apiId: req.params.id}, { status }, { new: true });
            return res.status(201).json({ message: 'success', appointment: updatedAppointment })
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
