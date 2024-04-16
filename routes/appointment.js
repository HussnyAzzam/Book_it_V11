import { Router } from "express";
import { appointmentGenerics } from "../generics/index.js";
import { createAppointment, deleteAppointment, getAppointmentById, getAppointments, getAppointmentsSlots, updateAppointment, updateAppointmentStatus } from "../controllers/appointment.js";

const router = Router();

router.route(appointmentGenerics.routes.getAll.path).get(getAppointments);
router.route(appointmentGenerics.routes.getSlots.path).get(getAppointmentsSlots);
router.route(appointmentGenerics.routes.getById.path).get(getAppointmentById);
router.route(appointmentGenerics.routes.create.path).post(createAppointment);
router.route(appointmentGenerics.routes.updateById.path).put(updateAppointment);
router.route(appointmentGenerics.routes.deleteById.path).delete(deleteAppointment);
router.route(appointmentGenerics.routes.updateAppointmentStatus.path).put(updateAppointmentStatus)


export default router;