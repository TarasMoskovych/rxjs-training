
import * as express from 'express';
import { Application } from 'express';
import {
  getAllCourses,
  getCourseById,
  loginUser,
  saveCourse,
  searchLessons,
} from './routes';

const bodyParser = require('body-parser');
const app: Application = express();

app.use(bodyParser.json());

app.route('/api/courses').get(getAllCourses);
app.route('/api/courses/:id').get(getCourseById);
app.route('/api/lessons').get(searchLessons);
app.route('/api/courses/:id').put(saveCourse);
app.route('/api/login').post(loginUser);

const httpServer = app.listen(3001, () => {
  console.log('HTTP REST API Server running at http://localhost:' + httpServer.address()['port']);
});
