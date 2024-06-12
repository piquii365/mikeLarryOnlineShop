import { useCallback, useState, useEffect } from "react";
import axios from "../../api/axios";
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
const MultipleOrders = () => {
  const search = useOutletContext();
  const [orders, setOrders] = useState([]);
  const fetchOrders = useCallback(async () => {
    const { data } = await axios.get("/orders/multiple");
    if (data.status) {
      setOrders(data.orders);
    }
  }, []);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  console.log(orders);
  return (
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
              sx={{ width: "85%", padding: "1em", margin: "2em" }}
              key={order._id}
            >
              <Typography sx={{ fontWeight: "bolder" }}>
                Order No:{index + 1}
              </Typography>
              <Box>
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
                  <Divider />
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
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Box>
              </Box>
            </Paper>
          ))
      ) : (
        <Typography>No orders found</Typography>
      )}
    </Box>
  );
};

export default MultipleOrders;
