import Notification from "../models/NotificationModel";

class NotificationController {
    constructor() {
        this.res = null;
        this.message = this.message.bind(this);
        this.createNotification = this.createNotification.bind(this);
    }

    // * message
    async message(code, status, message) {
        return this.res.status(code).json({
            status,
            message,
        });
    }

    //* create a new notification
    async createNotification(req, res) {
        this.res = res;
    }

}


export default new NotificationController();