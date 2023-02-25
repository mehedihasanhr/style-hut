import Cart from "../models/CartModel";
import User from "../models/UserModel";
import Order from "../models/OrderModel";

class OrdersController { 
    constructor() {
        this.res = null;
        this.errorMessage = this.errorMessage.bind(this);
        this.getOrder = this.getOrder.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.getOrdersByUser = this.getOrdersByUser.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    // * params error handler
    errorMessage(status, message) {
        return this.res.status(status).json({
            status: "error",
            message
        });
    }

    // * get all orders
    async getOrders(req, res) {
        this.res = res;
        try{
            await Order.find().exec()
                .then(orders => {
                    if(!orders) return this.errorMessage(404, "No orders found");

                    return res.status(200).json({
                        status: "success",
                        message: "Orders fetched successfully",
                        data: orders
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }catch(err){
            console.log(err);
            return this.errorMessage(500, err.message);
        }
        
    }

    // * get single order
    async getOrder(req, res) {
        this.res = res;
        // * get order id from params
        const { orderId } = req.params;
        
        try{
            await Order.findById(orderId).exec()
                .then(order => {
                    if(!order) return this.errorMessage(404, "Order not found");

                    return res.status(200).json({
                        status: "success",
                        message: "Order fetched successfully",
                        data: order
                    });
                })
                .catch(err => {
                    return this.errorMessage(500, err.message);
                })
        }catch(err){
            console.log(err);
            return this.errorMessage(500, err.message);
        }

    }

    // * get orders by user
    async getOrdersByUser(req, res) {
        this.res = res;
        const userId = req.session.user.data.id;

        if(!userId) {
            return this.errorMessage(400, "Please login to continue");
        }

        try{
            await Order.find({ user: userId }).exec()
                .then(orders => {
                    if(!orders) return this.errorMessage(404, "No orders found");

                    return res.status(200).json({
                        status: "success",
                        message: "Orders fetched successfully",
                        data: orders
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }catch(err){
            console.log(err);
            return this.errorMessage(500, err.message);
        }
    }

    // * create new Order 
    async createOrder(req, res) {
        this.res = res;

        const userId = req.session.user.data.id;

        
        if(!userId) {
            return this.errorMessage(400, "Please login to continue");
        }

        try{
            //* user data
            let user = await User.findById(userId).select('orders carts').exec();
            const carts = await Cart.findOne({ user: userId }).exec();

            if(!carts) {
                return this.errorMessage(404, "Cart not found");
            }

            await Order.create({ user: userId, carts, ...req.body })
                .then(async order=> {
                    if(!order){
                        return this.errorMessage(500, "Order not created");
                    }

                    // * add order to user
                    user.orders.push(order._id);
                    // * remove cart
                    user.carts.pull(carts._id);

                    // ! remove cart from db
                    await carts.remove().catch(err => console.log(err));

                    // * save user
                    await user.save();
                    

                    return res.status(201).json({
                        status: "success",
                        message: "Order created successfully",
                        data: order
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }catch(err){
            console.log(err);
            return this.errorMessage(500, err.message);
        }

    }

    // * delete order
    async deleteOrder(req, res) {
        this.res = res;
        const userId = req.session.user.data.id;
        const { orderId }= req.params;

        // * check if user is logged in
        if(!userId) {
            return this.errorMessage(400, "Please login to continue");
        }

        // * check if order id is provided
        if(!orderId) {
            return this.errorMessage(400, "Please provide order id");
        }

        // * check if order exists
        try{
            await Order.findById(orderId).exec()
                    .then(async order => {
                        if(!order) return this.errorMessage(404, "Order not found");
                        

                        // * check if order belongs to user
                        if(order.user.toString() !== userId.toString()){
                            return this.errorMessage(403, "You are not authorized to delete this order");
                        }

                        // * check if order already shipped
                        if(order.status === "shipped"){
                            return this.errorMessage(403, "Your order has already been shipped");
                        }

                        // * delete order
                        await order.remove().then(async () => {
                            // * remove order from user
                            await User.findById(userId).then(async user => {
                                if(!user) return this.errorMessage(404, "User not found");
                                user.orders.pull(order._id);
                                await user.save();
                            }).catch(err => {
                                console.log(err);
                            })

                            return res.status(200).json({
                                status: "success",
                                message: "Order deleted successfully",
                            });
                        }).catch(err => {
                            console.log(err);
                            return this.errorMessage(500, "Order not deleted");
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
        }catch(err){
            console.log(err);
            return this.errorMessage(500, err.message);
        }
    }

}


export default new OrdersController();