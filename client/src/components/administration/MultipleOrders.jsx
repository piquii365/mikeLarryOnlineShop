import { useCallback, useState, useEffect } from "react";
import axios, { axiosPrivate } from "../../api/axios";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";

const MultipleOrders = () => {
  const search = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const fetchOrders = useCallback(async () => {
    const { data } = await axios.get("/orders/multiple");
    if (data.status) {
      setOrders(data.orders);
    }
  }, []);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (order) => {
    const id = order._id;
    axiosPrivate
      .delete(`/multiple/orders/delete/${id}`)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => console.error(error));
  };
  console.log(orders);
  return (
    <>
      <Box>
        {orders.length !== 0 ? (
          orders
            ?.filter((order) => {
              return search.toLowerCase() === ""
                ? order
                : order.customerEmail.includes(search);
            })
            .map((order, index) => (
              <Paper
                sx={{
                  width: "85%",
                  padding: "1em",
                  margin: "2em",
                  backgroundColor: "#002c3e",
                  color: "white",
                }}
                key={order._id}
              >
                <Typography sx={{ fontWeight: "bolder" }}>
                  Order No:{index + 1}
                </Typography>
                <Box>
                  <Typography>Full Name: {order.customerFullName}</Typography>
                  <Typography>
                    Customer Email:
                    <a href={`mailto:${order.customerEmail}`}>
                      {order.customerEmail}
                    </a>
                  </Typography>
                  <Typography>
                    Customer Address: {order.customerAddress}
                  </Typography>
                  <Typography>
                    Customer Phone Number:
                    <a href={`tel:${order.customerPhoneNumber}`}>
                      {order.customerPhoneNumber}
                    </a>
                  </Typography>
                  <Typography>Payment Status: {order.paymentStatus}</Typography>
                  <Typography>Payment Ref: {order.paymentReference}</Typography>
                  <Typography>Order Status: {order.orderStatus}</Typography>
                  <Typography>
                    Date Ordered: {new Date(order.date).toDateString()}
                  </Typography>
                  <Box>
                    <Typography sx={{ fontWeight: "bolder" }}>
                      Products Ordered
                    </Typography>
                    <Divider color="white" />
                    <Box>
                      <List>
                        {order.order.map((item, index) => (
                          <ListItem key={index} dense>
                            <ListItemText>{item.item}</ListItemText>
                            <ListItemText>{item.quantity}</ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                  <Box>
                    <Button onClick={() => handleClick(event, order)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(order)}>Delete</Button>
                  </Box>
                  <UpdateProduct
                    order={selectedOrder}
                    open={open}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                  />
                </Box>
              </Paper>
            ))
        ) : (
          <Typography>No orders found</Typography>
        )}
      </Box>
    </>
  );
};

export default MultipleOrders;
