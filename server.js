import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userGenerics, appointmentGenerics, adminUserGenerics, authGenerics, businessBranchGenerics, businessGenerics, categoryGenerics, dictionaryGenerics, externalCustomersGenerics, packageGenerics, serviceGenerics, personGenerics } from './generics/index.js';
import userRoutes from './routes/user.js'
import businessRoutes from './routes/business.js'
import categoryRoutes from './routes/category.js'
import servicesRoutes from './routes/services.js'
import dictionaryRoutes from './routes/dictionary.js'
import adminUserRoutes from './routes/adminUser.js'
import appointmentRoutes from './routes/appointment.js'
import packageRoutes from './routes/package.js'
import businessBranchRoutes from './routes/businessBranch.js'
import personRoutes from './routes/person.js'
import externalCustomersRoutes from './routes/externalCustomers.js'
import authRoutes from './routes/auth.js'
import fileRoutes from './routes/jsonFiles.js'

import dotenv from 'dotenv';

dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(userGenerics.base, userRoutes);
app.use(appointmentGenerics.base, appointmentRoutes);
app.use(adminUserGenerics.base, adminUserRoutes);
app.use(businessBranchGenerics.base, businessBranchRoutes);
app.use(businessGenerics.base, businessRoutes);
app.use(categoryGenerics.base, categoryRoutes);
app.use(dictionaryGenerics.base, dictionaryRoutes);
app.use(externalCustomersGenerics.base, externalCustomersRoutes);
app.use(packageGenerics.base, packageRoutes);
app.use(serviceGenerics.base, servicesRoutes);
app.use(personGenerics.base, personRoutes);
app.use(authGenerics.base, authRoutes);
app.use('/files', fileRoutes)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });
