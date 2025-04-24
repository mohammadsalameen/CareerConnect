import cors from 'cors'
import connectDB from './DB/connection.js';
import authRouter from './src/modules/auth/auth.router.js';
import jobRouter from './src/modules/job/job.router.js';
import applicationRouter from './src/modules/application/application.router.js';

const initApp = async(app, express) =>{
    app.use(express.json());
    app.use(cors());
    connectDB();

    app.use('/auth', authRouter);
    app.use('/job', jobRouter);
    app.use('/application', applicationRouter)

    app.get('/', (req, res) =>{
        return res.status(200).json("Welcome ....");
    });

    // app.use('*', (req, res) =>{
    //     return res.status(404).json({
    //         message: 'Page not found'
    //     });
    // });
}
export default initApp;