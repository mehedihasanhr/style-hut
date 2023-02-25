import Cart from "../models/CartModel";
import User from "../models/UserModel";

class CartsController { 
    constructor() {
        this.res = null;
        this.createCart = this.createCart.bind(this);
        this.getCart = this.getCart.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
    }

    // * params error handler
    errorMessage(status, message) {
        return this.res.status(status).json({
            status: "error",
            message
        });
    }

    // * get cart 
    async getCart(req, res) {
        this.res = res;
        const { cartId } = req.params;

        if(!cartId) {
            return this.errorMessage(400, "Invalid request body");
        }

        try {
            await Cart.findById(cartId).exec().then(cart => {
                if(!cart) {
                    return this.errorMessage(404, "Cart not found");
                }
                return res.status(200).json({
                    status: "success",
                    message: "Cart fetched successfully",
                    data: cart
                });
            }).catch(err => {
                console.log(err);
                return this.errorMessage(500, err.message);
            })
        } catch (error) {
            console.log(error);
            return this.errorMessage(500, error.message);
        }   
    }

    // * create new cart 
    async createCart(req, res) {
        this.res = res;
        const userId = req.session.user.data.id;

        if(!userId) {
            return this.errorMessage(400, "Invalid request body");
        }
        let user = await User.findById(userId).select('carts').exec();

        // ! if user is not found
        if(!user) {
            return this.errorMessage(404, "User not found");
        }

        // * check if user has a cart
        try {
            const cart = await Cart.create({ user: userId, ...req.body });
            
            if(!cart) {
                return this.errorMessage(500, "Cart not created");
            };    
            // * add cart to user
            user.carts.push(cart._id);

            // * save user
            await user.save().catch(err => {
                console.log(err);
            })

            return res.status(201).json({
                status: "success",
                message: "Cart created successfully",
                data: cart
            });
        } catch (error) {
            console.log(error);
            return this.errorMessage(500, error.message);
        }
    }

    // * edit cart 

    async updateCart (req, res) {
        this.res = res;
        //* get cart id from params
        const {cartId} = req.params;


        // ! if cart id is not provided
        if(!cartId) {
            return this.errorMessage(400, "Invalid request body");
        }

        try {
            // * find cart by id
            let cart = await Cart.findById(cartId).exec();

            // ! if cart is not found
            if(!cart) {
                return this.errorMessage(404, "Cart not found");
            }

            // * update cart
            cart.carts = req.body.carts;

            // * save cart
            await cart.save().then(c => {
                return res.status(200).json({
                    status: "success",
                    message: "Cart updated successfully",
                    data: c
                });
            }).catch((err)=>{
                console.log(err);
                return this.errorMessage(500, err.message);
            })


        } catch(err) {
            console.log(err);
            return this.errorMessage(500, err.message);
        }
    } 


    // * delete cart
    async deleteCart(req, res) {
        this.res = res;
        //* get cart id from params
        const {cartId} = req.params;
        const userId = req.session.user.data.id;

        // ! if cart id is not provided
        if(!cartId){
            return this.errorMessage(400, "Invalid request");
        }

        // ! if user id is not provided
        if(!userId){
            return this.errorMessage(400, "Session expired! please login again");
        }
        try{
            let user = await User.findById(userId).select('carts').exec();

            // ! if user is not found
            if(!user) {
                return this.errorMessage(404, "User not found");
            }

            // * delete cart
            await Cart.findByIdAndDelete(cartId)
                    .exec()
                    .then(async (cart) => {
                        // * remove cart from user
                        user.carts.pull(cart._id);

                        // * save user
                        await user.save().catch(err => {
                            console.log(err);
                        })

                        return res.status(200).json({
                            status: "success",
                            message: "Cart deleted successfully",
                        });

                    }).catch(err => {
                        return this.errorMessage(500, err.message);
                    })

        }catch(err){
            console.log(err);
            return this.errorMessage(500, err.message);
        }
    }

}


export default new CartsController();