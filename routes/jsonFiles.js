import { Router } from 'express'
import * as userGenerics from '../generics/user.json' assert { type: "json" };
import * as personGenerics from '../generics/person.json' assert { type: "json" };
import * as servicesGenerics from '../generics/services.json' assert { type: "json" };
import * as categoryGenerics from '../generics/category.json' assert { type: "json" };
import * as dictionaryGenerics from '../generics/dictionary.json' assert { type: "json" };
import * as adminUserGenerics from '../generics/adminUser.json' assert { type: "json"};
import * as packageGenerics from '../generics/packageGeneric.json' assert { type: "json"};
import * as businessBranchGenerics from '../generics/businessBranch.json' assert { type: "json"};
import * as externalCustomersGenerics from '../generics/externalCustomers.json' assert { type: "json"};
import * as authGenerics from '../generics/auth.json' assert { type: "json"};
import * as appointmentGenerics from '../generics/appointment.json' assert { type: "json"};
import * as businessGenerics from '../generics/business.json' assert { type: "json"};

const router = Router();


router.get('/all', (req, res) => {
    const allRoutes = [
        userGenerics,
        personGenerics,
        servicesGenerics,
        categoryGenerics,
        dictionaryGenerics,
        adminUserGenerics,
        packageGenerics,
        businessBranchGenerics,
        externalCustomersGenerics,
        authGenerics,
        appointmentGenerics,
        businessGenerics
    ] 
    res.json(allRoutes);
})

export default router