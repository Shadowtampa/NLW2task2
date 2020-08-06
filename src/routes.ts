import express from 'express';
import db from './database/connection';
import convertHourToMinute from './utils/convertHourToMinute';

const routes = express.Router();

interface scheduleItem {
    week_day: number;
    from: string;
    to: string;
}

routes.post('/classes', async (request, response) => {
    const {
        name, 
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
        } = request.body;

        const trx = await db.transaction();

    const insertUsersId = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
    });

    const user_id = insertUsersId[0];

    const insertClassesids = await trx('classes').insert({
        subject,
        cost,
        user_id,
    });

    const class_id = insertClassesids[0];

    const ClassSchedule = schedule.map((scheduleItem: scheduleItem) => {
        return {
            class_id,
            week_day: scheduleItem.week_day,
            from: convertHourToMinute(scheduleItem.from),
            to: convertHourToMinute(scheduleItem.to),
        };
    })

    await trx('class_schedule').insert(ClassSchedule);

    await trx.commit();

    return response.send();
});

export default routes;