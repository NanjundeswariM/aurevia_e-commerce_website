import Order from "../models/Order.mjs";
import { Product } from "../models/Product.mjs";

export const createOrder = async (req, res) => {
  const reservedStock = [];
  try {
    const {
      orderItems,
      deliveryAddress,
      paymentMethod,
    } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to place an order.",
      });
    }
    if (
      !orderItems ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Your order must contain at least one product.",
      });
    }
    if (!deliveryAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Delivery address and payment method are required.",
      });
    }
    const {
      name,
      phone,
      email,
      address,
      city,
      state,
      pincode,
    } = deliveryAddress;
    if (
      !name?.trim() ||
      !/^[6-9]\d{9}$/.test(phone || "") ||
      !address?.trim() ||
      !city?.trim() ||
      !state?.trim() ||
      !/^\d{6}$/.test(pincode || "")
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid delivery details.",
      });
    }
    const allowedPaymentMethods = [
      "UPI",
      "Credit Card",
      "Net Banking",
      "Cash on Delivery",
    ];
    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }
    const verifiedItems = [];
    for (const item of orderItems) {
      const productId = Number(item.productId ?? item.id);
      const quantity = Number(item.quantity);

      if (!Number.isInteger(productId) || productId <= 0) {
        const error = new Error("Invalid product ID.");
        error.statusCode = 400;
        throw error;
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        const error = new Error("Invalid product quantity.");
        error.statusCode = 400;
        throw error;
      }
      const product = await Product.findOneAndUpdate(
        {
          id: productId,
          stock: { $gte: quantity },
        },
        {
          $inc: { stock: -quantity },
        },
        {
          new: true,
        }
      );

      if (!product) {
        const existingProduct = await Product.findOne({
          id: productId,
        });

        if (!existingProduct) {
          const error = new Error(
            `Product not found: ${productId}`
          );
          error.statusCode = 404;
          throw error;
        }

        const error = new Error(
          `${existingProduct.name} has insufficient stock.`
        );
        error.statusCode = 400;
        throw error;
      }
      reservedStock.push({
        productId: product.id,
        quantity,
      });

      verifiedItems.push({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
        selectedSize: item.selectedSize || "",
        category: product.category || "",
      });
    }

    const subtotal = verifiedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const deliveryCharge = subtotal > 999 ? 0 : 50;
    const discount = subtotal >= 5000 ? 500 : 0;
    const totalAmount = subtotal + deliveryCharge - discount;

    const order = await Order.create({
      userId,
      orderItems: verifiedItems,
      deliveryAddress: {
        name,
        phone,
        email: email || "",
        address,
        city,
        state,
        pincode,
      },
      subtotal,
      deliveryCharge,
      discount,
      totalAmount,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Placed",
    });

    reservedStock.length = 0;

    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });

  } catch (error) {
    console.error("Create order error:", error);

    for (const item of reservedStock) {
      try {
        await Product.updateOne(
          { id: item.productId },
          { $inc: { stock: item.quantity } }
        );
      } catch (restoreError) {
        console.error(
          "Stock restoration error:",
          restoreError
        );
      }
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Unable to create order.",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get my orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch your orders.",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get all orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch all orders.",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Placed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (
      order.orderStatus === "Cancelled" &&
      orderStatus !== "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "A cancelled order cannot be reactivated.",
      });
    }

    if (
      orderStatus === "Cancelled" &&
      order.orderStatus !== "Cancelled"
    ) {
      for (const item of order.orderItems) {
        await Product.updateOne(
          { id: item.productId },
          { $inc: { stock: item.quantity } }
        );
      }
    }

    order.orderStatus = orderStatus;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });

  } catch (error) {
    console.error("Update order status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update order status.",
    });
  }
};

export const getTotalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = result.length > 0
      ? result[0].totalRevenue
      : 0;

    return res.status(200).json({
      success: true,
      totalRevenue,
    });

  } catch (error) {
    console.error("Revenue calculation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to calculate total revenue.",
    });
  }
};
