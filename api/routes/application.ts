import { Router } from 'express';
import * as Controllers from '../controllers/application';
import {validationResult} from 'express-validator';
import { submitValidator, updateValidator } from '../utils/validation';

const routes:Router = Router();

routes.post('/create', async (req, res) => {
    const appId:number = await Controllers.createApplication(req.body);
    res.status(200).json({
        linkTo: `http://localhost:5173/${appId}`,
    });
    res.end();
});

routes.get('/:id', async (req, res) => {
    const appId:number = Number(req.params.id);
    const app = await Controllers.getApplication(appId);
    if (app) {
        res.status(200).json(app);
    } else {
        res.status(404).json({
            message: `Insurance application with id ${appId} not found`
        });
    }
    res.end();
});

routes.put('/:id', updateValidator, async (req, res) => {
    const appId:number = Number(req.params.id);

    const errors = validationResult(req);
    if (errors.isEmpty()) { 
        try {
            await Controllers.updateApplication(appId, req.body);    
        
            res.status(200).json({
                message: `Updated insurance application with id ${appId}`,
            });
        } catch (error) {
            res.status(404).json({errors: `Application ${appId} does not exist`});
        }

    } else {
        res.status(400).json({errors: errors.array()});
    }
    res.end();
});

routes.post('/:id/submit', submitValidator, async (req, res) => {
    const appId:number = Number(req.params.id);
 
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            await Controllers.updateApplication(appId, req.body); 

            res.status(200).json({
                cost: Math.random(),
            });
        } catch (error) {
            res.status(404).json({errors: `Application ${appId} does not exist`});    
        }
    } else {
        res.status(400).json({errors: errors.array()});
    }
    res.end();
});

export default routes;
